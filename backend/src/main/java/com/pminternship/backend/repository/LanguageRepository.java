package com.pminternship.backend.repository;

import com.pminternship.backend.entity.Language;
import com.pminternship.backend.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {
    List<Language> findByStudent(StudentProfile student);
    void deleteByStudent(StudentProfile student);
}
