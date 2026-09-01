package com.pminternship.backend.controller;

import com.pminternship.backend.dto.InternshipDTO;
import com.pminternship.backend.service.SavedInternshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/saved")
public class SavedInternshipController {

    private final SavedInternshipService savedInternshipService;

    public SavedInternshipController(SavedInternshipService savedInternshipService) {
        this.savedInternshipService = savedInternshipService;
    }

    @GetMapping
    public ResponseEntity<List<InternshipDTO>> getSavedInternships(@AuthenticationPrincipal UserDetails userDetails) {
        List<InternshipDTO> saved = savedInternshipService.getSavedInternships(userDetails.getUsername());
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/{internshipId}")
    public ResponseEntity<Map<String, String>> saveInternship(@AuthenticationPrincipal UserDetails userDetails,
                                                             @PathVariable Long internshipId) {
        savedInternshipService.saveInternship(userDetails.getUsername(), internshipId);
        Map<String, String> res = new HashMap<>();
        res.put("message", "Internship saved successfully");
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{internshipId}")
    public ResponseEntity<Map<String, String>> removeSavedInternship(@AuthenticationPrincipal UserDetails userDetails,
                                                                    @PathVariable Long internshipId) {
        savedInternshipService.removeSavedInternship(userDetails.getUsername(), internshipId);
        Map<String, String> res = new HashMap<>();
        res.put("message", "Internship removed from saved list");
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{internshipId}/check")
    public ResponseEntity<Map<String, Boolean>> checkIsSaved(@AuthenticationPrincipal UserDetails userDetails,
                                                            @PathVariable Long internshipId) {
        boolean saved = savedInternshipService.isInternshipSaved(userDetails.getUsername(), internshipId);
        Map<String, Boolean> res = new HashMap<>();
        res.put("saved", saved);
        return ResponseEntity.ok(res);
    }
}
