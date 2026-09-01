package com.pminternship.backend.repository;

import com.pminternship.backend.entity.Certification;
import com.pminternship.backend.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {
    List<Certification> findByStudent(StudentProfile student);
    void deleteByStudent(StudentProfile student);
}
