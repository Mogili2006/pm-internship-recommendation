package com.pminternship.backend.config;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.pminternship.backend.entity.Certification;
import com.pminternship.backend.entity.Interest;
import com.pminternship.backend.entity.Internship;
import com.pminternship.backend.entity.InternshipSkill;
import com.pminternship.backend.entity.Language;
import com.pminternship.backend.entity.Project;
import com.pminternship.backend.entity.Role;
import com.pminternship.backend.entity.Skill;
import com.pminternship.backend.entity.StudentInterest;
import com.pminternship.backend.entity.StudentProfile;
import com.pminternship.backend.entity.StudentSkill;
import com.pminternship.backend.entity.User;
import com.pminternship.backend.entity.WorkMode;
import com.pminternship.backend.repository.CertificationRepository;
import com.pminternship.backend.repository.InterestRepository;
import com.pminternship.backend.repository.InternshipRepository;
import com.pminternship.backend.repository.InternshipSkillRepository;
import com.pminternship.backend.repository.LanguageRepository;
import com.pminternship.backend.repository.ProjectRepository;
import com.pminternship.backend.repository.SkillRepository;
import com.pminternship.backend.repository.StudentInterestRepository;
import com.pminternship.backend.repository.StudentProfileRepository;
import com.pminternship.backend.repository.StudentSkillRepository;
import com.pminternship.backend.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StudentProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final InterestRepository interestRepository;
    private final StudentInterestRepository studentInterestRepository;
    private final InternshipRepository internshipRepository;
    private final InternshipSkillRepository internshipSkillRepository;
    private final ProjectRepository projectRepository;
    private final CertificationRepository certificationRepository;
    private final LanguageRepository languageRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           StudentProfileRepository profileRepository,
                           SkillRepository skillRepository,
                           StudentSkillRepository studentSkillRepository,
                           InterestRepository interestRepository,
                           StudentInterestRepository studentInterestRepository,
                           InternshipRepository internshipRepository,
                           InternshipSkillRepository internshipSkillRepository,
                           ProjectRepository projectRepository,
                           CertificationRepository certificationRepository,
                           LanguageRepository languageRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.skillRepository = skillRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.interestRepository = interestRepository;
        this.studentInterestRepository = studentInterestRepository;
        this.internshipRepository = internshipRepository;
        this.internshipSkillRepository = internshipSkillRepository;
        this.projectRepository = projectRepository;
        this.certificationRepository = certificationRepository;
        this.languageRepository = languageRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        seedAdminUser();
        seedSkillsAndInterests();
        seedDemoInternships();
        seedDemoStudentUser();
    }

    private void seedAdminUser() {
        if (!userRepository.existsByEmail("admin@pminternship.gov.in")) {
            User admin = new User();
            admin.setName("PM Internship Portal Administrator");
            admin.setEmail("admin@pminternship.gov.in");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
        }
    }

    private void seedSkillsAndInterests() {
        List<String> skills = Arrays.asList(
                "Java", "Python", "JavaScript", "React", "Spring Boot", "SQL", "Git",
                "HTML/CSS", "Machine Learning", "Data Analysis", "Node.js", "C++",
                "Docker", "Kubernetes", "AWS", "Communication", "Problem Solving",
                "Project Management", "Digital Marketing", "Financial Analysis"
        );

        for (String skillName : skills) {
            if (skillRepository.findByNameIgnoreCase(skillName).isEmpty()) {
                skillRepository.save(new Skill(null, skillName, "TECHNICAL"));
            }
        }

        List<String> interests = Arrays.asList(
                "Software Development", "Data Science", "Finance", "Marketing",
                "Healthcare", "Manufacturing", "Agriculture", "Electronics", "Operations"
        );

        for (String interestName : interests) {
            if (interestRepository.findByNameIgnoreCase(interestName).isEmpty()) {
                interestRepository.save(new Interest(null, interestName));
            }
        }
    }

    private void seedDemoInternships() {
        if (internshipRepository.count() > 0) {
            return;
        }

        // Demo Internship 1: Software Engineer Intern
        createInternshipWithSkills(
                "Software Engineer Intern",
                "Tata Consultancy Services (TCS)",
                "Develop enterprise web applications using Java Spring Boot and React framework.",
                "Software Development",
                "Bengaluru, Karnataka", "Karnataka", "Bengaluru",
                "6 Months", WorkMode.HYBRID, 25000.0,
                "B.Tech / B.E. / MCA in CS / IT / ECE with minimum 60%",
                LocalDate.now().plusDays(45),
                "https://pminternship.mca.gov.in/tcs-software-engineer",
                Arrays.asList("Java", "Spring Boot", "SQL", "Git", "React")
        );

        // Demo Internship 2: Full Stack Developer Intern
        createInternshipWithSkills(
                "Full Stack Developer Intern",
                "Infosys Ltd.",
                "Build modern responsive web interfaces and microservices REST APIs.",
                "Software Development",
                "Hyderabad, Telangana", "Telangana", "Hyderabad",
                "6 Months", WorkMode.ON_SITE, 22000.0,
                "B.Tech / B.E. / M.Tech in CS / IT",
                LocalDate.now().plusDays(30),
                "https://pminternship.mca.gov.in/infosys-fullstack",
                Arrays.asList("JavaScript", "React", "Node.js", "SQL", "HTML/CSS")
        );

        // Demo Internship 3: Data Analytics Intern
        createInternshipWithSkills(
                "Data Analytics & Insights Intern",
                "Wipro Technologies",
                "Perform exploratory data analysis, data cleaning, and dashboard creation.",
                "Data Analytics",
                "Pune, Maharashtra", "Maharashtra", "Pune",
                "3 Months", WorkMode.REMOTE, 20000.0,
                "B.Sc / B.Tech / BCA / M.Sc in Mathematics, Statistics, CS or Data Science",
                LocalDate.now().plusDays(20),
                "https://pminternship.mca.gov.in/wipro-data-analytics",
                Arrays.asList("Python", "SQL", "Data Analysis", "Machine Learning")
        );

        // Demo Internship 4: Financial Analyst Trainee
        createInternshipWithSkills(
                "Financial Analyst Trainee",
                "HDFC Bank Ltd.",
                "Assist in financial modeling, credit risk assessments, and portfolio tracking.",
                "Finance",
                "Mumbai, Maharashtra", "Maharashtra", "Mumbai",
                "6 Months", WorkMode.ON_SITE, 18000.0,
                "B.Com / BBA / MBA in Finance or Economics",
                LocalDate.now().plusDays(25),
                "https://pminternship.mca.gov.in/hdfc-financial-analyst",
                Arrays.asList("Financial Analysis", "SQL", "Communication", "Problem Solving")
        );

        // Demo Internship 5: Digital Marketing Specialist Intern
        createInternshipWithSkills(
                "Digital Marketing Specialist Intern",
                "Reliance Retail",
                "Design social media campaigns, SEO content optimization, and performance tracking.",
                "Marketing",
                "New Delhi, Delhi", "Delhi", "New Delhi",
                "3 Months", WorkMode.HYBRID, 15000.0,
                "Bachelor in Mass Communication, Business, Marketing or any degree",
                LocalDate.now().plusDays(15),
                "https://pminternship.mca.gov.in/reliance-marketing",
                Arrays.asList("Digital Marketing", "Communication", "HTML/CSS")
        );

        // Demo Internship 6: AI & Machine Learning Research Intern
        createInternshipWithSkills(
                "AI & Machine Learning Research Intern",
                "DRDO - Centre for Artificial Intelligence",
                "Research and prototype computer vision and NLP deep learning models for government applications.",
                "Software Development",
                "Bengaluru, Karnataka", "Karnataka", "Bengaluru",
                "6 Months", WorkMode.ON_SITE, 30000.0,
                "B.Tech / M.Tech in CS / AI / Data Science with CGPA >= 7.5",
                LocalDate.now().plusDays(40),
                "https://pminternship.mca.gov.in/drdo-ai-research",
                Arrays.asList("Python", "Machine Learning", "Data Analysis", "C++")
        );

        // Demo Internship 7: Embedded Systems & Electronics Intern
        createInternshipWithSkills(
                "Embedded Systems & IoT Trainee",
                "Bharat Electronics Limited (BEL)",
                "Work on microcontroller firmware development, hardware testing, and IoT sensor networks.",
                "Electronics",
                "Chennai, Tamil Nadu", "Tamil Nadu", "Chennai",
                "6 Months", WorkMode.ON_SITE, 20000.0,
                "B.Tech / B.E. in ECE / EEE / Instrumentation",
                LocalDate.now().plusDays(35),
                "https://pminternship.mca.gov.in/bel-embedded-iot",
                Arrays.asList("C++", "Python", "Problem Solving")
        );

        // Demo Internship 8: Smart Agriculture Technology Intern
        createInternshipWithSkills(
                "Agri-Tech Solutions Intern",
                "National Bank for Agriculture and Rural Development (NABARD)",
                "Develop digital solutions for farm yield monitoring, soil sensors data analysis, and rural tech implementation.",
                "Agriculture",
                "Lucknow, Uttar Pradesh", "Uttar Pradesh", "Lucknow",
                "3 Months", WorkMode.HYBRID, 16000.0,
                "B.Sc Agriculture / B.Tech Agri / CS / IT",
                LocalDate.now().plusDays(18),
                "https://pminternship.mca.gov.in/nabard-agritech",
                Arrays.asList("Python", "Data Analysis", "Project Management")
        );

        // Demo Internship 9: Supply Chain & Operations Management Trainee
        createInternshipWithSkills(
                "Operations & Supply Chain Intern",
                "Mahindra & Mahindra",
                "Optimize warehouse inventory, logistics scheduling, and lean manufacturing process mapping.",
                "Operations",
                "Chakan, Pune, Maharashtra", "Maharashtra", "Pune",
                "6 Months", WorkMode.ON_SITE, 19000.0,
                "B.Tech Mechanical / Production / Industrial Engineering or MBA Operations",
                LocalDate.now().plusDays(28),
                "https://pminternship.mca.gov.in/mahindra-operations",
                Arrays.asList("Project Management", "Problem Solving", "Communication")
        );

        // Demo Internship 10: HealthTech Software & Data Intern
        createInternshipWithSkills(
                "HealthTech Data Engineer Intern",
                "Apollo Hospitals Digital",
                "Integrate telemetry healthcare data pipelines and hospital management dashboard metrics.",
                "Healthcare",
                "Hyderabad, Telangana", "Telangana", "Hyderabad",
                "6 Months", WorkMode.REMOTE, 24000.0,
                "B.Tech / M.Tech in CS / IT / Biomedical Engineering",
                LocalDate.now().plusDays(32),
                "https://pminternship.mca.gov.in/apollo-healthtech",
                Arrays.asList("Python", "SQL", "Node.js", "Data Analysis")
        );

        // Demo Internship 11: Java Backend Developer Intern
        createInternshipWithSkills(
                "Java Backend Developer Intern",
                "HCL Technologies",
                "Build scalable REST microservices, database queries, and unit test suites.",
                "Software Development",
                "Noida, Uttar Pradesh", "Uttar Pradesh", "Noida",
                "6 Months", WorkMode.HYBRID, 21000.0,
                "B.Tech / MCA in Computer Science",
                LocalDate.now().plusDays(50),
                "https://pminternship.mca.gov.in/hcl-java-backend",
                Arrays.asList("Java", "Spring Boot", "SQL", "Git")
        );

        // Demo Internship 12: Cloud Systems & DevOps Intern
        createInternshipWithSkills(
                "Cloud Systems & DevOps Trainee",
                "L&T Infotech (LTIMindtree)",
                "Automate CI/CD deployment pipelines, Docker containerization, and AWS infrastructure provision.",
                "Software Development",
                "Bengaluru, Karnataka", "Karnataka", "Bengaluru",
                "6 Months", WorkMode.REMOTE, 26000.0,
                "B.Tech / B.E. in CS / ECE",
                LocalDate.now().plusDays(22),
                "https://pminternship.mca.gov.in/lti-devops",
                Arrays.asList("Docker", "Kubernetes", "AWS", "Git", "Python")
        );

        // Demo Internship 13: UI/UX & Frontend Developer Intern
        createInternshipWithSkills(
                "UI/UX Design & Frontend Intern",
                "Flipkart Internet Pvt Ltd",
                "Craft user-centric frontend experiences, design systems, and responsive React web components.",
                "Software Development",
                "Bengaluru, Karnataka", "Karnataka", "Bengaluru",
                "3 Months", WorkMode.HYBRID, 25000.0,
                "B.Des / B.Tech / BCA / Any Graduate with frontend portfolio",
                LocalDate.now().plusDays(12),
                "https://pminternship.mca.gov.in/flipkart-ui-frontend",
                Arrays.asList("JavaScript", "React", "HTML/CSS", "Communication")
        );

        // Demo Internship 14: Quality Assurance & Automation Tester
        createInternshipWithSkills(
                "QA Automation Engineering Intern",
                "Tech Mahindra",
                "Write automated API and UI test suites using Java, Selenium, and Postman.",
                "Software Development",
                "Kolkata, West Bengal", "West Bengal", "Kolkata",
                "6 Months", WorkMode.ON_SITE, 17500.0,
                "B.Tech / BCA / B.Sc Computer Science",
                LocalDate.now().plusDays(38),
                "https://pminternship.mca.gov.in/techm-qa-automation",
                Arrays.asList("Java", "SQL", "Git", "Problem Solving")
        );

        // Demo Internship 15: Corporate Finance & Accounting Trainee
        createInternshipWithSkills(
                "Corporate Banking & Accounting Intern",
                "State Bank of India (SBI)",
                "Support government subsidy disbursement auditing, financial reports analysis, and compliance audit.",
                "Finance",
                "Mumbai, Maharashtra", "Maharashtra", "Mumbai",
                "6 Months", WorkMode.ON_SITE, 20000.0,
                "B.Com / M.Com / MBA in Finance with minimum 55% marks",
                LocalDate.now().plusDays(40),
                "https://pminternship.mca.gov.in/sbi-finance-intern",
                Arrays.asList("Financial Analysis", "Communication", "Problem Solving")
        );

        // Demo Internship 16: Solar & Renewable Energy Operations Intern
        createInternshipWithSkills(
                "Renewable Energy & Solar Grid Intern",
                "NTPC Green Energy Ltd.",
                "Field analytics on solar photovoltaic plant output performance and grid monitoring.",
                "Manufacturing",
                "Ahmedabad, Gujarat", "Gujarat", "Ahmedabad",
                "6 Months", WorkMode.ON_SITE, 18500.0,
                "B.Tech in Electrical / Energy / Mechanical Engineering",
                LocalDate.now().plusDays(33),
                "https://pminternship.mca.gov.in/ntpc-renewable-energy",
                Arrays.asList("Data Analysis", "Problem Solving", "Project Management")
        );

        // Demo Internship 17: Python & Data Pipelines Engineer Trainee
        createInternshipWithSkills(
                "Python Backend Data Engineer Intern",
                "Swiggy",
                "Design ETL pipelines, data caching systems, and geo-spatial routing support scripts.",
                "Software Development",
                "Bengaluru, Karnataka", "Karnataka", "Bengaluru",
                "6 Months", WorkMode.HYBRID, 28000.0,
                "B.Tech / B.E. in CS / IT",
                LocalDate.now().plusDays(14),
                "https://pminternship.mca.gov.in/swiggy-python-data",
                Arrays.asList("Python", "SQL", "Docker", "Git")
        );

        // Demo Internship 18: Semiconductor & VLSI Chip Design Intern
        createInternshipWithSkills(
                "VLSI Design & Hardware Validation Trainee",
                "Texas Instruments India",
                "Simulate digital logic circuits, Verilog HDL coding, and microcontroller validation.",
                "Electronics",
                "Bengaluru, Karnataka", "Karnataka", "Bengaluru",
                "6 Months", WorkMode.ON_SITE, 32000.0,
                "B.Tech / M.Tech in ECE / Microelectronics",
                LocalDate.now().plusDays(27),
                "https://pminternship.mca.gov.in/ti-vlsi-design",
                Arrays.asList("C++", "Problem Solving", "Python")
        );

        // Demo Internship 19: E-Commerce Product Operations Intern
        createInternshipWithSkills(
                "Product Operations & Growth Intern",
                "Amazon India",
                "Analyze vendor onboarding data, user conversion metrics, and operational bottlenecks.",
                "Operations",
                "Gurugram, Haryana", "Haryana", "Gurugram",
                "3 Months", WorkMode.HYBRID, 24000.0,
                "Any Graduate / Post-Graduate in Business, Engineering or Economics",
                LocalDate.now().plusDays(19),
                "https://pminternship.mca.gov.in/amazon-product-ops",
                Arrays.asList("Data Analysis", "Project Management", "Communication")
        );

        // Demo Internship 20: Bio-Medical Research & Clinical Data Intern
        createInternshipWithSkills(
                "Clinical Trial Data Management Intern",
                "Dr. Reddy's Laboratories",
                "Manage pharmaceutical trial records, regulatory compliance documentation, and statistical reporting.",
                "Healthcare",
                "Hyderabad, Telangana", "Telangana", "Hyderabad",
                "6 Months", WorkMode.ON_SITE, 19500.0,
                "B.Pharm / M.Pharm / B.Sc Life Sciences / Bio-Technology",
                LocalDate.now().plusDays(36),
                "https://pminternship.mca.gov.in/drreddy-clinical-data",
                Arrays.asList("Data Analysis", "Communication", "Problem Solving")
        );
    }

    private void createInternshipWithSkills(String title, String company, String description,
                                           String industry, String location, String state, String city,
                                           String duration, WorkMode workMode, Double stipend,
                                           String eligibility, LocalDate deadline, String appUrl,
                                           List<String> requiredSkillNames) {

        Internship internship = new Internship();
        internship.setTitle(title);
        internship.setCompany(company);
        internship.setDescription(description);
        internship.setIndustry(industry);
        internship.setLocation(location);
        internship.setState(state);
        internship.setCity(city);
        internship.setDuration(duration);
        internship.setWorkMode(workMode);
        internship.setStipend(stipend);
        internship.setEligibility(eligibility);
        internship.setDeadline(deadline);
        internship.setApplicationUrl(appUrl);
        internship.setStatus(true);

        Internship saved = internshipRepository.save(internship);

        for (String skillName : requiredSkillNames) {
            Skill skill = skillRepository.findByNameIgnoreCase(skillName)
                    .orElseGet(() -> skillRepository.save(new Skill(null, skillName, "TECHNICAL")));

            InternshipSkill is = new InternshipSkill();
            is.setInternship(saved);
            is.setSkill(skill);
            is.setRequiredLevel("INTERMEDIATE");
            internshipSkillRepository.save(is);
        }
    }


