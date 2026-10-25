package org.example.udemyclonebackend.course;

import lombok.RequiredArgsConstructor;
import org.example.udemyclonebackend.course.dto.CategoryDto;
import org.example.udemyclonebackend.course.dto.CourseInfoDto;
import org.example.udemyclonebackend.dao.CategoryDao;
import org.example.udemyclonebackend.dao.CourseDao;
import org.example.udemyclonebackend.dao.TeacherDao;
import org.example.udemyclonebackend.entity.Category;
import org.example.udemyclonebackend.entity.Course;
import org.example.udemyclonebackend.entity.CourseLesson;
import org.example.udemyclonebackend.entity.Teacher;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseDao courseDao;
    private final CategoryDao categoryDao;
    private final TeacherDao teacherDao;

    @Transactional(readOnly = true)
    public List<CourseInfoDto> findAllCourseInfoDto(){
        return courseDao.findAllCourseInfoDto();
    }

    @Transactional
    public String addCourseLessons(String lessonName,String lessonDescription,
                                   String lessonVideoUrl,UUID courseId){

        Course course=courseDao.findById(courseId)
                .orElseThrow(() ->
                        new RuntimeException("Course not found with id: " + courseId));
        var courseLesson=new CourseLesson();
        courseLesson.setLessonName(lessonName);
        courseLesson.setLessonDescription(lessonDescription);
        courseLesson.setLessonVideoUrl(lessonVideoUrl);
        course.addLesson(courseLesson);
        courseDao.save(course);
        return "Lesson added successfully";
    }

    @Transactional(readOnly = true)
    public List<CourseInfoDto> listAllCourse(String username){
        return courseDao.findAllCourseByTeacherName(username);
    }

    @Transactional(readOnly = true)
    public List<CategoryDto> listAllCategory(){
        return categoryDao.findAll().stream()
                .map(this::toCategoryDto)
                .toList();
    }

    public CategoryDto toCategoryDto(Category category){
        return new CategoryDto(
                category.getId(),
                category.getCategoryName()
        );
    }

    @Transactional
    //@PreAuthorize("hasRole('TEACHER')")
    public String createCourse(
            String title,
            String description,
            BigDecimal fees,
            MultipartFile image,
            String categoryName,
            String username
    )throws Exception{
        Category category=findCategoryByName(categoryName);
        Teacher teacher=findTeacherByUsername(username);
        Course course=new Course();
        course.setTitle(title);
        course.setDescription(description);
        course.setFees(fees);
        if(image!=null){
            course.setImage(image.getBytes());
        }
        teacher.addCourse(course);
        category.addCourse(course);
        courseDao.save(course);
        return "Course created successfully";
    }
    private Category findCategoryByName(String categoryName){
        if (categoryName == null || categoryName.isBlank()) {
            throw new IllegalArgumentException("Category name must not be empty!");
        }
        return categoryDao.findByCategoryName(categoryName)
                .orElseThrow(() -> new RuntimeException("Category not found: " + categoryName));
    }

    private Teacher findTeacherByUsername(String username){
        return teacherDao.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Teacher not found with username: " + username));
    }

    public List<CourseLesson> listAllCourseLessonsByCourseId(String courseId) {
        return courseDao.findById(UUID.fromString(courseId))
                .orElseThrow(() -> new RuntimeException("Course not found with id: "
                        + courseId))
                .getLessons();
    }
}
