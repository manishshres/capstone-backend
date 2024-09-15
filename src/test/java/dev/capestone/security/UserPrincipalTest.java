package dev.capestone.security;

import dev.capestone.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

class UserPrincipalTest {

    @Test
    void testUserPrincipalCreation() {
        String id = "123";
        String name = "Test User";
        String email = "test@example.com";
        String password = "password123";
        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_USER");
        Collection<GrantedAuthority> authorities = Collections.singletonList(authority);

        UserPrincipal userPrincipal = new UserPrincipal(id, name, email, password, authorities);

        assertEquals(id, userPrincipal.getId());
        assertEquals(email, userPrincipal.getUsername());
        assertEquals(password, userPrincipal.getPassword());
        assertEquals(authorities, userPrincipal.getAuthorities());
    }

    @Test
    void testCreateFromUser() {
        User user = new User();
        user.setId("456");
        user.setName("Test User");
        user.setEmail("test@gmail.com");
        user.setPassword("password");
        user.setRole(User.Role.USER);

        UserPrincipal userPrincipal = UserPrincipal.create(user);

        assertEquals(user.getId(), userPrincipal.getId());
        assertEquals(user.getEmail(), userPrincipal.getUsername());
        assertEquals(user.getPassword(), userPrincipal.getPassword());

        Collection<? extends GrantedAuthority> authorities = userPrincipal.getAuthorities();
        assertEquals(1, authorities.size());
        assertTrue(authorities.contains(new SimpleGrantedAuthority("USER")));
    }

    @Test
    void testUserDetailsMethodsReturnTrue() {
        UserPrincipal userPrincipal = new UserPrincipal("id", "name", "email", "password", Collections.emptyList());

        assertTrue(userPrincipal.isAccountNonExpired());
        assertTrue(userPrincipal.isAccountNonLocked());
        assertTrue(userPrincipal.isCredentialsNonExpired());
        assertTrue(userPrincipal.isEnabled());
    }
}