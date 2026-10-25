package org.example.udemyclonebackend.student;

import lombok.RequiredArgsConstructor;
import org.example.udemyclonebackend.course.dto.CourseInfoDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;
    // http://localhost:8080/api/students/enroll
    @PostMapping("/enroll")
    public ResponseEntity<String>
    enrollCourse(@RequestBody List<String> coursesIds, Principal principal){
        studentService.enrollCourse(coursesIds, principal.getName());
        return ResponseEntity.ok("Course enrolled successfully");
    }
    // http://localhost:8080/api/students/enrolled-courses
    @GetMapping("/enrolled-courses")
    public List<CourseInfoDto> findAllEnrolledCoursesByStudentName(Principal principal){
        return studentService
                .findAllEnrolledCoursesByStudentName(principal.getName());
    }
}
