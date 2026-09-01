package com.pminternship.backend.dto;

public class LanguageDTO {

    private Long id;
    private String language;
    private String proficiency;

    public LanguageDTO() {
    }

    public LanguageDTO(Long id, String language, String proficiency) {
        this.id = id;
        this.language = language;
        this.proficiency = proficiency;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getProficiency() {
        return proficiency;
    }

    public void setProficiency(String proficiency) {
        this.proficiency = proficiency;
    }
}
