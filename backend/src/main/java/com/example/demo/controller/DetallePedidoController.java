package com.example.demo.controller;


import com.example.demo.model.DetallePedido;
import com.example.demo.service.DetallePedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/DetallePedidos")
@CrossOrigin(origins = "http://localhost:5173")
public class DetallePedidoController {
    private final DetallePedidoService service;

    public DetallePedidoController(DetallePedidoService service) {
        this.service = service;
    }

    @GetMapping
    public List<DetallePedido> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public DetallePedido buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DetallePedido crear(@Valid @RequestBody DetallePedido detallePedido) {
        return service.crear(detallePedido);
    }

    @PutMapping("/{id}")
    public DetallePedido actualizar(@PathVariable Long id, @Valid @RequestBody DetallePedido cambios) {
        return service.actualizar(id, cambios);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
    
}
