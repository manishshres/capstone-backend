package dev.capestone.service;

import dev.capestone.model.User;
import dev.capestone.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateUser_Success() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password123");

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(user.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        User createdUser = userService.createUser(user);

        assertNotNull(createdUser);
        assertEquals("encodedPassword", createdUser.getPassword());
        verify(userRepository).save(user);
    }

    @Test
    void testCreateUser_EmailAlreadyExists() {
        User user = new User();
        user.setEmail("existing@example.com");

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

        assertThrows(RuntimeException.class, () -> userService.createUser(user));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testFindByEmail_Success() {
        String email = "test@gmail.com";
        User user = new User();
        user.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        User foundUser = userService.findByEmail(email);

        assertNotNull(foundUser);
        assertEquals(email, foundUser.getEmail());
    }

    @Test
    void testFindByEmail_UserNotFound() {
        String email = "fake@email.com";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> userService.findByEmail(email));
    }
}