package com.pminternship.backend.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pminternship.backend.dto.InternshipDTO;
import com.pminternship.backend.dto.InternshipSkillDTO;
import com.pminternship.backend.dto.RecommendationResponse;
import com.pminternship.backend.entity.Internship;
import com.pminternship.backend.entity.InternshipSkill;
import com.pminternship.backend.entity.StudentInterest;
import com.pminternship.backend.entity.StudentProfile;
import com.pminternship.backend.entity.StudentSkill;
import com.pminternship.backend.entity.WorkMode;
import com.pminternship.backend.repository.StudentInterestRepository;
import com.pminternship.backend.repository.StudentSkillRepository;

@Service
public class RuleBasedRecommendationEngine implements RecommendationEngine {

    private final StudentSkillRepository studentSkillRepository;
    private final StudentInterestRepository studentInterestRepository;

    public RuleBasedRecommendationEngine(StudentSkillRepository studentSkillRepository,
                                         StudentInterestRepository studentInterestRepository) {
        this.studentSkillRepository = studentSkillRepository;
        this.studentInterestRepository = studentInterestRepository;
    }

    @Override
    public List<RecommendationResponse> generateRecommendations(StudentProfile student, List<Internship> internships) {
        if (student == null || internships == null || internships.isEmpty()) {
            return Collections.emptyList();
        }

        List<RecommendationResponse> recommendations = internships.stream()
                .filter(i -> i.getStatus() != null && i.getStatus())
                .map(internship -> calculateMatch(student, internship))
                .sorted(Comparator.comparingInt(RecommendationResponse::getOverallScore).reversed())
                .limit(10)
                .collect(Collectors.toList());

        return recommendations;
    }

