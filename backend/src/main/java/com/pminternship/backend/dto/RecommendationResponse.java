package com.pminternship.backend.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class RecommendationResponse {

    private Long id;
    private Long internshipId;
    private InternshipDTO internship;

    private Integer overallScore;
    private Integer skillScore;
    private Integer educationScore;
    private Integer interestScore;
    private Integer locationScore;
    private Integer careerGoalScore;
    private Integer workModeScore;

    private List<String> matchingSkills = new ArrayList<>();
    private List<String> missingSkills = new ArrayList<>();
    private List<String> explanation = new ArrayList<>();
    private List<String> suggestions = new ArrayList<>();

    private LocalDateTime createdAt;

    public RecommendationResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getInternshipId() {
        return internshipId;
    }

    public void setInternshipId(Long internshipId) {
        this.internshipId = internshipId;
    }

    public InternshipDTO getInternship() {
        return internship;
    }

    public void setInternship(InternshipDTO internship) {
        this.internship = internship;
    }

    public Integer getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(Integer overallScore) {
        this.overallScore = overallScore;
    }

    public Integer getSkillScore() {
        return skillScore;
    }

    public void setSkillScore(Integer skillScore) {
        this.skillScore = skillScore;
    }

    public Integer getEducationScore() {
        return educationScore;
    }

    public void setEducationScore(Integer educationScore) {
        this.educationScore = educationScore;
    }

    public Integer getInterestScore() {
        return interestScore;
    }

    public void setInterestScore(Integer interestScore) {
        this.interestScore = interestScore;
    }

    public Integer getLocationScore() {
        return locationScore;
    }

    public void setLocationScore(Integer locationScore) {
        this.locationScore = locationScore;
    }

    public Integer getCareerGoalScore() {
        return careerGoalScore;
    }

    public void setCareerGoalScore(Integer careerGoalScore) {
        this.careerGoalScore = careerGoalScore;
    }

    public Integer getWorkModeScore() {
        return workModeScore;
    }

    public void setWorkModeScore(Integer workModeScore) {
        this.workModeScore = workModeScore;
    }

    public List<String> getMatchingSkills() {
        return matchingSkills;
    }

    public void setMatchingSkills(List<String> matchingSkills) {
        this.matchingSkills = matchingSkills;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public List<String> getExplanation() {
        return explanation;
    }

    public void setExplanation(List<String> explanation) {
        this.explanation = explanation;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
