package com.example.demo;

import com.example.demo.controller.AuthController;
import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.security.JwtFilter;
import com.example.demo.security.JwtService;
import com.example.demo.security.SecurityConfig;
import com.example.demo.security.UsuarioDetailsService;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AuthController.class)
@Import({SecurityConfig.class, JwtFilter.class, UsuarioDetailsService.class})
class AuthMeSecurityTest {
    @Autowired MockMvc mvc;
    @MockitoBean JwtService jwt;
    @MockitoBean UsuarioRepository usuarios;

    @Test
    void sinTokenMeEs401() throws Exception {
        mvc.perform(get("/auth/me")).andExpect(status().isUnauthorized());
    }

    @Test
    void userTokenMeDevuelveRolActual() throws Exception {
        Usuario usuario = new Usuario();
        usuario.setUsuario("usuario");
        usuario.setRol("USER");
        when(jwt.usuario("token-user")).thenReturn("usuario");
        when(usuarios.findByUsuario("usuario")).thenReturn(Optional.of(usuario));

        mvc.perform(get("/auth/me").header("Authorization", "Bearer token-user"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value("usuario"))
            .andExpect(jsonPath("$.rol").value("USER"));
    }
}
