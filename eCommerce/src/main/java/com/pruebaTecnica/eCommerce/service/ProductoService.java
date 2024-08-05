package com.pruebaTecnica.eCommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pruebaTecnica.eCommerce.model.Producto;
import com.pruebaTecnica.eCommerce.repository.ProductoRepository;

@Service
public class ProductoService {

	@Autowired
	private ProductoRepository productoRepository;

	public Producto crearProducto(Producto producto) {
		return productoRepository.save(producto);
	}

	public List<Producto> obtenerProductos() {
		return productoRepository.findAll();
	}

	public List<Producto> obtenerProductosActivos() {
		return productoRepository.findByActivoTrue();
	}

	public Producto obtenerProductoPorId(Long id) {
		return productoRepository.findById(id).orElse(null);
	}

	public void eliminarProducto(Long id) {
		productoRepository.deleteById(id);
	}

	public Producto actualizarProducto(Long id, Producto producto) {
		if (productoRepository.existsById(id)) {
			producto.setId(id);
			return productoRepository.save(producto);
		} else {
			return null;
		}
	}
}