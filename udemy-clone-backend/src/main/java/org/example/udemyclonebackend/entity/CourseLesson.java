package org.example.udemyclonebackend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class CourseLesson {
    private String lessonName;
    @Column(columnDefinition = "TEXT")
    private String lessonDescription;
    @Column(columnDefinition = "TEXT")
    private String lessonVideoUrl;
}
