package com.backend.api.services;

import com.backend.api.entities.ProfessorEntities;
import com.backend.api.repositories.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfessorRegistrationService {

    private final ProfessorRepository professorRepository;
    private final PasswordEncoder passwordEncoder;

    public ProfessorEntities registerProfessor(ProfessorEntities professor) {
        professor.setPassword(passwordEncoder.encode(professor.getPassword()));

        return professorRepository.save(professor);
    }
}