    @Override
    public RecommendationResponse calculateMatch(StudentProfile student, Internship internship) {
        RecommendationResponse res = new RecommendationResponse();
        res.setInternshipId(internship.getId());
        res.setInternship(mapToDTO(internship));

        // 1. Skill Match (40%)
        List<StudentSkill> studentSkills = studentSkillRepository.findByStudent(student);
        Set<String> studentSkillNames = studentSkills.stream()
                .map(ss -> ss.getSkill().getName().trim().toLowerCase())
                .collect(Collectors.toSet());

        List<InternshipSkill> reqSkills = internship.getRequiredSkills();
        List<String> matchingSkills = new ArrayList<>();
        List<String> missingSkills = new ArrayList<>();

        if (reqSkills == null || reqSkills.isEmpty()) {
            res.setSkillScore(100);
        } else {
            for (InternshipSkill is : reqSkills) {
                String reqSkillName = is.getSkill().getName().trim();
                if (studentSkillNames.contains(reqSkillName.toLowerCase())) {
                    matchingSkills.add(reqSkillName);
                } else {
                    missingSkills.add(reqSkillName);
                }
            }
            int score = (int) Math.round(((double) matchingSkills.size() / reqSkills.size()) * 100);
            res.setSkillScore(score);
        }
        res.setMatchingSkills(matchingSkills);
        res.setMissingSkills(missingSkills);

        // 2. Education/Eligibility Match (20%)
        int eduScore = 100;
        String eligibility = internship.getEligibility();
        String studentDegree = student.getDegree();
        String studentBranch = student.getBranch();

        if (eligibility != null && !eligibility.trim().isEmpty()) {
            String lowerElig = eligibility.toLowerCase();
            boolean degreeMatches = (studentDegree != null && lowerElig.contains(studentDegree.toLowerCase())) ||
                    (studentBranch != null && lowerElig.contains(studentBranch.toLowerCase())) ||
                    lowerElig.contains("any graduate") || lowerElig.contains("all branches") || lowerElig.contains("open to all");

            if (degreeMatches) {
                eduScore = 100;
            } else if (student.getEducationLevel() != null && lowerElig.contains(student.getEducationLevel().toLowerCase())) {
                eduScore = 80;
            } else {
                eduScore = 50;
            }
        }
        res.setEducationScore(eduScore);

        // 3. Interest/Industry Match (15%)
        List<StudentInterest> studentInterests = studentInterestRepository.findByStudent(student);
        Set<String> interestNames = studentInterests.stream()
                .map(si -> si.getInterest().getName().trim().toLowerCase())
                .collect(Collectors.toSet());

        String prefIndustries = student.getPreferredIndustries();
        if (prefIndustries != null && !prefIndustries.isEmpty()) {
            for (String ind : prefIndustries.split(",")) {
                interestNames.add(ind.trim().toLowerCase());
            }
        }

        int interestScore = 40;
        String industry = internship.getIndustry() != null ? internship.getIndustry().toLowerCase() : "";
        if (!industry.isEmpty()) {
            for (String interest : interestNames) {
                if (industry.contains(interest) || interest.contains(industry)) {
                    interestScore = 100;
                    break;
                }
            }
        } else {
            interestScore = 70;
        }
        res.setInterestScore(interestScore);

        // 4. Location Match (10%)
        int locScore = 50;
        String studentLocations = student.getPreferredLocations();
        String internLoc = (internship.getLocation() != null ? internship.getLocation() : "") + " " +
                           (internship.getCity() != null ? internship.getCity() : "") + " " +
                           (internship.getState() != null ? internship.getState() : "");
        internLoc = internLoc.toLowerCase();

        if (internship.getWorkMode() == WorkMode.REMOTE) {
            locScore = 100;
        } else if (studentLocations != null && !studentLocations.trim().isEmpty()) {
            for (String loc : studentLocations.split(",")) {
                if (internLoc.contains(loc.trim().toLowerCase())) {
                    locScore = 100;
                    break;
                }
            }
        } else {
            locScore = 70;
        }
        res.setLocationScore(locScore);

        // 5. Career Goal Match (10%)
        int goalScore = 50;
        String careerGoal = student.getCareerGoal();
        String preferredRoles = student.getPreferredRoles();
        String internTitle = internship.getTitle() != null ? internship.getTitle().toLowerCase() : "";

        if (preferredRoles != null && !preferredRoles.trim().isEmpty()) {
            for (String role : preferredRoles.split(",")) {
                if (internTitle.contains(role.trim().toLowerCase())) {
                    goalScore = 100;
                    break;
                }
            }
        }
        if (goalScore < 100 && careerGoal != null && !careerGoal.trim().isEmpty()) {
            if (internTitle.contains(careerGoal.toLowerCase()) || internTitle.contains(industry)) {
                goalScore = 90;
            } else {
                goalScore = 60;
            }
        }
        res.setCareerGoalScore(goalScore);

        // 6. Work Mode Match (5%)
        int workModeScore = 50;
        String prefWorkMode = student.getPreferredWorkMode();
        if (prefWorkMode != null && internship.getWorkMode() != null) {
            if (prefWorkMode.equalsIgnoreCase(internship.getWorkMode().name())) {
                workModeScore = 100;
            } else if (prefWorkMode.equalsIgnoreCase("ANY") || prefWorkMode.equalsIgnoreCase("HYBRID")) {
                workModeScore = 80;
            }
        } else {
            workModeScore = 70;
        }
        res.setWorkModeScore(workModeScore);

        // Calculate Weighted Overall Score
        double weighted = (res.getSkillScore() * 0.40) +
                          (res.getEducationScore() * 0.20) +
                          (res.getInterestScore() * 0.15) +
                          (res.getLocationScore() * 0.10) +
                          (res.getCareerGoalScore() * 0.10) +
                          (res.getWorkModeScore() * 0.05);

        int overall = (int) Math.round(weighted);
        res.setOverallScore(overall);

        // Explanations
        List<String> explanations = new ArrayList<>();
        if (!matchingSkills.isEmpty()) {
            explanations.add("Your " + String.join(", ", matchingSkills) + " skill(s) match the internship requirements.");
        }
        if (res.getEducationScore() >= 80) {
            explanations.add("Your education (" + (studentDegree != null ? studentDegree : "degree") + ") meets the eligibility criteria.");
        }
        if (res.getInterestScore() >= 80) {
            explanations.add("Your preferred industry matches " + internship.getIndustry() + ".");
        }
        if (res.getLocationScore() >= 80) {
            explanations.add(internship.getWorkMode() == WorkMode.REMOTE ? "This internship is remote, matching your location flexibility." : "Location aligns with your preferred work locations.");
        }
        if (res.getCareerGoalScore() >= 80) {
            explanations.add("Your career goals strongly match the " + internship.getTitle() + " role.");
        }
        if (explanations.isEmpty()) {
            explanations.add("This internship provides a foundational opportunity aligned with entry-level candidate profiles.");
        }
        res.setExplanation(explanations);
// Suggestions
List<String> suggestions = new ArrayList<>();

if (!missingSkills.isEmpty()) {
    for (String missing : missingSkills) {
        suggestions.add("Learn " + missing + " basics and add it to your profile skills.");
    }

    suggestions.add("Build a hands-on project demonstrating "
            + String.join(" & ", missingSkills) + ".");
} else {
    suggestions.add("Your technical skills fully match! High probability of selection.");
}

if (student.getCgpa() == null) {
    suggestions.add("Update your CGPA in your profile to boost education match accuracy.");
}

// StudentProfile currently does not contain a projects field,
// so don't call student.getProjects().
suggestions.add("Add technical projects to showcase practical knowledge to recruiters.");

res.setSuggestions(suggestions);

return res;
    }
    private InternshipDTO mapToDTO(Internship internship) {
        InternshipDTO dto = new InternshipDTO();
        dto.setId(internship.getId());
        dto.setTitle(internship.getTitle());
        dto.setCompany(internship.getCompany());
        dto.setDescription(internship.getDescription());
        dto.setIndustry(internship.getIndustry());
        dto.setLocation(internship.getLocation());
        dto.setState(internship.getState());
        dto.setCity(internship.getCity());
        dto.setDuration(internship.getDuration());
        dto.setWorkMode(internship.getWorkMode());
        dto.setStipend(internship.getStipend());
        dto.setEligibility(internship.getEligibility());
        dto.setDeadline(internship.getDeadline());
        dto.setApplicationUrl(internship.getApplicationUrl());
        dto.setStatus(internship.getStatus());
        dto.setCreatedAt(internship.getCreatedAt());

        if (internship.getRequiredSkills() != null) {
            List<InternshipSkillDTO> skillDTOs = internship.getRequiredSkills().stream()
                    .map(is -> new InternshipSkillDTO(is.getId(), is.getSkill().getName(), is.getSkill().getCategory(), is.getRequiredLevel()))
                    .collect(Collectors.toList());
            dto.setSkills(skillDTOs);
            dto.setSkillNames(skillDTOs.stream().map(InternshipSkillDTO::getSkillName).collect(Collectors.toList()));
        }
        return dto;
    }
}
