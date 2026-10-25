package org.example.udemyclonebackend.student;

import lombok.RequiredArgsConstructor;
import org.example.udemyclonebackend.course.dto.CourseInfoDto;
import org.example.udemyclonebackend.dao.*;
import org.example.udemyclonebackend.entity.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentDao studentDao;
    private final EnrolledCourseDao enrolledCourseDao;
    private final CourseDao courseDao;
    private final TeacherDao teacherDao;
    private final SiteAdminDao siteAdminDao;
    @Transactional(readOnly = true)
    public List<CourseInfoDto> findAllEnrolledCoursesByStudentName(String username){
        return enrolledCourseDao
                .findAllEnrolledCoursesByStudentName(username);
    }

    @Transactional
    public void enrollCourse(List<String> coursesIds, String username){
        Student student=getStudent(username);
        for(String courseId:coursesIds){
            Course course=getCourse(courseId);
            Optional<EnrolledCourse> enrolledCourseOptional= enrolledCourseDao
                    .findByStudentNameAndCourseId(username, UUID.fromString(courseId));
            if(enrolledCourseOptional.isPresent()){
                System.out.println("%s course already enrolled by %s"
                        .formatted(course.getTitle(),student.getUsername()));
                continue;
            }
            course.setStudentCount(course.getStudentCount()+1);

            EnrolledCourse enrolledCourse=
                    new EnrolledCourse();
            enrolledCourse.setCompleted(false);
            enrolledCourse.setRating(0);
            student.addEnrolledCourse(enrolledCourse);
            course.addEnrolledCourse(enrolledCourse);
            enrolledCourseDao.save(enrolledCourse);
            courseDao.save(course);
            studentDao.save(student);

            Teacher teacher=getTeacher(course.getTeacher().getUsername());
            SiteAdmin siteAdmin=getSiteAdmin("william");
            double tenPercentOfFees=course.getFees().doubleValue() * 0.1;
            double ninetyPercentOfFees=course.getFees().doubleValue() * 0.9;
            teacher.setNetWorth(teacher.getNetWorth()
                    .add(BigDecimal.valueOf(ninetyPercentOfFees)));
            siteAdmin.setPlatFormShare(siteAdmin.getPlatFormShare()
                    .add(BigDecimal.valueOf(tenPercentOfFees)));
        }
    }
    private Student getStudent(String username){
        return studentDao.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException(username + " Not Found!"));
    }
    private Course getCourse(String courseId){
        return courseDao.findById(UUID.fromString(courseId))
                .orElseThrow(()-> new RuntimeException("Course Not Found!"));
    }
    private Teacher getTeacher(String username){
        return teacherDao.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException(username + " Not Found!"));
    }
    private SiteAdmin getSiteAdmin(String username){
        return siteAdminDao.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException(username + " Not Found!"));
    }
}
