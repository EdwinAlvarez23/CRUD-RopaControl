-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS ropa_control;
USE ropa_control;

-- Crear tabla de prendas
CREATE TABLE prendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    talla VARCHAR(10) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    cantidad INT NOT NULL,
    descripcion TEXT
);