private void seedDemoStudentUser() {

    // Find existing demo user or create it
    User studentUser = userRepository.findByEmail("student@example.com")
            .orElseGet(() -> {
                User newUser = new User();
                newUser.setName("Rahul Sharma");
                newUser.setEmail("student@example.com");
                newUser.setRole(Role.STUDENT);
                return newUser;
            });

    // Always reset the demo credentials
    studentUser.setName("Rahul Sharma");
    studentUser.setEmail("student@example.com");
    studentUser.setPassword(passwordEncoder.encode("student123"));
    studentUser.setRole(Role.STUDENT);

    User savedUser = userRepository.save(studentUser);

    // Find existing profile or create one
    StudentProfile savedProfile = profileRepository.findByUser(savedUser)
            .orElseGet(() -> {
                StudentProfile profile = new StudentProfile();
                profile.setUser(savedUser);
                return profile;
            });

    // Demo student profile
    savedProfile.setAge(21);
    savedProfile.setGender("Male");
    savedProfile.setEducationLevel("Undergraduate");
    savedProfile.setDegree("B.Tech");
    savedProfile.setBranch("Computer Science & Engineering");
    savedProfile.setInstitution("Indian Institute of Technology / NIT");
    savedProfile.setCgpa(8.5);
    savedProfile.setGraduationYear(2025);
    savedProfile.setCareerGoal("Full Stack Software Engineer");
    savedProfile.setPreferredLocations("Bengaluru, Hyderabad, Remote");
    savedProfile.setPreferredWorkMode("HYBRID");
    savedProfile.setPreferredIndustries("Software Development, Data Science");
    savedProfile.setPreferredRoles(
            "Software Engineer, Backend Developer, Full Stack Developer"
    );

    savedProfile = profileRepository.save(savedProfile);

    // Add Skills
    List<String> studentSkills =
            Arrays.asList("Java", "SQL", "Git", "React", "JavaScript");

    for (String sName : studentSkills) {

        Skill skill = skillRepository.findByNameIgnoreCase(sName)
                .orElseGet(() ->
                        skillRepository.save(
                                new Skill(null, sName, "TECHNICAL")
                        )
                );

        boolean alreadyExists =
                studentSkillRepository.findByStudent(savedProfile)
                        .stream()
                        .anyMatch(ss ->
                                ss.getSkill() != null &&
                                ss.getSkill().getName() != null &&
                                ss.getSkill().getName().equalsIgnoreCase(sName)
                        );

        if (!alreadyExists) {
            studentSkillRepository.save(
                    new StudentSkill(
                            null,
                            savedProfile,
                            skill,
                            "INTERMEDIATE"
                    )
            );
        }
    }

    // Add Interests
    List<String> studentInterests =
            Arrays.asList("Software Development", "Data Science");

    for (String iName : studentInterests) {

        Interest interest = interestRepository.findByNameIgnoreCase(iName)
                .orElseGet(() ->
                        interestRepository.save(
                                new Interest(null, iName)
                        )
                );

        boolean alreadyExists =
                studentInterestRepository.findByStudent(savedProfile)
                        .stream()
                        .anyMatch(si ->
                                si.getInterest() != null &&
                                si.getInterest().getName() != null &&
                                si.getInterest().getName().equalsIgnoreCase(iName)
                        );

        if (!alreadyExists) {
            studentInterestRepository.save(
                    new StudentInterest(
                            null,
                            savedProfile,
                            interest
                    )
            );
        }
    }

    // Add Project only if it doesn't already exist
    Project proj = new Project();
    proj.setStudent(savedProfile);
    proj.setName("E-Commerce Web Portal");
    proj.setDescription(
            "Full-stack shopping application built with React, Spring Boot REST APIs, and MySQL."
    );
    proj.setTechnologies("React, Spring Boot, MySQL, Git");
    projectRepository.save(proj);

    // Add Certification
    Certification cert = new Certification();
    cert.setStudent(savedProfile);
    cert.setName("Oracle Certified Associate Java Programmer");
    cert.setIssuer("Oracle");
    cert.setYear(2024);
    certificationRepository.save(cert);

    // Add Language
    Language lang = new Language();
    lang.setStudent(savedProfile);
    lang.setLanguage("English");
    lang.setProficiency("FLUENT");
    languageRepository.save(lang);
}

}