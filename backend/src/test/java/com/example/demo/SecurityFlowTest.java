package com.example.demo;

import com.example.demo.controller.ProductoController;
import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.security.JwtFilter;
import com.example.demo.security.JwtService;
import com.example.demo.security.SecurityConfig;
import com.example.demo.security.UsuarioDetailsService;
import com.example.demo.service.ProductoService;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ProductoController.class)
@Import({SecurityConfig.class, JwtFilter.class, UsuarioDetailsService.class})
class SecurityFlowTest {
    @Autowired MockMvc mvc;
    @MockitoBean JwtService jwt;
    @MockitoBean UsuarioRepository usuarios;
    @MockitoBean ProductoService productos;

    private final String json = """
        {"codigo":"GA001","nombre":"Guitarra","categoria":"Guitarras","marca":"Yamaha","modelo":"F310","stock":8,"precio":10000,"descripcion":"Prueba","imagen":"/img.png"}
        """;

    private void usuario(String token, String nombre, String rol) {
        Usuario usuario = new Usuario();
        usuario.setUsuario(nombre);
        usuario.setRol(rol);
        when(jwt.usuario(token)).thenReturn(nombre);
        when(usuarios.findByUsuario(nombre)).thenReturn(Optional.of(usuario));
    }

    @Test
    void postSinTokenEs401() throws Exception {
        mvc.perform(post("/api/Productos").contentType(MediaType.APPLICATION_JSON).content(json))
            .andExpect(status().isUnauthorized());
    }

    @Test
    void getConUserEs200() throws Exception {
        usuario("token-user", "usuario", "USER");
        when(productos.listar()).thenReturn(List.of());
        mvc.perform(get("/api/Productos").header("Authorization", "Bearer token-user"))
            .andExpect(status().isOk());
    }

    @Test
    void putConUserEs403() throws Exception {
        usuario("token-user", "usuario", "USER");
        mvc.perform(put("/api/Productos/1").header("Authorization", "Bearer token-user")
                .contentType(MediaType.APPLICATION_JSON).content(json))
            .andExpect(status().isForbidden());
    }

    @Test
    void putConAdminEs200() throws Exception {
        usuario("token-admin", "admin", "ADMIN");
        mvc.perform(put("/api/Productos/1").header("Authorization", "Bearer token-admin")
                .contentType(MediaType.APPLICATION_JSON).content(json))
            .andExpect(status().isOk());
    }
}
