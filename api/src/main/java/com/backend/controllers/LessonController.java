package com.backend.api.controllers;

import com.backend.api.dto.LessonRequest;
import com.backend.api.entities.Lesson;
import com.backend.api.entities.ProfessorEntities;
import com.backend.api.repositories.LessonRepository;
import com.backend.api.repositories.ProfessorRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@Tag(name = "Lesson API", description = "Endpoints for retrieving, creating, update and deletet lessons")
@ApiResponses(value = {
        @ApiResponse(responseCode = "404", description = "Lesson API route not found", content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
})
public class LessonController {

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping
    @Operation(summary = "Retrieve all lessons")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved list of lessons")
    })
   public ResponseEntity<List<Lesson>> getLessonsByProfessor(Principal principal) {
       String email = principal.getName();
       ProfessorEntities professor = professorRepository.findByEmail(email)
               .orElseThrow(() -> new RuntimeException("Professor not found : " + email));

       List<Lesson> lessons = lessonRepository.findByProfessor(professor);
       return ResponseEntity.ok(lessons);
   }

    @PostMapping
    @Operation(summary = "Create a new lesson (requires authenticated professor)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully created lesson"),
            @ApiResponse(responseCode = "400", description = "Invalid request", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Invalid credentials", content = @Content)
    })
    public ResponseEntity<Lesson> createLesson(@RequestBody LessonRequest request, Principal principal) {
        String email = principal.getName();
        ProfessorEntities professor = professorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Professor not found : " + email));

        Lesson lesson = new Lesson();
        lesson.setProfessor(professor);
        lesson.setSubject(request.getSubject());
        lesson.setLevel(request.getLevel());
        lesson.setPrice(request.getPrice());
        lesson.setLocation(request.getLocation());
        lesson.setDescription(request.getDescription());

        return ResponseEntity.ok(lessonRepository.save(lesson));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a lesson by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved lesson"),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Lesson not found", content = @Content)
    })
    public ResponseEntity<?> getLessonById(@PathVariable Integer id, Principal principal) {
        String email = principal.getName();
        ProfessorEntities professor = professorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Professor not found: " + email));

        Lesson lesson = lessonRepository.findById(id).orElse(null);

        if (lesson == null || !lesson.getProfessor().equals(professor)) {
            return ResponseEntity.status(404).body("Lesson not found or access denied");
        }

        return ResponseEntity.ok(lesson);
    }


    @DeleteMapping
    @Operation(summary = "Delete a lesson (requires authenticated professor and a valid lesson to delete)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully deleted lesson"),
        @ApiResponse(responseCode = "400", description = "Invalid request", content = @Content),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
        @ApiResponse(responseCode = "403", description = "Invalid credentials", content = @Content),
        @ApiResponse(responseCode = "404", description = "Lesson not found", content = @Content)
    })
    public ResponseEntity<?> deleteLesson(@RequestBody LessonRequest request, Principal principal) {
        if (request.getSubject() == null || request.getSubject().isBlank()) {
            return ResponseEntity.badRequest().body("Subject is required to delete a lesson");
        }

        String email = principal.getName();
        ProfessorEntities professor = professorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Professor not found : " + email));

        Lesson lesson = lessonRepository.findBySubjectAndProfessor(request.getSubject(), professor)
                .orElse(null);

        if (lesson == null) {
            return ResponseEntity.status(404).body("Lesson not found or does not belong to the authenticated professor");
        }

        lessonRepository.delete(lesson);
        return ResponseEntity.ok("Lesson deleted successfully");
    }

}
