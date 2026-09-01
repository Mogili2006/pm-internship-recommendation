package com.pminternship.backend.controller;

import com.pminternship.backend.dto.StudentProfileDTO;
import com.pminternship.backend.service.StudentProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentProfileController {

    private final StudentProfileService studentProfileService;

    public StudentProfileController(StudentProfileService studentProfileService) {
        this.studentProfileService = studentProfileService;
    }

    @GetMapping("/me")
    public ResponseEntity<StudentProfileDTO> getMyProfile(@AuthenticationPrincipal UserDetails userDetails) {
        StudentProfileDTO profile = studentProfileService.getProfileByEmail(userDetails.getUsername());
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/me")
    public ResponseEntity<StudentProfileDTO> updateMyProfile(@AuthenticationPrincipal UserDetails userDetails,
                                                              @RequestBody StudentProfileDTO profileDTO) {
        StudentProfileDTO updated = studentProfileService.updateProfile(userDetails.getUsername(), profileDTO);
        return ResponseEntity.ok(updated);
    }
}
