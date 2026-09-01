package com.pminternship.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pminternship.backend.dto.InterviewQuestionDTO;
import com.pminternship.backend.service.InterviewPreparationService;

@RestController
@RequestMapping("/api/interview")
@CrossOrigin
public class InterviewPreparationController {

    private final InterviewPreparationService interviewPreparationService;

    public InterviewPreparationController(
            InterviewPreparationService interviewPreparationService) {

        this.interviewPreparationService =
                interviewPreparationService;
    }

    @GetMapping("/questions")
    public ResponseEntity<List<InterviewQuestionDTO>> getQuestions(
            @RequestParam String role) {

        List<InterviewQuestionDTO> questions =
                interviewPreparationService.generateQuestions(role);

        return ResponseEntity.ok(questions);
    }
}