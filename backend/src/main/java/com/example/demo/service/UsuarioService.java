package com.example.demo.service;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;
    private final PasswordEncoder encoder;

    public UsuarioService(UsuarioRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    public List<Usuario> listar() {
        return repository.findAll();
    }

    public Usuario buscar(Long id) {
        return repository.findById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
    }

    public Usuario iniciarSesion(String usuario, String password) {
        if (usuario == null || usuario.isBlank() || password == null || password.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas");
        }

        Usuario actual = repository.findByUsuario(usuario.trim()).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas"));

        if (!encoder.matches(password, actual.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas");
        }
        return actual;
    }

    public Usuario crear(Usuario usuario) {
        usuario.setId(null);
        usuario.setUsuario(usuario.getUsuario().trim());
        usuario.setPassword(encoder.encode(usuario.getPassword()));
        try {
            return repository.save(usuario);
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El usuario ya existe");
        }
    }

    public Usuario actualizar(Long id, Usuario cambios) {
        Usuario actual = buscar(id);
        actual.setUsuario(cambios.getUsuario().trim());
        actual.setPassword(encoder.encode(cambios.getPassword()));
        actual.setRol(cambios.getRol());
        try {
            return repository.save(actual);
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El usuario ya existe");
        }
    }

    public void eliminar(Long id) {
        Usuario actual = buscar(id);
        repository.delete(actual);
    }
}
