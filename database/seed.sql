-- Seed script for PM Internship Recommendation System
USE pminternship_db;

-- Initial Admin Account (Password: admin123 hashed via BCrypt)
INSERT INTO users (id, name, email, password, role, created_at) VALUES 
(1, 'PM Internship Admin', 'admin@pminternship.gov.in', '$2a$10$wT5gKjWpW1F2jW9fVnQZxeG2s1c3v4b5n6m7a8s9d0f1g2h3j4k5l', 'ADMIN', NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Demo Student Account (Password: student123 hashed via BCrypt)
INSERT INTO users (id, name, email, password, role, created_at) VALUES 
(2, 'Rahul Sharma', 'student@example.com', '$2a$10$eE5gKjWpW1F2jW9fVnQZxeG2s1c3v4b5n6m7a8s9d0f1g2h3j4k5l', 'STUDENT', NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Demo Student Profile
INSERT INTO student_profiles (id, user_id, age, gender, education_level, degree, branch, institution, cgpa, graduation_year, career_goal, preferred_locations, preferred_work_mode, preferred_industries, preferred_roles) VALUES 
(1, 2, 21, 'Male', 'Undergraduate', 'B.Tech', 'Computer Science & Engineering', 'National Institute of Technology', 8.5, 2025, 'Full Stack Software Engineer', 'Bengaluru, Hyderabad, Remote', 'HYBRID', 'Software Development, Data Science', 'Software Engineer, Backend Developer, Full Stack Developer')
ON DUPLICATE KEY UPDATE degree=VALUES(degree);
