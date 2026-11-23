package com.example.demo.controller;

import com.example.demo.repository.UsuarioRepository;
import com.example.demo.security.JwtService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager auth;
    private final UsuarioRepository usuarios;
    private final JwtService jwt;

    public AuthController(AuthenticationManager auth, UsuarioRepository usuarios, JwtService jwt) {
        this.auth = auth;
        this.usuarios = usuarios;
        this.jwt = jwt;
    }

    public record Login(@NotBlank String usuario, @NotBlank String password) {}

    public record Token(String token, String usuario, String rol, String tipo) {}

    @PostMapping("/login")
    public Token login(@Valid @RequestBody Login req) {
        auth.authenticate(new UsernamePasswordAuthenticationToken(req.usuario(), req.password()));
        var usuario = usuarios.findByUsuario(req.usuario()).orElseThrow();
        return new Token(jwt.crear(usuario), usuario.getUsuario(), usuario.getRol(), "Bearer");
    }

    @GetMapping("/me")
    public Map<String, String> me(Authentication authentication) {
        String rol = authentication.getAuthorities().stream()
            .map(a -> a.getAuthority())
            .filter(r -> r.startsWith("ROLE_"))
            .map(r -> r.substring("ROLE_".length()))
            .findFirst()
            .orElse("SIN_ROL");
        return Map.of("username", authentication.getName(), "rol", rol);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Map<String, String>> credenciales(AuthenticationException ex) {
        return ResponseEntity.status(401).body(Map.of("error", "Credenciales incorrectas"));
    }
}
