package com.example.demo.config;

import com.example.demo.model.Usuario;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DatosDemo {
    @Bean
    CommandLineRunner cargar(UsuarioRepository usuarios, ProductoRepository productos, PasswordEncoder encoder) {
        return args -> {
            if (usuarios.findByUsuario("admin").isEmpty()) {
                Usuario admin = new Usuario();
                admin.setUsuario("admin");
                admin.setPassword(encoder.encode("admin123"));
                admin.setRol("ADMIN");
                usuarios.save(admin);
            }
            if (usuarios.findByUsuario("usuario").isEmpty()) {
                Usuario consulta = new Usuario();
                consulta.setUsuario("usuario");
                consulta.setPassword(encoder.encode("usuario123"));
                consulta.setRol("USER");
                usuarios.save(consulta);
            }
            ProductosIniciales.cargarSiVacio(productos);
        };
    }
}
