package com.pminternship.backend.repository;

import com.pminternship.backend.entity.InternshipSkill;
import com.pminternship.backend.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InternshipSkillRepository extends JpaRepository<InternshipSkill, Long> {
    List<InternshipSkill> findByInternship(Internship internship);
    void deleteByInternship(Internship internship);
}
