package org.example.udemyclonebackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Category extends IdClass{
    private String categoryName;

    @OneToMany(mappedBy = "category")
    private List<Course> courses=
            new ArrayList<>();

    public void addCourse(Course course) {
        course.setCategory(this);
        this.courses.add(course);
    }
}
