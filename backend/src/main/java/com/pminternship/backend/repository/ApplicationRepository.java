package com.pminternship.backend.repository;

import com.pminternship.backend.entity.Application;
import com.pminternship.backend.entity.StudentProfile;
import com.pminternship.backend.entity.Internship;
import com.pminternship.backend.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudentOrderByAppliedAtDesc(StudentProfile student);
    List<Application> findAllByOrderByAppliedAtDesc();
    Optional<Application> findByStudentAndInternship(StudentProfile student, Internship internship);
    boolean existsByStudentAndInternship(StudentProfile student, Internship internship);
    long countByStudent(StudentProfile student);
    long countByStatus(ApplicationStatus status);
}
