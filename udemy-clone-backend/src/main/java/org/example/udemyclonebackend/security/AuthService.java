package org.example.udemyclonebackend.security;

import lombok.RequiredArgsConstructor;
import org.example.udemyclonebackend.dao.*;
import org.example.udemyclonebackend.entity.*;
import org.example.udemyclonebackend.jwt.TokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import static org.example.udemyclonebackend.security.AuthController.RegisterDto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final RoleDao roleDao;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final StudentDao studentDao;
    private final TeacherDao teacherDao;
    private final SiteAdminDao siteAdminDao;
    private final TokenService tokenService;
    private final UserDetailsService customUserDetailsService;

    
    

    public Map<String,String> login(String userNameEmail, String password){
        var auth=new UsernamePasswordAuthenticationToken(userNameEmail,password);
        Authentication authentication=authenticationManager.authenticate(auth);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken =tokenService.generateAccessToken(authentication);
        String refreshToken =tokenService.generateRefreshToken(authentication);

        return Map.of(
                "accessToken",accessToken,
                "refreshToken",refreshToken
        );

    }
    public Map<String,String> refreshToken(String refreshToken){
        Jwt jwt=tokenService.decodeToken(refreshToken);
        String type =jwt.getClaimAsString("type");
        if(!"REFRESH".equals(type)){
            throw new IllegalArgumentException("Invalid token type");
        }
        String username= jwt.getSubject();
        UserDetails userDetails=customUserDetailsService.loadUserByUsername(username);
        Authentication auth=new UsernamePasswordAuthenticationToken(
                userDetails,null,userDetails.getAuthorities()
        );
        String newAccessToken =tokenService.generateAccessToken(auth);
        return Map.of(
                "accessToken",newAccessToken,
                "refreshToken",refreshToken
        );
    }
    @Transactional
    public void addNewStudent(String username,
                              String password,
                              String email,
                              String address,
                              Education education){
        var student=new Student();
        student.setAddress(address);
        student.setUsername(username);
        student.setPassword(passwordEncoder.encode(password));
        student.setEmail(email);
        student.setEducation(education);
        student.addRole(roleDao.findByRoleName("ROLE_STUDENT").get());
        studentDao.save(student);
    }
    @Transactional
    public void addNewTeacher(String username,
                              String password,
                              String email,
                              BigDecimal fees,
                              String education,
                              List<String> skills){
        var teacher=new Teacher(username,
                passwordEncoder.encode(password),
                email,
                fees,
                education);
        teacher.setSkills(skills);
        teacher.addRole(getRole("ROLE_TEACHER"));
        teacherDao.save(teacher);
    }

    private Role getRole(String roleName) {
        return roleDao.findByRoleName(roleName)
                .orElseThrow(() -> new RuntimeException(
                        "Role not found: " + roleName
                ));
    }
    @Transactional
    public void sampleInitData(){
        Role teacherRole=new Role();
        teacherRole.setRoleName("ROLE_TEACHER");

        Role studentRole=new Role();
        studentRole.setRoleName("ROLE_STUDENT");

        Role adminRole=new Role();
        adminRole.setRoleName("ROLE_ADMIN");

        Student student=new Student("mary",
                passwordEncoder.encode("12345"),
                "mary@gmail.com",
                "123 Main St",
                Education.UNDERGRADUATE);
        student.addRole(roleDao.save(studentRole));
        studentDao.save(student);

        Teacher teacher=new Teacher("john",
                passwordEncoder.encode("12345"),
                "john@mail.com",
                BigDecimal.valueOf(0),
                "MSc");
        teacher.addSkill("Java");
        teacher.addSkill("Rect");
        teacher.addRole(roleDao.save(teacherRole));
        teacherDao.save(teacher);

        SiteAdmin siteAdmin=new SiteAdmin("william",
                passwordEncoder.encode("12345"),
                "william@mail.com",
                BigDecimal.valueOf(0));
        siteAdmin.addRole(roleDao.save(adminRole));
        siteAdminDao.save(siteAdmin);
    }

    public Map<String, String> register(RegisterDto registerDto) {
        Map<String,String> response= switch(registerDto.userType()){
            case "STUDENT" ->{
                var student= new Student(
                        registerDto.username(),
                       passwordEncoder.encode(registerDto.password()),
                        registerDto.email(),
                        registerDto.address(),
                        Education.valueOf(registerDto.studentEducation())
                );
                student.addRole((getRole("ROLE_STUDENT")));
                studentDao.save(student);
                yield Map.of(
                        "message", "Student registered successfully", "username", student.getUsername());
            }
            case "TEACHER" ->{
                var teacher = new Teacher(
                        registerDto.username(),
                        passwordEncoder.encode(registerDto.password()),
                        registerDto.email(),
                        BigDecimal.valueOf(0),
                        registerDto.teacherEducation()
                );
                teacher.setSkills(registerDto.skills());
                teacher.addRole(getRole("ROLE_TEACHER"));
                teacherDao.save(teacher);
                yield Map.of(
                        "message", "Teacher registered successfully", "username", teacher.getUsername());
                       }
            default ->{
                throw new IllegalArgumentException("Invalid user Type");
            }

        };
        return response;

    }
}
