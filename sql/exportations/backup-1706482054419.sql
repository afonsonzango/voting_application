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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battles`
--

LOCK TABLES `battles` WRITE;
/*!40000 ALTER TABLE `battles` DISABLE KEYS */;
INSERT INTO `battles` VALUES (1,38,39,0,0,16,17,0,0,0),(2,38,39,1,0,18,18,0,0,0),(3,38,39,0,0,19,19,0,0,0),(4,38,39,0,0,20,20,0,0,0),(5,38,39,0,0,21,21,0,0,0),(6,38,39,0,0,22,22,0,0,0),(7,38,39,0,0,23,23,0,0,0),(8,38,39,1,3,24,24,0,0,0),(9,38,39,0,1,25,25,0,0,0),(10,38,39,2,0,26,26,0,0,0),(11,38,39,NULL,NULL,27,0,0,0,0),(12,38,39,0,0,27,0,0,0,0),(13,38,39,NULL,NULL,28,0,0,0,0),(14,38,39,0,0,0,0,0,0,0),(15,38,39,0,0,29,30,31,32,0),(16,38,39,NULL,NULL,25,25,0,0,0),(17,38,39,0,0,26,26,0,0,0),(18,38,39,0,0,27,28,0,0,0),(19,38,39,0,0,29,0,0,0,0),(20,38,39,0,0,30,0,0,31,0),(21,41,40,2,1,34,35,36,33,0),(22,40,41,0,0,37,38,39,40,0),(23,40,41,0,0,41,0,0,0,0),(24,40,41,0,0,43,44,45,42,0),(25,40,41,0,0,46,0,47,0,0),(26,40,41,0,0,48,0,0,0,0);
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
  `status` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `series_id` (`series_id`),
  CONSTRAINT `credential_ibfk_1` FOREIGN KEY (`series_id`) REFERENCES `series` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14164 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credential`
--

