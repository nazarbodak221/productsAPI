package cat.project.controller;

import cat.project.dto.UserDto;
import cat.project.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto) {
        try {
            UserDto responseUserDto = userService.registerUser(userDto);
            return ResponseEntity.ok(responseUserDto);
        }
        catch(UsernameNotFoundException usernameNotFoundException) {
            return new ResponseEntity<>(usernameNotFoundException.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto userDto) {
        try {
            String token = userService.loginUser(userDto);
            userDto.setToken(token);
            return ResponseEntity.ok(userDto);
        } catch(AuthenticationException authException) {
            return new ResponseEntity<>(authException.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
}
