package com.pminternship.backend.service;

import com.pminternship.backend.dto.LoginRequest;
import com.pminternship.backend.dto.LoginResponse;
import com.pminternship.backend.dto.RegisterRequest;
import com.pminternship.backend.dto.UserDTO;
import com.pminternship.backend.entity.Role;
import com.pminternship.backend.entity.StudentProfile;
import com.pminternship.backend.entity.User;
import com.pminternship.backend.exception.ResourceNotFoundException;
import com.pminternship.backend.repository.StudentProfileRepository;
import com.pminternship.backend.repository.UserRepository;
import com.pminternship.backend.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       StudentProfileRepository studentProfileRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public UserDTO registerStudent(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.STUDENT);

        User savedUser = userRepository.save(user);

        // Automatically create empty StudentProfile for new Student
        StudentProfile profile = new StudentProfile();
        profile.setUser(savedUser);
        studentProfileRepository.save(profile);

        return new UserDTO(savedUser.getId(), savedUser.getName(), savedUser.getEmail(), savedUser.getRole(), savedUser.getCreatedAt());
    }

    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String jwtToken = jwtService.generateToken(user);

        return new LoginResponse(jwtToken, user.getId(), user.getName(), user.getEmail(), user.getRole());
    }
}
