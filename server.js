import express from "express";
import path from "path";
import {
  getAllArticulos,
  createArticulo,
  getArticuloById,
  updateArticulo,
  deleteArticulo,
} from "./model.articulos.js";
import { getAllVentas, createVenta } from "./model.ventas.js";
import { getAllProveedores, createProveedor } from "./model.proveedores.js";
import { getAllCategorias } from "./model.categorias.js";

// Configuración del servidor
const PORT = process.env.PORT || 3000;
const mydb = "inventario.db";

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

// Rutas API para artículos
app.get("/articulos", async (req, res) => {
  try {
    const articulos = await getAllArticulos(mydb);
    res.json(articulos);
  } catch (error) {
    console.error("Error al obtener artículos:", error);
    res.status(500).json({ error: "Error interno" });
  }
});

app.post("/articulos", async (req, res) => {
  const { nombre, categoria_id, precio, stock } = req.body;

  if (!nombre || !categoria_id || !precio || !stock) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  try {
    const result = await createArticulo(mydb, { nombre, categoria_id, precio, stock });
    res.status(201).json({ message: "Artículo registrado exitosamente", result });
  } catch (error) {
    console.error("Error al registrar artículo:", error);
    res.status(500).json({ error: "Error interno" });
  }
});

app.put("/articulos/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const result = await updateArticulo(mydb, id, data);
    if (result.changes) {
      res.json({ message: "Artículo actualizado exitosamente", result });
    } else {
      res.status(404).json({ error: "Artículo no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar artículo:", error);
    res.status(500).json({ error: "Error interno" });
  }
});

app.delete("/articulos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await deleteArticulo(mydb, id);
    if (result.changes) {
      res.json({ message: "Artículo eliminado exitosamente", result });
    } else {
      res.status(404).json({ error: "Artículo no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar artículo:", error);
    res.status(500).json({ error: "Error interno" });
  }
});

// Rutas API para categorías
app.get("/categorias", async (req, res) => {
  try {
    const categorias = await getAllCategorias(mydb);
    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ error: "Error interno" });
  }
});

// Rutas API para ventas
app.get("/ventas", async (req, res) => {
  try {
    const ventas = await getAllVentas(mydb);
    res.json(ventas);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ error: "Error interno" });
  }
});

app.post("/ventas", async (req, res) => {
  const { articulo_id, cantidad, total } = req.body;

  if (!articulo_id || !cantidad || !total) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  try {
    const result = await createVenta(mydb, { articulo_id, cantidad, total });
    res.status(201).json({ message: "Venta registrada exitosamente", result });
  } catch (error) {
    console.error("Error al registrar venta:", error);
    res.status(500).json({ error: "Error interno" });
  }
});

// Rutas API para proveedores
app.get("/proveedores", async (req, res) => {
  try {
    const proveedores = await getAllProveedores(mydb);
    res.json(proveedores);
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    res.status(500).json({ error: "Error interno" });
  }
});

app.post("/proveedores", async (req, res) => {
  const { nombre, telefono, correo, direccion } = req.body;

  if (!nombre || !telefono || !correo || !direccion) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  try {
    const result = await createProveedor(mydb, { nombre, telefono, correo, direccion });
    res.status(201).json({ message: "Proveedor registrado exitosamente", result });
  } catch (error) {
    console.error("Error al registrar proveedor:", error);
    res.status(500).json({ error: "Error interno" });
  }
});


// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
