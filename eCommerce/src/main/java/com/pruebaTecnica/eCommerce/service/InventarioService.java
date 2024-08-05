package com.pruebaTecnica.eCommerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pruebaTecnica.eCommerce.model.Inventario;
import com.pruebaTecnica.eCommerce.repository.InventarioRepository;

@Service
public class InventarioService {

	@Autowired
	private InventarioRepository inventarioRepository;
	
	public Inventario crearInventario(Inventario inventarioRequest) {
		// Verificar si el producto ya está en el inventario
		Optional<Inventario> existingInventario = inventarioRepository
				.findByProductoId(inventarioRequest.getProducto().getId());

		if (existingInventario.isPresent()) {
			throw new RuntimeException("El producto ya está en el inventario.");
		}

		// Si el producto no está en el inventario, proceder a crear uno nuevo
		return inventarioRepository.save(inventarioRequest);
	}

	public List<Inventario> obtenerInventarios() {
		return inventarioRepository.findAll();
	}

	public Inventario obtenerInventarioPorId(Long id) {
		return inventarioRepository.findById(id).orElse(null);
	}

	public void eliminarInventario(Long id) {
		inventarioRepository.deleteById(id);
	}

	public Inventario actualizarInventario(Long id, Inventario inventario) {
		if (inventarioRepository.existsById(id)) {
			inventario.setId(id);
			return inventarioRepository.save(inventario);
		} else {
			return null;
		}
	}
}