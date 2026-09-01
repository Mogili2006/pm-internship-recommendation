package com.pminternship.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.pminternship.backend.dto.InterviewQuestionDTO;

@Service
public class InterviewPreparationService {

    public List<InterviewQuestionDTO> generateQuestions(String role) {

        List<InterviewQuestionDTO> questions = new ArrayList<>();

        if (role == null || role.trim().isEmpty()) {
            return questions;
        }

        String selectedRole = role.toLowerCase().trim();

        // =====================================================
        // JAVA DEVELOPER
        // =====================================================

        if (selectedRole.contains("java")) {

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What is JVM and how does it work?",
                    "Easy",
                    "Explain the role of JVM and how it executes Java bytecode.",
                    "JVM stands for Java Virtual Machine. It executes Java bytecode and provides platform independence by allowing the same Java bytecode to run on different operating systems."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "Explain the four main concepts of Object-Oriented Programming.",
                    "Easy",
                    "Remember the four concepts: Encapsulation, Inheritance, Polymorphism and Abstraction.",
                    "The four main OOP concepts are Encapsulation, Inheritance, Polymorphism and Abstraction. Encapsulation combines data and methods, inheritance allows reuse of existing classes, polymorphism allows one interface to have multiple implementations, and abstraction hides unnecessary implementation details."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What is the difference between ArrayList and LinkedList?",
                    "Medium",
                    "Compare how the two data structures store elements and handle insertion and access.",
                    "ArrayList uses a dynamic array internally and provides fast random access. LinkedList uses linked nodes and is generally better for frequent insertions or removals in the middle, while random access is slower."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What is Spring Boot and why is it used?",
                    "Easy",
                    "Mention simplified configuration, embedded servers and rapid application development.",
                    "Spring Boot is a framework built on top of Spring that simplifies the development of Java applications. It provides auto-configuration, starter dependencies and embedded servers, making it easier to build and run applications."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What is the difference between JDK, JRE and JVM?",
                    "Easy",
                    "Explain the relationship between these three Java components.",
                    "JVM executes Java bytecode. JRE contains the JVM and libraries required to run Java applications. JDK contains the JRE plus development tools such as the Java compiler."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Project",
                    "Explain your internship recommendation project.",
                    "Medium",
                    "Explain the problem, technologies used, major modules and recommendation logic.",
                    "My project is an internship recommendation system that helps students find suitable internships. The backend is developed using Spring Boot and the frontend uses React. The system considers factors such as skills, education, interests, location, career goals and work mode to calculate a recommendation score."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Project",
                    "Why did you choose Java and Spring Boot for your backend?",
                    "Easy",
                    "Mention Java's ecosystem and Spring Boot's support for REST APIs and database integration.",
                    "I chose Java and Spring Boot because Java is reliable and widely used for backend development. Spring Boot simplifies REST API development, database integration, dependency management and application configuration."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Project",
                    "How did you design your database?",
                    "Medium",
                    "Explain the main entities and how students, skills, internships and applications are related.",
                    "The database is organized around entities such as users, student profiles, skills, interests, internships, applications and recommendations. Relationships are used to connect students with their skills and interests and internships with their required skills."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Project",
                    "How does your internship recommendation algorithm work?",
                    "Medium",
                    "Explain the weighted factors used to calculate the final recommendation score.",
                    "The recommendation system uses a rule-based weighted scoring approach. Skill match contributes 40%, education 20%, interest 15%, location 10%, career goal 10% and work mode 5%. The final score is calculated from these weighted values and internships are ranked according to the overall score."
            ));

            questions.add(new InterviewQuestionDTO(
                    "HR",
                    "Tell me about yourself.",
                    "Easy",
                    "Give a short introduction covering your education, technical skills, projects and career interest.",
                    "I am a student interested in software development. I have worked with technologies such as Java, Spring Boot, React and MySQL, and I have developed projects including an internship recommendation system. I am looking for an internship where I can improve my technical skills and gain practical industry experience."
            ));

