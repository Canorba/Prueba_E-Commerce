package com.pruebaTecnica.eCommerce.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pruebaTecnica.eCommerce.model.Producto;
import com.pruebaTecnica.eCommerce.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

	@Autowired
	private ProductoService productoService;

	@PostMapping
	public Producto crearProducto(@RequestBody Producto producto) {
		return productoService.crearProducto(producto);
	}

	@GetMapping
	public List<Producto> obtenerProductos() {
		return productoService.obtenerProductos();
	}

	@GetMapping("/activos")
	public List<Producto> obtenerProductosActivos() {
		return productoService.obtenerProductosActivos();
	}

	@GetMapping("/{id}")
	public Producto obtenerProductoPorId(@PathVariable Long id) {
		return productoService.obtenerProductoPorId(id);
	}

	@DeleteMapping("/{id}")
	public void eliminarProducto(@PathVariable Long id) {
		productoService.eliminarProducto(id);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @RequestBody Producto producto) {
		Producto productoActualizado = productoService.actualizarProducto(id, producto);
		if (productoActualizado != null) {
			return ResponseEntity.ok(productoActualizado);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}