package org.example.udemyclonebackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Course extends IdClass{
    private String title;
    private BigDecimal fees;
    private String description;
    private int studentCount;
    @Lob
    private byte[] image;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name="course_lessons")
    private List<CourseLesson> lessons=
            new ArrayList<>();
    @ManyToOne
    private Teacher teacher;
    @ManyToOne
    private Category category;

    @OneToMany(mappedBy = "course")
    private List<EnrolledCourse> enrolledCourses=
            new ArrayList<>();
    public void addEnrolledCourse(EnrolledCourse enrolledCourse){
        enrolledCourse.setCourse(this);
        enrolledCourses.add(enrolledCourse);
    }

    public void addLesson(CourseLesson lesson){
        lessons.add(lesson);
    }
}









