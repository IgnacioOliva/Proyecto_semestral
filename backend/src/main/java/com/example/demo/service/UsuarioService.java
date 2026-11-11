package com.example.demo.service;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public List<Usuario> listar() {
        return repository.findAll();
    }

    public Usuario buscar(Long id) {
        return repository.findById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
    }

    public Usuario crear(Usuario usuario) {
        usuario.setId(null); // Impide que el cliente elija el ID.
        return repository.save(usuario);
    }

    public Usuario actualizar(Long id, Usuario cambios) {
        Usuario actual = buscar(id);
        actual.setNombre(cambios.getNombre());
        actual.setContraseña(cambios.getContraseña());
        return repository.save(actual);
    }

    public void eliminar(Long id) {
        Usuario actual = buscar(id);
        repository.delete(actual);
    }
    
}
