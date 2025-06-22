package com.backend.api.repositories;

import com.backend.api.entities.ProfessorEntities;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProfessorRepository extends JpaRepository<ProfessorEntities, Integer> {
    Optional<ProfessorEntities> findByEmail(String email);
}
