package cl.duoc.doggyspa;

import cl.duoc.doggyspa.controller.AuthController;
import cl.duoc.doggyspa.repository.UsuarioRepository;
import cl.duoc.doggyspa.security.JwtFilter;
import cl.duoc.doggyspa.security.JwtService;
import cl.duoc.doggyspa.security.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Optional;
import cl.duoc.doggyspa.model.Usuario;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = AuthController.class)
@Import({SecurityConfig.class, JwtFilter.class})
class AuthMeSecurityTest {
    @Autowired MockMvc mvc;
    @MockBean JwtService jwt;
    @MockBean UsuarioRepository usuarios;
    // AuthenticationManager provisto por SecurityConfig con UserDetailsService si aplica.

    @Test void sinTokenMeEs401() throws Exception {
        mvc.perform(get("/auth/me")).andExpect(status().isUnauthorized());
    }
    @Test void userTokenMeDevuelveRolActual() throws Exception {
        Usuario u = new Usuario();u.setUsername("usuario");u.setRol(Usuario.Rol.USER);
        when(jwt.usuario("token-user")).thenReturn("usuario");
        when(usuarios.findByUsername("usuario")).thenReturn(Optional.of(u));
        mvc.perform(get("/auth/me").header("Authorization", "Bearer token-user"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value("usuario"))
            .andExpect(jsonPath("$.rol").value("USER"));
    }
}
