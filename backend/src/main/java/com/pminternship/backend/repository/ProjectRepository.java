package com.pminternship.backend.repository;

import com.pminternship.backend.entity.Project;
import com.pminternship.backend.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByStudent(StudentProfile student);
    void deleteByStudent(StudentProfile student);
}
