package com.pminternship.backend.dto;

public class CertificationDTO {

    private Long id;
    private String name;
    private String issuer;
    private Integer year;

    public CertificationDTO() {
    }

    public CertificationDTO(Long id, String name, String issuer, Integer year) {
        this.id = id;
        this.name = name;
        this.issuer = issuer;
        this.year = year;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}
