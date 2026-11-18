package com.example.demo.controller;

import com.example.demo.repository.UsuarioRepository;
import com.example.demo.security.JwtService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
        try {
            auth.authenticate(new UsernamePasswordAuthenticationToken(req.usuario(), req.password()));
        } catch (AuthenticationException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas");
        }
        var usuario = usuarios.findByUsuario(req.usuario())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas"));
        return new Token(jwt.crear(usuario), usuario.getUsuario(), usuario.getRol(), "Bearer");
    }
}
