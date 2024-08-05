package com.pruebaTecnica.eCommerce.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pruebaTecnica.eCommerce.model.Orden;
import com.pruebaTecnica.eCommerce.repository.OrdenRepository;

@Service
public class OrdenService {

	@Autowired
	private OrdenRepository ordenRepository;

	public Orden crearOrden(Orden orden) {
		return ordenRepository.save(orden);
	}

	public List<Orden> obtenerOrdenes() {
		return ordenRepository.findAll();
	}

	public Orden obtenerOrdenPorId(Long id) {
		return ordenRepository.findById(id).orElse(null);
	}

	public void eliminarOrden(Long id) {
		ordenRepository.deleteById(id);
	}

	public Orden actualizarOrden(Long id, Orden orden) {
		if (ordenRepository.existsById(id)) {
			orden.setId(id);
			return ordenRepository.save(orden);
		} else {
			return null;
		}
	}
}