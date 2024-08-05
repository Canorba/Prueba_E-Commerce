package com.pruebaTecnica.eCommerce.dto;

import lombok.Data;

@Data
public class UsuarioDTO {

	private Long id;
	private String nombre;
	private String email;
	private String contraseña;
	private Boolean esClienteFrecuente;
}
