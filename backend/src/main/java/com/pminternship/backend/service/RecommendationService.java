package com.pminternship.backend.service;

import com.pminternship.backend.dto.RecommendationResponse;
import com.pminternship.backend.entity.Internship;
import com.pminternship.backend.entity.Recommendation;
import com.pminternship.backend.entity.StudentProfile;
import com.pminternship.backend.exception.ResourceNotFoundException;
import com.pminternship.backend.repository.InternshipRepository;
import com.pminternship.backend.repository.RecommendationRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final StudentProfileService studentProfileService;
    private final InternshipRepository internshipRepository;
    private final RecommendationEngine recommendationEngine;
    private final RecommendationRepository recommendationRepository;

    public RecommendationService(StudentProfileService studentProfileService,
                                 InternshipRepository internshipRepository,
                                 RecommendationEngine recommendationEngine,
                                 RecommendationRepository recommendationRepository) {
        this.studentProfileService = studentProfileService;
        this.internshipRepository = internshipRepository;
        this.recommendationEngine = recommendationEngine;
        this.recommendationRepository = recommendationRepository;
    }

    public List<RecommendationResponse> getRecommendationsForStudent(String studentEmail) {
        StudentProfile student = studentProfileService.getStudentEntityByEmail(studentEmail);
        List<Internship> activeInternships = internshipRepository.findByStatusTrue();

        return recommendationEngine.generateRecommendations(student, activeInternships);
    }

    public RecommendationResponse getRecommendationDetail(String studentEmail, Long internshipId) {
        StudentProfile student = studentProfileService.getStudentEntityByEmail(studentEmail);
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found with id: " + internshipId));

        return recommendationEngine.calculateMatch(student, internship);
    }
}
