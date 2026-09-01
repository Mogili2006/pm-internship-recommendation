package com.pminternship.backend.repository;

import com.pminternship.backend.entity.StudentInterest;
import com.pminternship.backend.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentInterestRepository extends JpaRepository<StudentInterest, Long> {
    List<StudentInterest> findByStudent(StudentProfile student);
    void deleteByStudent(StudentProfile student);
}
