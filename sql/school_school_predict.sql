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
-- Table structure for table `school_predict`
--

DROP TABLE IF EXISTS `school_predict`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school_predict` (
  `subjects_first` varchar(5) NOT NULL,
  `subjects_second` varchar(20) NOT NULL,
  `school_name` varchar(50) NOT NULL,
  `major` varchar(50) NOT NULL,
  `year24_mark` int DEFAULT NULL,
  `year23_mark` int DEFAULT NULL,
  `year22_mark` int DEFAULT NULL,
  `year21_mark` int DEFAULT NULL,
  `year24_rank` int DEFAULT NULL,
  `year23_rank` int DEFAULT NULL,
  `year22_rank` int DEFAULT NULL,
  `year21_rank` int DEFAULT NULL,
  PRIMARY KEY (`subjects_first`,`subjects_second`,`school_name`,`major`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_predict`
--

LOCK TABLES `school_predict` WRITE;
/*!40000 ALTER TABLE `school_predict` DISABLE KEYS */;
INSERT INTO `school_predict` VALUES ('物理','不限','华南师范大学','060 应用心理学',NULL,NULL,604,NULL,NULL,NULL,18857,NULL),('物理','不限','华南师范大学','061 网络工程',NULL,NULL,605,NULL,NULL,NULL,18218,NULL),('物理','不限','华南师范大学','062 计算机科学与技术',NULL,NULL,607,NULL,NULL,NULL,17327,NULL),('物理','不限','华南师范大学','063 人工智能',NULL,NULL,599,NULL,NULL,NULL,22520,NULL),('物理','不限','华南师范大学','064 电子信息科学与技术',NULL,NULL,596,NULL,NULL,NULL,24596,NULL),('物理','不限','华南师范大学','065 通信工程',NULL,NULL,594,NULL,NULL,NULL,25733,NULL),('物理','不限','华南师范大学','066 电子信息工程',NULL,NULL,596,NULL,NULL,NULL,24395,NULL),('物理','不限','华南师范大学','067 信息工程',NULL,NULL,601,NULL,NULL,NULL,21239,NULL),('物理','不限','华南师范大学','068 光电信息科学与工程',NULL,NULL,602,NULL,NULL,NULL,20471,NULL),('物理','不限','华南师范大学','069 软件工程',NULL,NULL,599,NULL,NULL,NULL,22734,NULL),('物理','不限','华南师范大学','070 网络与新媒体',NULL,NULL,600,NULL,NULL,NULL,21816,NULL),('物理','不限','华南师范大学','071 法学',NULL,NULL,601,NULL,NULL,NULL,21335,NULL),('物理','不限','华南师范大学','072 财务管理',NULL,NULL,591,NULL,NULL,NULL,28095,NULL),('物理','不限','华南师范大学','073 教育技术学',NULL,NULL,592,NULL,NULL,NULL,27603,NULL),('物理','不限','华南师范大学','074 新闻学',NULL,NULL,600,NULL,NULL,NULL,21723,NULL),('物理','不限','华南师范大学','075 传播学',NULL,NULL,595,NULL,NULL,NULL,25356,NULL),('物理','不限','华南师范大学','076 信息管理与信息系统',NULL,NULL,595,NULL,NULL,NULL,25399,NULL),('物理','不限','华南师范大学','077 电子商务',NULL,NULL,592,NULL,NULL,NULL,27883,NULL),('物理','不限','华南师范大学','078 物流管理',NULL,NULL,592,NULL,NULL,NULL,27740,NULL),('物理','不限','华南师范大学','079 人力资源管理',NULL,NULL,592,NULL,NULL,NULL,28013,NULL),('物理','不限','华南师范大学','080 财务管理',NULL,NULL,592,NULL,NULL,NULL,27638,NULL),('物理','不限','华南师范大学','081 会计学',NULL,NULL,593,NULL,NULL,NULL,27141,NULL),('物理','不限','华南师范大学','082 国际经济与贸易',NULL,NULL,592,NULL,NULL,NULL,27472,NULL),('物理','不限','华南师范大学','083 金融学',NULL,NULL,598,NULL,NULL,NULL,23153,NULL),('物理','不限','华南师范大学','084 经济学',NULL,NULL,595,NULL,NULL,NULL,25543,NULL),('物理','不限','华南师范大学','085 会展经济与管理',NULL,NULL,592,NULL,NULL,NULL,27752,NULL),('物理','不限','华南师范大学','086 酒店管理',NULL,NULL,593,NULL,NULL,NULL,27107,NULL),('物理','不限','华南师范大学','087 旅游管理',NULL,NULL,592,NULL,NULL,NULL,27369,NULL),('物理','不限','华南师范大学','088 应用统计学',NULL,NULL,599,NULL,NULL,NULL,22212,NULL),('物理','不限','华南师范大学','089 金融数学',NULL,NULL,593,NULL,NULL,NULL,26741,NULL),('物理','不限','华南师范大学','090 信息与计算科学',NULL,NULL,603,NULL,NULL,NULL,19766,NULL),('物理','不限','华南师范大学','091 日语',NULL,NULL,592,NULL,NULL,NULL,27597,NULL),('物理','不限','华南师范大学','092 翻译',NULL,NULL,598,NULL,NULL,NULL,23235,NULL),('物理','不限','华南师范大学','093 俄语',NULL,NULL,593,NULL,NULL,NULL,26897,NULL),('物理','不限','华南师范大学','094 英语',NULL,NULL,605,NULL,NULL,NULL,18492,NULL),('物理','不限','华南师范大学','095 社会工作',NULL,NULL,592,NULL,NULL,NULL,27630,NULL),('物理','不限','华南师范大学','096 管理科学',NULL,NULL,592,NULL,NULL,NULL,27953,NULL),('物理','不限','华南师范大学','097 行政管理',NULL,NULL,591,NULL,NULL,NULL,28072,NULL),('物理','不限','华南师范大学','098 公共事业管理',NULL,NULL,591,NULL,NULL,NULL,28073,NULL),('物理','不限','华南师范大学','099 集成电路设计与集成系统',NULL,NULL,593,NULL,NULL,NULL,27050,NULL),('物理','不限','华南师范大学','102 计算机科学与技术',NULL,NULL,607,NULL,NULL,NULL,17133,NULL),('物理','不限','华南师范大学','103 学前教育',NULL,NULL,606,NULL,NULL,NULL,17882,NULL),('物理','不限','华南师范大学','104 心理学',NULL,NULL,608,NULL,NULL,NULL,16516,NULL),('物理','不限','华南师范大学','105 特殊教育',NULL,NULL,607,NULL,NULL,NULL,17313,NULL),('物理','不限','华南师范大学','106 小学教育',NULL,NULL,606,NULL,NULL,NULL,17555,NULL),('物理','不限','华南师范大学','107 教育学',NULL,NULL,608,NULL,NULL,NULL,16623,NULL),('物理','不限','华南师范大学','108 教育技术学',NULL,NULL,606,NULL,NULL,NULL,17859,NULL),('物理','不限','华南师范大学','109 数学与应用数学',NULL,NULL,611,NULL,NULL,NULL,14965,NULL),('物理','不限','华南师范大学','110 英语',NULL,NULL,615,NULL,NULL,NULL,12595,NULL),('物理','不限','华南师范大学','114 物理学',NULL,NULL,608,NULL,NULL,NULL,16480,NULL),('物理','不限','华南师范大学','148 材料物理',NULL,NULL,583,NULL,NULL,NULL,35150,NULL),('物理','不限','华南师范大学','149 物联网工程',NULL,NULL,587,NULL,NULL,NULL,31925,NULL),('物理','不限','华南师范大学','150 数据科学与大数据技术',NULL,NULL,589,NULL,NULL,NULL,30292,NULL),('物理','不限','华南师范大学','151 科学教育',NULL,NULL,585,NULL,NULL,NULL,33644,NULL),('物理','不限','华南师范大学','152 储能科学与工程',NULL,NULL,583,NULL,NULL,NULL,34756,NULL),('物理','不限','华南师范大学','153 金融科技',NULL,NULL,585,NULL,NULL,NULL,33789,NULL),('物理','不限','华南师范大学','157 小学教育',NULL,NULL,592,NULL,NULL,NULL,27510,NULL),('物理','化学','华南师范大学','052 新能源材料与器件',NULL,NULL,595,NULL,NULL,NULL,25285,NULL),('物理','化学','华南师范大学','053 材料化学',NULL,NULL,594,NULL,NULL,NULL,25840,NULL),('物理','化学','华南师范大学','054 生物工程',NULL,NULL,594,NULL,NULL,NULL,25910,NULL),('物理','化学','华南师范大学','101 化学',NULL,NULL,604,NULL,NULL,NULL,18803,NULL),('物理','化学或地理','华南师范大学','049 地理信息科学',NULL,NULL,597,NULL,NULL,NULL,24112,NULL),('物理','化学或地理','华南师范大学','050 自然地理与资源环境',NULL,NULL,596,NULL,NULL,NULL,24558,NULL),('物理','化学或地理','华南师范大学','051 人文地理与城乡规划',NULL,NULL,597,NULL,NULL,NULL,23732,NULL),('物理','化学或地理','华南师范大学','100 地理科学',NULL,NULL,607,NULL,NULL,NULL,17219,NULL),('物理','化学或生物','华南师范大学','055 环境工程',NULL,NULL,593,NULL,NULL,NULL,27229,NULL),('物理','化学或生物','华南师范大学','056 环境科学',NULL,NULL,592,NULL,NULL,NULL,27760,NULL),('物理','化学或生物','华南师范大学','057 生物技术',NULL,NULL,597,NULL,NULL,NULL,23679,NULL),('物理','化学或生物','华南师范大学','113 生物科学',NULL,NULL,607,NULL,NULL,NULL,17033,NULL),('物理','政治','华南师范大学','058 哲学',NULL,NULL,598,NULL,NULL,NULL,22934,NULL),('物理','政治','华南师范大学','059 政治学与行政学',NULL,NULL,597,NULL,NULL,NULL,24014,NULL),('物理','政治','华南师范大学','111 思想政治教育',NULL,NULL,608,NULL,NULL,NULL,16780,NULL),('物理','政治','华南师范大学','112 思想政治教育',NULL,NULL,606,NULL,NULL,NULL,17561,NULL);
/*!40000 ALTER TABLE `school_predict` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-16 15:57:18
