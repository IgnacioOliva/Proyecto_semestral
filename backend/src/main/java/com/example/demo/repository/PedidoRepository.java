package com.example.demo.repository;

import com.example.demo.model.Pedido;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    boolean existsByNumero(String numero);

    @Query("select distinct p from Pedido p left join fetch p.detalles d left join fetch d.producto")
    List<Pedido> findAllConDetalles();

    @Query("select distinct p from Pedido p left join fetch p.detalles d left join fetch d.producto where p.id = :id")
    Optional<Pedido> findConDetallesById(@Param("id") Long id);
}
