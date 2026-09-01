package com.pminternship.backend.service;

import com.pminternship.backend.dto.InternshipDTO;
import com.pminternship.backend.entity.Internship;
import com.pminternship.backend.entity.SavedInternship;
import com.pminternship.backend.entity.StudentProfile;
import com.pminternship.backend.repository.InternshipRepository;
import com.pminternship.backend.repository.SavedInternshipRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SavedInternshipService {

    private final StudentProfileService studentProfileService;
    private final InternshipRepository internshipRepository;
    private final SavedInternshipRepository savedInternshipRepository;
    private final InternshipService internshipService;

    public SavedInternshipService(StudentProfileService studentProfileService,
                                  InternshipRepository internshipRepository,
                                  SavedInternshipRepository savedInternshipRepository,
                                  InternshipService internshipService) {
        this.studentProfileService = studentProfileService;
        this.internshipRepository = internshipRepository;
        this.savedInternshipRepository = savedInternshipRepository;
        this.internshipService = internshipService;
    }

    public List<InternshipDTO> getSavedInternships(String studentEmail) {
        StudentProfile student = studentProfileService.getStudentEntityByEmail(studentEmail);
        List<SavedInternship> savedList = savedInternshipRepository.findByStudentOrderBySavedAtDesc(student);

        return savedList.stream()
                .map(saved -> internshipService.mapToDTO(saved.getInternship()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void saveInternship(String studentEmail, Long internshipId) {
        StudentProfile student = studentProfileService.getStudentEntityByEmail(studentEmail);
        Internship internship = internshipService.getInternshipEntityById(internshipId);

        if (!savedInternshipRepository.existsByStudentAndInternship(student, internship)) {
            SavedInternship saved = new SavedInternship();
            saved.setStudent(student);
            saved.setInternship(internship);
            savedInternshipRepository.save(saved);
        }
    }

    @Transactional
    public void removeSavedInternship(String studentEmail, Long internshipId) {
        StudentProfile student = studentProfileService.getStudentEntityByEmail(studentEmail);
        Internship internship = internshipService.getInternshipEntityById(internshipId);

        savedInternshipRepository.deleteByStudentAndInternship(student, internship);
    }

    public boolean isInternshipSaved(String studentEmail, Long internshipId) {
        StudentProfile student = studentProfileService.getStudentEntityByEmail(studentEmail);
        Internship internship = internshipService.getInternshipEntityById(internshipId);
        return savedInternshipRepository.existsByStudentAndInternship(student, internship);
    }
}
