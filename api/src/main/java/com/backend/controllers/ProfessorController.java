package com.backend.api.controllers;

import java.util.Map;
import java.util.HashMap;
import com.backend.api.entities.ProfessorEntities;
import com.backend.api.services.ProfessorRegistrationService;
import com.backend.api.services.ProfessorLoginService;
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
    private final ProfessorLoginService professorLoginService;

    public ProfessorController(ProfessorRegistrationService professorRegistrationService,
                               ProfessorLoginService professorLoginService) {
        this.professorRegistrationService = professorRegistrationService;
        this.professorLoginService = professorLoginService;
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new professor")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful professor registration"),
            @ApiResponse(responseCode = "404", description = "Error with professor registration", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<ProfessorEntities> registerProfessor(@RequestBody ProfessorEntities professor) {
        ProfessorEntities savedProfessor = professorRegistrationService.registerProfessor(professor);
        return ResponseEntity.ok(savedProfessor);
    }

    @PostMapping("/login")
    @Operation(summary = "Login a professor and generate a Token")
    @ApiResponses(value = {
             @ApiResponse(responseCode = "200", description = "Successful professor login"),
             @ApiResponse(responseCode = "401", description = "Unauthorized - invalid credentials", content = @Content(mediaType = "application/json")),
             @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> loginProfessor(@RequestBody Map<String, String> loginRequest) {
        try {
            String token = professorLoginService.login(loginRequest.get("email"), loginRequest.get("password"));
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @GetMapping
    @Operation(summary = "Get all professors")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved list of professors"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<String> getAllProfessors() {
        return ResponseEntity.ok("List of professors");
    }
}
