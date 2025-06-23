package com.backend.api.services;

import com.backend.api.entities.ProfessorEntities;
import com.backend.api.repositories.ProfessorRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProfessorLoginService {

    private final ProfessorRepository professorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public ProfessorLoginService(ProfessorRepository professorRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.professorRepository = professorRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String login(String email, String password) {
        ProfessorEntities prof = professorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        if (!passwordEncoder.matches(password, prof.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        List<String> roles = new ArrayList<>();
        roles.add("USER");

        // Mettez à jour l'appel à generateToken pour inclure les rôles
        return jwtService.generateToken(prof.getEmail(), prof.getName(), roles);
    }
}
