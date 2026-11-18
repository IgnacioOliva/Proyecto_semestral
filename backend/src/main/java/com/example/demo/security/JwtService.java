package com.example.demo.security;

import com.example.demo.model.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private final SecretKey key;
    private final long minutes;

    public JwtService(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.expiration-minutes}") long minutes) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.minutes = minutes;
    }

    public String crear(Usuario usuario) {
        Instant now = Instant.now();
        return Jwts.builder()
            .subject(usuario.getUsuario())
            .claim("rol", usuario.getRol())
            .issuedAt(Date.from(now))
            .expiration(Date.from(now.plusSeconds(minutes * 60)))
            .signWith(key)
            .compact();
    }

    public String usuario(String jwt) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload().getSubject();
    }
}
