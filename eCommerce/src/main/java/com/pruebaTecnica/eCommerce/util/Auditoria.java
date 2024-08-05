package com.pruebaTecnica.eCommerce.util;

import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class Auditoria {

	public void registrarAccion(String accion, String usuario) {
		// Aquí se puede implementar la lógica para registrar la acción, como guardar en
		// una base de datos o archivo de log.
		System.out.println("Acción: " + accion + ", Usuario: " + usuario + ", Fecha: " + new Date());
	}
}
