package com.backend.api.controllers;

import com.backend.api.entities.ProfessorEntities;
import com.backend.api.services.ProfessorRegistrationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/professors")
@Tag(name = "Professor API", description = "Professor Controller with routing")
@ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully accessed the Professor API Route"),
        @ApiResponse(responseCode = "404", description = "Professor API route not found", content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
})
public class ProfessorController {

    private final ProfessorRegistrationService professorRegistrationService;

    public ProfessorController(ProfessorRegistrationService professorRegistrationService) {
        this.professorRegistrationService = professorRegistrationService;
    }

    @GetMapping
    @Operation(summary = "Get all professors")
    public ResponseEntity<String> getAllProfessors() {
        return ResponseEntity.ok("List of professors");
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new professor")
    public ResponseEntity<ProfessorEntities> registerProfessor(@RequestBody ProfessorEntities professor) {
        ProfessorEntities savedProfessor = professorRegistrationService.registerProfessor(professor);
        return ResponseEntity.ok(savedProfessor);
    }
}
