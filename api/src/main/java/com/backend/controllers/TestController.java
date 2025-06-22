package com.backend.api.controllers;

import org.springframework.http.ResponseEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tests")
@Tag(name = "Test API", description = "Testing API routes")
@ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved the API route"),
        @ApiResponse(responseCode = "404", description = "API route not found", content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
})
public class TestController {
 @GetMapping("/ping")
    @Operation(summary = "Ping Route", description = "Checking if the frontend can communicate with the backend")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved communication between the frontend and the backend"),
            @ApiResponse(responseCode = "404", description = "Error with retrieving communication between the frontend and the backend", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<String> ping() {
            return ResponseEntity.ok("Ping ;) ! Frontend is successfully connected to the backend.");
        }
}
