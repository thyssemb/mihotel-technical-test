package com.backend.api.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class LessonRequest {
    private String subject;
    private String level;
    private BigDecimal price;
    private String location;
    private String description;
}
