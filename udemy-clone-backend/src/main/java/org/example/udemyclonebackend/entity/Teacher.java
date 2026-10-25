package org.example.udemyclonebackend.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("TEACHER")
public class Teacher extends User{
    private BigDecimal netWorth;
    private String education;
    @OneToMany(mappedBy = "teacher")
    private List<Course> courses=
            new ArrayList<>();

    public void addCourse(Course course){
        course.setTeacher(this);
        this.courses.add(course);
    }


    public Teacher(
            String username,
            String password,
            String email,
            BigDecimal netWorth,
            String education) {
        super(username, password, email);
        this.netWorth = netWorth;
        this.education = education;
    }

    @ElementCollection
    private List<String> skills=
            new ArrayList<>();

    public void addSkill(String skill){
        this.skills.add(skill);
    }
}
