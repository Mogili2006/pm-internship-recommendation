package com.pminternship.backend.repository;

import com.pminternship.backend.entity.Recommendation;
import com.pminternship.backend.entity.StudentProfile;
import com.pminternship.backend.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findByStudentOrderByOverallScoreDesc(StudentProfile student);
    Optional<Recommendation> findByStudentAndInternship(StudentProfile student, Internship internship);
    void deleteByStudent(StudentProfile student);
}
