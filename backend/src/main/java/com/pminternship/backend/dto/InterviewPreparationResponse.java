package com.pminternship.backend.dto;

import java.util.List;

public class InterviewPreparationResponse {

    private String role;
    private List<String> technicalQuestions;
    private List<String> projectQuestions;

    public InterviewPreparationResponse() {
    }

    public InterviewPreparationResponse(
            String role,
            List<String> technicalQuestions,
            List<String> projectQuestions) {

        this.role = role;
        this.technicalQuestions = technicalQuestions;
        this.projectQuestions = projectQuestions;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<String> getTechnicalQuestions() {
        return technicalQuestions;
    }

    public void setTechnicalQuestions(List<String> technicalQuestions) {
        this.technicalQuestions = technicalQuestions;
    }

    public List<String> getProjectQuestions() {
        return projectQuestions;
    }

    public void setProjectQuestions(List<String> projectQuestions) {
        this.projectQuestions = projectQuestions;
    }
}