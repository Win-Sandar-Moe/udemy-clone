package org.example.udemyclonebackend;

import lombok.RequiredArgsConstructor;
import org.example.udemyclonebackend.dao.CategoryDao;
import org.example.udemyclonebackend.entity.Category;
import org.example.udemyclonebackend.entity.Education;
import org.example.udemyclonebackend.security.AuthService;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import java.math.BigDecimal;
import java.util.List;

@SpringBootApplication
@RequiredArgsConstructor
public class UdemyCloneBackendApplication {
    private final AuthService   authService;
    private final CategoryDao categoryDao;
    @Bean @Profile("student")
    public ApplicationRunner addNewStudent(){
        return r ->{
            authService.addNewStudent("charles",
                    "12345", "charles@mail.com",
                    "123 Main St",
                    Education.UNDERGRADUATE);
        };
    }
    @Bean@Profile("teacher")
    public ApplicationRunner addNewTeacher(){
        return r ->{
            authService.addNewTeacher("thomas",
                    "12345", "thomas@mail.com",
                    BigDecimal.valueOf(0), "MSc", List.of("Maths",
                            "Physics"));
        };
    }

    @Bean @Profile("dev")
    public ApplicationRunner applicationRunner(){
        return r ->{
            //authService.sampleInitData();
            Category programming=new Category();
            programming.setCategoryName("Programming");

            Category maths=new Category();
            maths.setCategoryName("Maths");

            Category science=new Category();
            science.setCategoryName("Science");

            Category language=new Category();
            language.setCategoryName("Language");

            Category health=new Category();
            health.setCategoryName("Health");

            Category finance=new Category();
            finance.setCategoryName("Finance");

            categoryDao.saveAll(List.of(
                    programming,maths,science,language,health,finance
            ));


        };
    }


    public static void main(String[] args) {
        SpringApplication.run(UdemyCloneBackendApplication.class, args);
    }

}
