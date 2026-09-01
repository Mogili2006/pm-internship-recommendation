package com.pminternship.backend.repository;

import com.pminternship.backend.entity.Internship;
import com.pminternship.backend.entity.WorkMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, Long>, JpaSpecificationExecutor<Internship> {
    List<Internship> findByStatusTrue();
    long countByStatusTrue();
    List<Internship> findByIndustryContainingIgnoreCase(String industry);
    List<Internship> findByWorkMode(WorkMode workMode);
}
