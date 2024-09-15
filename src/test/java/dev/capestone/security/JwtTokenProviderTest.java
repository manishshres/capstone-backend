package dev.capestone.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Base64;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class JwtTokenProviderTest {

    @InjectMocks
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private Authentication authentication;

    @Mock
    private UserPrincipal userPrincipal;

    private String jwtSecret;
    private int jwtExpirationInMs = 60000; // 1 minute

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // Generate a secure key and convert it to a Base64 encoded string
        jwtSecret = Base64.getEncoder().encodeToString(Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded());
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtSecret", jwtSecret);
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtExpirationInMs", jwtExpirationInMs);
    }

    @Test
    void testGenerateToken() {
        when(authentication.getPrincipal()).thenReturn(userPrincipal);
        when(userPrincipal.getId()).thenReturn("123");

        String token = jwtTokenProvider.generateToken(authentication);

        assertNotNull(token);
        assertTrue(token.length() > 0);
    }

    @Test
    void testGetUserIdFromJWT() {
        String userId = "123";
        String token = Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        String extractedUserId = jwtTokenProvider.getUserIdFromJWT(token);

        assertEquals(userId, extractedUserId);
    }

    @Test
    void testValidateToken_ValidToken() {
        String token = Jwts.builder()
                .setSubject("123")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        boolean isValid = jwtTokenProvider.validateToken(token);

        assertTrue(isValid);
    }

    @Test
    void testValidateToken_ExpiredToken() {
        String token = Jwts.builder()
                .setSubject("123")
                .setIssuedAt(new Date(System.currentTimeMillis() - 2 * jwtExpirationInMs))
                .setExpiration(new Date(System.currentTimeMillis() - jwtExpirationInMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        boolean isValid = jwtTokenProvider.validateToken(token);

        assertFalse(isValid);
    }

    @Test
    void testValidateToken_InvalidToken() {
        String token = "invalidToken";

        boolean isValid = jwtTokenProvider.validateToken(token);

        assertFalse(isValid);
    }
}