package com.pminternship.backend.controller;

import com.pminternship.backend.dto.RecommendationResponse;
import com.pminternship.backend.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping
    public ResponseEntity<List<RecommendationResponse>> getRecommendations(@AuthenticationPrincipal UserDetails userDetails) {
        List<RecommendationResponse> recommendations = recommendationService.getRecommendationsForStudent(userDetails.getUsername());
        return ResponseEntity.ok(recommendations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecommendationResponse> getRecommendationDetail(@AuthenticationPrincipal UserDetails userDetails,
                                                                           @PathVariable Long id) {
        RecommendationResponse detail = recommendationService.getRecommendationDetail(userDetails.getUsername(), id);
        return ResponseEntity.ok(detail);
    }
}
