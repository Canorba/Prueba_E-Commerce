package com.pruebaTecnica.eCommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.pruebaTecnica.eCommerce.model.Orden;

@Repository
public interface OrdenRepository extends JpaRepository<Orden, Long> {
}
