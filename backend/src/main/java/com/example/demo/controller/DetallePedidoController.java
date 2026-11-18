package com.example.demo.controller;


import com.example.demo.model.DetallePedido;
import com.example.demo.service.DetallePedidoService;
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
}