LOCK TABLES `credential` WRITE;
/*!40000 ALTER TABLE `credential` DISABLE KEYS */;
INSERT INTO `credential` VALUES (13942,56,85694650,1,'2024-01-28 19:06:17'),(13943,56,35540090,1,'2024-01-28 19:06:17'),(13944,56,39137660,1,'2024-01-28 19:06:17'),(13945,56,33958342,1,'2024-01-28 19:06:17'),(13946,56,55266660,1,'2024-01-28 19:06:17'),(13947,56,83727221,1,'2024-01-28 19:06:17'),(13948,56,71873948,1,'2024-01-28 19:06:17'),(13949,56,50300663,1,'2024-01-28 19:06:17'),(13950,56,28741280,1,'2024-01-28 19:06:17'),(13951,56,63935209,1,'2024-01-28 19:06:17'),(13952,56,65414354,1,'2024-01-28 19:06:17'),(13953,56,45502666,1,'2024-01-28 19:06:17'),(13954,56,31432746,1,'2024-01-28 19:06:17'),(13955,56,24914556,1,'2024-01-28 19:06:17'),(13956,56,31037822,1,'2024-01-28 19:06:17'),(13957,56,15156269,1,'2024-01-28 19:06:17'),(13958,56,63386888,1,'2024-01-28 19:06:17'),(13959,56,17980017,1,'2024-01-28 19:06:17'),(13960,56,77734599,1,'2024-01-28 19:06:17'),(13961,56,56950956,1,'2024-01-28 19:06:17'),(13962,56,71533103,1,'2024-01-28 19:06:17'),(13963,56,73765341,1,'2024-01-28 19:06:17'),(13964,56,44757367,1,'2024-01-28 19:06:17'),(13965,56,53314485,1,'2024-01-28 19:06:17'),(13966,56,55308202,1,'2024-01-28 19:06:17'),(13967,56,34236330,1,'2024-01-28 19:06:17'),(13968,56,68881455,1,'2024-01-28 19:06:17'),(13969,56,70415538,1,'2024-01-28 19:06:17'),(13970,56,99573174,1,'2024-01-28 19:06:17'),(13971,56,38694658,1,'2024-01-28 19:06:17'),(13972,56,80952361,1,'2024-01-28 19:06:17'),(13973,56,59622369,1,'2024-01-28 19:06:17'),(13974,56,53399024,1,'2024-01-28 19:06:17'),(13975,56,12212306,1,'2024-01-28 19:06:17'),(13976,56,75369529,1,'2024-01-28 19:06:18'),(13977,56,17611740,1,'2024-01-28 19:06:18'),(13978,56,76916405,1,'2024-01-28 19:06:18'),(13979,56,76653130,1,'2024-01-28 19:06:18'),(13980,56,53703532,1,'2024-01-28 19:06:18'),(13981,56,16865627,1,'2024-01-28 19:06:18'),(13982,56,39656468,1,'2024-01-28 19:06:18'),(13983,56,12711447,1,'2024-01-28 19:06:18'),(13984,56,42553080,1,'2024-01-28 19:06:18'),(13985,56,26614605,1,'2024-01-28 19:06:18'),(13986,56,76952001,1,'2024-01-28 19:06:18'),(13987,56,30870565,1,'2024-01-28 19:06:18'),(13988,56,89381814,1,'2024-01-28 19:06:18'),(13989,56,30621036,1,'2024-01-28 19:06:18'),(13990,56,53790051,1,'2024-01-28 19:06:18'),(13991,56,52659056,1,'2024-01-28 19:06:18'),(13992,56,62507369,1,'2024-01-28 19:06:18'),(13993,56,45105401,1,'2024-01-28 19:06:18'),(13994,56,42422088,1,'2024-01-28 19:06:18'),(13995,56,94506157,1,'2024-01-28 19:06:18'),(13996,56,52705293,1,'2024-01-28 19:06:18'),(13997,56,82596597,1,'2024-01-28 19:06:18'),(13998,56,54262261,1,'2024-01-28 19:06:18'),(13999,56,93958328,1,'2024-01-28 19:06:18'),(14000,56,98274432,1,'2024-01-28 19:06:18'),(14001,56,13171209,1,'2024-01-28 19:06:18'),(14002,56,53453787,1,'2024-01-28 19:06:18'),(14003,56,47930156,1,'2024-01-28 19:06:18'),(14004,56,61960187,1,'2024-01-28 19:06:18'),(14005,56,20176256,1,'2024-01-28 19:06:18'),(14006,56,36220961,1,'2024-01-28 19:06:18'),(14007,56,13687300,1,'2024-01-28 19:06:18'),(14008,56,97248919,1,'2024-01-28 19:06:18'),(14009,56,18350724,1,'2024-01-28 19:06:18'),(14010,56,14411835,1,'2024-01-28 19:06:18'),(14011,56,56091719,1,'2024-01-28 19:06:18'),(14012,56,82560601,1,'2024-01-28 19:06:18'),(14013,56,99574598,1,'2024-01-28 19:06:18'),(14014,56,29011154,1,'2024-01-28 19:06:18'),(14015,56,82530558,1,'2024-01-28 19:06:18'),(14016,56,32835981,1,'2024-01-28 19:06:18'),(14017,56,88902568,1,'2024-01-28 19:06:18'),(14018,56,22346363,1,'2024-01-28 19:06:18'),(14019,56,21907955,1,'2024-01-28 19:06:18'),(14020,56,56118583,1,'2024-01-28 19:06:18'),(14021,56,36436569,1,'2024-01-28 19:06:18'),(14022,56,17591261,1,'2024-01-28 19:06:18'),(14023,56,26631170,1,'2024-01-28 19:06:18'),(14024,56,68593999,1,'2024-01-28 19:06:18'),(14025,56,92435026,1,'2024-01-28 19:06:18'),(14026,56,90377260,1,'2024-01-28 19:06:18'),(14027,56,44636635,1,'2024-01-28 19:06:18'),(14028,56,96773800,1,'2024-01-28 19:06:18'),(14029,56,43641379,1,'2024-01-28 19:06:18'),(14030,56,81471357,1,'2024-01-28 19:06:18'),(14031,56,54471539,1,'2024-01-28 19:06:18'),(14032,56,99643451,1,'2024-01-28 19:06:18'),(14033,56,56760022,1,'2024-01-28 19:06:18'),(14034,56,45830537,1,'2024-01-28 19:06:18'),(14035,56,60072297,1,'2024-01-28 19:06:18'),(14036,56,22296230,1,'2024-01-28 19:06:18'),(14037,56,94674713,1,'2024-01-28 19:06:18'),(14038,56,42170173,1,'2024-01-28 19:06:18'),(14039,56,41830374,1,'2024-01-28 19:06:18'),(14040,56,60100301,1,'2024-01-28 19:06:18'),(14041,56,51940486,1,'2024-01-28 19:06:18'),(14042,56,65747100,1,'2024-01-28 19:06:18'),(14043,56,40339439,1,'2024-01-28 19:06:18'),(14044,56,32822289,1,'2024-01-28 19:06:18'),(14045,56,60435342,1,'2024-01-28 19:06:18'),(14046,56,92132267,1,'2024-01-28 19:06:18'),(14047,56,99803851,1,'2024-01-28 19:06:19'),(14048,56,20922449,1,'2024-01-28 19:06:19'),(14049,56,86925478,1,'2024-01-28 19:06:19'),(14050,56,19636403,1,'2024-01-28 19:06:19'),(14051,56,97608512,1,'2024-01-28 19:06:19'),(14052,56,44660711,1,'2024-01-28 19:06:19'),(14053,56,38959497,1,'2024-01-28 19:06:19'),(14054,56,96405086,1,'2024-01-28 19:06:19'),(14055,56,33663262,1,'2024-01-28 19:06:19'),(14056,56,63554049,1,'2024-01-28 19:06:19'),(14057,56,49123813,1,'2024-01-28 19:06:19'),(14058,56,87940929,1,'2024-01-28 19:06:19'),(14059,56,17987496,1,'2024-01-28 19:06:19'),(14060,56,84633464,1,'2024-01-28 19:06:19'),(14061,56,73736629,1,'2024-01-28 19:06:19'),(14062,56,44751365,1,'2024-01-28 19:06:19'),(14063,56,99748474,1,'2024-01-28 19:06:19'),(14064,56,89088714,1,'2024-01-28 19:06:19'),(14065,56,88881396,1,'2024-01-28 19:06:19'),(14066,56,25640617,1,'2024-01-28 19:06:19'),(14067,56,16078140,1,'2024-01-28 19:06:19'),(14068,56,12953845,1,'2024-01-28 19:06:19'),(14069,56,59316764,1,'2024-01-28 19:06:19'),(14070,56,27758216,1,'2024-01-28 19:06:19'),(14071,56,20619097,1,'2024-01-28 19:06:19'),(14072,56,23071724,1,'2024-01-28 19:06:19'),(14073,56,24057995,1,'2024-01-28 19:06:19'),(14074,56,21679702,1,'2024-01-28 19:06:19'),(14075,56,63004790,1,'2024-01-28 19:06:19'),(14076,56,49009402,1,'2024-01-28 19:06:19'),(14077,56,51593428,1,'2024-01-28 19:06:19'),(14078,56,52911722,1,'2024-01-28 19:06:19'),(14079,56,10521357,1,'2024-01-28 19:06:19'),(14080,56,80066002,1,'2024-01-28 19:06:19'),(14081,56,14013569,1,'2024-01-28 19:06:19'),(14082,56,37742940,1,'2024-01-28 19:06:19'),(14083,56,45605650,1,'2024-01-28 19:06:19'),(14084,56,27376413,1,'2024-01-28 19:06:19'),(14085,56,50241612,1,'2024-01-28 19:06:19'),(14086,56,25327047,1,'2024-01-28 19:06:19'),(14087,56,98853426,1,'2024-01-28 19:06:19'),(14088,56,53008080,1,'2024-01-28 19:06:19'),(14089,56,30539549,1,'2024-01-28 19:06:19'),(14090,56,81635821,1,'2024-01-28 19:06:19'),(14091,56,60344403,1,'2024-01-28 19:06:19'),(14092,56,86932756,1,'2024-01-28 19:06:19'),(14093,56,72798859,1,'2024-01-28 19:06:19'),(14094,56,14147976,1,'2024-01-28 19:06:19'),(14095,56,85883195,1,'2024-01-28 19:06:19'),(14096,56,63990670,1,'2024-01-28 19:06:19'),(14097,56,33536953,1,'2024-01-28 19:06:19'),(14098,56,61173901,1,'2024-01-28 19:06:19'),(14099,56,83750115,1,'2024-01-28 19:06:19'),(14100,56,47652369,1,'2024-01-28 19:06:19'),(14101,56,89833927,1,'2024-01-28 19:06:19'),(14102,56,63444764,1,'2024-01-28 19:06:19'),(14103,56,33761681,1,'2024-01-28 19:06:19'),(14104,56,45767994,1,'2024-01-28 19:06:19'),(14105,56,63187032,1,'2024-01-28 19:06:19'),(14106,56,49228203,1,'2024-01-28 19:06:19'),(14107,56,44515058,1,'2024-01-28 19:06:19'),(14108,56,32437839,1,'2024-01-28 19:06:19'),(14109,56,71974477,1,'2024-01-28 19:06:19'),(14110,56,92802339,1,'2024-01-28 19:06:19'),(14111,56,75293956,1,'2024-01-28 19:06:19'),(14112,56,66091822,1,'2024-01-28 19:06:19'),(14113,56,55002581,1,'2024-01-28 19:06:19'),(14114,56,45811347,1,'2024-01-28 19:06:19'),(14115,56,23446447,1,'2024-01-28 19:06:19'),(14116,56,55694914,1,'2024-01-28 19:06:19'),(14117,56,88325261,1,'2024-01-28 19:06:19'),(14118,56,52510557,1,'2024-01-28 19:06:19'),(14119,56,23441370,1,'2024-01-28 19:06:19'),(14120,56,77686538,1,'2024-01-28 19:06:19'),(14121,56,64402424,1,'2024-01-28 19:06:19'),(14122,56,56368064,1,'2024-01-28 19:06:20'),(14123,56,39394878,1,'2024-01-28 19:06:20'),(14124,56,68268356,1,'2024-01-28 19:06:20'),(14125,56,52894278,1,'2024-01-28 19:06:20'),(14126,56,84634140,1,'2024-01-28 19:06:20'),(14127,56,59150784,1,'2024-01-28 19:06:20'),(14128,56,19778843,1,'2024-01-28 19:06:20'),(14129,56,77588569,1,'2024-01-28 19:06:20'),(14130,56,53885409,1,'2024-01-28 19:06:20'),(14131,56,48262329,1,'2024-01-28 19:06:20'),(14132,56,51407521,1,'2024-01-28 19:06:20'),(14133,56,19256346,1,'2024-01-28 19:06:20'),(14134,56,83932621,1,'2024-01-28 19:06:20'),(14135,56,26870621,1,'2024-01-28 19:06:20'),(14136,56,48382728,1,'2024-01-28 19:06:20'),(14137,56,96757624,1,'2024-01-28 19:06:20'),(14138,56,31438152,1,'2024-01-28 19:06:20'),(14139,56,30857092,1,'2024-01-28 19:06:20'),(14140,56,87584728,1,'2024-01-28 19:06:20'),(14141,56,14914750,1,'2024-01-28 19:06:20'),(14142,56,54783038,1,'2024-01-28 19:06:20'),(14143,56,31690705,1,'2024-01-28 19:06:20'),(14144,56,84299105,1,'2024-01-28 19:06:20'),(14145,56,83935158,1,'2024-01-28 19:06:20'),(14146,56,20056815,1,'2024-01-28 19:06:20'),(14147,56,39013858,1,'2024-01-28 19:06:20'),(14148,56,51412891,1,'2024-01-28 19:06:20'),(14149,56,78907107,1,'2024-01-28 19:06:20'),(14150,56,90453495,1,'2024-01-28 19:06:20'),(14151,56,85521714,1,'2024-01-28 19:06:20'),(14152,56,88493429,1,'2024-01-28 19:06:20'),(14153,56,12710179,1,'2024-01-28 19:06:20'),(14154,56,76978368,1,'2024-01-28 19:06:20'),(14155,56,23196882,1,'2024-01-28 19:06:20'),(14156,56,21574211,1,'2024-01-28 19:06:20'),(14157,56,58937563,1,'2024-01-28 19:06:20'),(14158,56,29770461,1,'2024-01-28 19:06:20'),(14159,56,15953545,1,'2024-01-28 19:06:20'),(14160,56,50667957,1,'2024-01-28 19:06:20'),(14161,56,98352894,1,'2024-01-28 19:06:20'),(14162,56,60417858,1,'2024-01-28 19:06:20'),(14163,56,14345494,1,'2024-01-28 19:06:20');
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `series`
--

