package com.pminternship.backend.repository;

import com.pminternship.backend.entity.SavedInternship;
import com.pminternship.backend.entity.StudentProfile;
import com.pminternship.backend.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedInternshipRepository extends JpaRepository<SavedInternship, Long> {
    List<SavedInternship> findByStudentOrderBySavedAtDesc(StudentProfile student);
    Optional<SavedInternship> findByStudentAndInternship(StudentProfile student, Internship internship);
    boolean existsByStudentAndInternship(StudentProfile student, Internship internship);
    void deleteByStudentAndInternship(StudentProfile student, Internship internship);
    long countByStudent(StudentProfile student);
}
