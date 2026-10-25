package org.example.udemyclonebackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class EnrolledCourse extends IdClass{
    @ManyToOne
    private Student student;
    @ManyToOne
    private Course course;
    private LocalDate enrolledDate=LocalDate.now();
    private boolean isCompleted;
    private double rating;
}
