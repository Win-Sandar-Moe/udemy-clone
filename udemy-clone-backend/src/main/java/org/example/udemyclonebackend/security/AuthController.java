package org.example.udemyclonebackend.security;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    public record RegisterDto(String username,
                       String email,
                       String password,
                       String address,
                       String studentEducation,
                       String teacherEducation,
                       List<String> skills,
                       String userType
    ){   }
    @PostMapping("/register")
    public ResponseEntity<Map<String,String> >register(@RequestBody  RegisterDto registerDto){
        return ResponseEntity.ok(authService.register(registerDto));
    }

    public record LoginRequest(
            @NotEmpty(message = "Username or email is required")
            @NotBlank(message = "Username or email cannot be blank")
            String usernameEmail,
            @NotEmpty(message = "Password is required")
            @NotBlank(message = "Password cannot be blank")
            String password){}
    public record RefreshRequest(
            @NotEmpty(message = "Refresh token is required")
            @NotBlank(message = "Refresh token cannot be blank")
            String refreshToken){}

    @PostMapping("/login")
    public Map<String,String> login(@RequestBody @Valid LoginRequest loginRequest){
        return authService.login(loginRequest.usernameEmail,
                loginRequest.password);
    }

    //http://localhost:8080/api/auth/refresh
    @PostMapping("/refresh")
    public Map<String,String> refreshToken(@RequestBody @Valid RefreshRequest request){
        return authService.refreshToken(request.refreshToken);
    }
}
