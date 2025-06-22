package com.backend.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/professors")
@Tag(name = "Professor API", description = "Professor Controller with routing")
@ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully access to the Professor API Route"),
        @ApiResponse(responseCode = "404", description = "Professor API route not found", content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
})
public class ProfessorController {

    @GetMapping
    @Operation(summary = "Get all professors")
    public ResponseEntity<String> getAllProfessors() {
        // Juste un exemple simple
        return ResponseEntity.ok("List of professors");
    }
}
