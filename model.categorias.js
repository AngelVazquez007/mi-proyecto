import Database from "better-sqlite3";

// Obtener todas las categorías
export function getAllCategorias(mydb) {
  const db = new Database(mydb);
  const query = "SELECT * FROM categorias;";
  const categorias = db.prepare(query).all();
  db.close();
  return categorias;
}

// Crear una nueva categoría
export function createCategoria(mydb, data) {
  const db = new Database(mydb);
  const query = `
    INSERT INTO categorias (nombre) 
    VALUES (@nombre);
  `;
  const result = db.prepare(query).run(data);
  db.close();
  return result;
}

// Opcional: Obtener una categoría por su ID
export function getCategoriaById(mydb, id) {
  const db = new Database(mydb);
  const query = "SELECT * FROM categorias WHERE id = ?;";
  const categoria = db.prepare(query).get(id);
  db.close();
  return categoria;
}

// Opcional: Actualizar una categoría
export function updateCategoria(mydb, id, data) {
  const db = new Database(mydb);
  const query = `
    UPDATE categorias
    SET nombre = @nombre
    WHERE id = @id;
  `;
  const result = db.prepare(query).run({ id, ...data });
  db.close();
  return result;
}

// Opcional: Eliminar una categoría
export function deleteCategoria(mydb, id) {
  const db = new Database(mydb);
  const query = "DELETE FROM categorias WHERE id = ?;";
  const result = db.prepare(query).run(id);
  db.close();
  return result;
}
