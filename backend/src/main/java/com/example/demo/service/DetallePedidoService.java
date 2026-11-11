package com.example.demo.service;

import com.example.demo.model.DetallePedido;
import com.example.demo.repository.DetallePedidoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class DetallePedidoService {
    private final DetallePedidoRepository repository;

    public DetallePedidoService(DetallePedidoRepository repository) {
        this.repository = repository;
    }

    public List<DetallePedido> listar() {
        return repository.findAll();
    }
    
    public DetallePedido buscar(Long id) {
        return repository.findById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Detalle del pedido no encontrado"));
    }

    public DetallePedido crear(DetallePedido detallePedido) {
        detallePedido.setId(null); 
        return repository.save(detallePedido);
    }

    public DetallePedido actualizar(Long id, DetallePedido cambios) {
        DetallePedido actual = buscar(id);
        actual.setPedidoId(cambios.getPedidoId());
        actual.setProductoId(cambios.getProductoId());
        actual.setCantidad(cambios.getCantidad());
        actual.setPrecioUnitario(cambios.getPrecioUnitario());
        return repository.save(actual);
    }

    public void eliminar(Long id) {
        DetallePedido actual = buscar(id);
        repository.delete(actual);
    }
}
