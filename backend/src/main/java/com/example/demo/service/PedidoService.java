package com.example.demo.service;

import com.example.demo.model.DetallePedido;
import com.example.demo.model.Pedido;
import com.example.demo.model.Producto;
import com.example.demo.repository.PedidoRepository;
import com.example.demo.repository.ProductoRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PedidoService {
    private static final int COSTO_DESPACHO = 4990;
    private static final String ESTADO_INICIAL = "En Preparación";

    private final PedidoRepository repository;
    private final ProductoRepository productos;

    public PedidoService(PedidoRepository repository, ProductoRepository productos) {
        this.repository = repository;
        this.productos = productos;
    }

    @Transactional(readOnly = true)
    public List<Pedido> listar() {
        return repository.findAllConDetalles();
    }

    @Transactional(readOnly = true)
    public Pedido buscar(Long id) {
        return repository.findConDetallesById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido no encontrado"));
    }

    @Transactional
    public Pedido crear(Pedido pedido) {
        pedido.setId(null);
        if (pedido.getDetalles() == null || pedido.getDetalles().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El pedido debe incluir al menos un producto");
        }

        String tipoEntrega = pedido.getTipoEntrega();
        if (!"retiro".equals(tipoEntrega) && !"despacho".equals(tipoEntrega)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El tipo de entrega debe ser retiro o despacho");
        }

        int subtotal = 0;
        for (DetallePedido detalle : pedido.getDetalles()) {
            detalle.setId(null);
            detalle.setPedido(pedido);

            if (detalle.getCantidad() == null || detalle.getCantidad() < 1) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La cantidad debe ser al menos 1");
            }
            if (detalle.getProducto() == null || detalle.getProducto().getId() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El producto es obligatorio");
            }

            Producto producto = productos.findById(detalle.getProducto().getId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

            if (producto.getStock() < detalle.getCantidad()) {
                throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Stock insuficiente para " + producto.getNombre()
                );
            }

            producto.setStock(producto.getStock() - detalle.getCantidad());
            detalle.setProducto(producto);
            detalle.setCodigo(producto.getCodigo());
            detalle.setNombre(producto.getNombre());
            detalle.setPrecioUnitario(producto.getPrecio());
            subtotal += producto.getPrecio() * detalle.getCantidad();
        }

        int costoEnvio = "despacho".equals(tipoEntrega) ? COSTO_DESPACHO : 0;
        pedido.setCostoEnvio(costoEnvio);
        pedido.setTotal(subtotal + costoEnvio);
        pedido.setEstado(ESTADO_INICIAL);
        pedido.setFecha(LocalDateTime.now());
        pedido.setNumero(generarNumero());
        return repository.save(pedido);
    }

    @Transactional
    public Pedido actualizar(Long id, Pedido cambios) {
        if (cambios.getEstado() == null || cambios.getEstado().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El estado es obligatorio");
        }
        Pedido actual = buscar(id);
        actual.setEstado(cambios.getEstado().trim());
        return repository.save(actual);
    }

    @Transactional
    public void eliminar(Long id) {
        Pedido actual = buscar(id);
        repository.delete(actual);
    }

    private String generarNumero() {
        String numero;
        do {
            int aleatorio = ThreadLocalRandom.current().nextInt(100000, 1000000);
            numero = "SV-" + aleatorio;
        } while (repository.existsByNumero(numero));
        return numero;
    }
}
