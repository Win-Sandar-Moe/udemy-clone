package org.example.udemyclonebackend.course.dto;

import java.util.UUID;

public record CategoryDto(
        UUID id,
        String categoryName
) {
}
