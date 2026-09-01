package com.pminternship.backend.controller;

import com.pminternship.backend.dto.InternshipDTO;
import com.pminternship.backend.dto.InternshipFilterRequest;
import com.pminternship.backend.service.InternshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
public class InternshipController {

    private final InternshipService internshipService;

    public InternshipController(InternshipService internshipService) {
        this.internshipService = internshipService;
    }

    @GetMapping
    public ResponseEntity<List<InternshipDTO>> getAllActiveInternships() {
        List<InternshipDTO> list = internshipService.getAllActiveInternships();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InternshipDTO> getInternshipById(@PathVariable Long id) {
        InternshipDTO dto = internshipService.getInternshipById(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/search")
    public ResponseEntity<List<InternshipDTO>> filterInternships(@RequestBody InternshipFilterRequest filter) {
        List<InternshipDTO> results = internshipService.filterInternships(filter);
        return ResponseEntity.ok(results);
    }
}
