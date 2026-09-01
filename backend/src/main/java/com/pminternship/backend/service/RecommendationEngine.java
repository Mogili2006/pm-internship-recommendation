package com.pminternship.backend.service;

import com.pminternship.backend.dto.RecommendationResponse;
import com.pminternship.backend.entity.Internship;
import com.pminternship.backend.entity.StudentProfile;

import java.util.List;

public interface RecommendationEngine {
    List<RecommendationResponse> generateRecommendations(StudentProfile student, List<Internship> internships);
    RecommendationResponse calculateMatch(StudentProfile student, Internship internship);
}
