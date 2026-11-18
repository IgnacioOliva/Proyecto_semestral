package com.example.demo.service;

import com.example.demo.model.DetallePedido;
import com.example.demo.repository.DetallePedidoRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class DetallePedidoService {
    private final DetallePedidoRepository repository;

    public DetallePedidoService(DetallePedidoRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<DetallePedido> listar() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public DetallePedido buscar(Long id) {
        return repository.findById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Detalle del pedido no encontrado"));
    }
}
