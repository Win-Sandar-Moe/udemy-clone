package org.example.udemyclonebackend.course;

import lombok.RequiredArgsConstructor;
import org.example.udemyclonebackend.course.dto.CategoryDto;
import org.example.udemyclonebackend.course.dto.CourseInfoDto;
import org.example.udemyclonebackend.entity.CourseLesson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;
    public record CourseLessonsDto(
            UUID courseId,
            String lessonName,
            String lessonDescription,
            String lessonVideoUrl
    ){

    }
    // http://localhost:8080/api/courses/lessons
    @PostMapping("/lessons")
    public ResponseEntity<String>
    addCourseLessons(@RequestBody CourseLessonsDto courseLesson){
        String returnString= courseService.addCourseLessons(
                courseLesson.lessonName,
                courseLesson.lessonDescription,
                courseLesson.lessonVideoUrl,
                courseLesson.courseId
        );
        return ResponseEntity.ok(returnString);
    }

    @GetMapping
    public List<CourseInfoDto> listAllCourse(Principal principal){
        return courseService.listAllCourse(principal.getName());
    }
    // http://localhost:8080/api/courses/lessons/{courseId}
    @GetMapping("/lessons/{courseId}")
    public List<CourseLesson>
    listAllCourseLessonsByCourseId(@PathVariable("courseId") String courseId){
        return courseService.listAllCourseLessonsByCourseId(courseId);
    }

    //http://localhost:8080/api/courses/all
    @GetMapping("/all")
    public List<CourseInfoDto> findAllCourseInfoDto(){
        return courseService.findAllCourseInfoDto();
    }

    @GetMapping("/categories")
    public List<CategoryDto> listAllCategory(){
        return courseService.listAllCategory();
    }
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createCourse(
            @RequestParam(value = "title",required = false) String title,
            @RequestParam(value = "description",required = false) String description,
            @RequestParam(value = "fees",required = false) double fees,
            @RequestParam(value = "image",required = false) MultipartFile image,
            @RequestParam(value = "categoryName",required = false) String categoryName,
            Principal principal
    )throws Exception {
        System.out.println("Username=================="+ principal.getName());
        String returnString=courseService.createCourse(
                title,
                description,
                BigDecimal.valueOf(fees),
                image,
                categoryName,
                principal.getName()
        );
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(returnString);
    }
}
