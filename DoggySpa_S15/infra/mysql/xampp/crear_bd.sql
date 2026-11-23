-- Ejecutar desde phpMyAdmin con cuenta administradora de XAMPP.
-- Si aparece ERROR Aria #1030/176: detener; respaldar datos y revisar log MariaDB.
CREATE DATABASE IF NOT EXISTS doggyspa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'doggyspa'@'localhost' IDENTIFIED BY 'doggyspa123';
GRANT ALL PRIVILEGES ON doggyspa.* TO 'doggyspa'@'localhost';
CREATE USER IF NOT EXISTS 'doggyspa'@'127.0.0.1' IDENTIFIED BY 'doggyspa123';
GRANT ALL PRIVILEGES ON doggyspa.* TO 'doggyspa'@'127.0.0.1';
-- Comprobar cuentas y permisos; no tocar tablas internas del servidor.
SHOW GRANTS FOR 'doggyspa'@'localhost';
SHOW GRANTS FOR 'doggyspa'@'127.0.0.1';
