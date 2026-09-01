package com.pminternship.backend.service;

import com.pminternship.backend.dto.ApplicationDTO;
import com.pminternship.backend.dto.ApplicationStatusUpdateRequest;
import com.pminternship.backend.entity.Application;
import com.pminternship.backend.entity.ApplicationStatus;
import com.pminternship.backend.entity.Internship;
import com.pminternship.backend.entity.StudentProfile;
import com.pminternship.backend.exception.ResourceNotFoundException;
import com.pminternship.backend.repository.ApplicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final StudentProfileService studentProfileService;
    private final InternshipService internshipService;
    private final ApplicationRepository applicationRepository;

    public ApplicationService(StudentProfileService studentProfileService,
                              InternshipService internshipService,
                              ApplicationRepository applicationRepository) {
        this.studentProfileService = studentProfileService;
        this.internshipService = internshipService;
        this.applicationRepository = applicationRepository;
    }

    public List<ApplicationDTO> getStudentApplications(String studentEmail) {
        StudentProfile student = studentProfileService.getStudentEntityByEmail(studentEmail);
        return applicationRepository.findByStudentOrderByAppliedAtDesc(student).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public ApplicationDTO getApplicationById(Long id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
        return mapToDTO(application);
    }

    @Transactional
    public ApplicationDTO applyForInternship(String studentEmail, Long internshipId) {
        StudentProfile student = studentProfileService.getStudentEntityByEmail(studentEmail);
        Internship internship = internshipService.getInternshipEntityById(internshipId);

        if (applicationRepository.existsByStudentAndInternship(student, internship)) {
            throw new IllegalArgumentException("You have already applied for this internship.");
        }

        Application application = new Application();
        application.setStudent(student);
        application.setInternship(internship);
        application.setStatus(ApplicationStatus.APPLIED);

        Application savedApp = applicationRepository.save(application);
        return mapToDTO(savedApp);
    }

    public List<ApplicationDTO> getAllApplicationsAdmin() {
        return applicationRepository.findAllByOrderByAppliedAtDesc().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ApplicationDTO updateApplicationStatus(Long id, ApplicationStatusUpdateRequest request) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));

        application.setStatus(request.getStatus());
        Application saved = applicationRepository.save(application);
        return mapToDTO(saved);
    }

    private ApplicationDTO mapToDTO(Application app) {
        ApplicationDTO dto = new ApplicationDTO();
        dto.setId(app.getId());
        dto.setStudentId(app.getStudent().getId());
        dto.setStudentName(app.getStudent().getUser().getName());
        dto.setStudentEmail(app.getStudent().getUser().getEmail());
        dto.setStudentDegree(app.getStudent().getDegree());
        dto.setStudentBranch(app.getStudent().getBranch());
        dto.setStudentCgpa(app.getStudent().getCgpa());

        dto.setInternshipId(app.getInternship().getId());
        dto.setInternship(internshipService.mapToDTO(app.getInternship()));

        dto.setAppliedAt(app.getAppliedAt());
        dto.setStatus(app.getStatus());
        return dto;
    }
}
