package com.example.demo.controller;

import com.example.demo.model.Pedido;
import com.example.demo.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/Pedidos")
@CrossOrigin(origins = "http://localhost:5173")
public class PedidoController {
    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pedido> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Pedido buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Pedido crear(@Valid @RequestBody Pedido pedido) {
        return service.crear(pedido);
    }

    @PutMapping("/{id}")
    public Pedido actualizar(@PathVariable Long id, @Valid @RequestBody Pedido cambios) {
        return service.actualizar(id, cambios);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
    
}
