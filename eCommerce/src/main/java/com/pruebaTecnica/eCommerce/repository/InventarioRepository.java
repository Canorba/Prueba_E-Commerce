package com.pruebaTecnica.eCommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.pruebaTecnica.eCommerce.model.Inventario;

@Repository
public interface InventarioRepository extends JpaRepository<Inventario, Long> {
	Optional<Inventario> findByProductoId(Long productoId);
}