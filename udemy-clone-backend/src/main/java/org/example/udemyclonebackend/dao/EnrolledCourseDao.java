package org.example.udemyclonebackend.dao;

import org.example.udemyclonebackend.course.dto.CourseInfoDto;
import org.example.udemyclonebackend.entity.EnrolledCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EnrolledCourseDao extends JpaRepository<EnrolledCourse, UUID> {
    @Query("""
select ec from EnrolledCourse ec
where ec.student.username = :username and ec.course.id = :courseId
""")
    Optional<EnrolledCourse>
    findByStudentNameAndCourseId(
            @Param("username") String username,
            @Param("courseId") UUID courseId);
    /*
     public CourseInfoDto(UUID courseId,
                         String title,
                         String description,
                         BigDecimal fees,
                         byte[] imageBase64,
                         String teacherName,
                         String categoryName) {
     */

    @Query("""
select new org.example.udemyclonebackend.course.dto.CourseInfoDto(
ec.course.id,
ec.course.title,
ec.course.description,
ec.course.fees,
ec.course.image,
ec.course.teacher.username,
ec.course.category.categoryName
) from EnrolledCourse ec
where ec.student.username = :username
""")
    List<CourseInfoDto>
    findAllEnrolledCoursesByStudentName(@Param("username") String username);

}
