package com.example.demo.service;

import com.example.demo.model.Pedido;
import com.example.demo.repository.PedidoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class PedidoService {
    private final PedidoRepository repository;

    public PedidoService(PedidoRepository repository) {
        this.repository = repository;
    }

    public List<Pedido> listar() {
        return repository.findAll();
    }

    public Pedido buscar(Long id) {
        return repository.findById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido no encontrado"));
    }

    public Pedido crear(Pedido pedido) {
        pedido.setId(null); // Impide que el cliente elija el ID.
        return repository.save(pedido);
    }
    
    public Pedido actualizar(Long id, Pedido cambios) {
        Pedido actual = buscar(id);
        actual.setNumero(cambios.getNumero());
        actual.setNombre(cambios.getNombre());
        actual.setTelefono(cambios.getTelefono());
        actual.setCorreo(cambios.getCorreo());
        actual.setTipoEntrega(cambios.getTipoEntrega());
        actual.setCostoEnvio(cambios.getCostoEnvio());
        actual.setTotal(cambios.getTotal());
        actual.setEstado(cambios.getEstado());
        return repository.save(actual);
    }

    public void eliminar(Long id) {
        Pedido actual = buscar(id);
        repository.delete(actual);
    }
}
