import Database from "better-sqlite3";

// Obtener todos los artículos con información de la categoría
export function getAllArticulos(mydb) {
  const db = new Database(mydb);
  const query = `
    SELECT articulos.*, categorias.nombre AS categoria
    FROM articulos
    LEFT JOIN categorias ON articulos.categoria_id = categorias.id;
  `;
  const articulos = db.prepare(query).all();
  db.close();
  return articulos;
}

// Obtener un artículo por su ID
export function getArticuloById(mydb, id) {
  const db = new Database(mydb);
  const query = `
    SELECT articulos.*, categorias.nombre AS categoria
    FROM articulos
    LEFT JOIN categorias ON articulos.categoria_id = categorias.id
    WHERE articulos.id = ?;
  `;
  const articulo = db.prepare(query).get(id);
  db.close();
  return articulo;
}

// Crear un nuevo artículo
export function createArticulo(mydb, data) {
  const db = new Database(mydb);
  const query = `
    INSERT INTO articulos (nombre, categoria_id, precio, stock) 
    VALUES (@nombre, @categoria_id, @precio, @stock);
  `;
  const result = db.prepare(query).run(data);
  db.close();
  return result;
}

// Actualizar un artículo por su ID
export function updateArticulo(mydb, id, data) {
  const db = new Database(mydb);
  const query = `
    UPDATE articulos
    SET nombre = @nombre, categoria_id = @categoria_id, precio = @precio, stock = @stock
    WHERE id = @id;
  `;
  const result = db.prepare(query).run({ id, ...data });
  db.close();
  return result;
}

// Eliminar un artículo por su ID
export function deleteArticulo(mydb, id) {
  const db = new Database(mydb);
  const query = "DELETE FROM articulos WHERE id = ?;";
  const result = db.prepare(query).run(id);
  db.close();
  return result;
}
