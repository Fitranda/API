/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 8.0.30 : Database - freinzdb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`freinzdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `freinzdb`;

/*Table structure for table `attendance` */

DROP TABLE IF EXISTS `attendance`;

CREATE TABLE `attendance` (
  `attendanceId` int NOT NULL AUTO_INCREMENT,
  `employeeId` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `time` time DEFAULT NULL,
  PRIMARY KEY (`attendanceId`),
  KEY `employeeId` (`employeeId`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`employeeId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `attendance` */

LOCK TABLES `attendance` WRITE;

insert  into `attendance`(`attendanceId`,`employeeId`,`date`,`photo`,`latitude`,`longitude`,`status`,`time`) values 
(3,3,'2025-05-24 00:00:00','https://ik.imagekit.io/choandrew/R_1FYIMui33.jpg',-7.3277,112.80969,'Present',NULL),
(4,4,'2025-05-24 00:00:00','https://ik.imagekit.io/choandrew/R_W_6UPv-4A.jpg',-7.3277,112.80969,'Present','03:34:39'),
(5,3,'2025-05-25 00:00:00','https://ik.imagekit.io/choandrew/R_FzY7t7V6u.jpg',-7.327712,112.80974,'Present','03:40:06'),
(6,3,'2025-05-25 00:00:00','https://ik.imagekit.io/choandrew/R_F7IYvr_BO.jpg',-7.327712,112.80974,'Present','03:41:33'),
(7,3,'2025-05-26 00:00:00','https://ik.imagekit.io/choandrew/a6cf90f25beabe09ff952adf71e2f021_wonJxk-1N.jpg',-7.334668,112.788438,'Present','09:33:11'),
(8,3,'2025-05-26 00:00:00','https://ik.imagekit.io/choandrew/a6cf90f25beabe09ff952adf71e2f021_BEq_y-qDP.jpg',-7.334668,112.788438,'Present','09:33:14'),
(9,3,'2025-06-01 00:00:00','https://ik.imagekit.io/choandrew/boy-anime-drawing-illustration_525160-1161_dMIWzNDi9.jpg',-7.327622,112.809598,'Present','10:18:05'),
(10,3,'2025-06-01 00:00:00','https://ik.imagekit.io/choandrew/boy-anime-drawing-illustration_525160-1161_uhNidDuwK.jpg',-7.327622,112.809598,'Present','10:21:53'),
(11,3,'2025-06-01 00:00:00','https://ik.imagekit.io/choandrew/boy-anime-drawing-illustration_525160-1161_f9sXIYekJ.jpg',-7.327674,112.809616,'Present','14:39:44');

UNLOCK TABLES;

/*Table structure for table `employee` */

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `employeeId` int NOT NULL AUTO_INCREMENT,
  `employeeName` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_general_ci,
  `contact` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `basicSalary` double DEFAULT NULL,
  `role` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `storename` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int DEFAULT '1',
  `profilePicture` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`employeeId`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `employee` */

LOCK TABLES `employee` WRITE;

insert  into `employee`(`employeeId`,`employeeName`,`address`,`contact`,`username`,`password`,`basicSalary`,`role`,`storename`,`status`,`profilePicture`) values 
(1,'Bagas','Surabaya','08921512563','bagas123','$2b$10$lBWgC7YYdaQjN42u/o/Z6uomSBqZo0YK7OPbWpdYFzTZEPaW95T22',25000000,'Admin','Rungkut',1,NULL),
(2,'Faiz','Siwalanpanji Buduran Sidoarjo','088231014240','faiz123','$2b$10$4rY5qAMCQpUHKnOYRODtt.F3sG3UGpd3N./1ppOm6HKYmLARNAki.',NULL,'Admin','Rungkut',1,NULL),
(3,'Putra','Medokan Ayu Rungkut Surabaya','08128437854','putra123','$2a$12$FHOrFQ1FvxuOAhDBA9B/FexWXNeYCtREs8vecZrCGtCkKeoirYG/q',NULL,'Employee','Rungkut',1,'https://ik.imagekit.io/choandrew/a6cf90f25beabe09ff952adf71e2f021_kabQR2oY3.jpg'),
(4,'Bima','Jl. Raya Ketintang No.45, Kelurahan Ketintang, Kecamatan Gayungan, Surabaya Timur, Jawa Timur, 60231','081237485627','bima123','$2b$10$63gR3w6RkikeQgcfn7/X8OlDRl3aZ/fIZtSP3H0bFR67dYtqQhUbe',NULL,'supervisor','Bendul Merisi',1,'https://ik.imagekit.io/choandrew/boy-anime-drawing-illustration_525160-1161_8S38f4Vfx.jpg'),
(5,'Indra','Jl. Wonorejo Tengah No.28, Kelurahan Wonorejo, Kecamatan Rungkut, Surabaya Timur, Jawa Timur, 60294\n\n','081728394762','indra123','$2a$12$oNBjQsEKEJu.JU6WWHZKJOVq.Z5nK8hljQg/gv4SxgEZJ0JKeUgq6',5000000,'Admin','Rungkut',1,NULL);

