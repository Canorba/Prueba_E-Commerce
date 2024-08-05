package com.pruebaTecnica.eCommerce.controller;

import java.util.List;

import org.apache.coyote.BadRequestException;
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
import com.pruebaTecnica.eCommerce.model.Orden;
import com.pruebaTecnica.eCommerce.model.Usuario;
import com.pruebaTecnica.eCommerce.repository.UsuarioRepository;
import com.pruebaTecnica.eCommerce.service.OrdenService;

@RestController
@RequestMapping("/api/ordenes")
public class OrdenController {

	@Autowired
	private OrdenService ordenService;
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@PostMapping
	public ResponseEntity<Orden> createOrden(@RequestBody Orden ordenRequest) throws BadRequestException {
	    if (ordenRequest.getUsuario() == null || ordenRequest.getUsuario().getId() == null) {
	        throw new BadRequestException("Usuario is required for creating an order");
	    }

	    // Busca el usuario por ID
	    Usuario usuario = usuarioRepository.findById(ordenRequest.getUsuario().getId())
	                     .orElseThrow();
	    
	    // Crea una nueva orden
	    Orden orden = new Orden();
	    orden.setUsuario(usuario);
	    orden.setFecha(ordenRequest.getFecha());
	    orden.setTotal(ordenRequest.getTotal());
	    orden.setDescuentoAplicado(ordenRequest.getDescuentoAplicado());
	    
	    // Guarda la orden usando el servicio
	    Orden savedOrden = ordenService.crearOrden(orden);
	    return ResponseEntity.status(HttpStatus.CREATED).body(savedOrden);
	}

	
	/*@PostMapping
	public Orden crearOrden(@RequestBody Orden orden) {
		return ordenService.crearOrden(orden);
	}*/

	@GetMapping
	public List<Orden> obtenerOrdenes() {
		return ordenService.obtenerOrdenes();
	}

	@GetMapping("/{id}")
	public Orden obtenerOrdenPorId(@PathVariable Long id) {
		return ordenService.obtenerOrdenPorId(id);
	}

	@DeleteMapping("/{id}")
	public void eliminarOrden(@PathVariable Long id) {
		ordenService.eliminarOrden(id);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Orden> actualizarOrden(@PathVariable Long id, @RequestBody Orden orden) {
		Orden ordenActualizada = ordenService.actualizarOrden(id, orden);
		if (ordenActualizada != null) {
			return ResponseEntity.ok(ordenActualizada);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}