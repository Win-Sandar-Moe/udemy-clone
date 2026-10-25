package org.example.udemyclonebackend.course.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Base64;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CourseInfoDto {
    private UUID courseId;
    private String title;
    private String description;
    private BigDecimal fees;
    private String imageBase64;
    private String teacherName;
    private String categoryName;

    public CourseInfoDto(UUID courseId,
                         String title,
                         String description,
                         BigDecimal fees,
                         byte[] imageBase64,
                         String teacherName,
                         String categoryName) {
        this.courseId = courseId;
        this.title = title;
        this.description = description;
        this.fees = fees;
        this.imageBase64 = imageBase64 != null ? Base64.getEncoder()
                .encodeToString(imageBase64):null;
        this.teacherName = teacherName;
        this.categoryName = categoryName;
    }
}
