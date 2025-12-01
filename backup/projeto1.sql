-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: projeto1
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cadastroveiculo`
--

DROP TABLE IF EXISTS `cadastroveiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cadastroveiculo` (
  `id_veiculo` int NOT NULL AUTO_INCREMENT,
  `proprietario` varchar(50) NOT NULL,
  `placa` varchar(10) NOT NULL,
  `modelo` varchar(30) NOT NULL,
  `numVagas` int DEFAULT NULL,
  `torre` varchar(30) NOT NULL,
  `apartamento` varchar(30) NOT NULL,
  PRIMARY KEY (`id_veiculo`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cadastroveiculo`
--

LOCK TABLES `cadastroveiculo` WRITE;
/*!40000 ALTER TABLE `cadastroveiculo` DISABLE KEYS */;
INSERT INTO `cadastroveiculo` VALUES (3,'Kleber','GIP3344','Up TSI',325,'7','34'),(4,'Juliana','GEP4A22','byd song',10,'7','34'),(5,'Raissa','GOA2F33','Ram',250,'10','20'),(6,'Carlos','ABC8762','Gol G5',120,'30','22'),(7,'Luciana','ABR4S23','Corolla',20,'5','13'),(8,'Carolina','AVR2D52','nissan gtr',16,'10','5'),(9,'Erik','YGE5E21','Ford K',78,'5','8'),(10,'Abadia','HBG2L33','Etios',115,'10','10'),(11,'Roberto','JVR3J33','S10',63,'8','15'),(12,'Arthur','JKE3F58','Pulse',17,'8','14'),(13,'Joaquin','HJN1258','Uno',28,'14','2'),(14,'Vanessa','JVA8542','Hilux',64,'8','10'),(15,'Karolina','HJW8421','Fusca',30,'3','10'),(16,'Kaio','SFE8542','Kwid',54,'3','5'),(17,'Virginia','JMA8525','Land Rover',389,'9','25'),(18,'Ana Castela','JSW5A22','Ford F-150',269,'4','30'),(19,'Zé Felipe','VAC4582','Celta',146,'9','14');
/*!40000 ALTER TABLE `cadastroveiculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `senha` varchar(30) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `cargo` varchar(30) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'porteiroValdo@hotmail.com','1234','Valdo','123.456.789-00','Porteiro'),(2,' juAdmin@hotmail.com','1234','Juliana','857.066.201-72','Administradora'),(3,'klebersindico@hotmail.com','1234','Kleber','895.962.691-00','Síndico');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-26 20:06:11
