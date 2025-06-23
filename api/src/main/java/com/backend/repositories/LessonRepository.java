package com.backend.api.repositories;

import java.util.List;
import com.backend.api.entities.Lesson;
import com.backend.api.entities.ProfessorEntities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Integer> {
    Optional<Lesson> findBySubjectAndProfessor(String subject, ProfessorEntities professor);
    List<Lesson> findByProfessor(ProfessorEntities professor);
}
