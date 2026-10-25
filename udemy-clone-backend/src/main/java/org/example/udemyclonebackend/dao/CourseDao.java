package org.example.udemyclonebackend.dao;

import org.example.udemyclonebackend.course.dto.CourseInfoDto;
import org.example.udemyclonebackend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CourseDao extends JpaRepository<Course, UUID> {

    @Query("""
select new org.example.udemyclonebackend.course.dto.CourseInfoDto(
cou.id,
cou.title,
cou.description,
cou.fees,
cou.image,
t.username,
cat.categoryName
) from Category cat join cat.courses cou join cou.teacher t 
where t.username = :username
""")
    List<CourseInfoDto>
    findAllCourseByTeacherName(@Param("username") String username);

    @Query("""
select new org.example.udemyclonebackend.course.dto.CourseInfoDto(
cou.id,
cou.title,
cou.description,
cou.fees,
cou.image,
t.username,
cat.categoryName
) from Category cat join cat.courses cou join cou.teacher t 
""")
    List<CourseInfoDto> findAllCourseInfoDto();

}
