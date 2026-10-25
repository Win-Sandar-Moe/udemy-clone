package org.example.udemyclonebackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("STUDENT")
@Setter
@Getter
@NoArgsConstructor
public class Student extends User{
    private String address;
    @Enumerated(EnumType.STRING)
    private Education education;

    @OneToMany(mappedBy = "student")
    private List<EnrolledCourse> enrolledCourses=
            new ArrayList<>();
    public void addEnrolledCourse(EnrolledCourse enrolledCourse){
        enrolledCourse.setStudent(this);
        enrolledCourses.add(enrolledCourse);
    }

    public Student(
            String username,
            String password,
            String email,
            String address,
            Education education) {
        super(username, password, email);
        this.address = address;
        this.education = education;
    }
}