UNLOCK TABLES;

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  `stock` double DEFAULT '0',
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`productId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `productcategory` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `product` */

LOCK TABLES `product` WRITE;

insert  into `product`(`productId`,`productName`,`price`,`stock`,`categoryId`) values 
(1,'AMINO Magnetic Case for iPhone',35000,13,NULL),
(2,'Samsung Case A52',20000,24,NULL),
(3,'Case For Samsung A56',45000,5,NULL),
(4,'Galaxy Armor Case',25000,30,NULL),
(5,'PixelShield Tempered Glass',15000,50,NULL),
(6,'AirPods Pro Silicone Cover',12000,39,NULL),
(7,'Lightning Fast Charger',35000,23,NULL),
(8,'Bluetooth Earbuds X12',45000,19,NULL),
(9,'Wireless Charging Pad',30000,15,NULL),
(10,'UltraGrip Phone Holder',20000,60,NULL),
(11,'Foldable Selfie Stick',22000,35,NULL),
(12,'Magnetic Car Mount',18000,55,NULL),
(13,'LED Ring Light Clip',27000,10,NULL),
(14,'Waterproof Phone Pouch',16000,44,NULL),
(15,'Gaming Trigger Set',29000,18,NULL),
(16,'Nano-Tech Screen Protector',13000,70,NULL),
(17,'Silicone Pop Socket',14000,80,NULL),
(18,'Premium Leather Wallet Case',48000,12,NULL),
(19,'USB-C to HDMI Adapter',24000,22,NULL),
(20,'Noise Cancelling Earbuds',52000,7,NULL),
(21,'Dual USB Wall Charger',32000,30,NULL),
(22,'360° Rotating Ring Holder',19000,45,NULL),
(23,'Travel Power Bank 10000mAh',40000,25,NULL),
(24,'Ultra Slim Flip Case',27000,40,NULL),
(25,'Wireless Earbud Charging Case',46000,15,NULL),
(26,'Carbon Fiber Phone Skin',21000,50,NULL),
(27,'Adjustable Phone Stand',17000,60,NULL),
(28,'Anti-Dust Camera Lens Cover',13000,80,NULL),
(29,'MagSafe Compatible Case',35000,35,NULL),
(30,'LED Notification Light Strip',28000,20,NULL),
(31,'Shockproof Silicone Case',23000,70,NULL),
(32,'USB-C Fast Charging Cable',15000,100,NULL),
(33,'Bluetooth Selfie Remote',16000,40,NULL),
(34,'Eco-Friendly Bamboo Case',45000,10,NULL),
(35,'Flexible Arm Phone Mount',20000,33,NULL),
(36,'Clear Acrylic Phone Stand',12000,55,NULL),
(37,'Smartphone Camera Lens Kit',39000,18,NULL),
(38,'Compact Wireless Charger',33000,28,NULL),
(39,'Water-Resistant Sport Case',26000,42,NULL),
(40,'Phone Cooling Fan Clip',35000,15,NULL),
(41,'Car Cigarette Lighter Charger',22000,65,NULL),
(42,'Magnetic Wireless Charger',37000,22,NULL),
(43,'Premium Fabric Phone Sleeve',28000,30,NULL),
(44,'Ultra-Thin Wallet Case',31000,17,NULL),
(45,'Silicone Earphone Cord Wrap',9000,85,NULL),
(46,'Dual Lens Selfie Flash',23000,19,NULL),
(47,'Wireless Gaming Controller',55000,12,NULL),
(48,'Smart Touch Screen Gloves',16000,45,NULL),
(49,'Portable Phone Sanitizer',42000,7,NULL),
(50,'UV Sterilizer Phone Case',53000,5,NULL),
(51,'Multi-Port USB Hub',29000,25,NULL),
(52,'Shockproof Phone Bumper',27000,35,NULL),
(53,'360° Rotating Tripod Stand',34000,18,NULL),
(54,'Customizable Phone Decals',11000,90,NULL),
(55,'Anti-Glare Screen Protector',14000,60,NULL),
(56,'Wireless Charging Desk Lamp',60000,7,NULL),
(57,'LED Phone Charging Cable',20000,40,NULL),
(58,'Foldable Bluetooth Keyboard',65000,12,NULL),
(59,'Magnetic Charging Dock',38000,19,NULL),
(60,'Phone Camera Stabilizer',70000,6,NULL),
(61,'Waterproof Bluetooth Speaker',55000,15,NULL),
(62,'Flexible Phone Tripod',24000,25,NULL),
(63,'Phone Lens Cleaning Kit',12000,75,NULL),
(64,'Magnetic Car Vent Holder',18000,55,NULL),
(65,'Wireless Earbud Skin Covers',13000,70,NULL),
(66,'Phone Screen Cleaning Spray',11000,80,NULL),
(67,'Portable Phone Projector',75000,5,NULL),
(68,'Adjustable Gaming Trigger',29000,25,NULL),
(69,'Phone Charging Cable Organizer',9000,95,NULL),
(70,'3-in-1 Phone Cleaning Tool',10000,60,NULL),
(71,'Phone Camera Lens Protector',17000,40,NULL),
(72,'Foldable Wireless Charger',40000,22,NULL),
(73,'Silicone Camera Lens Cap',12000,50,NULL),
(74,'UV Phone Sanitizing Wand',46000,9,NULL),
(75,'Fast Charge Car Adapter',28000,30,NULL),
(76,'Multi-Device Wireless Charger',52000,14,NULL),
(77,'Phone Grip and Stand',15000,80,NULL),
(78,'Smartphone Screen Magnifier',21000,20,NULL),
(79,'Leather Phone Pouch',36000,12,NULL),
(80,'Bluetooth Tracker Tag',38000,15,NULL),
(81,'USB-C Power Delivery Cable',16000,55,NULL),
(82,'Portable Phone Amplifier',29000,22,NULL),
(83,'Wireless Charging Power Bank',48000,18,NULL),
(84,'Phone Screen Privacy Filter',22000,25,NULL),
(85,'Silicone Dust Plugs Set',9000,90,NULL),
(86,'Phone Cooling Fan Case',45000,10,NULL),
(87,'Smart Stylus Pen',35000,20,NULL),
(88,'Phone Camera Tripod Mount',27000,40,NULL),
(89,'Wireless Earbuds Case',15000,60,NULL),
(90,'Bluetooth Speaker Ring',52000,12,NULL),
(91,'Phone Ring Light Selfie',30000,15,NULL),
(92,'Waterproof Phone Case',42000,10,NULL),
(93,'Magnetic Charging Cable',25000,45,NULL),
(94,'Foldable Phone Holder',18000,50,NULL),
(95,'Leather Wireless Charger',47000,8,NULL),
(96,'Screen Cleaning Cloth',8000,100,NULL),
(97,'Adjustable Phone Clamp',16000,55,NULL),
(98,'Fast Wireless Charger Stand',40000,20,NULL),
(99,'Portable Phone Speaker',35000,25,NULL),
(100,'Eco-Friendly Phone Case',27000,35,NULL),
(101,'Phone Dustproof Plug',9000,78,NULL),
(102,'Smartphone Car Charger',32000,29,NULL),
(103,'Wireless Bluetooth Adapter',25000,40,NULL),
(104,'Iphone 16 Pro Magsafe Case',80000,28,NULL),
(105,'Case For Samsung S26 Ultra',85000,20,NULL),
(106,'Matte Screen Protector 6.2\"',30000,30,NULL);

UNLOCK TABLES;

/*Table structure for table `productcategory` */

DROP TABLE IF EXISTS `productcategory`;

CREATE TABLE `productcategory` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `productcategory` */

LOCK TABLES `productcategory` WRITE;

UNLOCK TABLES;

/*Table structure for table `purchase` */

DROP TABLE IF EXISTS `purchase`;

CREATE TABLE `purchase` (
  `purchaseId` int NOT NULL AUTO_INCREMENT,
  `invoice` text COLLATE utf8mb4_general_ci,
  `employeeId` int DEFAULT NULL,
  `supplierId` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `subtotal` double DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `total` double DEFAULT NULL,
  `status` enum('Pending','Approve','Reject') COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`purchaseId`),
  KEY `employeeId` (`employeeId`),
  KEY `supplierId` (`supplierId`),
  CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`employeeId`),
  CONSTRAINT `purchase_ibfk_2` FOREIGN KEY (`supplierId`) REFERENCES `supplier` (`supplierId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `purchase` */

