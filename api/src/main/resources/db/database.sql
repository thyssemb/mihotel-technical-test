-- MySQL dump 10.13  Distrib 9.0.1, for macos14.4 (arm64)
--
-- Host: localhost    Database: mihotel
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `lesson`
--

DROP TABLE IF EXISTS `lesson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson` (
  `id` int NOT NULL AUTO_INCREMENT,
  `professor_id` int NOT NULL,
  `subject` varchar(50) NOT NULL,
  `level` varchar(50) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `location` varchar(50) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `professor_id` (`professor_id`),
  CONSTRAINT `lesson_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson`
--

LOCK TABLES `lesson` WRITE;
/*!40000 ALTER TABLE `lesson` DISABLE KEYS */;
INSERT INTO `lesson` VALUES (6,8,'French Lesson','College',10.00,'Lyon, France','French Lesson 🚀','2025-06-23 16:19:49',NULL),(7,8,'Spanish Lesson','College',10.00,'Lyon, France','French Lesson 🚀','2025-06-23 17:50:51',NULL),(9,1,'French Lesson','College',10.00,'Lyon, France','','2025-06-23 18:47:44',NULL);
/*!40000 ALTER TABLE `lesson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_expiration` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
INSERT INTO `professor` VALUES (1,'Jean Dupont','jean.dupont@example.com','$2a$10$XPClwRByUY52UNM8eDKiFuaWZEziipm3RNE4D9092qSh0smyuUVpW',NULL,NULL,'2025-06-22 15:50:12',NULL),(2,'titi','titi@titi.com','$2a$10$h6S1toorgYgAzk3kMzLOh.FOTRTpTD2/UyxB5FZLzK5vdPp9igAyK',NULL,NULL,'2025-06-22 15:52:10',NULL),(3,'thyss','thyss@hotmail.com','$2a$10$gSU4FFL6F4Iq1A9o7YtCXe54/iFkwLjob8xnT31x0SxDeFl9TAU/m',NULL,NULL,'2025-06-22 16:06:21',NULL),(4,'titi','titi@hotmail.com','$2a$10$lJ8Da1gjDLOUkO9xVehMv.wCPt00nCzCdtrpdVtcrVUFlvSIWg0/W',NULL,NULL,'2025-06-23 00:05:48',NULL),(5,'test','test@test.com','$2a$10$WcG/TjA0EPFn01A4AbKCZO5Vd2HEjuj7M269iIJsDV6Rx/ibvCTOO',NULL,NULL,'2025-06-23 08:09:55',NULL),(8,'test','test@hotmail.com','$2a$10$W/AjfC88maGF9xvWbI6ruOIq5cTtchAMHRv10wQ4bnZ5s7zEcXgGW',NULL,NULL,'2025-06-23 08:48:26',NULL);
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-23 21:12:47
