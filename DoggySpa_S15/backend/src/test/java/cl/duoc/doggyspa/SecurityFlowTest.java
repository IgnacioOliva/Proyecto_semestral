package cl.duoc.doggyspa;

import cl.duoc.doggyspa.model.Usuario;
import cl.duoc.doggyspa.repository.UsuarioRepository;
import cl.duoc.doggyspa.security.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Optional;
import cl.duoc.doggyspa.security.JwtFilter;
import cl.duoc.doggyspa.security.SecurityConfig;
import cl.duoc.doggyspa.controller.MascotaController;
import cl.duoc.doggyspa.service.MascotaService;
import org.springframework.security.authentication.AuthenticationManager;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = MascotaController.class)
@Import({SecurityConfig.class, JwtFilter.class})
class SecurityFlowTest {
    @Autowired MockMvc mvc;
    @MockBean JwtService jwt;
    @MockBean UsuarioRepository usuarios;
    @MockBean MascotaService mascotas;

    private final String json = "{\"nombre\":\"Pancho\",\"especie\":\"Perro\",\"edad\":3,\"clienteId\":1}";

    private void usuario(String token, String nombre, Usuario.Rol rol) {
        Usuario u = new Usuario(); u.setUsername(nombre); u.setRol(rol);
        when(jwt.usuario(token)).thenReturn(nombre);
        when(usuarios.findByUsername(nombre)).thenReturn(Optional.of(u));
    }

    @Test void postSinTokenEs401() throws Exception {
        mvc.perform(post("/api/mascotas").contentType(MediaType.APPLICATION_JSON).content(json))
            .andExpect(status().isUnauthorized());
    }

    @Test void getConUserEs200() throws Exception {
        usuario("token-user", "usuario", Usuario.Rol.USER);
        mvc.perform(get("/api/mascotas").header("Authorization", "Bearer token-user"))
            .andExpect(status().isOk());
    }

    @Test void postConUserEs403() throws Exception {
        usuario("token-user", "usuario", Usuario.Rol.USER);
        mvc.perform(post("/api/mascotas").header("Authorization", "Bearer token-user")
            .contentType(MediaType.APPLICATION_JSON).content(json)).andExpect(status().isForbidden());
    }

    @Test void postConAdminEs201() throws Exception {
        usuario("token-admin", "admin", Usuario.Rol.ADMIN);
        mvc.perform(post("/api/mascotas").header("Authorization", "Bearer token-admin")
            .contentType(MediaType.APPLICATION_JSON).content(json)).andExpect(status().isCreated());
    }
}
