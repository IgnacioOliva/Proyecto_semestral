package cl.duoc.doggyspa.controller;

import cl.duoc.doggyspa.repository.UsuarioRepository;
import cl.duoc.doggyspa.security.JwtService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager manager;
    private final UsuarioRepository usuarios;
    private final JwtService jwt;

    public AuthController(AuthenticationManager manager, UsuarioRepository usuarios, JwtService jwt) {
        this.manager = manager;
        this.usuarios = usuarios;
        this.jwt = jwt;
    }

    public record Login(@NotBlank String username, @NotBlank String password) {}
    public record Token(String token, String rol, String tipo) {}

    @PostMapping("/login")
    public ResponseEntity<Token> login(@Valid @RequestBody Login request) {
        manager.authenticate(new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        var u = usuarios.findByUsername(request.username()).orElseThrow();
        return ResponseEntity.ok(new Token(jwt.crear(u), u.getRol().name(), "Bearer"));
    }

    // Responde únicamente si el JwtFilter autenticó la solicitud.
    @GetMapping("/me")
    public Map<String,String> me(Authentication authentication) {
        String rol = authentication.getAuthorities().stream()
            .map(a -> a.getAuthority())
            .filter(r -> r.startsWith("ROLE_"))
            .map(r -> r.substring("ROLE_".length()))
            .findFirst().orElse("SIN_ROL");
        return Map.of("username", authentication.getName(), "rol", rol);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Map<String, String>> badCredentials(AuthenticationException ex) {
        return ResponseEntity.status(401).body(Map.of("error", "Credenciales incorrectas"));
    }
}
