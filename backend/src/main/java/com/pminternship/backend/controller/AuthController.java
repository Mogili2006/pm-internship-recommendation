package com.pminternship.backend.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pminternship.backend.dto.ForgotPasswordRequest;
import com.pminternship.backend.dto.LoginRequest;
import com.pminternship.backend.dto.LoginResponse;
import com.pminternship.backend.dto.RegisterRequest;
import com.pminternship.backend.dto.UserDTO;
import com.pminternship.backend.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerStudent(@Valid @RequestBody RegisterRequest request) {
        UserDTO user = authService.registerStudent(request);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/forgot-password")
public ResponseEntity<String> changePassword(
        @Valid @RequestBody ForgotPasswordRequest request
) {

    authService.changePasswordWithoutResetLink(
            request.getEmail(),
            request.getNewPassword()
    );

    return ResponseEntity.ok("Password changed successfully");
}
}
