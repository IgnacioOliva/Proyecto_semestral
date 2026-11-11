package com.example.demo.service;

import com.example.demo.model.Producto;
import com.example.demo.repository.ProductoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class ProductoService {
    private final ProductoRepository repository;

    public ProductoService(ProductoRepository repository) {
        this.repository = repository;
    }

    public List<Producto> listar() {
        return repository.findAll();
    }

    public Producto buscar(Long id) {
        return repository.findById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    }

    public Producto crear(Producto Producto) {
        Producto.setId(null); // Impide que el cliente elija el ID.
        return repository.save(Producto);
    }

    public Producto actualizar(Long id, Producto cambios) {
        Producto actual = buscar(id);
        actual.setNombre(cambios.getNombre());
        actual.setCategoria(cambios.getCategoria());
        actual.setMarca(cambios.getMarca());
        actual.setModelo(cambios.getModelo());
        actual.setStock(cambios.getStock());
        actual.setPrecio(cambios.getPrecio());
        actual.setDescripcion(cambios.getDescripcion());
        return repository.save(actual);
    }

    public void eliminar(Long id) {
        Producto actual = buscar(id);
        repository.delete(actual);
    }
}
