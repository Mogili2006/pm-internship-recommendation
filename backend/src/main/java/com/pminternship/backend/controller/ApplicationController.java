package com.pminternship.backend.controller;

import com.pminternship.backend.dto.ApplicationDTO;
import com.pminternship.backend.service.ApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<ApplicationDTO>> getStudentApplications(@AuthenticationPrincipal UserDetails userDetails) {
        List<ApplicationDTO> apps = applicationService.getStudentApplications(userDetails.getUsername());
        return ResponseEntity.ok(apps);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationDTO> getApplicationById(@PathVariable Long id) {
        ApplicationDTO dto = applicationService.getApplicationById(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/{internshipId}")
    public ResponseEntity<ApplicationDTO> applyForInternship(@AuthenticationPrincipal UserDetails userDetails,
                                                              @PathVariable Long internshipId) {
        ApplicationDTO created = applicationService.applyForInternship(userDetails.getUsername(), internshipId);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
}
