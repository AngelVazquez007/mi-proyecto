import Database from "better-sqlite3";

export function getAllProveedores(mydb) {
    const db = new Database(mydb);
    const query = "SELECT * FROM proveedores;";
    const proveedores = db.prepare(query).all();
    db.close();
    return proveedores;
}

export function getProveedorById(mydb, id) {
    const db = new Database(mydb);
    const query = "SELECT * FROM proveedores WHERE id = ?;";
    const proveedor = db.prepare(query).get(id);
    db.close();
    return proveedor;
}

export function createProveedor(mydb, data) {
    const db = new Database(mydb);
    const query = `
        INSERT INTO proveedores (nombre, telefono, correo, direccion)
        VALUES (@nombre, @telefono, @correo, @direccion);
    `;
    const result = db.prepare(query).run(data);
    db.close();
    return result;
}

export function updateProveedor(mydb, id, data) {
    const db = new Database(mydb);
    const query = `
        UPDATE proveedores
        SET nombre = @nombre, telefono = @telefono, correo = @correo, direccion = @direccion
        WHERE id = @id;
    `;
    const result = db.prepare(query).run({ id, ...data });
    db.close();
    return result;
}

export function deleteProveedor(mydb, id) {
    const db = new Database(mydb);
    const query = "DELETE FROM proveedores WHERE id = ?;";
    const result = db.prepare(query).run(id);
    db.close();
    return result;
}
