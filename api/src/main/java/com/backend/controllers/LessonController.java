package com.backend.api.controllers;

import com.backend.api.entities.Lesson;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("/api/lessons")
@Tag(name = "Lesson API", description = "Display Lesson with routing")
@ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully accessed the Lesson API Route"),
        @ApiResponse(responseCode = "404", description = "Lesson API route not found", content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
})
public class LessonController {

    @GetMapping
    @Operation(summary = "Get all lessons")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved list of lessons"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<List<Lesson>> getAllLessons() {
        List<Lesson> lessons = Collections.emptyList();
        return ResponseEntity.ok(lessons);
    }
}
