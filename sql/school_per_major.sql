-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 114.132.41.159    Database: school
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `per_major`
--

DROP TABLE IF EXISTS `per_major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `per_major` (
  `personality` char(4) DEFAULT NULL,
  `major` varchar(50) DEFAULT NULL,
  UNIQUE KEY `personality` (`personality`,`major`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `per_major`
--

LOCK TABLES `per_major` WRITE;
/*!40000 ALTER TABLE `per_major` DISABLE KEYS */;
INSERT INTO `per_major` VALUES ('ENFJ','传播学'),('ENFJ','外交学'),('ENFJ','学科教育'),('ENFJ','播音与主持艺术'),('ENFJ','教育学'),('ENFP','旅游管理'),('ENTJ','政治学'),('ENTJ','法学'),('ENTP','产业经济学'),('ENTP','工商管理'),('ESFJ','教育经济与管理'),('ESFJ','社会学'),('ESFJ','行政管理'),('ESFP','表演学'),('ESTJ','信息与通信工程'),('ESTJ','土木工程'),('ESTP','企业管理'),('ESTP','区域经济学'),('ESTP','工商管理'),('ESTP','市场营销'),('INFJ','心理学'),('INFP','中国语言文学'),('INFP','哲学'),('INTJ','伦理学'),('INTJ','公安学'),('INTJ','军事法学'),('INTP','数学'),('ISFJ','图书、情报与档案管理'),('ISFP','美术学'),('ISFP','风景园林设计'),('ISTJ','会计学'),('ISTJ','统计学'),('ISTP','临床医学');
/*!40000 ALTER TABLE `per_major` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-16 15:57:19