LOCK TABLES `purchase` WRITE;

insert  into `purchase`(`purchaseId`,`invoice`,`employeeId`,`supplierId`,`date`,`subtotal`,`discount`,`total`,`status`) values 
(1,NULL,1,1,'2025-05-05 00:00:00',140000,NULL,140000,NULL),
(2,NULL,1,1,'2025-05-05 00:00:00',140000,NULL,140000,NULL),
(3,NULL,1,1,'2025-05-05 00:00:00',140000,NULL,140000,NULL),
(4,NULL,1,1,'2025-05-05 00:00:00',140000,NULL,140000,NULL),
(5,NULL,1,1,'2025-05-05 00:00:00',140000,NULL,140000,NULL),
(6,NULL,1,1,'2025-05-05 00:00:00',140000,NULL,140000,NULL);

UNLOCK TABLES;

/*Table structure for table `purchasedetail` */

DROP TABLE IF EXISTS `purchasedetail`;

CREATE TABLE `purchasedetail` (
  `purchaseDetailId` int NOT NULL AUTO_INCREMENT,
  `purchaseId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `quantity` double DEFAULT NULL,
  `price` double DEFAULT NULL,
  `subtotal` double DEFAULT NULL,
  PRIMARY KEY (`purchaseDetailId`),
  KEY `purchaseId` (`purchaseId`),
  KEY `productId` (`productId`),
  CONSTRAINT `purchasedetail_ibfk_1` FOREIGN KEY (`purchaseId`) REFERENCES `purchase` (`purchaseId`),
  CONSTRAINT `purchasedetail_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `purchasedetail` */

LOCK TABLES `purchasedetail` WRITE;

insert  into `purchasedetail`(`purchaseDetailId`,`purchaseId`,`productId`,`quantity`,`price`,`subtotal`) values 
(1,6,1,4,35000,NULL);

UNLOCK TABLES;

/*Table structure for table `salary` */

DROP TABLE IF EXISTS `salary`;

CREATE TABLE `salary` (
  `salaryId` int NOT NULL AUTO_INCREMENT,
  `employeeId` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `basicSalary` double DEFAULT NULL,
  `bonus` double DEFAULT NULL,
  `deduction` double DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`salaryId`),
  KEY `employeeId` (`employeeId`),
  CONSTRAINT `salary_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`employeeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `salary` */

LOCK TABLES `salary` WRITE;

UNLOCK TABLES;

/*Table structure for table `sale` */

DROP TABLE IF EXISTS `sale`;

CREATE TABLE `sale` (
  `saleId` int NOT NULL AUTO_INCREMENT,
  `invoice` text COLLATE utf8mb4_general_ci,
  `employeeId` int NOT NULL,
  `date` datetime NOT NULL,
  `method` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `proofQris` text COLLATE utf8mb4_general_ci,
  `subtotal` double DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `total` double NOT NULL,
  `payment` double DEFAULT NULL,
  `change` double DEFAULT NULL,
  PRIMARY KEY (`saleId`),
  KEY `employeeId` (`employeeId`),
  CONSTRAINT `sale_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`employeeId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `sale` */

LOCK TABLES `sale` WRITE;

insert  into `sale`(`saleId`,`invoice`,`employeeId`,`date`,`method`,`proofQris`,`subtotal`,`discount`,`total`,`payment`,`change`) values 
(1,'INV001',1,'2025-05-05 00:00:00','cash',NULL,NULL,NULL,140000,NULL,NULL),
(2,'INV002',1,'2025-05-05 00:00:00','cash',NULL,NULL,NULL,140000,NULL,NULL),
(3,'INV004',3,'2025-05-25 14:30:00','cash',NULL,300000,50000,250000,300000,50000),
(4,'INV004',3,'2025-05-25 07:30:00','cash',NULL,300000,50000,250000,300000,50000),
(5,'INV004',3,'2025-05-26 00:00:00','cash',NULL,300000,NULL,300000,300000,50000),
(6,'INV202505260611',3,'2025-05-25 00:00:00','cash',NULL,73000,NULL,73000,99999,26999),
(7,'INV202505260936',3,'2025-05-26 00:00:00','qris',NULL,115000,NULL,115000,150000,35000),
(8,'INV202506010101',3,'2025-05-31 00:00:00','cash',NULL,105000,NULL,105000,110000,5000),
(9,'INV202506011010',3,'2025-06-01 00:00:00','cash',NULL,70000,NULL,70000,100000,30000),
(10,'INV202506011401',3,'2025-06-01 00:00:00','cash',NULL,108000,NULL,108000,110000,2000),
(11,'INV202506011401',3,'2025-06-01 00:00:00','cash',NULL,108000,NULL,108000,150000,42000),
(12,'INV0210203',3,'2025-06-01 00:00:00','cash',NULL,300000,NULL,300000,300000,50000),
(13,'INV0210204',3,'2025-06-01 00:00:00','cash',NULL,300000,NULL,300000,300000,50000),
(14,'INV29133134',1,'2025-06-01 00:00:00','qris','https://ik.imagekit.io/choandrew/boy-anime-drawing-illustration_525160-1161_Est_SQ5i6.jpg',120000,12000,108000,110000,2000),
(15,'INV202506011501',3,'2025-06-01 00:00:00','qris',NULL,70000,7000,63000,70000,7000),
(16,'INV202506011505',3,'2025-06-01 00:00:00','qris','https://ik.imagekit.io/choandrew/boy-anime-drawing-illustration_525160-1161_LojGgXl_u.jpg',97000,NULL,97000,100000,3000);

UNLOCK TABLES;

/*Table structure for table `saledetail` */

DROP TABLE IF EXISTS `saledetail`;

CREATE TABLE `saledetail` (
  `saleDetailId` int NOT NULL AUTO_INCREMENT,
  `saleId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` double NOT NULL,
  `price` double NOT NULL,
  `subtotal` double NOT NULL,
  PRIMARY KEY (`saleDetailId`),
  KEY `saleId` (`saleId`),
  KEY `productId` (`productId`),
  CONSTRAINT `saledetail_ibfk_1` FOREIGN KEY (`saleId`) REFERENCES `sale` (`saleId`),
  CONSTRAINT `saledetail_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `saledetail` */

LOCK TABLES `saledetail` WRITE;

insert  into `saledetail`(`saleDetailId`,`saleId`,`productId`,`quantity`,`price`,`subtotal`) values 
(1,2,1,4,35000,140000),
(2,3,2,1,150000,150000),
(3,3,3,2,75000,150000),
(4,4,2,1,150000,150000),
(5,4,3,2,75000,150000),
(6,5,2,1,150000,150000),
(7,5,3,2,75000,150000),
(8,6,1,1,35000,35000),
(9,6,59,1,38000,38000),
(10,7,1,1,35000,35000),
(11,7,104,1,80000,80000),
(12,8,1,3,35000,105000),
(13,9,1,2,35000,70000),
(14,10,2,1,20000,20000),
(15,10,49,1,42000,42000),
(16,10,74,1,46000,46000),
(17,11,104,1,80000,80000),
(18,11,6,1,12000,12000),
(19,11,14,1,16000,16000),
(20,12,2,1,150000,150000),
(21,12,3,2,75000,150000),
(22,13,2,1,150000,150000),
(23,13,3,2,75000,150000),
(24,14,101,2,50000,100000),
(25,14,102,1,20000,20000),
(26,15,7,2,35000,70000),
(27,16,8,1,45000,45000),
(28,16,20,1,52000,52000);

UNLOCK TABLES;

/*Table structure for table `supplier` */

DROP TABLE IF EXISTS `supplier`;

CREATE TABLE `supplier` (
  `supplierId` int NOT NULL AUTO_INCREMENT,
  `supplierName` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`supplierId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `supplier` */

LOCK TABLES `supplier` WRITE;

insert  into `supplier`(`supplierId`,`supplierName`,`contact`) values 
(1,'Robot2','1234567890');

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
