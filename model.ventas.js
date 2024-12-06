import Database from "better-sqlite3";

// Función para obtener todas las ventas
export function getAllVentas(mydb) {
    try {
      const db = new Database(mydb);
      const query = `
        SELECT 
            ventas.id, /* Sin alias */
            ventas.articulo_id, 
            articulos.nombre AS articulo_nombre, 
            ventas.cantidad, 
            ventas.total
        FROM ventas
        JOIN articulos ON ventas.articulo_id = articulos.id;
        `;
      const ventas = db.prepare(query).all();
      db.close();
      return ventas;
    } catch (error) {
      console.error("Error al obtener todas las ventas:", error.message);
      throw new Error("Error al obtener todas las ventas");
    }
  }

// Función para obtener una venta por ID
export function getVentaById(mydb, id) {
  try {
    const db = new Database(mydb);
    const query = "SELECT * FROM ventas WHERE id = ?;";
    const venta = db.prepare(query).get(id);
    db.close();

    if (!venta) {
      throw new Error(`No se encontró una venta con el ID ${id}`);
    }

    return venta;
  } catch (error) {
    console.error("Error al obtener la venta por ID:", error.message);
    throw new Error("Error al obtener la venta por ID");
  }
}

// Función para crear una nueva venta
export function createVenta(mydb, data) {
  const db = new Database(mydb);

  try {
    // Verificar si el artículo existe
    const getArticuloQuery = "SELECT nombre, stock FROM articulos WHERE id = ?;";
    const articulo = db.prepare(getArticuloQuery).get(data.articulo_id);

    if (!articulo) {
      throw new Error("Artículo no encontrado");
    }

    // Verificar que el stock sea suficiente
    if (articulo.stock < data.cantidad) {
      throw new Error("Stock insuficiente");
    }

    // Insertar la nueva venta
    const insertVentaQuery = `
      INSERT INTO ventas (articulo_id, cantidad, total)
      VALUES (@articulo_id, @cantidad, @total);
    `;
    db.prepare(insertVentaQuery).run(data);

    // Actualizar el stock en la tabla de artículos
    const updateStockQuery = `
      UPDATE articulos
      SET stock = stock - @cantidad
      WHERE id = @articulo_id;
    `;
    db.prepare(updateStockQuery).run(data);

    db.close();
    return { success: true, message: "Venta registrada exitosamente" };
  } catch (error) {
    db.close();
    console.error("Error al crear una nueva venta:", error.message);
    throw new Error("Error al crear una nueva venta");
  }
}

// Función para eliminar una venta
export function deleteVenta(mydb, id) {
  try {
    const db = new Database(mydb);
    const query = "DELETE FROM ventas WHERE id = ?;";
    const result = db.prepare(query).run(id);
    db.close();

    if (result.changes === 0) {
      throw new Error(`No se encontró una venta con el ID ${id} para eliminar`);
    }

    return { success: true, message: "Venta eliminada exitosamente" };
  } catch (error) {
    console.error("Error al eliminar la venta:", error.message);
    throw new Error("Error al eliminar la venta");
  }
}
