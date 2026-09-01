package com.pminternship.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pminternship.backend.dto.CertificationDTO;
import com.pminternship.backend.dto.LanguageDTO;
import com.pminternship.backend.dto.ProjectDTO;
import com.pminternship.backend.dto.SkillDTO;
import com.pminternship.backend.dto.StudentProfileDTO;
import com.pminternship.backend.entity.Certification;
import com.pminternship.backend.entity.Interest;
import com.pminternship.backend.entity.Language;
import com.pminternship.backend.entity.Project;
import com.pminternship.backend.entity.Skill;
import com.pminternship.backend.entity.StudentInterest;
import com.pminternship.backend.entity.StudentProfile;
import com.pminternship.backend.entity.StudentSkill;
import com.pminternship.backend.entity.User;
import com.pminternship.backend.exception.ResourceNotFoundException;
import com.pminternship.backend.repository.CertificationRepository;
import com.pminternship.backend.repository.InterestRepository;
import com.pminternship.backend.repository.LanguageRepository;
import com.pminternship.backend.repository.ProjectRepository;
import com.pminternship.backend.repository.SkillRepository;
import com.pminternship.backend.repository.StudentInterestRepository;
import com.pminternship.backend.repository.StudentProfileRepository;
import com.pminternship.backend.repository.StudentSkillRepository;
import com.pminternship.backend.repository.UserRepository;

@Service
public class StudentProfileService {

    private final UserRepository userRepository;
    private final StudentProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final InterestRepository interestRepository;
    private final StudentInterestRepository studentInterestRepository;
    private final CertificationRepository certificationRepository;
    private final ProjectRepository projectRepository;
    private final LanguageRepository languageRepository;

    public StudentProfileService(
            UserRepository userRepository,
            StudentProfileRepository profileRepository,
            SkillRepository skillRepository,
            StudentSkillRepository studentSkillRepository,
            InterestRepository interestRepository,
            StudentInterestRepository studentInterestRepository,
            CertificationRepository certificationRepository,
            ProjectRepository projectRepository,
            LanguageRepository languageRepository) {

        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.skillRepository = skillRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.interestRepository = interestRepository;
        this.studentInterestRepository = studentInterestRepository;
        this.certificationRepository = certificationRepository;
        this.projectRepository = projectRepository;
        this.languageRepository = languageRepository;
    }

    // =========================================================
    // GET STUDENT PROFILE ENTITY
    // =========================================================

    public StudentProfile getStudentEntityByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with email: " + email));

