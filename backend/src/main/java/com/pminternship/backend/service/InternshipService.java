package com.pminternship.backend.service;

import com.pminternship.backend.dto.InternshipDTO;
import com.pminternship.backend.dto.InternshipFilterRequest;
import com.pminternship.backend.dto.InternshipSkillDTO;
import com.pminternship.backend.entity.Internship;
import com.pminternship.backend.entity.InternshipSkill;
import com.pminternship.backend.entity.Skill;
import com.pminternship.backend.entity.WorkMode;
import com.pminternship.backend.exception.ResourceNotFoundException;
import com.pminternship.backend.repository.InternshipRepository;
import com.pminternship.backend.repository.InternshipSkillRepository;
import com.pminternship.backend.repository.SkillRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InternshipService {

    private final InternshipRepository internshipRepository;
    private final InternshipSkillRepository internshipSkillRepository;
    private final SkillRepository skillRepository;

    public InternshipService(InternshipRepository internshipRepository,
                             InternshipSkillRepository internshipSkillRepository,
                             SkillRepository skillRepository) {
        this.internshipRepository = internshipRepository;
        this.internshipSkillRepository = internshipSkillRepository;
        this.skillRepository = skillRepository;
    }

    public List<InternshipDTO> getAllActiveInternships() {
        return internshipRepository.findByStatusTrue().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<InternshipDTO> getAllInternshipsAdmin() {
        return internshipRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public InternshipDTO getInternshipById(Long id) {
        Internship internship = internshipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found with id: " + id));
        return mapToDTO(internship);
    }

    public Internship getInternshipEntityById(Long id) {
        return internshipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found with id: " + id));
    }

    @Transactional
    public InternshipDTO createInternship(InternshipDTO dto) {
        Internship internship = new Internship();
        copyProperties(dto, internship);
        Internship savedInternship = internshipRepository.save(internship);

        saveSkills(savedInternship, dto);

        return mapToDTO(savedInternship);
    }

    @Transactional
    public InternshipDTO updateInternship(Long id, InternshipDTO dto) {
        Internship internship = getInternshipEntityById(id);
        copyProperties(dto, internship);
        Internship savedInternship = internshipRepository.save(internship);

        internshipSkillRepository.deleteByInternship(savedInternship);
        saveSkills(savedInternship, dto);

        return mapToDTO(savedInternship);
    }

    @Transactional
    public void deleteInternship(Long id) {
        Internship internship = getInternshipEntityById(id);
        internshipRepository.delete(internship);
    }

    @Transactional
    public InternshipDTO toggleStatus(Long id) {
        Internship internship = getInternshipEntityById(id);
        internship.setStatus(internship.getStatus() == null || !internship.getStatus());
        return mapToDTO(internshipRepository.save(internship));
    }

    public List<InternshipDTO> filterInternships(InternshipFilterRequest filter) {
        Specification<Internship> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Active status filter
            predicates.add(cb.equal(root.get("status"), true));

            if (filter.getKeyword() != null && !filter.getKeyword().trim().isEmpty()) {
                String kw = "%" + filter.getKeyword().trim().toLowerCase() + "%";
                Predicate titleKw = cb.like(cb.lower(root.get("title")), kw);
                Predicate companyKw = cb.like(cb.lower(root.get("company")), kw);
                Predicate descKw = cb.like(cb.lower(root.get("description")), kw);
                predicates.add(cb.or(titleKw, companyKw, descKw));
            }

            if (filter.getIndustry() != null && !filter.getIndustry().trim().isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("industry")), "%" + filter.getIndustry().trim().toLowerCase() + "%"));
            }

            if (filter.getLocation() != null && !filter.getLocation().trim().isEmpty()) {
                String loc = "%" + filter.getLocation().trim().toLowerCase() + "%";
                Predicate pLoc = cb.like(cb.lower(root.get("location")), loc);
                Predicate pCity = cb.like(cb.lower(root.get("city")), loc);
                Predicate pState = cb.like(cb.lower(root.get("state")), loc);
                predicates.add(cb.or(pLoc, pCity, pState));
            }

            if (filter.getState() != null && !filter.getState().trim().isEmpty()) {
                predicates.add(cb.equal(cb.lower(root.get("state")), filter.getState().trim().toLowerCase()));
            }

            if (filter.getCity() != null && !filter.getCity().trim().isEmpty()) {
                predicates.add(cb.equal(cb.lower(root.get("city")), filter.getCity().trim().toLowerCase()));
            }

            if (filter.getWorkMode() != null) {
                predicates.add(cb.equal(root.get("workMode"), filter.getWorkMode()));
            }

            if (filter.getMinStipend() != null && filter.getMinStipend() > 0) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("stipend"), filter.getMinStipend()));
            }

            if (filter.getEducation() != null && !filter.getEducation().trim().isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("eligibility")), "%" + filter.getEducation().trim().toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        List<Internship> results = internshipRepository.findAll(spec);

        // Filter by skill if skill is specified
        if (filter.getSkill() != null && !filter.getSkill().trim().isEmpty()) {
            String targetSkill = filter.getSkill().trim().toLowerCase();
            results = results.stream().filter(internship ->
                internship.getRequiredSkills() != null &&
                internship.getRequiredSkills().stream()
                        .anyMatch(s -> s.getSkill().getName().toLowerCase().contains(targetSkill))
            ).collect(Collectors.toList());
        }

        // Sorting
        if ("stipend".equalsIgnoreCase(filter.getSortBy())) {
            results.sort(Comparator.comparing(Internship::getStipend, Comparator.nullsLast(Comparator.reverseOrder())));
        } else if ("deadline".equalsIgnoreCase(filter.getSortBy())) {
            results.sort(Comparator.comparing(Internship::getDeadline, Comparator.nullsLast(Comparator.naturalOrder())));
        } else {
            // Default latest
            results.sort(Comparator.comparing(Internship::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())));
        }

        return results.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private void saveSkills(Internship savedInternship, InternshipDTO dto) {
        if (dto.getSkills() != null && !dto.getSkills().isEmpty()) {
            for (InternshipSkillDTO sDto : dto.getSkills()) {
                if (sDto.getSkillName() != null && !sDto.getSkillName().trim().isEmpty()) {
                    Skill skill = skillRepository.findByNameIgnoreCase(sDto.getSkillName().trim())
                            .orElseGet(() -> skillRepository.save(new Skill(null, sDto.getSkillName().trim(), sDto.getCategory() != null ? sDto.getCategory() : "TECHNICAL")));

                    InternshipSkill is = new InternshipSkill();
                    is.setInternship(savedInternship);
                    is.setSkill(skill);
                    is.setRequiredLevel(sDto.getRequiredLevel() != null ? sDto.getRequiredLevel() : "INTERMEDIATE");
                    internshipSkillRepository.save(is);
                }
            }
        }
    }

    private void copyProperties(InternshipDTO src, Internship dest) {
        dest.setTitle(src.getTitle());
        dest.setCompany(src.getCompany());
        dest.setDescription(src.getDescription());
        dest.setIndustry(src.getIndustry());
        dest.setLocation(src.getLocation());
        dest.setState(src.getState());
        dest.setCity(src.getCity());
        dest.setDuration(src.getDuration());
        dest.setWorkMode(src.getWorkMode() != null ? src.getWorkMode() : WorkMode.ON_SITE);
        dest.setStipend(src.getStipend());
        dest.setEligibility(src.getEligibility());
        dest.setDeadline(src.getDeadline());
        dest.setApplicationUrl(src.getApplicationUrl());
        dest.setStatus(src.getStatus() != null ? src.getStatus() : true);
    }

    public InternshipDTO mapToDTO(Internship internship) {
        InternshipDTO dto = new InternshipDTO();
        dto.setId(internship.getId());
        dto.setTitle(internship.getTitle());
        dto.setCompany(internship.getCompany());
        dto.setDescription(internship.getDescription());
        dto.setIndustry(internship.getIndustry());
        dto.setLocation(internship.getLocation());
        dto.setState(internship.getState());
        dto.setCity(internship.getCity());
        dto.setDuration(internship.getDuration());
        dto.setWorkMode(internship.getWorkMode());
        dto.setStipend(internship.getStipend());
        dto.setEligibility(internship.getEligibility());
        dto.setDeadline(internship.getDeadline());
        dto.setApplicationUrl(internship.getApplicationUrl());
        dto.setStatus(internship.getStatus());
        dto.setCreatedAt(internship.getCreatedAt());

        if (internship.getRequiredSkills() != null) {
            List<InternshipSkillDTO> skillDTOs = internship.getRequiredSkills().stream()
                    .map(is -> new InternshipSkillDTO(is.getId(), is.getSkill().getName(), is.getSkill().getCategory(), is.getRequiredLevel()))
                    .collect(Collectors.toList());
            dto.setSkills(skillDTOs);
            dto.setSkillNames(skillDTOs.stream().map(InternshipSkillDTO::getSkillName).collect(Collectors.toList()));
        }
        return dto;
    }
}
