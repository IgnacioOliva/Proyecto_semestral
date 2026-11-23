package com.example.demo.security;

import com.example.demo.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsuarioDetailsService implements UserDetailsService {
    private final UsuarioRepository usuarios;

    public UsuarioDetailsService(UsuarioRepository usuarios) {
        this.usuarios = usuarios;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        var usuario = usuarios.findByUsuario(username)
            .orElseThrow(() -> new UsernameNotFoundException("No existe el usuario"));
        return User.withUsername(usuario.getUsuario())
            .password(usuario.getPassword())
            .roles(usuario.getRol())
            .build();
    }
}
