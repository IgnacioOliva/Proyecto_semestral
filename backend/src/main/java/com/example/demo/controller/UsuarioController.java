package com.example.demo.controller;

import com.example.demo.model.Usuario;
import com.example.demo.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/Productos")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {
    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    public List<Usuario> listar() {
        return service.listar();
    }

    public Usuario buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    public Usuario crear(@Valid @RequestBody Usuario usuario) {
        return service.crear(usuario);
    }

    public Usuario actualizar(@PathVariable Long id, @Valid @RequestBody Usuario cambios) {
        return service.actualizar(id, cambios);
    }

    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
    
}
