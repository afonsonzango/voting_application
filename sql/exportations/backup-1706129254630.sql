-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: voting_appplication
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

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
-- Table structure for table `battles`
--

DROP TABLE IF EXISTS `battles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `battles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `warier_id1` tinyint NOT NULL,
  `warier_id2` tinyint NOT NULL,
  `warier_votes_1` int DEFAULT NULL,
  `warier_votes_2` int DEFAULT NULL,
  `keySerie_1` tinyint NOT NULL,
  `keySerie_2` tinyint NOT NULL,
  `keySerie_3` tinyint NOT NULL,
  `keySerie_4` tinyint NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battles`
--

LOCK TABLES `battles` WRITE;
/*!40000 ALTER TABLE `battles` DISABLE KEYS */;
INSERT INTO `battles` VALUES (1,38,39,0,0,16,17,0,0,1);
/*!40000 ALTER TABLE `battles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credential`
--

DROP TABLE IF EXISTS `credential`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credential` (
  `id` int NOT NULL AUTO_INCREMENT,
  `series_id` int DEFAULT NULL,
  `content` int DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `series_id` (`series_id`),
  CONSTRAINT `credential_ibfk_1` FOREIGN KEY (`series_id`) REFERENCES `series` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12957 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credential`
--

LOCK TABLES `credential` WRITE;
/*!40000 ALTER TABLE `credential` DISABLE KEYS */;
INSERT INTO `credential` VALUES (12921,16,73973810,0,'2024-01-23 22:35:41'),(12922,16,94753339,0,'2024-01-23 22:35:41'),(12923,16,69185923,0,'2024-01-23 22:35:41'),(12924,16,77878508,0,'2024-01-23 22:35:41'),(12925,16,55833286,0,'2024-01-23 22:35:41'),(12926,16,73336664,0,'2024-01-23 22:35:41'),(12927,16,52459532,0,'2024-01-23 22:35:41'),(12928,16,91357355,0,'2024-01-23 22:35:41'),(12929,16,25905077,0,'2024-01-23 22:35:41'),(12930,16,59003789,0,'2024-01-23 22:35:41'),(12931,16,46692638,0,'2024-01-23 22:35:41'),(12932,16,29619691,0,'2024-01-23 22:35:41'),(12933,17,29756890,0,'2024-01-23 22:47:46'),(12934,17,64520028,0,'2024-01-23 22:47:46'),(12935,17,50752977,0,'2024-01-23 22:47:46'),(12936,17,83558189,0,'2024-01-23 22:47:46'),(12937,17,39591803,0,'2024-01-23 22:47:46'),(12938,17,94399466,0,'2024-01-23 22:47:46'),(12939,17,87261765,0,'2024-01-23 22:47:46'),(12940,17,21838959,0,'2024-01-23 22:47:46'),(12941,17,15945748,0,'2024-01-23 22:47:46'),(12942,17,54262320,0,'2024-01-23 22:47:46'),(12943,17,55595664,0,'2024-01-23 22:47:46'),(12944,17,23506648,0,'2024-01-23 22:47:46'),(12945,17,99891417,0,'2024-01-23 22:47:46'),(12946,17,91964887,0,'2024-01-23 22:47:46'),(12947,17,62407429,0,'2024-01-23 22:47:46'),(12948,17,73065716,0,'2024-01-23 22:47:46'),(12949,17,58417645,0,'2024-01-23 22:47:46'),(12950,17,39454736,0,'2024-01-23 22:47:46'),(12951,17,88856818,0,'2024-01-23 22:47:46'),(12952,17,81076065,0,'2024-01-23 22:47:46'),(12953,17,84196080,0,'2024-01-23 22:47:46'),(12954,17,15575380,0,'2024-01-23 22:47:46'),(12955,17,56660344,0,'2024-01-23 22:47:46'),(12956,17,57898802,0,'2024-01-23 22:47:46');
/*!40000 ALTER TABLE `credential` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `key_relations`
--

DROP TABLE IF EXISTS `key_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `key_relations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `series_id` int NOT NULL,
  `voting_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `key_relations`
--

LOCK TABLES `key_relations` WRITE;
/*!40000 ALTER TABLE `key_relations` DISABLE KEYS */;
/*!40000 ALTER TABLE `key_relations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `series`
--

DROP TABLE IF EXISTS `series`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `series` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(6) COLLATE utf8mb3_unicode_ci NOT NULL,
  `expo` tinyint NOT NULL DEFAULT '0',
  `useable` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `series`
--

LOCK TABLES `series` WRITE;
/*!40000 ALTER TABLE `series` DISABLE KEYS */;
INSERT INTO `series` VALUES (16,'HQRQLO',1,0),(17,'DJZTVJ',0,0);
/*!40000 ALTER TABLE `series` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `set_votes`
--

DROP TABLE IF EXISTS `set_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `set_votes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `battle_id` int NOT NULL,
  `key_id` tinyint NOT NULL,
  `warier_selected` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `set_votes`
--

LOCK TABLES `set_votes` WRITE;
/*!40000 ALTER TABLE `set_votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `set_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `id` int NOT NULL,
  `key_id` int NOT NULL,
  `position` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wariers`
--

DROP TABLE IF EXISTS `wariers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wariers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `img` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wariers`
--

LOCK TABLES `wariers` WRITE;
/*!40000 ALTER TABLE `wariers` DISABLE KEYS */;
INSERT INTO `wariers` VALUES (38,'Afonso Nzango','/midea/waries/warier-1706049950056.jpeg'),(39,'Edvanio','/midea/waries/warier-1706050048760.jpeg');
/*!40000 ALTER TABLE `wariers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-24 20:47:35
