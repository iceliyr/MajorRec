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
-- Table structure for table `user_volunteer`
--

DROP TABLE IF EXISTS `user_volunteer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_volunteer` (
  `openid` char(30) NOT NULL,
  `school` varchar(50) NOT NULL,
  `major` varchar(50) NOT NULL,
  `rank24` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_constraint_name` (`school`,`major`)
) ENGINE=InnoDB AUTO_INCREMENT=191 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_volunteer`
--

LOCK TABLES `user_volunteer` WRITE;
/*!40000 ALTER TABLE `user_volunteer` DISABLE KEYS */;
INSERT INTO `user_volunteer` VALUES ('okz6E6wOQApw47ZdhLs4h_Oy1sHs','华南理工大学','计算机类',6873,99),('okz6E6wOQApw47ZdhLs4h_Oy1sHs','武汉大学','新闻传播学类',2482,148),('okz6E6wOQApw47ZdhLs4h_Oy1sHs','北京邮电大学','电子信息类（元班）',2638,149),('okz6E6wOQApw47ZdhLs4h_Oy1sHs','北京理工大学','工科试验班（电子信息实验班）',2811,150),('okz6E6wOQApw47ZdhLs4h_Oy1sHs','顺德职业技术学院','应用化工技术（顺德区外）',148035,151),('okz6E6-goLZ6Vy2zobca8W7qTfAs','华南理工大学','建筑学',7537,168),('okz6E6-goLZ6Vy2zobca8W7qTfAs','中山大学','核工程与核技术',15055,169),('okz6E6-goLZ6Vy2zobca8W7qTfAs','中南财经政法大学','经济学类',15808,170),('okz6E62nAn8uCFwuDtKvJjMh8XI0','中南大学','计算机类（计算机与通信类）',8188,172),('okz6E62nAn8uCFwuDtKvJjMh8XI0','华南理工大学','数学类',8878,173),('okz6E62nAn8uCFwuDtKvJjMh8XI0','深圳大学','法学',20686,174),('okz6E62nAn8uCFwuDtKvJjMh8XI0','华南农业大学','农林经济管理（丁颖创新班）',36023,175),('okz6E62nAn8uCFwuDtKvJjMh8XI0','南方医科大学','生物医学工程',39784,176),('okz6E62nAn8uCFwuDtKvJjMh8XI0','中国人民公安大学','公安管理学（军检院校（含公安））',10637,177),('okz6E62nAn8uCFwuDtKvJjMh8XI0','中山大学','材料类',10208,178),('okz6E62nAn8uCFwuDtKvJjMh8XI0','广州中医药大学','中医学（卫生专项）（定向至茂名市化州市）',59840,181),('okz6E62nAn8uCFwuDtKvJjMh8XI0','四川大学','核工程与核技术',10218,182),('okz6E62nAn8uCFwuDtKvJjMh8XI0','浙江工业大学','日语',45066,183),('okz6E62nAn8uCFwuDtKvJjMh8XI0','中山大学','预防医学（深圳）',10208,184),('okz6E62nAn8uCFwuDtKvJjMh8XI0','华南师范大学','电子信息科学与技术',25609,185),('okz6E62nAn8uCFwuDtKvJjMh8XI0','浙江传媒学院','传播学（中外合作办学）',45066,186),('okz6E62nAn8uCFwuDtKvJjMh8XI0','中南财经政法大学','外国语言文学类',23625,188),('okz6E62nAn8uCFwuDtKvJjMh8XI0','北京林业大学','给排水科学与工程',40023,189),('okz6E62nAn8uCFwuDtKvJjMh8XI0','海南大学','农学',40023,190);
/*!40000 ALTER TABLE `user_volunteer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-16 15:57:14
