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
-- Estructura de tabla para la tabla `asesores`
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
  `name` varchar(200),
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

-- Estructura de tabla para la tabla `piercings`
--

CREATE TABLE `piercing` (
  `id` int(11) NOT NULL,
  `width` varchar(45) NOT NULL,
  `piercing` FLOAT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------


-- Estructura de tabla para la tabla `corte`
--

CREATE TABLE `corte` (
  `id` int(11) NOT NULL,
  `width` varchar(45) NOT NULL,
  `Ac. H.R` FLOAT NOT NULL,
  `Ac. C.R` FLOAT NOT NULL,
  `Ac. Inox. 304` FLOAT NOT NULL,
  `Ac. Inox. 316` FLOAT NOT NULL,
  `Ac. Inox. 430` FLOAT NOT NULL,
  `Galv.` FLOAT NOT NULL,
  `Alum.` FLOAT NOT NULL,
  `Bronce` FLOAT NOT NULL,
  `Cobre` FLOAT NOT NULL,
  `Latón` FLOAT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `material`
--

CREATE TABLE `material` (
  `id` int(11) NOT NULL,
  `width` varchar(45) NOT NULL,
  `Ac. H.R` FLOAT NOT NULL,
  `Ac. C.R` FLOAT NOT NULL,
  `Ac. Inox. 304` FLOAT NOT NULL,
  `Ac. Inox. 316` FLOAT NOT NULL,
  `Ac. Inox. 430` FLOAT NOT NULL,
  `Galv.` FLOAT NOT NULL,
  `Alum.` FLOAT NOT NULL,
  `Bronce` FLOAT NOT NULL,
  `Cobre` FLOAT NOT NULL,
  `Latón` FLOAT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------


-- Estructura de tabla para la tabla `cotizacion`
--

CREATE TABLE `cotizacion` (
  `id` int(15) NOT NULL,
  `num`  INT(10) NOT NULL,
  `client` varchar(100),
  `fecha` varchar(20),
  `validez` varchar(100),
  `entrega` varchar(100),
  `condiciones` varchar(100),
  `estado` varchar(100),
  `aprobacion` varchar(30),
  `proyecto` varchar(100),
  `pago` varchar(100),
  `transporte` varchar(100),
  `materiales` varchar(100),
  `asesor` varchar(100),
  `observ1` TEXT,
  `observ2` TEXT,
  `aprob` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

-- Estructura de tabla para la tabla `cotizacion_datos`
--

CREATE TABLE `cotizacion_datos` (
  `id` int(15) NOT NULL,
  `num`  INT(10) NOT NULL,
  `cantidad` INT(10),
  `descripcion` TEXT,
  `precio` FLOAT,
  `material` TEXT,
  `espesor` TEXT,
  `perimetroautocad` FLOAT,
  `factorcorte` FLOAT,
  `perimetro` FLOAT,
  `largoautocad` FLOAT,
  `anchoautocad` FLOAT,
  `factorarea` FLOAT,
  `area` FLOAT,
  `piercings` INT(10),
  `dobleces` INT(10),
  `longdoblez` FLOAT,
  `conmaterial` varchar(10)

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

ALTER TABLE `piercing`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `piercing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `corte`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `corte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `material`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `material`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

  ALTER TABLE `cotizacion`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `cotizacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `cotizacion_datos`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `cotizacion_datos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

----------------------------------------------------------

INSERT INTO asesores(id, name, is_admin, password) VALUES (1,'Diego Alberto Restrepo', 1, '123456');
INSERT INTO asesores(id, name, is_admin, password) VALUES (2,'Juan Diego Arboleda', 0, '123456');
INSERT INTO asesores(id, name, is_admin, password) VALUES (3,'Juan Fernando Castro', 0, '123456');
INSERT INTO asesores(id, name, is_admin, password) VALUES (4,'Juan David Rivera', 0, '123456');

INSERT INTO clientes(id, client, name, name2, NIT, CC, direction, direction_send, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES (1,'ACRRIN MADERA CON DISEÑO - ESPACIO AL CUADRADO','Valentina Cano', '-', '900340840','-', 'CR 42 75 83 LC 205', 'CR 42 75 83 LC 205', '3125783', '3205777752', '-', 'espacio2ventas@gmail.com', 'acrrincamilo@gmail.com','-','-','-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('ALDIMEBER GARCÍA', '98538528', 'Aldimeber García', '-', 'Cl. 49 #17C-80, Apto 1916', '3006719286', '-', '-', '-', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('ALFARERA SANTA RITA S.A', '890900163-3', 'Erica Yulieth Calderon P', 'JOHN FREDY MONTAÑO', 'CL 28 CR 87 33 IN 170 A', '3012695679', '604 2388052', '-', 'facturacionalfarerasantarita@gmail.com', 'compras@alfarerasantarita.com', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('ANL INGENIERÍA S.A.S.', '901.152.569-9', 'Aroldo Navarrete López', '-', 'Cr. 97 A #68 C - 19, Int. 303', '3007846913', '3182706010', '-', 'anl7808@yahoo.es', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('CALORTEC S.A.S.', '900352670-1', 'Carlos Arturo Correa Castaño', '-', 'Calle 70 #55-70', '604 3722566', '3002798550', '-', 'calortec.comercial@gmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('CARLOS CORREA INGENIERÍA S.A.S.', '900898573-7', 'Carlos Andrés Correa Díaz', '-', 'CL 67 SUR 46 27 IN 201', '604 3012563', '3174307216', '-', 'carlosandres78@hotmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('CDI EXHIBICIONES S.A.S.', '811025629-2', 'Erika Velásquez', '-', 'km 27 Autopista Medellín - Bogotá', '604 4448636', '3206902176', '-', 'facturacion@cdiexhibiciones.co', 'gerencia@cdiexhibiciones.co', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('CERVECERÍA UNIÓN S.A.', '890.900.168-1', 'Ing. Andrés Guerra', '-', 'Cra. 50A #39-38, Itagüí', '604 3689000', '3016997672', '-', 'Union.fe@ab-inbev.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('CIELOTEK INDUSTRIAL', '800122620-2', 'FRANCISCO JAVIER ZULOAGA OCHOA', '-', 'CL 6 SUR 50 A 37', '604 2551100', '-', '-', 'suministros@cielotekindustrial.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('CJ TEXTILES S.A.S', '890923200-7', 'Juan Fernando Aristizabal', '-', 'CL 53 CR 45 18 OF 702', '604 2514829', '3195858036', '-', 'cjtextiles@cjtextiles.com.co', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('COMERCIALIZADORA DELFIN S.A', '811026729-5', 'Angélica Valencia', '-', 'CR 54 29 C 96', '604 3222809', '-', '-', 'facturae@delco.com.co', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('COMPAÑÍA DE EMPAQUES S.A', '890900285-3', 'PEDRO MIGUEL ESTRADA LONDOÑO', '-', 'CR 42 86 25', '604 3658888', '-', '-', 'epq.imp@ciaempaques.com.co', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('CONSORCIO PARQUE BIBLIOTECA 2021', '901550897-7', 'Jorga Andrés franco', '-', 'CL 6 SUR 43 A 96 OF 406', '4482934', '3016763089', '-', 'c.parquebiblioteca2021@gmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('CONSTRUARGO GROUP S.A.S.', '901235789-1', 'FELIPE ANDRÉS ARGOTE GODOY', '', '', '602 5929802', '3145052977', '3107376411', 'construargogroup@gmail.com', '', '', '', '');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('CORTE Y GRAFADO', '800183807-3', 'Laura Serna', 'JUAN FRANCISCO BOTERO', 'CR 52 35-83 P1', '604 4446268 Ext. 108', '3136724401', '604 2620551', 'facturacion@corteygrafado.com', 'laura.serna@corteygrafado.com', '-', '-', '-');
INSERT INTO clientes (client, CC, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('DANIEL TABARES RESTREPO', '1036687452-6', 'DANIEL TABARES RESTREPO', '-', 'CR 42D 50SUR 40', '3006199165', '-', '-', 'dtabaresr@eafit.edu.co', '-', '-', '-', '-');
INSERT INTO clientes (client, CC, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('DANIELA CANO GUERRA', '1040746145-8', 'DANIELA CANO GUERRA', '-', 'CR 53 #64 36', '604 2776685', '3148697405', '-', 'daniela.cano.g19@gmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('DEMETÁLICOS', '8909365601', 'Haney Arboleda Lezcano', '-', 'CALLE 77A # 45A-85 ITAGUI', '604 4480177 Ext. 734', '3168751069', '-', 'auxcompras@demetalicos.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('DEMCO INGENIERIA', '900462716-1', 'Duvan Villaquiran', '-', 'Cra 49 A # 48 sur 60 int 115', '3128800584', '3147748876', '3103998016', 'facturacion@demco.com.co', 'analistacostos@demco.com.co', 'auxcompras@demco.com.co', 'DPINEDO@demco.com.co', 'compras@demco.com.co');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('DIS SOLUCIONES', '1017137505-1', 'Tatiana Quintero Cardona', '-', 'CL 4 A 29 A 135', '604 3229822', '3007120172', '-', 'tquintero@dis.com.co', 'dcreativo@enplanos.com.co', 'facturacion@dis.net.co', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('DSMAQ S.A.S.', '900.526.889-2', 'Andrea del Pilar Alfonso', '-', 'Calle 79 #52D-141, Itagüí', '4486644', '-', '-', 'contabilidaddsmaq@gmail.com', 'Dsmaq@une.net.co', '-', '-', '-');
INSERT INTO clientes (client, CC, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('EDGAR MANTILLA', '-', 'Edgar Mantilla', '-', '-', '3148831277', '-', '-', '-', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('ENERGY360 S.A.S', '900955632-8', 'Hecto Gallego', 'JOSE FERNANDO BOTERO', 'CR 42 54 A 71 BG 101', '604 5600530', '-', '-', 'paula.marin@energy360.com.co', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('ENPLANOS S.A.S.', '901.437.478-1', 'Catalina Pava', '-', 'Cl. 4A #29A-137', '604 3202686', '3007120172', '-', 'dadministrativo@enplanos.com.co', '-', '-', '-', '-');
INSERT INTO clientes (client, CC, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('FABIÁN DANILO GIL ARIAS', '1036939322-1', 'FABIAN DANILO GIL ARIAS', '-', 'transversal 38AA # 59A-231', '313795190', '-', '-', 'danilo.tec90@gmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('FERRAW S.A.S.', '901487246-3', 'Victor Hugo Ramirrez', 'John Montoya', 'CR 48 96 27', '3186490930', '3117620274', '-', 'DibujanteFerraw@outlook.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('FIGURAS METALICAS S.A.S', '900438064-7', 'JUAN DUARTE', '-', 'CL 79 52 D 118', '604 3747410', '3127485949', '-', 'figuracionesmetalicas@gmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('FORINOX NUEVA GENERACIÓN', '900.442.148', 'J. William Pérez', '-', 'Calle 10 #52-53', '2059597', '3016137337', '-', 'forinox@hotmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('FORMAPRESS S.A.S', '900.060.228-3', 'Ing. Carlos Escobar Ospina', '-', 'Pq. Ind.  La Brisuela km 22 Med-Bgtá', '6040953', '3104240243', '-', 'jorge.henao@formapress.com.co', 'comercialformapress@gmail.com', 'natalia.calle@formapress.com.co', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('GRUPO KAMUNI S.A.S', '901591773-8', 'Mauricio Arboleda', '-', 'CR 85 A 77 B B 16', '3012091922', '-', '-', 'grupokamuni@gmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('GRUPO RIOS', '-', 'Jairo Hernan Lopera', '-', '-', '3166915139', '-', '-', '-', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('GRUPO TIERRA S.A.S.', '900.184.007-5', 'Fredy', '-', 'Cr. 55 B #72 A - 74', '601 4182141', '3148298631', '-', 'mroldan2@gmail.com', 'produccion@goesgt.com', 'grupotierra2@gmail.com', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('INCYMEC', '811029727-4', 'Alex Correa', '-', 'CR 51 126 A SUR 102', '3015355758', '-', '-', 'facturacion@incymec.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('INDUSTRIAS GÓMEZ Y CIA LTDA', '890.937.075-3', 'Alonso Gómez', '-', 'Calle 9 #51-100', '2556680', '3113101955', '-', 'indgomez@industriasgomez.com', 'ingenieria@industriasgomez.com', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('INDUSTRIAS LOGI S.A.S', '900.455.485-6', 'David López', '-', 'Calle 37 #42 A - 30', '3772667', '3154802594', '-', 'industriaslogi@yahoo.com.co', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('INDUSTRIAS METALÚRGICAS SAYCAR S.A.S.', '890.915.631', 'Fabio González', '-', 'Cr. 52 #57A - 95, Itagüí', '604 2779347', '3113597213', '-', 'imsaycar@une.net.co', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('INGENIERIA Y ASISTENCIA TECNICA - INASTEC', '800.085.892-1', 'Jhon Jairo Sosa', '-', 'Cr. 79 #42 Sur -26, Local 121', '3370075', '3136831459', '-', 'INASTEC@UNE.NET.CO', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('INGENIOS METALICOS', '901453461-4', 'Edier Zapata', '-', 'CALLE 35 66 B 80 BG 8', '3108548470', '3147939569', '-', 'admon@ingeniosmetalicos.com', 'gerenciaplanta@ingeniosmetalicos.com', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('INOX SERVICE', '-', 'Fredy Escobar', '-', '-', '3206772292', '-', '-', 'inoxservice22@gmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('INSTRUMECOL S.A.S', '890.943.142-3', 'Ing. David Jaramillo', '-', 'Calle 10 #70B - 55', '3416480', '3014319400', '-', 'facturacioninstrumecol@gmail.com', 'instrumecol@gmail.com', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('INTERTANK INGENIERIA S.A.S', '900818647-1', 'Luis Eduardo Alciria Arroyo', '-', 'BRR CAMPESTRE MZ 9 LT 17', '3046494376', '3013193980', '-', 'larroyo19@gmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('INVERSIONES ALIGN S.A.S.', '900.357.775-7', 'Adolfo Aristizabal', '-', 'Calle 8 Sur #43 B-112', '3105055920', '-', '-', 'alao99@yahoo.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('INVERSINOX COLOMBIA S.A.S.', '811.034.230-6', 'Rodolfo Correa', '-', 'Calle 17 #43 F - 131', '4445070', '3217548288', '-', 'facturaelectronica@inversinoxcolombia.com', 'diego.restrepo@inversinoxcolombia.com', 'jhonatan.isaza@inversinoxcolombia.com', '-', '-');
INSERT INTO clientes (client, CC, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('JERÓNIMO PENAGOS GAVIRIA', '1.001.003.788-3', 'Jerónimo Penagos', '-', 'Dg. 75 #2A - 14  CA 112', '3024344144', '-', '-', 'jpenagos@eafit.edu.co', '-', '-', '-', '-');
INSERT INTO clientes (client, CC, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('JHON ALEXANDER ORTEGA', '12170550-1', 'JOHN ALEXANDER ORTEGA MUÑOZ', '-', 'DG 55 42 162', '604 6012776', '-', '-', 'joaortegamu@unal.edu.co', '-', '-', '-', '-');
INSERT INTO clientes (client, CC, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('JORGE ANDRÉS FRANCO', '-', 'Jorge Andrés Franco', '-', '-', '-', '-', '-', 'interbiblioteca.mecanico@gmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, CC, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('JUAN CAMILO - LUISA DUQUE', '-', 'Juan Camilo y Luisa Duque', '-', 'Eafit', '3104587848', '-', '-', '-', '-', '-', '-', '-');
INSERT INTO clientes (client, CC, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('JUAN FERNANDO ARISTIZABAL', '-', 'Juan Fernanado Aristizabal', '-', '-', '3195858036', '-', '-', '-', '-', '-', '-', '-');
INSERT INTO clientes (client, CC, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('JUAN PINEDA', '1.037.647.812', '', '-', '-', '3106167842', '-', '-', '-', '-', '-', '-', '-');
INSERT INTO clientes (client, CC, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('JULIANA GÓMEZ RUIZ', '1094964674-3', 'JULIANA GOMEZ RUIZ', '-', 'Carrera 49 Cl. 7 Sur #50', '3113682037', '-', '-', 'jgomezr11@eafit.Edu.co', '-', '-', '-', '-');
INSERT INTO clientes (client, CC, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('KELLY JHOANA RESTREPO ESPINOSA', '112.847.151-7', '', '-', 'CR 36 C 107 A 28', '3225623002', '-', '-', 'restrepoespinosakelly@gmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('LOS FIERROS', '-', 'Carlos Quiceno', '-', '-', '3004112461', '-', '-', '-', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('MEKANIZANDO S.A.S.', '900.793.681-2', 'Ing. Jorge Castro', '-', 'Calle 30 #41-90, Itagüí', '4481158', '3176370889', '-', 'facturacionelectronica@mekanizando.com', 'comercial@mekanizando.com', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('MONTAJES MYD S.A.S', '901483513-7', 'Diego García', '-', 'CL 50 53 05 AP 202', '3176386357', '-', '-', 'montajesmydsas@gmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('NOVASUIN', '900749094-2', 'Julio Restrepo', '-', 'CL 6 50 136', '3212742771', '604 4441190', '3176446687', 'facturas@novasuin.com', 'gerencia.comercial@novasuin.com', 'asistente.frp@novasuin.com', '-', '-');
INSERT INTO clientes (client, CC, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('ÓSCAR LUIS HINCAPIÉ MONTOYA', '70.098.984', 'Abraham', '-', 'Cr. 58 #79 - 101, Santa María', '604 2940238', '3146699841', '-', 'oscarhicapiem@hotmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('PARROQUIA EL DIVINO ROSTRO', '811016868-8', 'Padre Orlando Gallego', '-', 'CR 56 A 55 A 25 SEC EL TABLAZO', '604 3716531', '-', '-', 'parroquiaeldivinorostro75@yahoo.es', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('POLIMAQUINADOS S.A.S', '901.359.976-3', 'Steven', '-', 'Cl. 137 Sur #65, Vda. La Chuscalita', '601 2784510', '3194122075', '-', 'polimaquinados_@hotmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('PRISMATECH EMS S.A.S.', '901520236', 'Andrés Ochoa', '-', 'Cl 78  #52D - 136', '3733333', '3176470974', '-', 'contabilidad@pwems.com.co', 'coordinador@pwems.com.co', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('REPUESTOS Y SERVICIOS METALMECÁNICOS', '901214193', 'Héctor Mejía', '-', 'Calle 31 51 97 in 100', '3006216054', '-', '-', 'hectormejiavasquez@gmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('RINOX DYM S.A.S.', '900.663.981-1', 'Miryam Cardona', '-', 'Bello Cr. 49 #64 - 6', '4517778', '3175139142', '-', 'siesaferecepcion@siesa.com', 'ventas1rinox@hotmail.com', 'miryamcventas@hotmail.com', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('ROCKWELL INGENIERIA S.A.S', '900369919-2', 'RICARDO ANDRES GARCIA SARMIENTO', '-', 'AV BOYACA 64 H 54', '604 4632673', '-', '-', 'rockwell_ingenieria@hotmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, CC, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('SANTIAGO VERGARA', '1037670133-0', 'Santiago Vergara', '-', 'CR 25A 148 20', '3005048243', '-', '-', 'santiagovergarabecerra@gmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('SERVICIOS INDUSTRIALES TEC S.A (SITEC)', '800217279-2', 'Sebastian López', '-', 'CL 37 42 A 30 ITAGUI', '3017769340', '3183919991', '-', 'serviciosindustrialestec@gmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('TALLER INDUSTRIAL DASEL', '900.717.335', 'Fernando Gil', '-', 'Calle 38 A - #50A - 56', '604 5578442', '3182205110', '-', 'industrialdasel@daselfg.com.co', 'ramirezerica03@gmail.com', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('TALLER INDUSTRIAL H.Q', '900723720-2', 'HECTOR HERNAN QUIROS GOMEZ', '-', 'CL 38 A 50 A 70', '604 2067181', '3176565053', '-', 'maquiros4@hotmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('TALLER INDUSTRIAL PRECISION MDJ LTDA', '800125514-3', 'Juan Carlos Duarte', '-', 'CL 78 52 D 126 IN 111', '604 3740000', '3136466107', '604 3727224', 'asistente@dinamicamecanica.com.co', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('TECNIGAL LTDA', '890.914.432-0', 'Ing. Jaime Carmona', '-', 'Cl.29C #55-82, Medellín', '2352622', '3223599923', '-', 'recepcionfe@tecnigal.com.co', 'contabilidad@tecnigal.com.co', 'tecnigal@tecnigal.com.co', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('TERMALTEC S.A', '811.043.669-4', 'Ing. Luz María Ponce', '-', 'Cr. 42A #24 Sur - 34', '604 4440004', '3147915316', '-', 'facturacionelectronica@termaltec.com', 'contabilidad@termaltec.com', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('VISION 2020 CONSTRUCTORA', '901397654-9', 'DIEGO ALBERTO AGUDELO GUTIERREZ', '-', 'CALLEL 75 SUR 46 34', '3106603220', '3183692280', '-', 'vision2020constructora@gmail.com', '-', '-', '-', '-');
INSERT INTO clientes (client, CC, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('YENDERSON GAVIRIA', '-', 'Yenderson Gaviria', '-', '-', '3137938652', '-', '-', '-', '-', '-', '-', '-');
INSERT INTO clientes (client, NIT, name, name2, direction, telefono1, telefono2, telefono3, billing_email, email1, email2, email3, email4) VALUES ('WOM TOOLS S.A.S', '900509752-1', 'Weimar Ortiz', '-', 'CL 30 75 14', '604 6141203', '-', '-', 'wom.tools@gmail.com', '-', '-', '-', '-');


INSERT INTO doblez(id, width, fold) VALUES (1,"Cal. 20 (0.9 mm)", 1400);
INSERT INTO doblez(id, width, fold) VALUES (2,"Cal. 19 (1 mm)", 1400);
INSERT INTO doblez(id, width, fold) VALUES (3,"Cal. 18 (1.2 mm)", 1600);
INSERT INTO doblez(id, width, fold) VALUES (4,"Cal. 16 (1.5 mm)", 1800);
INSERT INTO doblez(id, width, fold) VALUES (5,"Cal. 14 (1.9 mm)", 2300);
INSERT INTO doblez(id, width, fold) VALUES (6,"Cal. 13 (2.2 mm)", 2400);
INSERT INTO doblez(id, width, fold) VALUES (7,"Cal. 12 (2.6 mm)", 3000);
INSERT INTO doblez(id, width, fold) VALUES (8,"Cal. 11 (3.0 mm)", 3500);
INSERT INTO doblez(id, width, fold) VALUES (9,"Cal. 10 (3.4 mm)", 3500);
INSERT INTO doblez(id, width, fold) VALUES (10,"Cal. 9 (3.8 mm)", 4000);
INSERT INTO doblez(id, width, fold) VALUES (11,"Cal. 8 (4.2 mm)", 4500);
INSERT INTO doblez(id, width, fold) VALUES (12,"Cal. 7 (4.5 mm)", 5000);
INSERT INTO doblez(id, width, fold) VALUES (13,"Cal. 6 (4.9 mm)", 5500);
INSERT INTO doblez(id, width, fold) VALUES (14,"Cal. 5 (5.3 mm)", 5500);
INSERT INTO doblez(id, width, fold) VALUES (15,"Cal. 4 (5.7 mm)", 6000);
INSERT INTO doblez(id, width, fold) VALUES (16,"Cal. 3 (6.0 mm)", 7000);
INSERT INTO doblez(id, width, fold) VALUES (17,"Cal. 1/2", 20000);
INSERT INTO doblez(id, width, fold) VALUES (18,"Cal. 3/8", 10500);
INSERT INTO doblez(id, width, fold) VALUES (19,"Cal. 5/16", 9000);
INSERT INTO doblez(id, width, fold) VALUES (20,"Cal. 1/4", 7000);
INSERT INTO doblez(id, width, fold) VALUES (21,"Cal. 3/16", 5000);
INSERT INTO doblez(id, width, fold) VALUES (22,"Cal. 1/8", 3500);
INSERT INTO doblez(id, width, fold) VALUES (23,"Cal. 1/16", 1800);

INSERT INTO piercing(id, width, piercing) VALUES (1,"Cal. 20 (0.9 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (2,"Cal. 19 (1 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (3,"Cal. 18 (1.2 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (4,"Cal. 16 (1.5 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (5,"Cal. 14 (1.9 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (6,"Cal. 13 (2.2 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (7,"Cal. 12 (2.6 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (8,"Cal. 11 (3.0 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (9,"Cal. 10 (3.4 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (10,"Cal. 9 (3.8 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (11,"Cal. 8 (4.2 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (12,"Cal. 7 (4.5 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (13,"Cal. 6 (4.9 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (14,"Cal. 5 (5.3 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (15,"Cal. 4 (5.7 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (16,"Cal. 3 (6.0 mm)", 70);
INSERT INTO piercing(id, width, piercing) VALUES (17,"Cal. 1/2", 70);
INSERT INTO piercing(id, width, piercing) VALUES (18,"Cal. 3/8", 70);
INSERT INTO piercing(id, width, piercing) VALUES (19,"Cal. 5/16", 70);
INSERT INTO piercing(id, width, piercing) VALUES (20,"Cal. 1/4", 70);
INSERT INTO piercing(id, width, piercing) VALUES (21,"Cal. 3/16", 70);
INSERT INTO piercing(id, width, piercing) VALUES (22,"Cal. 1/8", 70);
INSERT INTO piercing(id, width, piercing) VALUES (23,"Cal. 1/16", 70);

INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (1,"Cal. 20 (0.9 mm)", 3.10, 3.10,  3.7,   3.7,  3.7 ,  3.7,  5.5, 5.5, 5.5, 5.5 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (2,"Cal. 19 (1 mm)", 3.10, 3.10,  3.7,   3.7,  3.7 ,  3.7,  5.5, 5.5, 5.5, 5.5 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (3,"Cal. 18 (1.2 mm)", 3.10, 3.10,  4.3,   4.3,  4.3 ,  4.3,  6.5, 6.5, 6.5, 6.5 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (4,"Cal. 16 (1.5 mm)", 3.10, 3.10,  4.3,   4.3,  4.3 ,  4.3,  6.5, 6.5, 6.5, 6.5 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (5,"Cal. 14 (1.9 mm)", 3.60, 3.60,  4.7,   4.7,  4.7 ,  4.7,  7.0, 7.0, 7.0, 7.0 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (6,"Cal. 13 (2.2 mm)", 4.30, 4.30,  6.8,   6.8,  6.8 ,  6.8,  10.1, 10.1, 10.1, 10.1 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (7,"Cal. 12 (2.6 mm)", 4.30, 4.30,  6.8,   6.8,  6.8 ,  6.8,  10.1, 10.1, 10.1, 10.1 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (8,"Cal. 11 (3.0 mm)", 4.30, 4.30,  6.8,   6.8,  6.8 ,  6.8,  10.1, 10.1, 10.1, 10.1 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (9,"Cal. 10 (3.4 mm)", 5.50, 5.50,  7.4,   7.4,  7.4 ,  7.4,  11.0, 11.0, 11.0, 11.0 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (10,"Cal. 9 (3.8 mm)", 5.50, 5.50,  11.0,   11.0,  11.0 ,  11.0,  16.7, 16.7, 16.7, 16.7 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (11,"Cal. 8 (4.2 mm)", 6.10, 6.10,  14.1,   14.1,  14.1 ,  14.1,  21.2, 21.2, 21.2, 21.2 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (12,"Cal. 7 (4.5 mm)", 7.40, 7.40,  14.1,   14.1,  14.1 ,  14.1,  21.2, 21.2, 21.2, 21.2 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (13,"Cal. 6 (4.9 mm)", 7.40, 7.40,  14.1,   14.1,  14.1 ,  14.1,  21.2, 21.2, 21.2, 21.2 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (14,"Cal. 5 (5.3 mm)", 9.20, 9.20,  20.0,   20.0,  20.0 ,  20.0,  29.5, 29.5, 29.5, 29.5 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (15,"Cal. 4 (5.7 mm)", 9.20, 9.20,  22.1,   22.1,  22.1 ,  22.1,  33.2, 33.2, 33.2, 33.2 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (16,"Cal. 3 (6.0 mm)", 9.20, 9.20,  22.1,   22.1,  22.1 ,  221.0,  33.2, 33.2, 33.2, 33.2 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (17,"Cal. 1/2", 22.00, 22.00,  1230000.0,   1230000.0,  1230000.0 ,  1230000.0,  1845000.0, 1845000.0, 1845000.0, 1845000.0 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (18,"Cal. 3/8", 18.50, 18.50,  34.4,   34.4,  34.4 ,  34.4,  51.7, 51.7, 51.7, 51.7 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (19,"Cal. 5/16", 11.00, 11.00,  28.3,   28.3,  28.3 ,  28.3,  42.4, 42.4, 42.4, 42.4 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (20,"Cal. 1/4", 9.20, 9.20,  22.1,   22.1,  22.1 ,  22.1,  33.2, 33.2, 33.2, 33.2 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (21,"Cal. 3/16", 7.40, 7.40,  14.1,   14.1,  14.1 ,  14.1,  21.2, 21.2, 21.2, 21.2 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (22,"Cal. 1/8", 4.30, 4.30,  6.8,   6.8,  6.8 ,  6.8,  10.1, 10.1, 10.1, 10.1 );
INSERT INTO corte( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (23,"Cal. 1/16", 3.10, 3.10,  4.3,   4.3,  4.3 ,  4.3,  6.5, 6.5, 6.5, 6.5 );

INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (1,"Cal. 20 (0.9 mm)", 0.06, 0.06, 0.27, 0.00, 0.00,  0.07, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (2,"Cal. 19 (1 mm)", 0.00, 0.00, 0.00, 0.00, 0.00,  0.00, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (3,"Cal. 18 (1.2 mm)", 0.08, 0.08, 0.29, 0.00, 0.00,  0.09, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (4,"Cal. 16 (1.5 mm)", 0.09, 0.09, 0.31, 0.00, 0.00,  0.11, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (5,"Cal. 14 (1.9 mm)", 0.12, 0.12, 0.38, 0.00, 0.00,  0.13, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (6,"Cal. 13 (2.2 mm)", 0.00, 0.00, 0.00, 0.00, 0.00,  0.00, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (7,"Cal. 12 (2.6 mm)", 0.15, 0.15, 0.62, 0.00, 0.00,  0.17, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (8,"Cal. 11 (3.0 mm)", 0.18, 0.18, 0.86, 0.00, 0.00,  0.20, 0.68, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (9,"Cal. 10 (3.4 mm)", 0.00, 0.00, 0.00, 0.00, 0.00,  0.00, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (10,"Cal. 9 (3.8 mm)", 0.00, 0.00, 0.00, 0.00, 0.00,  0.00, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (11,"Cal. 8 (4.2 mm)", 0.00, 0.00, 0.00, 0.00, 0.00,  0.00, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (12,"Cal. 7 (4.5 mm)", 0.28, 0.28, 1.48, 0.00, 0.00,  0.32, 1.08, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (13,"Cal. 6 (4.9 mm)", 0.00, 0.00, 0.00, 0.00, 0.00,  0.00, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (14,"Cal. 5 (5.3 mm)", 0.00, 0.00, 0.00, 0.00, 0.00,  0.00, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (15,"Cal. 4 (5.7 mm)", 0.00, 0.00, 0.00, 0.00, 0.00,  0.00, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (16,"Cal. 3 (6.0 mm)", 0.41, 0.41, 1.97, 0.00, 0.00,  0.47, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (17,"Cal. 1/2", 1.00, 1.00, 0.00, 0.00, 0.00,  1.15, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (18,"Cal. 3/8", 0.70, 0.70, 3.82, 0.00, 0.00,  0.81, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (19,"Cal. 5/16", 0.63, 0.63, 3.41, 0.00, 0.00,  0.73, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (20,"Cal. 1/4", 0.43, 0.43, 2.09, 0.00, 0.00,  0.50, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (21,"Cal. 3/16", 0.28, 0.28, 1.48, 0.00, 0.00,  0.32, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (22,"Cal. 1/8", 0.22, 0.22, 0.36, 0.00, 0.00,  0.25, 0.00, 0.00, 0.00, 0.00);
INSERT INTO material( `id`, `width`, `Ac. H.R`, `Ac. C.R`, `Ac. Inox. 304`, `Ac. Inox. 316`, `Ac. Inox. 430`, `Galv.`, `Alum.`, `Bronce`, `Cobre`, `Latón`) VALUES (23,"Cal. 1/16", 0.11, 0.11, 0.00, 0.00, 0.00,  0.13, 0.00, 0.00, 0.00, 0.00);


