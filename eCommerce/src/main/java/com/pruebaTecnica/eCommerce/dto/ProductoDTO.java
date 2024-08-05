package com.pruebaTecnica.eCommerce.dto;

import lombok.Data;

@Data
public class ProductoDTO {

	private Long id;
	private String nombre;
	private String descripcion;
	private Double precio;
	private Boolean activo;
}
