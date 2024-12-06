import Database from "better-sqlite3";

const db = new Database("inventario.db");

// Creación de la tabla "categorias"
const createTableCategorias = `
CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE
);
`;

// Creación de la tabla "articulos"
const createTableArticulos = `
CREATE TABLE IF NOT EXISTS articulos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    categoria_id INTEGER,
    precio REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);
`;

// Creación de la tabla "ventas"
const createTableVentas = `
CREATE TABLE IF NOT EXISTS ventas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    articulo_id INTEGER,
    cantidad INTEGER NOT NULL,
    total REAL,
    FOREIGN KEY (articulo_id) REFERENCES articulos(id)
);
`;

// Creación de la tabla "empleados"
const createTableEmpleados = `
CREATE TABLE IF NOT EXISTS empleados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    contrasena TEXT NOT NULL
);
`;

// Creación de la tabla "proveedores"
const createTableProveedores = `
CREATE TABLE IF NOT EXISTS proveedores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    telefono TEXT,
    correo TEXT,
    direccion TEXT
);
`;

// Ejecutar las consultas de creación de tablas
db.exec(createTableCategorias);
db.exec(createTableArticulos);
db.exec(createTableVentas);
db.exec(createTableEmpleados);
db.exec(createTableProveedores);

console.log("Tablas creadas correctamente.");

// Cerrar la conexión
db.close();
