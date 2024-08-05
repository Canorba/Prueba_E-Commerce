package com.pruebaTecnica.eCommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.pruebaTecnica.eCommerce.model.Usuario;
import com.pruebaTecnica.eCommerce.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public Usuario crearUsuario(Usuario usuario) {
		usuario.setContraseña(passwordEncoder.encode(usuario.getContraseña()));
		return usuarioRepository.save(usuario);
	}

	public List<Usuario> obtenerUsuarios() {
		return usuarioRepository.findAll();
	}

	public Usuario obtenerUsuarioPorId(Long id) {
		return usuarioRepository.findById(id).orElse(null);
	}

	public Usuario obtenerUsuarioPorEmail(String email) {
		return usuarioRepository.findByEmail(email);
	}

	public void eliminarUsuario(Long id) {
		usuarioRepository.deleteById(id);
	}

	public Usuario actualizarUsuario(Long id, Usuario usuario) {
		if (usuarioRepository.existsById(id)) {
			usuario.setId(id);
			return usuarioRepository.save(usuario);
		} else {
			return null;
		}
	}
}