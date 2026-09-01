package com.pminternship.backend.dto;

public class InternshipSkillDTO {

    private Long id;
    private String skillName;
    private String category;
    private String requiredLevel;

    public InternshipSkillDTO() {
    }

    public InternshipSkillDTO(Long id, String skillName, String category, String requiredLevel) {
        this.id = id;
        this.skillName = skillName;
        this.category = category;
        this.requiredLevel = requiredLevel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getRequiredLevel() {
        return requiredLevel;
    }

    public void setRequiredLevel(String requiredLevel) {
        this.requiredLevel = requiredLevel;
    }
}
