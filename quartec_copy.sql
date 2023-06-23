-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-04-2023 a las 04:36:14
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0


-- -----------------------------------------------------
-- Schema quartec database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `quartec_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `quartec_db` ;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `quartec_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `asesores` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_admin` int(11) NOT NULL,
  `password` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `client` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `name2` varchar(200),
  `NIT` varchar(200),
  `CC` varchar(200),
  `direction` varchar(200),
  `direction_send` varchar(200),
  `telefono1` varchar(200),
  `telefono2` varchar(200),
  `telefono3` varchar(200),
  `billing_email` varchar(200),
  `email1` varchar(200),
  `email2` varchar(200),
  `email3` varchar(200),
  `email4` varchar(200)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

----------------------------------------------------------

-- Estructura de tabla para la tabla `costos dobleces`
--

CREATE TABLE `doblez` (
  `id` int(11) NOT NULL,
  `width` varchar(45) NOT NULL,
  `fold` FLOAT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------


ALTER TABLE `asesores`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `asesores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `doblez`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `doblez`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

----------------------------------------------------------

INSERT INTO asesores(id, name, is_admin, password) VALUES (1,'Diego Alberto Restrepo', 1, '123456');
INSERT INTO asesores(id, name, is_admin, password) VALUES (2,'Juan Diego Arboleda', 0, '123456');
INSERT INTO asesores(id, name, is_admin, password) VALUES (3,'Juan Fernando Castro', 0, '123456');
INSERT INTO asesores(id, name, is_admin, password) VALUES (4,'Juan David Rivera', 0, '123456');

INSERT INTO clientes(id, client, name, name2, NIT, CC, direction, direction_send, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES (1,'ACRRIN MADERA CON DISEÑO - ESPACIO AL CUADRADO','Valentina Cano', '-', '900340840','-', 'CR 42 75 83 LC 205', 'CR 42 75 83 LC 205', '3125783', '3205777752', '-', 'espacio2ventas@gmail.com', 'acrrincamilo@gmail.com','-','-','-');
INSERT INTO clientes(id, client, name, name2, NIT, CC, direction, direction_send, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES (2,'ACRRIN MADERA CON DISEÑO - ESPACIO AL CUADRADO','Valentina Cano', '-', '900340840','-', 'CR 42 75 83 LC 205', 'CR 42 75 83 LC 205', '3125783', '3205777752', '-', 'espacio2ventas@gmail.com', 'acrrincamilo@gmail.com','-','-','-');
INSERT INTO clientes(id, client, name, name2, NIT, CC, direction, direction_send, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES (3,'ACRRIN MADERA CON DISEÑO - ESPACIO AL CUADRADO','Valentina Cano', '-', '900340840','-', 'CR 42 75 83 LC 205', 'CR 42 75 83 LC 205', '3125783', '3205777752', '-', 'espacio2ventas@gmail.com', 'acrrincamilo@gmail.com','-','-','-');
INSERT INTO clientes(id, client, name, name2, NIT, CC, direction, direction_send, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES (4,'ACRRIN MADERA CON DISEÑO - ESPACIO AL CUADRADO','Valentina Cano', '-', '900340840','-', 'CR 42 75 83 LC 205', 'CR 42 75 83 LC 205', '3125783', '3205777752', '-', 'espacio2ventas@gmail.com', 'acrrincamilo@gmail.com','-','-','-');

INSERT INTO doblez(id, width, fold) VALUES (1,"Cal. 20 (0,9mm)", 1400);
INSERT INTO doblez(id, width, fold) VALUES (2,"Cal. 19 (1mm)", 1400);
INSERT INTO doblez(id, width, fold) VALUES (3,"Cal. 18 (1,2mm)", 1600);
INSERT INTO doblez(id, width, fold) VALUES (4,"Cal. 16 (1,5mm)", 1800);
INSERT INTO doblez(id, width, fold) VALUES (5,"Cal. 14 (1,9mm)", 2300);
INSERT INTO doblez(id, width, fold) VALUES (6,"Cal. 13 (2,2mm)", 2400);
INSERT INTO doblez(id, width, fold) VALUES (7,"Cal. 12 (2,6mm)", 3000);
INSERT INTO doblez(id, width, fold) VALUES (8,"Cal. 11 (3mm)", 3500);
INSERT INTO doblez(id, width, fold) VALUES (9,"Cal. 10 (3,4mm)", 3500);
INSERT INTO doblez(id, width, fold) VALUES (10,"Cal. 9 (3,8mm)", 4000);
INSERT INTO doblez(id, width, fold) VALUES (11,"Cal. 8 (4,2mm)", 4500);
INSERT INTO doblez(id, width, fold) VALUES (12,"Cal. 7 (4,5mm)", 5000);
INSERT INTO doblez(id, width, fold) VALUES (13,"Cal. 6 (4,9mm)", 5500);
INSERT INTO doblez(id, width, fold) VALUES (14,"Cal. 5 (5,3mm)", 5500);
INSERT INTO doblez(id, width, fold) VALUES (15,"Cal. 4 (5,7mm)", 6000);
INSERT INTO doblez(id, width, fold) VALUES (16,"Cal. 3 (6mm)", 7000);
INSERT INTO doblez(id, width, fold) VALUES (17,"Cal. 3/4 (19mm)", 1000000);
INSERT INTO doblez(id, width, fold) VALUES (18,"Cal. 5/8", 1000000);
INSERT INTO doblez(id, width, fold) VALUES (19,"Cal. 1/2", 100000);
INSERT INTO doblez(id, width, fold) VALUES (20,"Cal. 3/8", 10500);
INSERT INTO doblez(id, width, fold) VALUES (21,"Cal. 5/16", 9000);
INSERT INTO doblez(id, width, fold) VALUES (22,"Cal. 1/4", 7000);
INSERT INTO doblez(id, width, fold) VALUES (23,"Cal. 3/16", 5000);
INSERT INTO doblez(id, width, fold) VALUES (24,"Cal. 1/8", 3500);
INSERT INTO doblez(id, width, fold) VALUES (25,"Cal. 1/16", 1800);












