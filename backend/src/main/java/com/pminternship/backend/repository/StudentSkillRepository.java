package com.pminternship.backend.repository;

import com.pminternship.backend.entity.StudentSkill;
import com.pminternship.backend.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentSkillRepository extends JpaRepository<StudentSkill, Long> {
    List<StudentSkill> findByStudent(StudentProfile student);
    void deleteByStudent(StudentProfile student);
}
