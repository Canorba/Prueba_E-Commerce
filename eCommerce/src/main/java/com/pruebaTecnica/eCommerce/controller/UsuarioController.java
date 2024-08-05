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
import com.pruebaTecnica.eCommerce.model.Usuario;
import com.pruebaTecnica.eCommerce.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@PostMapping
	public Usuario crearUsuario(@RequestBody Usuario usuario) {
		return usuarioService.crearUsuario(usuario);
	}

	@GetMapping
	public List<Usuario> obtenerUsuarios() {
		return usuarioService.obtenerUsuarios();
	}

	@GetMapping("/{id}")
	public Usuario obtenerUsuarioPorId(@PathVariable Long id) {
		return usuarioService.obtenerUsuarioPorId(id);
	}

	@DeleteMapping("/{id}")
	public void eliminarUsuario(@PathVariable Long id) {
		usuarioService.eliminarUsuario(id);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
		Usuario usuarioActualizado = usuarioService.actualizarUsuario(id, usuario);
		if (usuarioActualizado != null) {
			return ResponseEntity.ok(usuarioActualizado);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