LOCK TABLES `series` WRITE;
/*!40000 ALTER TABLE `series` DISABLE KEYS */;
INSERT INTO `series` VALUES (56,'FLK',1,1);
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
  `key_id` int NOT NULL,
  `warier_selected` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `set_votes`
--

LOCK TABLES `set_votes` WRITE;
/*!40000 ALTER TABLE `set_votes` DISABLE KEYS */;
INSERT INTO `set_votes` VALUES (1,2,12957,38),(2,8,13041,39),(3,8,13042,39),(4,8,13043,39),(5,8,13044,38),(6,9,13141,39),(7,10,13161,38),(8,10,13162,38),(9,21,13420,41),(10,21,13421,41),(11,21,13422,40);
/*!40000 ALTER TABLE `set_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'afonso12','$2a$10$9oDHSajOAJtwNEI3f.FLb.vLkseq/Rna9oubWvGkfK.acGPea.m/u');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wariers`
--

LOCK TABLES `wariers` WRITE;
/*!40000 ALTER TABLE `wariers` DISABLE KEYS */;
INSERT INTO `wariers` VALUES (40,'Afonso Nzango','/midea/waries/warier-1706393398106.jpeg'),(41,'Mr. Bakongo','/midea/waries/warier-1706393432195.jpeg');
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

-- Dump completed on 2024-01-28 22:47:35
