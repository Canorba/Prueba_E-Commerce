package com.pruebaTecnica.eCommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pruebaTecnica.eCommerce.model.Inventario;
import com.pruebaTecnica.eCommerce.service.InventarioService;

@RestController
@RequestMapping("/api/inventarios")
public class InventarioController {

	@Autowired
	private InventarioService inventarioService;

	 @PostMapping
	    public ResponseEntity<Inventario> createInventario(@RequestBody Inventario inventarioRequest) {
	        try {
	            Inventario inventario = inventarioService.crearInventario(inventarioRequest);
	            return ResponseEntity.status(HttpStatus.CREATED).body(inventario);
	        } catch (RuntimeException e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	        }
	    }
	
	/*@PostMapping
	public Inventario crearInventario(@RequestBody Inventario inventario) {
		return inventarioService.crearInventario(inventario);
	}*/

	@GetMapping
	public List<Inventario> obtenerInventarios() {
		return inventarioService.obtenerInventarios();
	}

	@GetMapping("/{id}")
	public Inventario obtenerInventarioPorId(@PathVariable Long id) {
		return inventarioService.obtenerInventarioPorId(id);
	}

	@DeleteMapping("/{id}")
	public void eliminarInventario(@PathVariable Long id) {
		inventarioService.eliminarInventario(id);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Inventario> actualizarInventario(@PathVariable Long id, @RequestBody Inventario inventario) {
		Inventario inventarioActualizado = inventarioService.actualizarInventario(id, inventario);
		if (inventarioActualizado != null) {
			return ResponseEntity.ok(inventarioActualizado);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}