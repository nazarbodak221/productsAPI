package cat.project.service;

import cat.project.dto.UserDto;
import cat.project.model.User;
import cat.project.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserDto registerUser(UserDto userDto) throws UsernameNotFoundException {
        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new UsernameNotFoundException("User with email: " + userDto.getEmail() + " already exists");
        }
        User user = User.builder()
                .email(userDto.getEmail())
                .fullname(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .build();
        user = userRepository.save(user);
        userDto.setId(user.getId());
        userDto.setPassword(user.getPassword());
        return userDto;
    }

    public String loginUser(UserDto userDto) throws AuthenticationException {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPassword())
        );
        userDto.setPassword(null);
        return jwtService.generateToken(userDto.getEmail());
    }
}
