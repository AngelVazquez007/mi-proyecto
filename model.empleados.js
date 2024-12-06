import Database from "better-sqlite3";

const db = new Database("inventario.db");

// Verificar credenciales de inicio de sesión
export function verificarEmpleado(id, contrasena) {
    const query = `
        SELECT id, nombre, apellido
        FROM empleados
        WHERE id = ? AND contrasena = ?;
    `;
    const empleado = db.prepare(query).get(id, contrasena);
    return empleado; // Retorna el empleado si existe, null si no.
}