            questions.add(new InterviewQuestionDTO(
                    "HR",
                    "Why are you interested in this Java Developer internship?",
                    "Easy",
                    "Connect your Java skills and project experience with the internship.",
                    "I am interested in this internship because it gives me an opportunity to apply my Java and Spring Boot knowledge to real-world problems. I also want to improve my backend development skills and learn from experienced developers."
            ));
        }

        // =====================================================
        // REACT / FRONTEND DEVELOPER
        // =====================================================

        else if (
                selectedRole.contains("react") ||
                selectedRole.contains("frontend") ||
                selectedRole.contains("front end")
        ) {

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What is React and why is it used?",
                    "Easy",
                    "Explain React as a JavaScript library for building user interfaces.",
                    "React is a JavaScript library used for building user interfaces, especially component-based web applications. It allows developers to create reusable UI components and efficiently update the interface when data changes."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What are React components?",
                    "Easy",
                    "Explain reusable building blocks of a React application.",
                    "React components are reusable pieces of UI. A component can contain its own structure, logic and data and can be combined with other components to build a complete application."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What is the difference between state and props?",
                    "Medium",
                    "Remember that props are passed into components while state is managed by the component.",
                    "Props are inputs passed from a parent component to a child component and should generally be treated as read-only. State is data managed by a component and can change over time, causing the component to re-render."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What is useState in React?",
                    "Easy",
                    "Explain how useState allows functional components to manage state.",
                    "useState is a React Hook that allows functional components to create and manage state. It returns the current state value and a function that can be used to update that state."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What is useEffect and when would you use it?",
                    "Medium",
                    "Mention side effects such as API calls, subscriptions or responding to changes.",
                    "useEffect is a React Hook used to perform side effects in functional components. It can be used for tasks such as fetching data from an API, setting up subscriptions or performing actions when dependencies change."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Project",
                    "Explain the frontend of your internship recommendation project.",
                    "Medium",
                    "Explain the major React pages and how students interact with the application.",
                    "The frontend is developed using React. It provides pages for student registration, profile management, internships, recommendations, applications and interview preparation. React components and API calls are used to communicate with the Spring Boot backend."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Project",
                    "Why did you choose React for your project?",
                    "Easy",
                    "Mention reusable components, dynamic interfaces and API integration.",
                    "I chose React because it makes it easier to build dynamic and reusable user interfaces. It also works well with REST APIs, which allowed me to communicate with my Spring Boot backend."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Project",
                    "How does your frontend communicate with the Spring Boot backend?",
                    "Medium",
                    "Explain REST APIs and HTTP requests.",
                    "The React frontend communicates with the Spring Boot backend using REST APIs. Axios is used to send HTTP requests such as GET, POST, PUT and DELETE. Authentication information is also sent using the Authorization header when required."
            ));

            questions.add(new InterviewQuestionDTO(
                    "HR",
                    "Tell me about yourself.",
                    "Easy",
                    "Briefly explain your education, frontend skills and projects.",
                    "I am a student interested in frontend and full-stack development. I have worked with React, Java, Spring Boot and MySQL and have developed an internship recommendation project. I am looking forward to gaining practical experience and improving my development skills."
            ));

            questions.add(new InterviewQuestionDTO(
                    "HR",
                    "Why do you want to work as a Frontend Developer?",
                    "Easy",
                    "Connect your interest in UI development with your React experience.",
                    "I enjoy building interactive and user-friendly interfaces. Working with React has helped me understand component-based development, state management and API integration, and I want to develop these skills further through practical experience."
            ));
        }

        // =====================================================
        // DATA SCIENCE / DATA ANALYST
        // =====================================================

        else if (
                selectedRole.contains("data science") ||
                selectedRole.contains("data analyst") ||
                selectedRole.contains("data scientist")
        ) {

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What is the difference between supervised and unsupervised learning?",
                    "Easy",
                    "Focus on whether the training data contains labeled output values.",
                    "Supervised learning uses labeled data to learn a mapping between inputs and outputs. Unsupervised learning works with unlabeled data and attempts to find patterns or structures within the data."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What is regression?",
                    "Easy",
                    "Explain regression as predicting continuous numerical values.",
                    "Regression is a machine learning technique used to predict continuous numerical values. Examples include predicting salary, house prices or temperature."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What is classification?",
                    "Easy",
                    "Explain classification as predicting categories or labels.",
                    "Classification is a machine learning technique used to assign data to predefined categories. Examples include spam versus non-spam emails or predicting whether a customer will leave a service."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What is overfitting and how can you prevent it?",
                    "Medium",
                    "Explain the difference between memorizing training data and generalizing to new data.",
                    "Overfitting occurs when a model learns the training data too closely and performs poorly on unseen data. It can be reduced using techniques such as cross-validation, regularization, reducing model complexity and using more training data."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What is the purpose of data preprocessing?",
                    "Easy",
                    "Mention cleaning, transforming and preparing raw data before analysis or modeling.",
                    "Data preprocessing prepares raw data for analysis or machine learning. It can include handling missing values, removing duplicates, encoding categorical values, scaling numerical values and cleaning incorrect data."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Project",
                    "Explain your data-related project.",
                    "Medium",
                    "Explain the problem, dataset, preprocessing, techniques and results.",
                    "I would explain the objective of the project, the dataset used, the preprocessing steps, the analysis or machine learning techniques applied and the final results. I would also explain the challenges I faced and how I solved them."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Project",
                    "What technologies and algorithms did you use?",
                    "Medium",
                    "Mention the tools, libraries and algorithms used in your project.",
                    "The answer depends on the project. I would mention the programming language, libraries, database or visualization tools used and explain why those technologies or algorithms were suitable for the problem."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Project",
                    "How did you evaluate your model or analysis?",
                    "Medium",
                    "Mention evaluation metrics appropriate to the problem.",
                    "For a machine learning project, I would choose evaluation metrics based on the problem. For example, classification can use accuracy, precision, recall and F1-score, while regression can use metrics such as MAE, MSE or RMSE."
            ));

            questions.add(new InterviewQuestionDTO(
                    "HR",
                    "Tell me about yourself.",
                    "Easy",
                    "Give a short introduction covering education, data skills and projects.",
                    "I am a student interested in data analysis and data science. I enjoy working with data to identify patterns and solve problems. I am looking for an internship where I can apply my analytical and technical skills to real-world datasets."
            ));

            questions.add(new InterviewQuestionDTO(
                    "HR",
                    "Why are you interested in a data-related internship?",
                    "Easy",
                    "Explain your interest in analyzing data and solving problems.",
                    "I am interested in data-related work because I enjoy analyzing information and finding useful patterns. An internship would give me practical experience working with real datasets and help me improve my analytical and technical skills."
            ));
        }

        // =====================================================
        // DEFAULT QUESTIONS
        // =====================================================

        else {

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What technologies are you comfortable working with?",
                    "Easy",
                    "Mention your strongest programming languages, frameworks and tools.",
                    "I am comfortable working with technologies that I have used in my academic projects. I would mention my strongest programming languages, frameworks, databases and development tools and briefly explain my experience with each."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "Explain an important technical concept related to your field.",
                    "Medium",
                    "Choose a concept you understand well and explain it using a simple example.",
                    "I would choose an important concept related to my field, define it clearly, explain how it works and provide a practical example to demonstrate my understanding."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Technical",
                    "What programming languages or tools have you used?",
                    "Easy",
                    "Mention the technologies you have actually used in projects.",
                    "I would list the programming languages, frameworks, databases and development tools I have used and briefly describe the projects or tasks where I applied them."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Project",
                    "Explain your most important project.",
                    "Medium",
                    "Use the structure: problem → technology → implementation → result.",
                    "I would explain the problem the project solves, the technologies I selected, how I implemented the main features, the challenges I faced and the final result."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Project",
                    "What challenges did you face while developing your project?",
                    "Medium",
                    "Give a real technical challenge and explain how you solved it.",
                    "I would describe a specific technical challenge, explain why it occurred, describe the steps I took to solve it and explain what I learned from the experience."
            ));

            questions.add(new InterviewQuestionDTO(
                    "Project",
                    "How did you choose the technologies for your project?",
                    "Medium",
                    "Explain your choices based on project requirements, simplicity and scalability.",
                    "I selected technologies based on the project requirements, ease of development, available libraries, compatibility and the technologies I wanted to learn. I also considered maintainability and scalability."
            ));

            questions.add(new InterviewQuestionDTO(
                    "HR",
                    "Tell me about yourself.",
                    "Easy",
                    "Keep your answer professional and focus on education, skills, projects and goals.",
                    "I would briefly introduce my education, technical skills, projects and career interests. I would focus on experiences that are relevant to the internship and explain why I am interested in gaining practical experience."
            ));

            questions.add(new InterviewQuestionDTO(
                    "HR",
                    "Why are you interested in this internship?",
                    "Easy",
                    "Connect the internship with your career goals and current skills.",
                    "I am interested in this internship because it provides an opportunity to apply my current skills to real-world projects, learn from experienced professionals and develop the technical and professional skills needed for my career."
            ));

            questions.add(new InterviewQuestionDTO(
                    "HR",
                    "What are your strengths and weaknesses?",
                    "Easy",
                    "Give genuine strengths and mention a weakness that you are actively improving.",
                    "One of my strengths is that I am willing to learn and solve problems persistently. One area I am working on is improving my communication and practical experience, so I actively practice explaining my projects and learning from feedback."
            ));
        }

        return questions;
    }
}