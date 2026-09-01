package com.pminternship.backend.controller;

import com.pminternship.backend.dto.ApplicationDTO;
import com.pminternship.backend.dto.ApplicationStatusUpdateRequest;
import com.pminternship.backend.dto.InternshipDTO;
import com.pminternship.backend.dto.UserDTO;
import com.pminternship.backend.entity.ApplicationStatus;
import com.pminternship.backend.entity.Role;
import com.pminternship.backend.repository.ApplicationRepository;
import com.pminternship.backend.repository.InternshipRepository;
import com.pminternship.backend.repository.RecommendationRepository;
import com.pminternship.backend.repository.UserRepository;
import com.pminternship.backend.service.ApplicationService;
import com.pminternship.backend.service.InternshipService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final InternshipService internshipService;
    private final ApplicationService applicationService;
    private final UserRepository userRepository;
    private final InternshipRepository internshipRepository;
    private final ApplicationRepository applicationRepository;
    private final RecommendationRepository recommendationRepository;

    public AdminController(InternshipService internshipService,
                           ApplicationService applicationService,
                           UserRepository userRepository,
                           InternshipRepository internshipRepository,
                           ApplicationRepository applicationRepository,
                           RecommendationRepository recommendationRepository) {
        this.internshipService = internshipService;
        this.applicationService = applicationService;
        this.userRepository = userRepository;
        this.internshipRepository = internshipRepository;
        this.applicationRepository = applicationRepository;
        this.recommendationRepository = recommendationRepository;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getAdminStats() {
        Map<String, Object> stats = new HashMap<>();
        long totalStudents = userRepository.findByRole(Role.STUDENT).size();
        long totalInternships = internshipRepository.count();
        long activeInternships = internshipRepository.countByStatusTrue();
        long totalApplications = applicationRepository.count();
        long totalRecommendations = recommendationRepository.count();

        stats.put("totalStudents", totalStudents);
        stats.put("totalInternships", totalInternships);
        stats.put("activeInternships", activeInternships);
        stats.put("totalApplications", totalApplications);
        stats.put("totalRecommendations", totalRecommendations);

        // Additional chart data metrics
        Map<String, Long> appStatusCounts = new HashMap<>();
        for (ApplicationStatus status : ApplicationStatus.values()) {
            appStatusCounts.put(status.name(), applicationRepository.countByStatus(status));
        }
        stats.put("applicationStatusCounts", appStatusCounts);

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/internships")
    public ResponseEntity<List<InternshipDTO>> getAllInternships() {
        List<InternshipDTO> list = internshipService.getAllInternshipsAdmin();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/internships")
    public ResponseEntity<InternshipDTO> createInternship(@Valid @RequestBody InternshipDTO dto) {
        InternshipDTO created = internshipService.createInternship(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/internships/{id}")
    public ResponseEntity<InternshipDTO> updateInternship(@PathVariable Long id, @Valid @RequestBody InternshipDTO dto) {
        InternshipDTO updated = internshipService.updateInternship(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/internships/{id}")
    public ResponseEntity<Map<String, String>> deleteInternship(@PathVariable Long id) {
        internshipService.deleteInternship(id);
        Map<String, String> res = new HashMap<>();
        res.put("message", "Internship deleted successfully");
        return ResponseEntity.ok(res);
    }

    @PatchMapping("/internships/{id}/status")
    public ResponseEntity<InternshipDTO> toggleStatus(@PathVariable Long id) {
        InternshipDTO updated = internshipService.toggleStatus(id);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllStudents() {
        List<UserDTO> students = userRepository.findByRole(Role.STUDENT).stream()
                .map(u -> new UserDTO(u.getId(), u.getName(), u.getEmail(), u.getRole(), u.getCreatedAt()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(students);
    }

    @GetMapping("/applications")
    public ResponseEntity<List<ApplicationDTO>> getAllApplications() {
        List<ApplicationDTO> apps = applicationService.getAllApplicationsAdmin();
        return ResponseEntity.ok(apps);
    }

    @PutMapping("/applications/{id}/status")
    public ResponseEntity<ApplicationDTO> updateApplicationStatus(@PathVariable Long id,
                                                                  @Valid @RequestBody ApplicationStatusUpdateRequest request) {
        ApplicationDTO updated = applicationService.updateApplicationStatus(id, request);
        return ResponseEntity.ok(updated);
    }
}
