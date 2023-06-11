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
  `name2` varchar(200) DEFAULT NULL,
  `NIT` varchar(200) DEFAULT NULL,
  `CC` varchar(200) DEFAULT NULL,
  `direction` varchar(200) DEFAULT NULL,
  `direction_send` varchar(200) DEFAULT NULL,
  `telefono1` varchar(200) DEFAULT NULL,
  `telefono2` varchar(200) DEFAULT NULL,
  `telefono3` varchar(200) DEFAULT NULL,
  `billing_email` varchar(200) DEFAULT NULL,
  `email1` varchar(200) DEFAULT NULL,
  `email2` varchar(200) DEFAULT NULL,
  `email3` varchar(200) DEFAULT NULL,
  `email4` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

----------------------------------------------------------

ALTER TABLE `asesores`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

----------------------------------------------------------

INSERT INTO asesores(id, name, is_admin, password) VALUES (1,'Diego Alberto Restrepo', 1, '123456');
INSERT INTO asesores(id, name, is_admin, password) VALUES (2,'Juan Diego Arboleda', 0, '123456');
INSERT INTO asesores(id, name, is_admin, password) VALUES (3,'Juan Fernando Castro', 0, '123456');
INSERT INTO asesores(id, name, is_admin, password) VALUES (4,'Juan David Rivera', 1, '123456');

INSERT INTO clientes(id, client, name, name2, NIT, CC, direction, direction_send, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES (1,'ACRRIN MADERA CON DISEÑO - ESPACIO AL CUADRADO','Valentina Cano', '-', '900340840','-', 'CR 42 75 83 LC 205', 'CR 42 75 83 LC 205', '3125783', '3205777752', '-', 'espacio2ventas@gmail.com', 'acrrincamilo@gmail.com','-','-','-');
INSERT INTO clientes(id, client, name, name2, NIT, CC, direction, direction_send, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES (2,'ACRRIN MADERA CON DISEÑO - ESPACIO AL CUADRADO','Valentina Cano', '-', '900340840','-', 'CR 42 75 83 LC 205', 'CR 42 75 83 LC 205', '3125783', '3205777752', '-', 'espacio2ventas@gmail.com', 'acrrincamilo@gmail.com','-','-','-');
INSERT INTO clientes(id, client, name, name2, NIT, CC, direction, direction_send, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES (3,'ACRRIN MADERA CON DISEÑO - ESPACIO AL CUADRADO','Valentina Cano', '-', '900340840','-', 'CR 42 75 83 LC 205', 'CR 42 75 83 LC 205', '3125783', '3205777752', '-', 'espacio2ventas@gmail.com', 'acrrincamilo@gmail.com','-','-','-');
INSERT INTO clientes(id, client, name, name2, NIT, CC, direction, direction_send, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES (4,'ACRRIN MADERA CON DISEÑO - ESPACIO AL CUADRADO','Valentina Cano', '-', '900340840','-', 'CR 42 75 83 LC 205', 'CR 42 75 83 LC 205', '3125783', '3205777752', '-', 'espacio2ventas@gmail.com', 'acrrincamilo@gmail.com','-','-','-');