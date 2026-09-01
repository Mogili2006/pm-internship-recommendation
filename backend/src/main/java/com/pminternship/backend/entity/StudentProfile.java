package com.pminternship.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "student_profiles")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private Integer age;
    private String gender;
    private String educationLevel;
    private String degree;
    private String branch;
    private String institution;
    private Double cgpa;
    private Integer graduationYear;
    
    @Column(length = 500)
    private String careerGoal;

    private String preferredLocations;
    private String preferredWorkMode;
    private String preferredIndustries;
    private String preferredRoles;

    public StudentProfile() {
    }

    public StudentProfile(Long id, User user, Integer age, String gender, String educationLevel, String degree, String branch, String institution, Double cgpa, Integer graduationYear, String careerGoal, String preferredLocations, String preferredWorkMode, String preferredIndustries, String preferredRoles) {
        this.id = id;
        this.user = user;
        this.age = age;
        this.gender = gender;
        this.educationLevel = educationLevel;
        this.degree = degree;
        this.branch = branch;
        this.institution = institution;
        this.cgpa = cgpa;
        this.graduationYear = graduationYear;
        this.careerGoal = careerGoal;
        this.preferredLocations = preferredLocations;
        this.preferredWorkMode = preferredWorkMode;
        this.preferredIndustries = preferredIndustries;
        this.preferredRoles = preferredRoles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEducationLevel() {
        return educationLevel;
    }

    public void setEducationLevel(String educationLevel) {
        this.educationLevel = educationLevel;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public Double getCgpa() {
        return cgpa;
    }

    public void setCgpa(Double cgpa) {
        this.cgpa = cgpa;
    }

    public Integer getGraduationYear() {
        return graduationYear;
    }

    public void setGraduationYear(Integer graduationYear) {
        this.graduationYear = graduationYear;
    }

    public String getCareerGoal() {
        return careerGoal;
    }

    public void setCareerGoal(String careerGoal) {
        this.careerGoal = careerGoal;
    }

    public String getPreferredLocations() {
        return preferredLocations;
    }

    public void setPreferredLocations(String preferredLocations) {
        this.preferredLocations = preferredLocations;
    }

    public String getPreferredWorkMode() {
        return preferredWorkMode;
    }

    public void setPreferredWorkMode(String preferredWorkMode) {
        this.preferredWorkMode = preferredWorkMode;
    }

    public String getPreferredIndustries() {
        return preferredIndustries;
    }

    public void setPreferredIndustries(String preferredIndustries) {
        this.preferredIndustries = preferredIndustries;
    }

    public String getPreferredRoles() {
        return preferredRoles;
    }

    public void setPreferredRoles(String preferredRoles) {
        this.preferredRoles = preferredRoles;
    }
}