        return profileRepository.findByUser(user)
                .orElseGet(() -> {

                    StudentProfile profile = new StudentProfile();

                    profile.setUser(user);

                    return profileRepository.save(profile);
                });
    }

    // =========================================================
    // GET PROFILE
    // =========================================================

    public StudentProfileDTO getProfileByEmail(String email) {

        StudentProfile profile = getStudentEntityByEmail(email);

        return mapToDTO(profile);
    }

    // =========================================================
    // UPDATE PROFILE
    // =========================================================

    @Transactional
    public StudentProfileDTO updateProfile(
            String email,
            StudentProfileDTO dto) {

        StudentProfile profile = getStudentEntityByEmail(email);

        // -----------------------------------------------------
        // BASIC / PERSONAL INFORMATION
        // -----------------------------------------------------

        profile.setAge(dto.getAge());
        profile.setGender(dto.getGender());

        // -----------------------------------------------------
        // EDUCATION
        // -----------------------------------------------------

        profile.setEducationLevel(dto.getEducationLevel());
        profile.setDegree(dto.getDegree());
        profile.setBranch(dto.getBranch());
        profile.setInstitution(dto.getInstitution());
        profile.setCgpa(dto.getCgpa());
        profile.setGraduationYear(dto.getGraduationYear());

        // -----------------------------------------------------
        // CAREER / PREFERENCES
        // -----------------------------------------------------

        profile.setCareerGoal(dto.getCareerGoal());
        profile.setPreferredLocations(dto.getPreferredLocations());
        profile.setPreferredWorkMode(dto.getPreferredWorkMode());
        profile.setPreferredIndustries(dto.getPreferredIndustries());
        profile.setPreferredRoles(dto.getPreferredRoles());

        StudentProfile savedProfile =
                profileRepository.save(profile);

        // =====================================================
        // UPDATE SKILLS
        // =====================================================

        if (dto.getSkills() != null) {

            studentSkillRepository.deleteByStudent(savedProfile);

            for (SkillDTO sDto : dto.getSkills()) {

                if (sDto.getName() != null &&
                        !sDto.getName().trim().isEmpty()) {

                    Skill skill =
                            skillRepository
                                    .findByNameIgnoreCase(
                                            sDto.getName().trim())
                                    .orElseGet(() ->
                                            skillRepository.save(
                                                    new Skill(
                                                            null,
                                                            sDto.getName().trim(),
                                                            sDto.getCategory() != null
                                                                    ? sDto.getCategory()
                                                                    : "TECHNICAL"
                                                    )
                                            )
                                    );

                    StudentSkill studentSkill =
                            new StudentSkill();

                    studentSkill.setStudent(savedProfile);
                    studentSkill.setSkill(skill);

                    studentSkill.setProficiency(
                            sDto.getProficiency() != null
                                    ? sDto.getProficiency()
                                    : "INTERMEDIATE"
                    );

                    studentSkillRepository.save(studentSkill);
                }
            }
        }

        // =====================================================
        // UPDATE INTERESTS
        // =====================================================

        if (dto.getInterests() != null) {

            studentInterestRepository.deleteByStudent(savedProfile);

            for (String interestName : dto.getInterests()) {

                if (interestName != null &&
                        !interestName.trim().isEmpty()) {

                    Interest interest =
                            interestRepository
                                    .findByNameIgnoreCase(
                                            interestName.trim())
                                    .orElseGet(() ->
                                            interestRepository.save(
                                                    new Interest(
                                                            null,
                                                            interestName.trim()
                                                    )
                                            )
                                    );

                    StudentInterest studentInterest =
                            new StudentInterest();

                    studentInterest.setStudent(savedProfile);
                    studentInterest.setInterest(interest);

                    studentInterestRepository.save(studentInterest);
                }
            }
        }

        // =====================================================
        // UPDATE PROJECTS
        // =====================================================

        if (dto.getProjects() != null) {

            projectRepository.deleteByStudent(savedProfile);

            for (ProjectDTO pDto : dto.getProjects()) {

                if (pDto.getName() != null &&
                        !pDto.getName().trim().isEmpty()) {

                    Project project =
                            new Project();

                    project.setStudent(savedProfile);

                    project.setName(
                            pDto.getName().trim());

                    project.setDescription(
                            pDto.getDescription());

                    project.setTechnologies(
                            pDto.getTechnologies());

                    projectRepository.save(project);
                }
            }
        }

        // =====================================================
        // UPDATE CERTIFICATIONS
        // =====================================================

        if (dto.getCertifications() != null) {

            certificationRepository.deleteByStudent(savedProfile);

            for (CertificationDTO cDto :
                    dto.getCertifications()) {

                if (cDto.getName() != null &&
                        !cDto.getName().trim().isEmpty()) {

                    Certification certification =
                            new Certification();

                    certification.setStudent(savedProfile);

                    certification.setName(
                            cDto.getName().trim());

                    certification.setIssuer(
                            cDto.getIssuer());

                    certification.setYear(
                            cDto.getYear());

                    certificationRepository.save(
                            certification);
                }
            }
        }

        // =====================================================
        // UPDATE LANGUAGES
        // =====================================================

        if (dto.getLanguages() != null) {

            languageRepository.deleteByStudent(savedProfile);

            for (LanguageDTO lDto :
                    dto.getLanguages()) {

                if (lDto.getLanguage() != null &&
                        !lDto.getLanguage().trim().isEmpty()) {

                    Language language =
                            new Language();

                    language.setStudent(savedProfile);

                    language.setLanguage(
                            lDto.getLanguage().trim());

                    language.setProficiency(
                            lDto.getProficiency() != null
                                    ? lDto.getProficiency()
                                    : "FLUENT"
                    );

                    languageRepository.save(language);
                }
            }
        }

        return mapToDTO(savedProfile);
    }

    // =========================================================
    // MAP ENTITY -> DTO
    // =========================================================

    private StudentProfileDTO mapToDTO(
            StudentProfile profile) {

        StudentProfileDTO dto =
                new StudentProfileDTO();

        dto.setId(profile.getId());

        dto.setUserId(
                profile.getUser().getId());

        dto.setName(
                profile.getUser().getName());

        dto.setEmail(
                profile.getUser().getEmail());

        // -----------------------------------------------------
        // PERSONAL INFORMATION
        // -----------------------------------------------------

        dto.setAge(profile.getAge());
        dto.setGender(profile.getGender());

        // -----------------------------------------------------
        // EDUCATION
        // -----------------------------------------------------

        dto.setEducationLevel(
                profile.getEducationLevel());

        dto.setDegree(
                profile.getDegree());

        dto.setBranch(
                profile.getBranch());

        dto.setInstitution(
                profile.getInstitution());

        dto.setCgpa(
                profile.getCgpa());

        dto.setGraduationYear(
                profile.getGraduationYear());

        // -----------------------------------------------------
        // CAREER / PREFERENCES
        // -----------------------------------------------------

        dto.setCareerGoal(
                profile.getCareerGoal());

        dto.setPreferredLocations(
                profile.getPreferredLocations());

        dto.setPreferredWorkMode(
                profile.getPreferredWorkMode());

        dto.setPreferredIndustries(
                profile.getPreferredIndustries());

        dto.setPreferredRoles(
                profile.getPreferredRoles());

        // =====================================================
        // LOAD SKILLS
        // =====================================================

        List<StudentSkill> skills =
                studentSkillRepository
                        .findByStudent(profile);

        dto.setSkills(
                skills.stream()
                        .map(ss ->
                                new SkillDTO(
                                        ss.getSkill().getId(),
                                        ss.getSkill().getName(),
                                        ss.getSkill().getCategory(),
                                        ss.getProficiency()
                                )
                        )
                        .collect(Collectors.toList())
        );

        // =====================================================
        // LOAD INTERESTS
        // =====================================================

        List<StudentInterest> interests =
                studentInterestRepository
                        .findByStudent(profile);

        dto.setInterests(
                interests.stream()
                        .map(si ->
                                si.getInterest().getName())
                        .collect(Collectors.toList())
        );

        // =====================================================
        // LOAD PROJECTS
        // =====================================================

        List<Project> projects =
                projectRepository
                        .findByStudent(profile);

        dto.setProjects(
                projects.stream()
                        .map(p ->
                                new ProjectDTO(
                                        p.getId(),
                                        p.getName(),
                                        p.getDescription(),
                                        p.getTechnologies()
                                )
                        )
                        .collect(Collectors.toList())
        );

        // =====================================================
        // LOAD CERTIFICATIONS
        // =====================================================

        List<Certification> certifications =
                certificationRepository
                        .findByStudent(profile);

        dto.setCertifications(
                certifications.stream()
                        .map(c ->
                                new CertificationDTO(
                                        c.getId(),
                                        c.getName(),
                                        c.getIssuer(),
                                        c.getYear()
                                )
                        )
                        .collect(Collectors.toList())
        );

        // =====================================================
        // LOAD LANGUAGES
        // =====================================================

        List<Language> languages =
                languageRepository
                        .findByStudent(profile);

        dto.setLanguages(
                languages.stream()
                        .map(l ->
                                new LanguageDTO(
                                        l.getId(),
                                        l.getLanguage(),
                                        l.getProficiency()
                                )
                        )
                        .collect(Collectors.toList())
        );

        // =====================================================
        // CALCULATE PROFILE COMPLETION
        // =====================================================

        dto.setCompletionPercentage(
                calculateCompletionPercentage(dto)
        );

        return dto;
    }

    // =========================================================
    // PROFILE COMPLETION CALCULATION
    // =========================================================

    public int calculateCompletionPercentage(StudentProfileDTO dto) {

    int percentage = 0;

    // =========================================================
    // 1. ACCOUNT / BASIC INFORMATION - 15%
    //
    // Name and email come from the registered student account.
    // Age and gender are OPTIONAL.
    // =========================================================

    if (dto.getName() != null &&
            !dto.getName().trim().isEmpty() &&

            dto.getEmail() != null &&
            !dto.getEmail().trim().isEmpty()) {

        percentage += 15;
    }


    // =========================================================
    // 2. EDUCATION - 20%
    //
    // ALL education fields are mandatory.
    //
    // Education Level
    // Degree
    // Branch
    // Institution
    // CGPA
    // Graduation Year
    // =========================================================

    if (dto.getEducationLevel() != null &&
            !dto.getEducationLevel().trim().isEmpty() &&

            dto.getDegree() != null &&
            !dto.getDegree().trim().isEmpty() &&

            dto.getBranch() != null &&
            !dto.getBranch().trim().isEmpty() &&

            dto.getInstitution() != null &&
            !dto.getInstitution().trim().isEmpty() &&

            dto.getCgpa() != null &&

            dto.getGraduationYear() != null) {

        percentage += 20;
    }


    // =========================================================
    // 3. SKILLS - 25%
    //
    // At least ONE skill is mandatory.
    // =========================================================

    if (dto.getSkills() != null &&
            !dto.getSkills().isEmpty()) {

        percentage += 25;
    }


    // =========================================================
    // 4. INTERESTS - 15%
    //
    // At least ONE interest is mandatory.
    // =========================================================

    if (dto.getInterests() != null &&
            !dto.getInterests().isEmpty()) {

        percentage += 15;
    }


    // =========================================================
    // 5. PREFERENCES - 15%
    //
    // Career Goal is OPTIONAL.
    //
    // Required:
    // - Preferred Locations
    // - Preferred Work Mode
    // - Preferred Industries
    // - Preferred Roles
    // =========================================================

    boolean locationsComplete =
            dto.getPreferredLocations() != null &&
            !dto.getPreferredLocations().trim().isEmpty();

    boolean workModeComplete =
            dto.getPreferredWorkMode() != null &&
            !dto.getPreferredWorkMode().trim().isEmpty();

    boolean industriesComplete =
            dto.getPreferredIndustries() != null &&
            !dto.getPreferredIndustries().trim().isEmpty();

    boolean rolesComplete =
            dto.getPreferredRoles() != null &&
            !dto.getPreferredRoles().trim().isEmpty();


    if (locationsComplete &&
            workModeComplete &&
            industriesComplete &&
            rolesComplete) {

        percentage += 15;
    }


    // =========================================================
    // 6. PROJECTS - 10%
    //
    // At least ONE project is mandatory.
    // =========================================================

    if (dto.getProjects() != null &&
            !dto.getProjects().isEmpty()) {

        percentage += 10;
    }


    // =========================================================
    // CERTIFICATIONS
    //
    // OPTIONAL
    // Does NOT affect completion.
    // =========================================================


    // =========================================================
    // LANGUAGES
    //
    // OPTIONAL
    // Does NOT affect completion.
    // =========================================================


    // =========================================================
    // FINAL
    //
    // 15 + 20 + 25 + 15 + 15 + 10 = 100
    // =========================================================

    return Math.min(100, percentage);
}
}