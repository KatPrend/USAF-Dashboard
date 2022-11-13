# ************************************************************
# Sequel Ace SQL dump
# Version 20039
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: usaf-dashboard-server.mysql.database.azure.com (MySQL 5.7.38-log)
# Database: usaf-dash
# Generation Time: 2022-11-12 20:54:43 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table approved_funding
# ------------------------------------------------------------

DROP TABLE IF EXISTS `approved_funding`;

CREATE TABLE `approved_funding` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `appro_funding_type` int(20) unsigned DEFAULT NULL,
  `appro_fiscal_year` int(2) DEFAULT NULL,
  `approved_amount` decimal(13,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `appro_funding_type` (`appro_funding_type`),
  CONSTRAINT `approved_funding_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

LOCK TABLES `approved_funding` WRITE;
/*!40000 ALTER TABLE `approved_funding` DISABLE KEYS */;

INSERT INTO `approved_funding` (`id`, `project_id`, `appro_funding_type`, `appro_fiscal_year`, `approved_amount`)
VALUES
	(1,1,1,22,12000.00),
	(2,1,2,22,12000.00),
	(6,1,1,23,13000.00),
	(18,3,1,22,123.00),
	(20,3,2,22,123.00),
	(22,2,3,21,500.00),
	(23,2,3,22,500.00),
	(24,2,3,23,0.00),
	(25,2,4,21,0.00),
	(26,2,4,22,600.00),
	(27,2,4,23,900.00),
	(37,4,1,22,255.00),
	(38,4,2,22,0.00),
	(39,4,1,23,0.00),
	(40,4,2,23,5000.00),
	(41,2,3,24,0.00),
	(42,2,4,24,0.00),
	(43,119,4,22,1000.00),
	(60,2,2,21,0.00),
	(61,2,2,22,0.00),
	(62,2,2,23,0.00),
	(63,2,2,24,0.00),
	(64,2,3,25,0.00),
	(65,2,4,25,0.00),
	(66,2,2,25,0.00);

/*!40000 ALTER TABLE `approved_funding` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table branches
# ------------------------------------------------------------

DROP TABLE IF EXISTS `branches`;

CREATE TABLE `branches` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;

INSERT INTO `branches` (`id`, `branch_name`)
VALUES
	(1,'Modernization'),
	(2,'Production'),
	(3,'Special Projects'),
	(4,'Logistics'),
	(5,'Sustainment'),
	(6,'FMS'),
	(7,'NGB');

/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table clin_data
# ------------------------------------------------------------

DROP TABLE IF EXISTS `clin_data`;

CREATE TABLE `clin_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clin_num` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `clin_type` enum('FFP','FFIF','FF-EPA','CPFF','CPIF','CPAF','T&M') NOT NULL,
  `clin_scope` varchar(80) DEFAULT NULL,
  `ind_gov_est` decimal(13,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `clin_data_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

LOCK TABLES `clin_data` WRITE;
/*!40000 ALTER TABLE `clin_data` DISABLE KEYS */;

INSERT INTO `clin_data` (`id`, `clin_num`, `project_id`, `clin_type`, `clin_scope`, `ind_gov_est`)
VALUES
	(1,1,4,'FFP','Find Bo',1000.00),
	(2,2,4,'T&M','Find Bononos',1000.00),
	(5,3,2,'FFP','Test CLIN',1.00),
	(21,1,4,'T&M','Find Bo',1000.00),
	(22,1001,3,'T&M','Get knitro some sick new kicks',100000.00),
	(25,1002,3,'CPAF','Logan Paul merch',900000.00),
	(26,1007,3,'FFP','Vbux cards',100000.00),
	(27,1,3,'FFP','scopey',100.00),
	(28,1002,1,'FFP','scope',100.00),
	(31,32,1,'CPAF','sheep and rams',10000000.00),
	(32,1001,1,'FFP','things',90000.00),
	(33,1,119,'FFP','fghjkl',123456789.00),
	(34,2,119,'FFP','qwertyu',987654.00),
	(36,1001,3,'FFIF','sdfg',NULL);

/*!40000 ALTER TABLE `clin_data` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table contract_award
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contract_award`;

CREATE TABLE `contract_award` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `contract_num` varchar(80) NOT NULL,
  `contract_status` enum('Pre-Award','Awarded','Closed') NOT NULL DEFAULT 'Pre-Award',
  `contract_value` decimal(13,2) DEFAULT NULL,
  `indep_cost_est` decimal(13,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `contract_award_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

LOCK TABLES `contract_award` WRITE;
/*!40000 ALTER TABLE `contract_award` DISABLE KEYS */;

INSERT INTO `contract_award` (`id`, `project_id`, `contract_num`, `contract_status`, `contract_value`, `indep_cost_est`)
VALUES
	(5,2,'FA8620-18-C-200','Awarded',52440.00,NULL),
	(6,3,'FA8620-18-C-2001','Awarded',846821.66,NULL),
	(7,4,'FA8620-18-C-2001','Awarded',1234567.00,NULL),
	(8,5,'FA8620-18-C-2001','Pre-Award',1234567.00,NULL),
	(9,6,'FA8620-18-C-2001','Pre-Award',1234567.00,NULL),
	(23,1,'FA8620-18-C-20','Pre-Award',0.00,NULL),
	(27,95,'contractnum','Awarded',NULL,NULL),
	(39,108,'a','Pre-Award',NULL,NULL),
	(52,119,'b','Awarded',59470.00,NULL);

/*!40000 ALTER TABLE `contract_award` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table contract_award_timeline
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contract_award_timeline`;

CREATE TABLE `contract_award_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contract_award_id` int(11) NOT NULL,
  `timeline_status` enum('Planned','Projected','Actual') DEFAULT NULL,
  `requirement_plan` date DEFAULT NULL,
  `draft_rfp_released` date DEFAULT NULL,
  `approved_by_acb` date DEFAULT NULL,
  `rfp_released` date DEFAULT NULL,
  `proposal_received` date DEFAULT NULL,
  `tech_eval_comp` date DEFAULT NULL,
  `negotiation_comp` date DEFAULT NULL,
  `awarded` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contract_award_id` (`contract_award_id`),
  CONSTRAINT `contract_award_timeline_ibfk_2` FOREIGN KEY (`contract_award_id`) REFERENCES `contract_award` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

LOCK TABLES `contract_award_timeline` WRITE;
/*!40000 ALTER TABLE `contract_award_timeline` DISABLE KEYS */;

INSERT INTO `contract_award_timeline` (`id`, `contract_award_id`, `timeline_status`, `requirement_plan`, `draft_rfp_released`, `approved_by_acb`, `rfp_released`, `proposal_received`, `tech_eval_comp`, `negotiation_comp`, `awarded`)
VALUES
	(12,23,'Planned','2022-10-28','2022-11-06','2022-11-16','2022-11-26','2022-12-06','2022-12-16','2022-12-26','2023-01-05'),
	(13,23,'Planned','2022-11-22','1970-02-27','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31'),
	(14,23,'Projected','2022-11-23','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31'),
	(25,27,'Planned','2022-11-18','2022-11-27','2022-12-07','2022-12-17','2022-12-27','2023-01-06','2023-01-16','2023-01-26'),
	(26,27,'Projected',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(27,27,'Actual','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31','2022-11-23'),
	(31,39,'Planned','2022-11-14','2022-11-23','2022-12-03','2022-12-13','2022-12-23','2023-01-02','2023-01-12','2023-01-22'),
	(32,39,'Projected','2022-11-15','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31'),
	(33,39,'Actual','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31','2022-12-30'),
	(34,8,'Planned','2022-11-09','2022-11-18','2022-11-28','2022-12-08','2022-12-18','2022-12-28','2023-01-07','2023-01-17'),
	(35,8,'Projected',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(36,8,'Actual','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31','2023-02-24'),
	(37,6,'Planned','2022-11-13','2022-11-22','2022-12-02','2022-12-12','2022-12-22','2023-01-01','2023-01-11','2023-01-21'),
	(38,6,'Projected','2022-11-16','2022-11-17','2022-11-15','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31'),
	(39,6,'Actual','2022-11-21','2022-11-22','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31','1969-12-31'),
	(43,9,'Planned','2022-11-24','2022-12-03','2022-12-13','2022-12-23','2023-01-02','2023-01-12','2023-01-22','2023-02-01'),
	(44,9,'Projected',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(45,9,'Actual',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `contract_award_timeline` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table contract_days_added
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contract_days_added`;

CREATE TABLE `contract_days_added` (
  `draft_rfp_released` int(11) NOT NULL,
  `approved_by_acb` int(11) NOT NULL,
  `rfp_released` int(11) NOT NULL,
  `proposal_received` int(11) NOT NULL,
  `tech_eval_comp` int(11) NOT NULL,
  `negotiation_comp` int(11) NOT NULL,
  `awarded` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `contract_days_added` WRITE;
/*!40000 ALTER TABLE `contract_days_added` DISABLE KEYS */;

INSERT INTO `contract_days_added` (`draft_rfp_released`, `approved_by_acb`, `rfp_released`, `proposal_received`, `tech_eval_comp`, `negotiation_comp`, `awarded`)
VALUES
	(10,20,30,40,50,60,70);

/*!40000 ALTER TABLE `contract_days_added` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table contractor
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contractor`;

CREATE TABLE `contractor` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `contractor_name` varchar(50) DEFAULT NULL,
  `summary` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

LOCK TABLES `contractor` WRITE;
/*!40000 ALTER TABLE `contractor` DISABLE KEYS */;

INSERT INTO `contractor` (`id`, `contractor_name`, `summary`)
VALUES
	(1,'None','No Contractor'),
	(2,'RTX','Contractor summary for RTX'),
	(3,'L-3','Contractor summary for L-3'),
	(4,'Honeywell','Contractor summary for Honeywell'),
	(5,'GA-ASI','Contractor summary for GA-ASI'),
	(6,'No Projects','This has no projects');

/*!40000 ALTER TABLE `contractor` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table expenditure_funding_data
# ------------------------------------------------------------

DROP TABLE IF EXISTS `expenditure_funding_data`;

CREATE TABLE `expenditure_funding_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `expen_funding_date` date NOT NULL,
  `expen_projected` decimal(13,2) NOT NULL,
  `expen_actual` decimal(13,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `expenditure_funding_data_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;

LOCK TABLES `expenditure_funding_data` WRITE;
/*!40000 ALTER TABLE `expenditure_funding_data` DISABLE KEYS */;

INSERT INTO `expenditure_funding_data` (`id`, `project_id`, `expen_funding_date`, `expen_projected`, `expen_actual`)
VALUES
	(3,2,'2022-03-22',1000.00,500.00),
	(4,2,'2022-04-22',1000.00,250.00),
	(5,2,'2022-05-22',1000.00,1750.00),
	(6,2,'2022-06-22',1000.00,1000.00),
	(10,1,'2022-09-01',1234.00,12345.00),
	(11,1,'2022-01-01',100.00,100.00),
	(15,119,'1969-12-31',0.00,0.00),
	(16,119,'1969-12-31',0.00,0.00),
	(19,119,'2021-10-23',18830.00,NULL),
	(20,119,'2021-11-22',25520.00,NULL),
	(21,119,'2021-12-22',15120.00,NULL),
	(22,3,'2021-10-03',135736.78,100000.00),
	(23,3,'2021-10-23',153607.42,NULL),
	(24,3,'2021-11-03',168473.98,NULL),
	(25,3,'2021-11-24',196952.48,NULL),
	(26,3,'2021-12-03',149383.94,NULL),
	(27,3,'2021-12-24',227169.00,NULL),
	(28,3,'2022-01-03',395792.02,NULL),
	(29,3,'2022-01-25',139369.88,NULL),
	(30,3,'2022-02-03',586187.44,NULL),
	(31,3,'2022-03-03',315062.06,NULL),
	(32,3,'2022-03-24',195525.98,NULL),
	(33,3,'2022-04-03',319446.40,NULL),
	(34,3,'2022-04-24',168366.12,NULL),
	(35,3,'2022-05-03',642420.46,NULL),
	(36,3,'2022-06-03',293809.30,NULL),
	(37,3,'2022-06-24',145750.08,NULL),
	(38,3,'2022-07-03',305462.26,NULL),
	(39,3,'2022-07-24',187192.96,NULL),
	(40,3,'2022-08-03',325303.08,NULL),
	(41,3,'2022-08-24',169066.32,NULL),
	(42,3,'2022-09-03',266592.74,NULL),
	(43,3,'2022-09-24',363200.72,NULL),
	(53,1,'2021-10-01',144672.10,NULL),
	(54,1,'2021-11-01',182713.23,NULL),
	(55,1,'2021-12-01',188276.47,NULL),
	(56,1,'2022-01-01',267580.95,NULL),
	(57,1,'2022-02-01',293093.72,NULL),
	(58,1,'2022-03-01',255294.02,NULL),
	(59,1,'2022-04-01',243906.26,NULL),
	(60,1,'2022-05-01',321210.23,NULL),
	(61,1,'2022-06-01',219779.69,NULL),
	(62,1,'2022-07-01',246327.61,NULL),
	(63,1,'2022-08-01',247184.70,NULL),
	(64,1,'2022-09-01',314896.73,NULL),
	(68,1,'2021-10-01',144672.10,NULL),
	(69,1,'2021-11-01',182713.23,NULL),
	(70,1,'2021-12-01',188276.47,NULL),
	(71,1,'2022-01-01',267580.95,NULL),
	(72,1,'2022-02-01',293093.72,NULL),
	(73,1,'2022-03-01',255294.02,NULL),
	(74,1,'2022-04-01',243906.26,NULL),
	(75,1,'2022-05-01',321210.23,NULL),
	(76,1,'2022-06-01',219779.69,NULL),
	(77,1,'2022-07-01',246327.61,NULL),
	(78,1,'2022-08-01',247184.70,NULL),
	(79,1,'2022-09-01',314896.73,NULL);

/*!40000 ALTER TABLE `expenditure_funding_data` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table financial_summary_breakpoints
# ------------------------------------------------------------

DROP TABLE IF EXISTS `financial_summary_breakpoints`;

CREATE TABLE `financial_summary_breakpoints` (
  `obli_yellow_breakpoint` int(11) NOT NULL,
  `obli_red_breakpoint` int(11) NOT NULL,
  `expen_yellow_breakpoint` int(11) NOT NULL,
  `expen_red_breakpoint` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `financial_summary_breakpoints` WRITE;
/*!40000 ALTER TABLE `financial_summary_breakpoints` DISABLE KEYS */;

INSERT INTO `financial_summary_breakpoints` (`obli_yellow_breakpoint`, `obli_red_breakpoint`, `expen_yellow_breakpoint`, `expen_red_breakpoint`)
VALUES
	(20,20,20,20);

/*!40000 ALTER TABLE `financial_summary_breakpoints` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table funding_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `funding_types`;

CREATE TABLE `funding_types` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `funding_type` varchar(40) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

LOCK TABLES `funding_types` WRITE;
/*!40000 ALTER TABLE `funding_types` DISABLE KEYS */;

INSERT INTO `funding_types` (`id`, `funding_type`, `status`)
VALUES
	(1,'3600',1),
	(2,'3010',1),
	(3,'3400',1),
	(4,'Prod 3080 (BP10)',1),
	(5,'Prod 3080 (BP11)',1),
	(6,'Prod 3080 (BP16)',1),
	(7,'RDT&E 3600',1),
	(8,'O&M 3400',1);

/*!40000 ALTER TABLE `funding_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table military_job_titles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `military_job_titles`;

CREATE TABLE `military_job_titles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `mil_job_title` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

LOCK TABLES `military_job_titles` WRITE;
/*!40000 ALTER TABLE `military_job_titles` DISABLE KEYS */;

INSERT INTO `military_job_titles` (`id`, `mil_job_title`)
VALUES
	(1,'Project Manager'),
	(2,'Primary Engineer'),
	(3,'Primary Logistics'),
	(4,'GFE/GFP POC'),
	(5,'Contracting'),
	(6,'Financial Analyst'),
	(7,'Cost Analyst'),
	(8,'Reviewing Supervisor/PM'),
	(9,'Secondary Engineer'),
	(10,'Det 3'),
	(11,'Configuration/Data Management'),
	(12,'IPMR/IMS'),
	(13,'Test'),
	(14,'Cybersecurity');

/*!40000 ALTER TABLE `military_job_titles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table mipr_contracts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `mipr_contracts`;

CREATE TABLE `mipr_contracts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mipr_contract_num` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `mipr_contract_status` enum('Pre-Award','Awarded','Closed') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `mipr_contracts_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

LOCK TABLES `mipr_contracts` WRITE;
/*!40000 ALTER TABLE `mipr_contracts` DISABLE KEYS */;

INSERT INTO `mipr_contracts` (`id`, `mipr_contract_num`, `project_id`, `mipr_contract_status`)
VALUES
	(1,234234,2,'Pre-Award');

/*!40000 ALTER TABLE `mipr_contracts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table obligation_funding_data
# ------------------------------------------------------------

DROP TABLE IF EXISTS `obligation_funding_data`;

CREATE TABLE `obligation_funding_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `obli_funding_date` date NOT NULL,
  `obli_funding_type_id` int(11) unsigned DEFAULT NULL,
  `obli_funding_type` varchar(40) DEFAULT NULL,
  `obli_fiscal_year` varchar(20) NOT NULL,
  `obli_projected` decimal(13,2) NOT NULL,
  `obli_actual` decimal(13,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `obli_funding_type_id` (`obli_funding_type_id`),
  CONSTRAINT `obligation_funding_data_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  CONSTRAINT `obligation_funding_data_ibfk_3` FOREIGN KEY (`obli_funding_type_id`) REFERENCES `funding_types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

LOCK TABLES `obligation_funding_data` WRITE;
/*!40000 ALTER TABLE `obligation_funding_data` DISABLE KEYS */;

INSERT INTO `obligation_funding_data` (`id`, `project_id`, `obli_funding_date`, `obli_funding_type_id`, `obli_funding_type`, `obli_fiscal_year`, `obli_projected`, `obli_actual`)
VALUES
	(9,2,'2022-01-22',1,'3','22',47.00,47.00),
	(10,2,'2022-02-22',1,'1','22',500.00,0.00),
	(11,2,'2022-03-22',1,'6','22',0.00,0.00),
	(12,2,'2022-04-22',1,'1','22',4750.00,4750.00),
	(13,2,'2022-05-22',1,'1','22',0.00,0.00),
	(15,1,'2022-01-22',1,'3600','22',4750.00,4750.00),
	(16,3,'2022-12-07',1,'3600','FY\'22',99999.00,99999.00),
	(17,95,'2023-12-01',1,'3600','FY\'24',123.00,12345.00),
	(18,95,'2022-12-12',1,'3080','FY\'23',1234.00,123456.00);

/*!40000 ALTER TABLE `obligation_funding_data` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table project
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project`;

CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(80) DEFAULT NULL,
  `project_type` enum('Contract','MIPR') NOT NULL DEFAULT 'Contract',
  `contractor_id` int(11) unsigned DEFAULT NULL,
  `branch_id` int(11) unsigned DEFAULT NULL,
  `requirement_type_id` int(11) unsigned DEFAULT NULL,
  `summary` text,
  `ccar_num` varchar(60) NOT NULL,
  `dependency_status` enum('REALLY-BEHIND','BEHIND','ONTRACK') DEFAULT NULL,
  `financial_status` enum('UNDER','ON-BUDGET','OVER') DEFAULT NULL,
  `schedule_status` enum('REALLY-BEHIND','BEHIND','ONTRACK') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contractor_id` (`contractor_id`),
  KEY `branch_id` (`branch_id`),
  KEY `requirement_type_id` (`requirement_type_id`),
  CONSTRAINT `project_ibfk_4` FOREIGN KEY (`contractor_id`) REFERENCES `contractor` (`id`) ON DELETE SET NULL,
  CONSTRAINT `project_ibfk_5` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE SET NULL,
  CONSTRAINT `project_ibfk_6` FOREIGN KEY (`requirement_type_id`) REFERENCES `requirement_types` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8;

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;

INSERT INTO `project` (`id`, `project_name`, `project_type`, `contractor_id`, `branch_id`, `requirement_type_id`, `summary`, `ccar_num`, `dependency_status`, `financial_status`, `schedule_status`)
VALUES
	(1,'Postman Project','Contract',4,3,2,'This is the Postman project','C12312-2','BEHIND','ON-BUDGET','ONTRACK'),
	(2,'Metis','MIPR',2,2,3,'This is a test project that should have the project_type of MIPR and contract_status of Awarded','C23476-9','ONTRACK','UNDER','ONTRACK'),
	(3,'Knightro Collab','Contract',3,3,3,'Test project 3 desc','123123','REALLY-BEHIND','OVER','REALLY-BEHIND'),
	(4,'Rescue Bo','Contract',4,4,4,'WE NEED TO SAVE BO NOW!!!!!','0','ONTRACK','ON-BUDGET','ONTRACK'),
	(5,'Test Project 5','Contract',5,5,1,'This is the summary','1000','ONTRACK','ON-BUDGET','BEHIND'),
	(6,'Super Cool Project','Contract',2,6,2,'this is a super cool project','A12345-6','ONTRACK','ON-BUDGET','REALLY-BEHIND'),
	(95,'testing project','Contract',1,1,1,'','a;skjf;KDJSFADS',NULL,NULL,NULL),
	(108,'a','Contract',1,1,1,'a','a',NULL,NULL,NULL),
	(119,'b','Contract',5,1,1,'b','b',NULL,NULL,NULL);

/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table project_funding_data
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project_funding_data`;

CREATE TABLE `project_funding_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `proj_funding_type` varchar(60) NOT NULL,
  `proj_current_date` date NOT NULL,
  `curr_obli_planned` decimal(13,2) DEFAULT NULL,
  `curr_obli_actual` decimal(13,2) DEFAULT NULL,
  `curr_exp_planned` decimal(13,2) DEFAULT NULL,
  `curr_exp_actual` decimal(13,2) DEFAULT NULL,
  `project_funding_startDate` date NOT NULL,
  `project_funding_endDate` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `project_funding_data_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

LOCK TABLES `project_funding_data` WRITE;
/*!40000 ALTER TABLE `project_funding_data` DISABLE KEYS */;

INSERT INTO `project_funding_data` (`id`, `project_id`, `proj_funding_type`, `proj_current_date`, `curr_obli_planned`, `curr_obli_actual`, `curr_exp_planned`, `curr_exp_actual`, `project_funding_startDate`, `project_funding_endDate`)
VALUES
	(1,1,'3600','2022-06-01',1500000.00,1500000.00,144672.10,135421.22,'2022-07-01','2023-01-01'),
	(2,1,'3600','2022-07-01',1500000.00,2500000.00,144672.10,100000.00,'2022-07-01','2023-01-01'),
	(3,2,'3600','2022-07-01',1000000.00,1000000.00,1001000.00,1001000.00,'2022-07-01','2023-01-01');

/*!40000 ALTER TABLE `project_funding_data` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table project_milestone_dependency
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project_milestone_dependency`;

CREATE TABLE `project_milestone_dependency` (
  `predecessor_project` int(11) DEFAULT NULL,
  `predecessor_milestone` int(11) DEFAULT NULL,
  `successor_project` int(11) DEFAULT NULL,
  `successor_milestone` int(11) DEFAULT NULL,
  KEY `predecessor_project` (`predecessor_project`),
  KEY `successor_project` (`successor_project`),
  KEY `predecessor_milestone` (`predecessor_milestone`),
  KEY `successor_milestone` (`successor_milestone`),
  CONSTRAINT `project_milestone_dependency_ibfk_5` FOREIGN KEY (`predecessor_project`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  CONSTRAINT `project_milestone_dependency_ibfk_6` FOREIGN KEY (`successor_project`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  CONSTRAINT `project_milestone_dependency_ibfk_7` FOREIGN KEY (`predecessor_milestone`) REFERENCES `project_milestones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `project_milestone_dependency_ibfk_8` FOREIGN KEY (`successor_milestone`) REFERENCES `project_milestones` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `project_milestone_dependency` WRITE;
/*!40000 ALTER TABLE `project_milestone_dependency` DISABLE KEYS */;

INSERT INTO `project_milestone_dependency` (`predecessor_project`, `predecessor_milestone`, `successor_project`, `successor_milestone`)
VALUES
	(1,1,1,2),
	(1,2,1,3),
	(1,2,1,4),
	(1,2,1,5),
	(1,3,2,23),
	(2,18,2,19),
	(2,19,2,20),
	(2,19,2,21),
	(2,19,2,22),
	(2,18,2,22),
	(1,2,2,21),
	(1,2,2,22),
	(4,49,4,50),
	(4,50,4,51),
	(4,51,4,52),
	(4,49,4,53),
	(108,58,108,59),
	(108,58,108,62),
	(108,59,108,60),
	(108,60,108,61),
	(5,65,5,66),
	(5,65,5,69),
	(5,66,5,67),
	(5,67,5,68),
	(119,72,119,73),
	(119,72,119,76),
	(119,73,119,74),
	(119,74,119,75);

/*!40000 ALTER TABLE `project_milestone_dependency` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table project_milestones
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project_milestones`;

CREATE TABLE `project_milestones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `task_name` varchar(80) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `actual_start` date DEFAULT NULL,
  `actual_end` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `project_milestones_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;

LOCK TABLES `project_milestones` WRITE;
/*!40000 ALTER TABLE `project_milestones` DISABLE KEYS */;

INSERT INTO `project_milestones` (`id`, `project_id`, `task_name`, `start_date`, `end_date`, `actual_start`, `actual_end`)
VALUES
	(1,1,'stone 1','2022-01-01','2022-01-07',NULL,NULL),
	(2,1,'stone 2','2022-01-14','2022-01-21','2022-01-16',NULL),
	(3,1,'stone 3','2022-01-22','2022-01-23','2022-01-22','2022-01-28'),
	(4,1,'Gather Eggs 4','2022-01-31','2022-02-01',NULL,NULL),
	(5,1,'stone 5','2022-01-20','2022-01-21',NULL,NULL),
	(18,2,'Make a picture 1','2022-01-01','2022-01-10','2022-01-01','2022-01-11'),
	(19,2,'num 2','2022-01-17','2022-01-21','2022-01-14','2022-01-24'),
	(20,2,'Do a thing 3','2022-01-22','2022-01-23',NULL,NULL),
	(21,2,'Clean Eggs 4','2022-01-19','2022-02-01',NULL,NULL),
	(22,2,'Examine Eggs 5','2022-02-20','2022-02-21',NULL,NULL),
	(23,3,'Eat Eggs  1','2022-01-24','2022-02-07',NULL,NULL),
	(24,3,'Forget Everything you know 2','2022-02-14','2022-02-21',NULL,NULL),
	(25,3,'Stop Doing a thing 3','2022-02-22','2022-02-23',NULL,NULL),
	(26,3,'Help the homless 4','2022-02-21','2022-02-01',NULL,NULL),
	(27,3,'Feed Pigeons 5','2022-02-20','2022-02-21',NULL,NULL),
	(49,4,'Look For Bo','2023-01-14','2023-01-30',NULL,NULL),
	(50,4,'Get Snacks','2023-02-27','2023-02-27',NULL,NULL),
	(51,4,'Snack Break','2023-02-28','2023-02-28',NULL,NULL),
	(52,4,'Clean up after Break','2023-02-28','2023-02-28',NULL,NULL),
	(53,4,'Find Bo','2023-04-30','2023-05-03',NULL,NULL),
	(56,95,'Joking Around','2022-11-08','2022-11-17',NULL,NULL),
	(58,108,'Look For Bo','2023-01-14','2023-01-30',NULL,NULL),
	(59,108,'Get Snacks','2023-02-27','2023-02-27',NULL,NULL),
	(60,108,'Snack Break','2023-02-28','2023-02-28',NULL,NULL),
	(61,108,'Clean up after Break','2023-02-28','2023-02-28',NULL,NULL),
	(62,108,'Find Bo','2023-04-30','2023-05-03',NULL,NULL),
	(65,5,'Look For Bo','2023-01-14','2023-01-30',NULL,NULL),
	(66,5,'Get Snacks','2023-02-27','2023-02-27',NULL,NULL),
	(67,5,'Snack Break','2023-02-28','2023-02-28',NULL,NULL),
	(68,5,'Clean up after Break','2023-02-28','2023-02-28',NULL,NULL),
	(69,5,'Find Bo','2023-04-30','2023-05-03',NULL,NULL),
	(72,119,'Look For Bo','2023-01-14','2023-01-30',NULL,NULL),
	(73,119,'Get Snacks','2023-02-27','2023-02-27',NULL,NULL),
	(74,119,'Snack Break','2023-02-28','2023-02-28',NULL,NULL),
	(75,119,'Clean up after Break','2023-02-28','2023-02-28',NULL,NULL),
	(76,119,'Find Bo','2023-04-30','2023-05-03',NULL,NULL);

/*!40000 ALTER TABLE `project_milestones` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table requirement_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `requirement_types`;

CREATE TABLE `requirement_types` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `requirement_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

LOCK TABLES `requirement_types` WRITE;
/*!40000 ALTER TABLE `requirement_types` DISABLE KEYS */;

INSERT INTO `requirement_types` (`id`, `requirement_type`)
VALUES
	(1,'CDD'),
	(2,'CPD'),
	(3,'1067'),
	(4,'UON/JUONs');

/*!40000 ALTER TABLE `requirement_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table task_resource_table
# ------------------------------------------------------------

DROP TABLE IF EXISTS `task_resource_table`;

CREATE TABLE `task_resource_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `clin_id` int(11) DEFAULT NULL,
  `task_id` varchar(20) NOT NULL,
  `task_description` varchar(80) NOT NULL,
  `month` date DEFAULT NULL,
  `wbs` varchar(20) DEFAULT NULL,
  `clin_num` int(11) DEFAULT NULL,
  `source_type` varchar(40) DEFAULT NULL,
  `resource_code` varchar(20) DEFAULT NULL,
  `resource_description` varchar(40) DEFAULT NULL,
  `resource_type` varchar(20) DEFAULT NULL,
  `rate` decimal(13,2) DEFAULT NULL,
  `hours_worked` int(11) DEFAULT NULL,
  `units` decimal(13,2) DEFAULT NULL,
  `cost` decimal(13,2) DEFAULT NULL,
  `base_cost` decimal(13,2) DEFAULT NULL,
  `direct_cost` decimal(13,2) DEFAULT NULL,
  `total_price` decimal(13,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clin_id` (`clin_id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `task_resource_table_ibfk_3` FOREIGN KEY (`clin_id`) REFERENCES `clin_data` (`id`) ON DELETE CASCADE,
  CONSTRAINT `task_resource_table_ibfk_4` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1597 DEFAULT CHARSET=utf8;

LOCK TABLES `task_resource_table` WRITE;
/*!40000 ALTER TABLE `task_resource_table` DISABLE KEYS */;

INSERT INTO `task_resource_table` (`id`, `project_id`, `clin_id`, `task_id`, `task_description`, `month`, `wbs`, `clin_num`, `source_type`, `resource_code`, `resource_description`, `resource_type`, `rate`, `hours_worked`, `units`, `cost`, `base_cost`, `direct_cost`, `total_price`)
VALUES
	(289,1,32,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,165,NULL,12736.35,12736.35,12736.35,12736.35),
	(290,1,32,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,256,NULL,14123.52,14123.52,14123.52,14123.52),
	(291,1,32,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,255,NULL,22501.20,22501.20,22501.20,22501.20),
	(292,1,32,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,311,NULL,27442.64,27442.64,27442.64,27442.64),
	(293,1,32,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,325,NULL,25086.75,25086.75,25086.75,25086.75),
	(294,1,32,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,345,NULL,19033.65,19033.65,19033.65,19033.65),
	(295,1,32,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(296,1,32,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,254,NULL,22412.96,22412.96,22412.96,22412.96),
	(297,1,32,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,221,NULL,17058.99,17058.99,17058.99,17058.99),
	(298,1,32,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,105,NULL,5792.85,5792.85,5792.85,5792.85),
	(299,1,32,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,125,NULL,11030.00,11030.00,11030.00,11030.00),
	(300,1,32,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,247,NULL,21795.28,21795.28,21795.28,21795.28),
	(301,1,32,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,288,NULL,22230.72,22230.72,22230.72,22230.72),
	(302,1,32,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,158,NULL,8716.86,8716.86,8716.86,8716.86),
	(303,1,32,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,195,NULL,17206.80,17206.80,17206.80,17206.80),
	(304,1,32,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(305,1,32,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,322,NULL,24855.18,24855.18,24855.18,24855.18),
	(306,1,32,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,362,NULL,19971.54,19971.54,19971.54,19971.54),
	(307,1,32,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(308,1,32,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,140,NULL,12353.60,12353.60,12353.60,12353.60),
	(309,1,32,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,152,NULL,11732.88,11732.88,11732.88,11732.88),
	(310,1,32,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,146,NULL,8054.82,8054.82,8054.82,8054.82),
	(311,1,32,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,188,NULL,16589.12,16589.12,16589.12,16589.12),
	(312,1,32,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(313,1,32,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,266,NULL,17603.88,17603.88,17603.88,17603.88),
	(314,1,32,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,354,NULL,27325.26,27325.26,27325.26,27325.26),
	(315,1,32,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,165,NULL,9103.05,9103.05,9103.05,9103.05),
	(316,1,32,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,256,NULL,22589.44,22589.44,22589.44,22589.44),
	(317,1,32,'1.6.2.1.2','Rev X Drawing Delivery','2022-02-03','1.6.2.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,255,NULL,22501.20,22501.20,22501.20,22501.20),
	(318,1,32,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,311,NULL,20581.98,20581.98,20581.98,20581.98),
	(319,1,32,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,325,NULL,17930.25,17930.25,17930.25,17930.25),
	(320,1,32,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,345,NULL,26630.55,26630.55,26630.55,26630.55),
	(321,1,32,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,362,NULL,16000.40,16000.40,16000.40,16000.40),
	(322,1,32,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,254,NULL,14023.34,14023.34,14023.34,14023.34),
	(323,1,32,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,221,NULL,14625.78,14625.78,14625.78,14625.78),
	(324,1,32,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,105,NULL,5792.85,5792.85,5792.85,5792.85),
	(325,1,32,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,125,NULL,9648.75,9648.75,9648.75,9648.75),
	(326,1,32,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,247,NULL,10917.40,10917.40,10917.40,10917.40),
	(327,1,32,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,288,NULL,15900.48,15900.48,15900.48,15900.48),
	(328,1,32,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,158,NULL,10456.44,10456.44,10456.44,10456.44),
	(329,1,32,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,195,NULL,10758.15,10758.15,10758.15,10758.15),
	(330,1,32,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,244,NULL,18834.36,18834.36,18834.36,18834.36),
	(331,1,32,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,322,NULL,14232.40,14232.40,14232.40,14232.40),
	(332,1,32,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,362,NULL,19986.02,19986.02,19986.02,19986.02),
	(333,1,32,'1.8.1.1.3','Test Plan Delivery','2022-03-03','1.8.1.1.3',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(334,1,32,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,140,NULL,9265.20,9265.20,9265.20,9265.20),
	(335,1,32,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,152,NULL,8385.84,8385.84,8385.84,8385.84),
	(336,1,32,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,146,NULL,11269.74,11269.74,11269.74,11269.74),
	(337,1,32,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,188,NULL,8309.60,8309.60,8309.60,8309.60),
	(338,1,32,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','ME-01','Junior Test Support','Labor',33.22,244,NULL,8105.68,8105.68,8105.68,8105.68),
	(339,1,32,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,266,NULL,14685.86,14685.86,14685.86,14685.86),
	(340,1,32,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,4324.00,4324.00,4324.00,4324.00),
	(341,1,32,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,165,NULL,10919.70,10919.70,10919.70,10919.70),
	(342,1,32,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,256,NULL,14123.52,14123.52,14123.52,14123.52),
	(343,1,32,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,255,NULL,19683.45,19683.45,19683.45,19683.45),
	(344,1,32,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,311,NULL,13746.20,13746.20,13746.20,13746.20),
	(345,1,32,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','ME-01','Junior Test Support','Labor',33.22,325,NULL,10796.50,10796.50,10796.50,10796.50),
	(346,1,32,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,345,NULL,19047.45,19047.45,19047.45,19047.45),
	(347,1,32,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,4124.00,4124.00,4124.00,4124.00),
	(348,1,32,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,254,NULL,14013.18,14013.18,14013.18,14013.18),
	(349,1,32,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,221,NULL,17058.99,17058.99,17058.99,17058.99),
	(350,1,32,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,105,NULL,4641.00,4641.00,4641.00,4641.00),
	(351,1,32,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,125,NULL,6901.25,6901.25,6901.25,6901.25),
	(352,1,32,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,9838.00,9838.00,9838.00,9838.00),
	(353,1,32,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,288,NULL,15888.96,15888.96,15888.96,15888.96),
	(354,1,32,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,158,NULL,12196.02,12196.02,12196.02,12196.02),
	(355,1,32,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,195,NULL,8619.00,8619.00,8619.00,8619.00),
	(356,1,32,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,244,NULL,13471.24,13471.24,13471.24,13471.24),
	(357,1,32,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,9457.00,9457.00,9457.00,9457.00),
	(358,1,32,'1.8.1.5.1','Test Report Production','2022-08-03','1.8.1.5.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,362,NULL,23957.16,23957.16,23957.16,23957.16),
	(359,1,32,'1.8.1.5.1','Test Report Production','2022-08-03','1.8.1.5.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,100,NULL,4420.00,4420.00,4420.00,4420.00),
	(360,1,32,'1.8.1.5.1','Test Report Production','2022-08-03','1.8.1.5.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,140,NULL,7729.40,7729.40,7729.40,7729.40),
	(361,1,32,'1.8.1.5.2','Test Report Delivery','2022-08-03','1.8.1.5.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,152,NULL,13412.48,13412.48,13412.48,13412.48),
	(362,1,32,'1.6.3.1.1','Rev A Drawing Production','2022-08-03','1.6.3.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,146,NULL,9662.28,9662.28,9662.28,9662.28),
	(363,1,32,'1.6.3.1.1','Rev A Drawing Production','2022-08-03','1.6.3.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,188,NULL,14511.72,14511.72,14511.72,14511.72),
	(364,1,32,'1.6.3.1.1','Rev A Drawing Production','2022-08-03','1.6.3.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,244,NULL,13461.48,13461.48,13461.48,13461.48),
	(365,1,32,'1.6.3.1.1','Rev A Drawing Production','2022-09-03','1.6.3.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,266,NULL,17603.88,17603.88,17603.88,17603.88),
	(366,1,32,'1.6.3.1.1','Rev A Drawing Production','2022-09-03','1.6.3.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,354,NULL,27325.26,27325.26,27325.26,27325.26),
	(367,1,32,'1.6.3.1.1','Rev A Drawing Production','2022-09-03','1.6.3.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,165,NULL,9103.05,9103.05,9103.05,9103.05),
	(368,1,32,'1.6.3.1.2','Rev A Drawing Delivery','2022-09-03','1.6.3.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,256,NULL,22589.44,22589.44,22589.44,22589.44),
	(369,1,32,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,255,NULL,16875.90,16875.90,16875.90,16875.90),
	(370,1,32,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,311,NULL,24006.09,24006.09,24006.09,24006.09),
	(371,1,32,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,325,NULL,17930.25,17930.25,17930.25,17930.25),
	(372,1,32,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,345,NULL,30442.80,30442.80,30442.80,30442.80),
	(373,1,32,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,362,NULL,16000.40,16000.40,16000.40,16000.40),
	(374,1,32,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,254,NULL,14023.34,14023.34,14023.34,14023.34),
	(375,1,32,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,221,NULL,14625.78,14625.78,14625.78,14625.78),
	(376,1,32,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,105,NULL,8104.95,8104.95,8104.95,8104.95),
	(377,1,32,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,125,NULL,6896.25,6896.25,6896.25,6896.25),
	(378,1,32,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,247,NULL,21795.28,21795.28,21795.28,21795.28),
	(379,1,32,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,288,NULL,12729.60,12729.60,12729.60,12729.60),
	(380,1,32,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,158,NULL,8723.18,8723.18,8723.18,8723.18),
	(381,1,32,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,195,NULL,12905.10,12905.10,12905.10,12905.10),
	(382,1,32,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,244,NULL,18834.36,18834.36,18834.36,18834.36),
	(383,1,32,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,322,NULL,17764.74,17764.74,17764.74,17764.74),
	(384,1,32,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(385,1,32,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,100,NULL,4420.00,4420.00,4420.00,4420.00),
	(386,1,32,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,140,NULL,7729.40,7729.40,7729.40,7729.40),
	(387,1,32,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,152,NULL,10059.36,10059.36,10059.36,10059.36),
	(388,1,32,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,146,NULL,11269.74,11269.74,11269.74,11269.74),
	(389,1,32,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,188,NULL,10371.96,10371.96,10371.96,10371.96),
	(390,1,32,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(391,1,32,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,266,NULL,11757.20,11757.20,11757.20,11757.20),
	(392,1,32,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,354,NULL,19544.34,19544.34,19544.34,19544.34),
	(393,1,32,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,165,NULL,10919.70,10919.70,10919.70,10919.70),
	(394,1,32,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,256,NULL,19760.64,19760.64,19760.64,19760.64),
	(395,1,32,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,255,NULL,14068.35,14068.35,14068.35,14068.35),
	(396,1,32,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,311,NULL,27442.64,27442.64,27442.64,27442.64),
	(397,1,32,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,325,NULL,14365.00,14365.00,14365.00,14365.00),
	(398,1,32,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,345,NULL,19047.45,19047.45,19047.45,19047.45),
	(399,1,32,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,362,NULL,23957.16,23957.16,23957.16,23957.16),
	(400,1,32,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,254,NULL,19606.26,19606.26,19606.26,19606.26),
	(401,1,32,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,221,NULL,12192.57,12192.57,12192.57,12192.57),
	(402,1,32,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,105,NULL,9265.20,9265.20,9265.20,9265.20),
	(403,1,32,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,125,NULL,5525.00,5525.00,5525.00,5525.00),
	(404,1,32,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,247,NULL,13636.87,13636.87,13636.87,13636.87),
	(405,1,32,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,288,NULL,19059.84,19059.84,19059.84,19059.84),
	(406,1,32,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,158,NULL,12196.02,12196.02,12196.02,12196.02),
	(407,1,32,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,195,NULL,10758.15,10758.15,10758.15,10758.15),
	(408,1,32,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(409,1,32,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,322,NULL,14232.40,14232.40,14232.40,14232.40),
	(410,1,32,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,362,NULL,19986.02,19986.02,19986.02,19986.02),
	(411,1,32,'1.6.5.3.2','Tech Data Delivery','2022-09-24','1.6.5.3.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(412,1,32,'1.9.1.1.1','Training Material Production','2022-09-24','1.9.1.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,140,NULL,9265.20,9265.20,9265.20,9265.20),
	(413,1,32,'1.9.1.1.1','Training Material Production','2022-09-24','1.9.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,152,NULL,11732.88,11732.88,11732.88,11732.88),
	(414,1,32,'1.9.1.1.1','Training Material Production','2022-09-24','1.9.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,146,NULL,8054.82,8054.82,8054.82,8054.82),
	(415,1,32,'1.9.1.1.2','Training Material Delivery','2022-09-24','1.9.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,188,NULL,16589.12,16589.12,16589.12,16589.12),
	(416,1,32,'1.10.1.1.1','Contract Closeout','2022-09-24','1.10.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(417,1,32,'1.7.4.4.1','Data Management Support','2021-10-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,266,NULL,23471.84,23471.84,23471.84,23471.84),
	(418,1,32,'1.7.4.4.1','Data Management Support','2021-11-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,354,NULL,31236.96,31236.96,31236.96,31236.96),
	(419,1,32,'1.7.4.4.1','Data Management Support','2021-12-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,165,NULL,14559.60,14559.60,14559.60,14559.60),
	(420,1,32,'1.7.4.4.1','Data Management Support','2022-01-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,256,NULL,22589.44,22589.44,22589.44,22589.44),
	(421,1,32,'1.7.4.4.1','Data Management Support','2022-02-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,255,NULL,22501.20,22501.20,22501.20,22501.20),
	(422,1,32,'1.7.4.4.1','Data Management Support','2022-03-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,311,NULL,27442.64,27442.64,27442.64,27442.64),
	(423,1,32,'1.7.4.4.1','Data Management Support','2022-04-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,325,NULL,28678.00,28678.00,28678.00,28678.00),
	(424,1,32,'1.7.4.4.1','Data Management Support','2022-05-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,345,NULL,30442.80,30442.80,30442.80,30442.80),
	(425,1,32,'1.7.4.4.1','Data Management Support','2022-06-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(426,1,32,'1.7.4.4.1','Data Management Support','2022-07-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,254,NULL,22412.96,22412.96,22412.96,22412.96),
	(427,1,32,'1.7.4.4.1','Data Management Support','2022-08-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,221,NULL,19501.04,19501.04,19501.04,19501.04),
	(428,1,32,'1.7.4.4.1','Data Management Support','2022-09-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,105,NULL,9265.20,9265.20,9265.20,9265.20),
	(429,1,32,'1.7.4.1.1','Project Management Support','2021-10-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,125,NULL,11030.00,11030.00,11030.00,11030.00),
	(430,1,32,'1.7.4.1.1','Project Management Support','2021-11-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,247,NULL,21795.28,21795.28,21795.28,21795.28),
	(431,1,32,'1.7.4.1.1','Project Management Support','2021-12-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,288,NULL,25413.12,25413.12,25413.12,25413.12),
	(432,1,32,'1.7.4.1.1','Project Management Support','2022-01-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,158,NULL,13941.92,13941.92,13941.92,13941.92),
	(433,1,32,'1.7.4.1.1','Project Management Support','2022-02-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,195,NULL,17206.80,17206.80,17206.80,17206.80),
	(434,1,32,'1.7.4.1.1','Project Management Support','2022-03-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(435,1,32,'1.7.4.1.1','Project Management Support','2022-04-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,322,NULL,28413.28,28413.28,28413.28,28413.28),
	(436,1,32,'1.7.4.1.1','Project Management Support','2022-05-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(437,1,32,'1.7.4.1.1','Project Management Support','2022-06-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(438,1,32,'1.7.4.1.1','Project Management Support','2022-07-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,140,NULL,12353.60,12353.60,12353.60,12353.60),
	(439,1,32,'1.7.4.1.1','Project Management Support','2022-08-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,152,NULL,13412.48,13412.48,13412.48,13412.48),
	(440,1,32,'1.7.4.1.1','Project Management Support','2022-09-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,146,NULL,12883.04,12883.04,12883.04,12883.04),
	(441,1,32,'1.7.4.1.1','Project Management Support','2021-10-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,188,NULL,18659.00,18659.00,18659.00,18659.00),
	(442,1,32,'1.7.4.1.1','Project Management Support','2021-11-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,244,NULL,24217.00,24217.00,24217.00,24217.00),
	(443,1,32,'1.7.4.1.1','Project Management Support','2021-12-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,266,NULL,26400.50,26400.50,26400.50,26400.50),
	(444,1,32,'1.7.4.1.1','Project Management Support','2022-01-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,354,NULL,35134.50,35134.50,35134.50,35134.50),
	(445,1,32,'1.7.4.1.1','Project Management Support','2022-02-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,165,NULL,16376.25,16376.25,16376.25,16376.25),
	(446,1,32,'1.7.4.1.1','Project Management Support','2022-03-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,256,NULL,25408.00,25408.00,25408.00,25408.00),
	(447,1,32,'1.7.4.1.1','Project Management Support','2022-04-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,255,NULL,25308.75,25308.75,25308.75,25308.75),
	(448,1,32,'1.7.4.1.1','Project Management Support','2022-05-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,311,NULL,30866.75,30866.75,30866.75,30866.75),
	(449,1,32,'1.7.4.1.1','Project Management Support','2022-06-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,325,NULL,32256.25,32256.25,32256.25,32256.25),
	(450,1,32,'1.7.4.1.1','Project Management Support','2022-07-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,345,NULL,34241.25,34241.25,34241.25,34241.25),
	(451,1,32,'1.7.4.1.1','Project Management Support','2022-08-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,362,NULL,35928.50,35928.50,35928.50,35928.50),
	(452,1,32,'1.7.4.2.1','Financial Management Support','2022-09-03','1.7.4.2.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,254,NULL,25209.50,25209.50,25209.50,25209.50),
	(453,1,32,'1.7.4.2.1','Financial Management Support','2021-10-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,221,NULL,14707.55,14707.55,14707.55,14707.55),
	(454,1,32,'1.7.4.2.1','Financial Management Support','2021-11-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,105,NULL,6987.75,6987.75,6987.75,6987.75),
	(455,1,32,'1.7.4.2.1','Financial Management Support','2021-12-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,125,NULL,8318.75,8318.75,8318.75,8318.75),
	(456,1,32,'1.7.4.2.1','Financial Management Support','2022-01-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,247,NULL,16437.85,16437.85,16437.85,16437.85),
	(457,1,32,'1.7.4.2.1','Financial Management Support','2022-02-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,288,NULL,19166.40,19166.40,19166.40,19166.40),
	(458,1,32,'1.7.4.2.1','Financial Management Support','2022-03-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,158,NULL,10514.90,10514.90,10514.90,10514.90),
	(459,1,32,'1.7.4.2.1','Financial Management Support','2022-04-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,195,NULL,12977.25,12977.25,12977.25,12977.25),
	(460,1,32,'1.7.4.2.1','Financial Management Support','2022-05-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,244,NULL,16238.20,16238.20,16238.20,16238.20),
	(461,1,32,'1.7.4.2.1','Financial Management Support','2022-06-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,322,NULL,21429.10,21429.10,21429.10,21429.10),
	(462,1,32,'1.7.4.2.1','Financial Management Support','2022-07-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,362,NULL,24091.10,24091.10,24091.10,24091.10),
	(463,1,32,'1.7.4.2.1','Financial Management Support','2022-08-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,100,NULL,6655.00,6655.00,6655.00,6655.00),
	(464,1,32,'1.7.4.2.1','Financial Management Support','2022-09-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,140,NULL,9317.00,9317.00,9317.00,9317.00),
	(544,119,33,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1,'Direct','PE-03','Senior Project Engineer','Labor',30.00,165,NULL,4950.00,4950.00,4950.00,4950.00),
	(545,119,33,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1,'Direct','PE-01','Junior Project Engineer','Labor',10.00,256,NULL,2560.00,2560.00,2560.00,2560.00),
	(546,119,33,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1,'Direct','PM-02','Mid Project Management','Labor',20.00,255,NULL,5100.00,5100.00,5100.00,5100.00),
	(547,119,33,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1,'Direct','PM-02','Mid Project Management','Labor',20.00,311,NULL,6220.00,6220.00,6220.00,6220.00),
	(548,119,34,'1.6.1.1.1','PDR Support','2021-11-22','1.6.1.1.1',2,'Direct','PE-03','Senior Project Engineer','Labor',30.00,325,NULL,9750.00,9750.00,9750.00,9750.00),
	(549,119,34,'1.6.1.1.1','PDR Support','2021-11-22','1.6.1.1.1',2,'Direct','PE-01','Junior Project Engineer','Labor',10.00,345,NULL,3450.00,3450.00,3450.00,3450.00),
	(550,119,34,'1.6.1.1.1','PDR Support','2021-11-22','1.6.1.1.1',2,'Direct','PM-02','Mid Project Management','Labor',20.00,362,NULL,7240.00,7240.00,7240.00,7240.00),
	(551,119,34,'1.6.1.1.1','PDR Support','2021-11-22','1.6.1.1.1',2,'Direct','PM-02','Mid Project Management','Labor',20.00,254,NULL,5080.00,5080.00,5080.00,5080.00),
	(552,119,34,'1.6.1.1.1','PDR Support','2021-12-22','1.6.1.1.1',2,'Direct','PE-03','Senior Project Engineer','Labor',30.00,221,NULL,6630.00,6630.00,6630.00,6630.00),
	(553,119,34,'1.6.1.1.1','PDR Support','2021-12-22','1.6.1.1.1',2,'Direct','PE-01','Junior Project Engineer','Labor',10.00,105,NULL,1050.00,1050.00,1050.00,1050.00),
	(554,119,34,'1.6.1.1.1','PDR Support','2021-12-22','1.6.1.1.1',2,'Direct','PM-02','Mid Project Management','Labor',20.00,125,NULL,2500.00,2500.00,2500.00,2500.00),
	(555,119,34,'1.6.1.1.1','PDR Support','2021-12-22','1.6.1.1.1',2,'Direct','PM-02','Mid Project Management','Labor',20.00,247,NULL,4940.00,4940.00,4940.00,4940.00),
	(575,3,22,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,165,NULL,12736.35,12736.35,12736.35,12736.35),
	(576,3,36,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,165,NULL,12736.35,12736.35,12736.35,12736.35),
	(577,3,22,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,256,NULL,14123.52,14123.52,14123.52,14123.52),
	(578,3,36,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,256,NULL,14123.52,14123.52,14123.52,14123.52),
	(579,3,22,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,255,NULL,22501.20,22501.20,22501.20,22501.20),
	(580,3,36,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,255,NULL,22501.20,22501.20,22501.20,22501.20),
	(581,3,22,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,311,NULL,27442.64,27442.64,27442.64,27442.64),
	(582,3,36,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,311,NULL,27442.64,27442.64,27442.64,27442.64),
	(583,3,22,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,325,NULL,25086.75,25086.75,25086.75,25086.75),
	(584,3,36,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,325,NULL,25086.75,25086.75,25086.75,25086.75),
	(585,3,22,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,345,NULL,19033.65,19033.65,19033.65,19033.65),
	(586,3,36,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,345,NULL,19033.65,19033.65,19033.65,19033.65),
	(587,3,22,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(588,3,36,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(589,3,22,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,254,NULL,22412.96,22412.96,22412.96,22412.96),
	(590,3,36,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,254,NULL,22412.96,22412.96,22412.96,22412.96),
	(591,3,22,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,221,NULL,17058.99,17058.99,17058.99,17058.99),
	(592,3,36,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,221,NULL,17058.99,17058.99,17058.99,17058.99),
	(593,3,22,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,105,NULL,5792.85,5792.85,5792.85,5792.85),
	(594,3,36,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,105,NULL,5792.85,5792.85,5792.85,5792.85),
	(595,3,22,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,125,NULL,11030.00,11030.00,11030.00,11030.00),
	(596,3,36,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,125,NULL,11030.00,11030.00,11030.00,11030.00),
	(597,3,22,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,247,NULL,21795.28,21795.28,21795.28,21795.28),
	(598,3,36,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,247,NULL,21795.28,21795.28,21795.28,21795.28),
	(599,3,22,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,288,NULL,22230.72,22230.72,22230.72,22230.72),
	(600,3,36,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,288,NULL,22230.72,22230.72,22230.72,22230.72),
	(601,3,22,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,158,NULL,8716.86,8716.86,8716.86,8716.86),
	(602,3,36,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,158,NULL,8716.86,8716.86,8716.86,8716.86),
	(603,3,22,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,195,NULL,17206.80,17206.80,17206.80,17206.80),
	(604,3,36,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,195,NULL,17206.80,17206.80,17206.80,17206.80),
	(605,3,22,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(606,3,36,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(607,3,22,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,322,NULL,24855.18,24855.18,24855.18,24855.18),
	(608,3,36,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,322,NULL,24855.18,24855.18,24855.18,24855.18),
	(609,3,22,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,362,NULL,19971.54,19971.54,19971.54,19971.54),
	(610,3,36,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,362,NULL,19971.54,19971.54,19971.54,19971.54),
	(611,3,22,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(612,3,36,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(613,3,22,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,140,NULL,12353.60,12353.60,12353.60,12353.60),
	(614,3,36,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,140,NULL,12353.60,12353.60,12353.60,12353.60),
	(615,3,22,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,152,NULL,11732.88,11732.88,11732.88,11732.88),
	(616,3,36,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,152,NULL,11732.88,11732.88,11732.88,11732.88),
	(617,3,22,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,146,NULL,8054.82,8054.82,8054.82,8054.82),
	(618,3,36,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,146,NULL,8054.82,8054.82,8054.82,8054.82),
	(619,3,22,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,188,NULL,16589.12,16589.12,16589.12,16589.12),
	(620,3,36,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,188,NULL,16589.12,16589.12,16589.12,16589.12),
	(621,3,22,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(622,3,36,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(623,3,22,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,266,NULL,17603.88,17603.88,17603.88,17603.88),
	(624,3,36,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,266,NULL,17603.88,17603.88,17603.88,17603.88),
	(625,3,22,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,354,NULL,27325.26,27325.26,27325.26,27325.26),
	(626,3,36,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,354,NULL,27325.26,27325.26,27325.26,27325.26),
	(627,3,22,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,165,NULL,9103.05,9103.05,9103.05,9103.05),
	(628,3,36,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,165,NULL,9103.05,9103.05,9103.05,9103.05),
	(629,3,22,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,256,NULL,22589.44,22589.44,22589.44,22589.44),
	(630,3,36,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,256,NULL,22589.44,22589.44,22589.44,22589.44),
	(631,3,22,'1.6.2.1.2','Rev X Drawing Delivery','2022-02-03','1.6.2.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,255,NULL,22501.20,22501.20,22501.20,22501.20),
	(632,3,36,'1.6.2.1.2','Rev X Drawing Delivery','2022-02-03','1.6.2.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,255,NULL,22501.20,22501.20,22501.20,22501.20),
	(633,3,22,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,311,NULL,20581.98,20581.98,20581.98,20581.98),
	(634,3,36,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,311,NULL,20581.98,20581.98,20581.98,20581.98),
	(635,3,22,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,325,NULL,17930.25,17930.25,17930.25,17930.25),
	(636,3,36,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,325,NULL,17930.25,17930.25,17930.25,17930.25),
	(637,3,22,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,345,NULL,26630.55,26630.55,26630.55,26630.55),
	(638,3,36,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,345,NULL,26630.55,26630.55,26630.55,26630.55),
	(639,3,22,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,362,NULL,16000.40,16000.40,16000.40,16000.40),
	(640,3,36,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,362,NULL,16000.40,16000.40,16000.40,16000.40),
	(641,3,22,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,254,NULL,14023.34,14023.34,14023.34,14023.34),
	(642,3,36,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,254,NULL,14023.34,14023.34,14023.34,14023.34),
	(643,3,22,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,221,NULL,14625.78,14625.78,14625.78,14625.78),
	(644,3,36,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,221,NULL,14625.78,14625.78,14625.78,14625.78),
	(645,3,22,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,105,NULL,5792.85,5792.85,5792.85,5792.85),
	(646,3,36,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,105,NULL,5792.85,5792.85,5792.85,5792.85),
	(647,3,22,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,125,NULL,9648.75,9648.75,9648.75,9648.75),
	(648,3,36,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,125,NULL,9648.75,9648.75,9648.75,9648.75),
	(649,3,22,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,247,NULL,10917.40,10917.40,10917.40,10917.40),
	(650,3,36,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,247,NULL,10917.40,10917.40,10917.40,10917.40),
	(651,3,22,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,288,NULL,15900.48,15900.48,15900.48,15900.48),
	(652,3,36,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,288,NULL,15900.48,15900.48,15900.48,15900.48),
	(653,3,22,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,158,NULL,10456.44,10456.44,10456.44,10456.44),
	(654,3,36,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,158,NULL,10456.44,10456.44,10456.44,10456.44),
	(655,3,22,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,195,NULL,10758.15,10758.15,10758.15,10758.15),
	(656,3,36,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,195,NULL,10758.15,10758.15,10758.15,10758.15),
	(657,3,22,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,244,NULL,18834.36,18834.36,18834.36,18834.36),
	(658,3,36,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,244,NULL,18834.36,18834.36,18834.36,18834.36),
	(659,3,22,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,322,NULL,14232.40,14232.40,14232.40,14232.40),
	(660,3,36,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,322,NULL,14232.40,14232.40,14232.40,14232.40),
	(661,3,22,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,362,NULL,19986.02,19986.02,19986.02,19986.02),
	(662,3,36,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,362,NULL,19986.02,19986.02,19986.02,19986.02),
	(663,3,22,'1.8.1.1.3','Test Plan Delivery','2022-03-03','1.8.1.1.3',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(664,3,36,'1.8.1.1.3','Test Plan Delivery','2022-03-03','1.8.1.1.3',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(665,3,22,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,140,NULL,9265.20,9265.20,9265.20,9265.20),
	(666,3,36,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,140,NULL,9265.20,9265.20,9265.20,9265.20),
	(667,3,22,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,152,NULL,8385.84,8385.84,8385.84,8385.84),
	(668,3,36,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,152,NULL,8385.84,8385.84,8385.84,8385.84),
	(669,3,22,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,146,NULL,11269.74,11269.74,11269.74,11269.74),
	(670,3,36,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,146,NULL,11269.74,11269.74,11269.74,11269.74),
	(671,3,22,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,188,NULL,8309.60,8309.60,8309.60,8309.60),
	(672,3,36,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,188,NULL,8309.60,8309.60,8309.60,8309.60),
	(673,3,22,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','ME-01','Junior Test Support','Labor',33.22,244,NULL,8105.68,8105.68,8105.68,8105.68),
	(674,3,36,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','ME-01','Junior Test Support','Labor',33.22,244,NULL,8105.68,8105.68,8105.68,8105.68),
	(675,3,22,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,266,NULL,14685.86,14685.86,14685.86,14685.86),
	(676,3,36,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,266,NULL,14685.86,14685.86,14685.86,14685.86),
	(677,3,22,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,4324.00,4324.00,4324.00,4324.00),
	(678,3,36,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,4324.00,4324.00,4324.00,4324.00),
	(679,3,22,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,165,NULL,10919.70,10919.70,10919.70,10919.70),
	(680,3,36,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,165,NULL,10919.70,10919.70,10919.70,10919.70),
	(681,3,22,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,256,NULL,14123.52,14123.52,14123.52,14123.52),
	(682,3,36,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,256,NULL,14123.52,14123.52,14123.52,14123.52),
	(683,3,22,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,255,NULL,19683.45,19683.45,19683.45,19683.45),
	(684,3,36,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,255,NULL,19683.45,19683.45,19683.45,19683.45),
	(685,3,22,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,311,NULL,13746.20,13746.20,13746.20,13746.20),
	(686,3,36,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,311,NULL,13746.20,13746.20,13746.20,13746.20),
	(687,3,22,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','ME-01','Junior Test Support','Labor',33.22,325,NULL,10796.50,10796.50,10796.50,10796.50),
	(688,3,36,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','ME-01','Junior Test Support','Labor',33.22,325,NULL,10796.50,10796.50,10796.50,10796.50),
	(689,3,22,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,345,NULL,19047.45,19047.45,19047.45,19047.45),
	(690,3,36,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,345,NULL,19047.45,19047.45,19047.45,19047.45),
	(691,3,22,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,4124.00,4124.00,4124.00,4124.00),
	(692,3,36,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,4124.00,4124.00,4124.00,4124.00),
	(693,3,22,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,254,NULL,14013.18,14013.18,14013.18,14013.18),
	(694,3,36,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,254,NULL,14013.18,14013.18,14013.18,14013.18),
	(695,3,22,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,221,NULL,17058.99,17058.99,17058.99,17058.99),
	(696,3,36,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,221,NULL,17058.99,17058.99,17058.99,17058.99),
	(697,3,22,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,105,NULL,4641.00,4641.00,4641.00,4641.00),
	(698,3,36,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,105,NULL,4641.00,4641.00,4641.00,4641.00),
	(699,3,22,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,125,NULL,6901.25,6901.25,6901.25,6901.25),
	(700,3,36,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,125,NULL,6901.25,6901.25,6901.25,6901.25),
	(701,3,22,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,9838.00,9838.00,9838.00,9838.00),
	(702,3,36,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,9838.00,9838.00,9838.00,9838.00),
	(703,3,22,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,288,NULL,15888.96,15888.96,15888.96,15888.96),
	(704,3,36,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,288,NULL,15888.96,15888.96,15888.96,15888.96),
	(705,3,22,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,158,NULL,12196.02,12196.02,12196.02,12196.02),
	(706,3,36,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,158,NULL,12196.02,12196.02,12196.02,12196.02),
	(707,3,22,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,195,NULL,8619.00,8619.00,8619.00,8619.00),
	(708,3,36,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,195,NULL,8619.00,8619.00,8619.00,8619.00),
	(709,3,22,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,244,NULL,13471.24,13471.24,13471.24,13471.24),
	(710,3,36,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,244,NULL,13471.24,13471.24,13471.24,13471.24),
	(711,3,22,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,9457.00,9457.00,9457.00,9457.00),
	(712,3,36,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,9457.00,9457.00,9457.00,9457.00),
	(713,3,22,'1.8.1.5.1','Test Report Production','2022-08-03','1.8.1.5.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,362,NULL,23957.16,23957.16,23957.16,23957.16),
	(714,3,36,'1.8.1.5.1','Test Report Production','2022-08-03','1.8.1.5.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,362,NULL,23957.16,23957.16,23957.16,23957.16),
	(715,3,22,'1.8.1.5.1','Test Report Production','2022-08-03','1.8.1.5.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,100,NULL,4420.00,4420.00,4420.00,4420.00),
	(716,3,36,'1.8.1.5.1','Test Report Production','2022-08-03','1.8.1.5.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,100,NULL,4420.00,4420.00,4420.00,4420.00),
	(717,3,22,'1.8.1.5.1','Test Report Production','2022-08-03','1.8.1.5.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,140,NULL,7729.40,7729.40,7729.40,7729.40),
	(718,3,36,'1.8.1.5.1','Test Report Production','2022-08-03','1.8.1.5.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,140,NULL,7729.40,7729.40,7729.40,7729.40),
	(719,3,22,'1.8.1.5.2','Test Report Delivery','2022-08-03','1.8.1.5.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,152,NULL,13412.48,13412.48,13412.48,13412.48),
	(720,3,36,'1.8.1.5.2','Test Report Delivery','2022-08-03','1.8.1.5.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,152,NULL,13412.48,13412.48,13412.48,13412.48),
	(721,3,22,'1.6.3.1.1','Rev A Drawing Production','2022-08-03','1.6.3.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,146,NULL,9662.28,9662.28,9662.28,9662.28),
	(722,3,36,'1.6.3.1.1','Rev A Drawing Production','2022-08-03','1.6.3.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,146,NULL,9662.28,9662.28,9662.28,9662.28),
	(723,3,22,'1.6.3.1.1','Rev A Drawing Production','2022-08-03','1.6.3.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,188,NULL,14511.72,14511.72,14511.72,14511.72),
	(724,3,36,'1.6.3.1.1','Rev A Drawing Production','2022-08-03','1.6.3.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,188,NULL,14511.72,14511.72,14511.72,14511.72),
	(725,3,22,'1.6.3.1.1','Rev A Drawing Production','2022-08-03','1.6.3.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,244,NULL,13461.48,13461.48,13461.48,13461.48),
	(726,3,36,'1.6.3.1.1','Rev A Drawing Production','2022-08-03','1.6.3.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,244,NULL,13461.48,13461.48,13461.48,13461.48),
	(727,3,22,'1.6.3.1.1','Rev A Drawing Production','2022-09-03','1.6.3.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,266,NULL,17603.88,17603.88,17603.88,17603.88),
	(728,3,36,'1.6.3.1.1','Rev A Drawing Production','2022-09-03','1.6.3.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,266,NULL,17603.88,17603.88,17603.88,17603.88),
	(729,3,22,'1.6.3.1.1','Rev A Drawing Production','2022-09-03','1.6.3.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,354,NULL,27325.26,27325.26,27325.26,27325.26),
	(730,3,36,'1.6.3.1.1','Rev A Drawing Production','2022-09-03','1.6.3.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,354,NULL,27325.26,27325.26,27325.26,27325.26),
	(731,3,22,'1.6.3.1.1','Rev A Drawing Production','2022-09-03','1.6.3.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,165,NULL,9103.05,9103.05,9103.05,9103.05),
	(732,3,36,'1.6.3.1.1','Rev A Drawing Production','2022-09-03','1.6.3.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,165,NULL,9103.05,9103.05,9103.05,9103.05),
	(733,3,22,'1.6.3.1.2','Rev A Drawing Delivery','2022-09-03','1.6.3.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,256,NULL,22589.44,22589.44,22589.44,22589.44),
	(734,3,36,'1.6.3.1.2','Rev A Drawing Delivery','2022-09-03','1.6.3.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,256,NULL,22589.44,22589.44,22589.44,22589.44),
	(735,3,22,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,255,NULL,16875.90,16875.90,16875.90,16875.90),
	(736,3,36,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,255,NULL,16875.90,16875.90,16875.90,16875.90),
	(737,3,22,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,311,NULL,24006.09,24006.09,24006.09,24006.09),
	(738,3,36,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,311,NULL,24006.09,24006.09,24006.09,24006.09),
	(739,3,22,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,325,NULL,17930.25,17930.25,17930.25,17930.25),
	(740,3,36,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,325,NULL,17930.25,17930.25,17930.25,17930.25),
	(741,3,22,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,345,NULL,30442.80,30442.80,30442.80,30442.80),
	(742,3,36,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,345,NULL,30442.80,30442.80,30442.80,30442.80),
	(743,3,22,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,362,NULL,16000.40,16000.40,16000.40,16000.40),
	(744,3,36,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,362,NULL,16000.40,16000.40,16000.40,16000.40),
	(745,3,22,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,254,NULL,14023.34,14023.34,14023.34,14023.34),
	(746,3,36,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,254,NULL,14023.34,14023.34,14023.34,14023.34),
	(747,3,22,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,221,NULL,14625.78,14625.78,14625.78,14625.78),
	(748,3,36,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,221,NULL,14625.78,14625.78,14625.78,14625.78),
	(749,3,22,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,105,NULL,8104.95,8104.95,8104.95,8104.95),
	(750,3,36,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,105,NULL,8104.95,8104.95,8104.95,8104.95),
	(751,3,22,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,125,NULL,6896.25,6896.25,6896.25,6896.25),
	(752,3,36,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,125,NULL,6896.25,6896.25,6896.25,6896.25),
	(753,3,22,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,247,NULL,21795.28,21795.28,21795.28,21795.28),
	(754,3,36,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,247,NULL,21795.28,21795.28,21795.28,21795.28),
	(755,3,22,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,288,NULL,12729.60,12729.60,12729.60,12729.60),
	(756,3,36,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,288,NULL,12729.60,12729.60,12729.60,12729.60),
	(757,3,22,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,158,NULL,8723.18,8723.18,8723.18,8723.18),
	(758,3,36,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,158,NULL,8723.18,8723.18,8723.18,8723.18),
	(759,3,22,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,195,NULL,12905.10,12905.10,12905.10,12905.10),
	(760,3,36,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,195,NULL,12905.10,12905.10,12905.10,12905.10),
	(761,3,22,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,244,NULL,18834.36,18834.36,18834.36,18834.36),
	(762,3,36,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,244,NULL,18834.36,18834.36,18834.36,18834.36),
	(763,3,22,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,322,NULL,17764.74,17764.74,17764.74,17764.74),
	(764,3,36,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,322,NULL,17764.74,17764.74,17764.74,17764.74),
	(765,3,22,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(766,3,36,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(767,3,22,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,100,NULL,4420.00,4420.00,4420.00,4420.00),
	(768,3,36,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,100,NULL,4420.00,4420.00,4420.00,4420.00),
	(769,3,22,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,140,NULL,7729.40,7729.40,7729.40,7729.40),
	(770,3,36,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,140,NULL,7729.40,7729.40,7729.40,7729.40),
	(771,3,22,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,152,NULL,10059.36,10059.36,10059.36,10059.36),
	(772,3,36,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,152,NULL,10059.36,10059.36,10059.36,10059.36),
	(773,3,22,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,146,NULL,11269.74,11269.74,11269.74,11269.74),
	(774,3,36,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,146,NULL,11269.74,11269.74,11269.74,11269.74),
	(775,3,22,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,188,NULL,10371.96,10371.96,10371.96,10371.96),
	(776,3,36,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,188,NULL,10371.96,10371.96,10371.96,10371.96),
	(777,3,22,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(778,3,36,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(779,3,22,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,266,NULL,11757.20,11757.20,11757.20,11757.20),
	(780,3,36,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,266,NULL,11757.20,11757.20,11757.20,11757.20),
	(781,3,22,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,354,NULL,19544.34,19544.34,19544.34,19544.34),
	(782,3,36,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,354,NULL,19544.34,19544.34,19544.34,19544.34),
	(783,3,22,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,165,NULL,10919.70,10919.70,10919.70,10919.70),
	(784,3,36,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,165,NULL,10919.70,10919.70,10919.70,10919.70),
	(785,3,22,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,256,NULL,19760.64,19760.64,19760.64,19760.64),
	(786,3,36,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,256,NULL,19760.64,19760.64,19760.64,19760.64),
	(787,3,22,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,255,NULL,14068.35,14068.35,14068.35,14068.35),
	(788,3,36,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,255,NULL,14068.35,14068.35,14068.35,14068.35),
	(789,3,22,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,311,NULL,27442.64,27442.64,27442.64,27442.64),
	(790,3,36,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,311,NULL,27442.64,27442.64,27442.64,27442.64),
	(791,3,22,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,325,NULL,14365.00,14365.00,14365.00,14365.00),
	(792,3,36,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,325,NULL,14365.00,14365.00,14365.00,14365.00),
	(793,3,22,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,345,NULL,19047.45,19047.45,19047.45,19047.45),
	(794,3,36,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,345,NULL,19047.45,19047.45,19047.45,19047.45),
	(795,3,22,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,362,NULL,23957.16,23957.16,23957.16,23957.16),
	(796,3,36,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,362,NULL,23957.16,23957.16,23957.16,23957.16),
	(797,3,22,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,254,NULL,19606.26,19606.26,19606.26,19606.26),
	(798,3,36,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,254,NULL,19606.26,19606.26,19606.26,19606.26),
	(799,3,22,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,221,NULL,12192.57,12192.57,12192.57,12192.57),
	(800,3,36,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,221,NULL,12192.57,12192.57,12192.57,12192.57),
	(801,3,22,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,105,NULL,9265.20,9265.20,9265.20,9265.20),
	(802,3,36,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,105,NULL,9265.20,9265.20,9265.20,9265.20),
	(803,3,22,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,125,NULL,5525.00,5525.00,5525.00,5525.00),
	(804,3,36,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,125,NULL,5525.00,5525.00,5525.00,5525.00),
	(805,3,22,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,247,NULL,13636.87,13636.87,13636.87,13636.87),
	(806,3,36,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,247,NULL,13636.87,13636.87,13636.87,13636.87),
	(807,3,22,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,288,NULL,19059.84,19059.84,19059.84,19059.84),
	(808,3,36,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,288,NULL,19059.84,19059.84,19059.84,19059.84),
	(809,3,22,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,158,NULL,12196.02,12196.02,12196.02,12196.02),
	(810,3,36,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,158,NULL,12196.02,12196.02,12196.02,12196.02),
	(811,3,22,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,195,NULL,10758.15,10758.15,10758.15,10758.15),
	(812,3,36,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,195,NULL,10758.15,10758.15,10758.15,10758.15),
	(813,3,22,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(814,3,36,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(815,3,22,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,322,NULL,14232.40,14232.40,14232.40,14232.40),
	(816,3,36,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,322,NULL,14232.40,14232.40,14232.40,14232.40),
	(817,3,22,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,362,NULL,19986.02,19986.02,19986.02,19986.02),
	(818,3,36,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,362,NULL,19986.02,19986.02,19986.02,19986.02),
	(819,3,22,'1.6.5.3.2','Tech Data Delivery','2022-09-24','1.6.5.3.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(820,3,36,'1.6.5.3.2','Tech Data Delivery','2022-09-24','1.6.5.3.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(821,3,22,'1.9.1.1.1','Training Material Production','2022-09-24','1.9.1.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,140,NULL,9265.20,9265.20,9265.20,9265.20),
	(822,3,36,'1.9.1.1.1','Training Material Production','2022-09-24','1.9.1.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,140,NULL,9265.20,9265.20,9265.20,9265.20),
	(823,3,22,'1.9.1.1.1','Training Material Production','2022-09-24','1.9.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,152,NULL,11732.88,11732.88,11732.88,11732.88),
	(824,3,36,'1.9.1.1.1','Training Material Production','2022-09-24','1.9.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,152,NULL,11732.88,11732.88,11732.88,11732.88),
	(825,3,22,'1.9.1.1.1','Training Material Production','2022-09-24','1.9.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,146,NULL,8054.82,8054.82,8054.82,8054.82),
	(826,3,36,'1.9.1.1.1','Training Material Production','2022-09-24','1.9.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,146,NULL,8054.82,8054.82,8054.82,8054.82),
	(827,3,22,'1.9.1.1.2','Training Material Delivery','2022-09-24','1.9.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,188,NULL,16589.12,16589.12,16589.12,16589.12),
	(828,3,36,'1.9.1.1.2','Training Material Delivery','2022-09-24','1.9.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,188,NULL,16589.12,16589.12,16589.12,16589.12),
	(829,3,22,'1.10.1.1.1','Contract Closeout','2022-09-24','1.10.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(830,3,36,'1.10.1.1.1','Contract Closeout','2022-09-24','1.10.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(831,3,22,'1.7.4.4.1','Data Management Support','2021-10-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,266,NULL,23471.84,23471.84,23471.84,23471.84),
	(832,3,36,'1.7.4.4.1','Data Management Support','2021-10-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,266,NULL,23471.84,23471.84,23471.84,23471.84),
	(833,3,22,'1.7.4.4.1','Data Management Support','2021-11-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,354,NULL,31236.96,31236.96,31236.96,31236.96),
	(834,3,36,'1.7.4.4.1','Data Management Support','2021-11-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,354,NULL,31236.96,31236.96,31236.96,31236.96),
	(835,3,22,'1.7.4.4.1','Data Management Support','2021-12-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,165,NULL,14559.60,14559.60,14559.60,14559.60),
	(836,3,36,'1.7.4.4.1','Data Management Support','2021-12-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,165,NULL,14559.60,14559.60,14559.60,14559.60),
	(837,3,22,'1.7.4.4.1','Data Management Support','2022-01-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,256,NULL,22589.44,22589.44,22589.44,22589.44),
	(838,3,36,'1.7.4.4.1','Data Management Support','2022-01-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,256,NULL,22589.44,22589.44,22589.44,22589.44),
	(839,3,22,'1.7.4.4.1','Data Management Support','2022-02-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,255,NULL,22501.20,22501.20,22501.20,22501.20),
	(840,3,36,'1.7.4.4.1','Data Management Support','2022-02-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,255,NULL,22501.20,22501.20,22501.20,22501.20),
	(841,3,22,'1.7.4.4.1','Data Management Support','2022-03-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,311,NULL,27442.64,27442.64,27442.64,27442.64),
	(842,3,36,'1.7.4.4.1','Data Management Support','2022-03-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,311,NULL,27442.64,27442.64,27442.64,27442.64),
	(843,3,22,'1.7.4.4.1','Data Management Support','2022-04-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,325,NULL,28678.00,28678.00,28678.00,28678.00),
	(844,3,36,'1.7.4.4.1','Data Management Support','2022-04-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,325,NULL,28678.00,28678.00,28678.00,28678.00),
	(845,3,22,'1.7.4.4.1','Data Management Support','2022-05-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,345,NULL,30442.80,30442.80,30442.80,30442.80),
	(846,3,36,'1.7.4.4.1','Data Management Support','2022-05-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,345,NULL,30442.80,30442.80,30442.80,30442.80),
	(847,3,22,'1.7.4.4.1','Data Management Support','2022-06-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(848,3,36,'1.7.4.4.1','Data Management Support','2022-06-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(849,3,22,'1.7.4.4.1','Data Management Support','2022-07-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,254,NULL,22412.96,22412.96,22412.96,22412.96),
	(850,3,36,'1.7.4.4.1','Data Management Support','2022-07-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,254,NULL,22412.96,22412.96,22412.96,22412.96),
	(851,3,22,'1.7.4.4.1','Data Management Support','2022-08-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,221,NULL,19501.04,19501.04,19501.04,19501.04),
	(852,3,36,'1.7.4.4.1','Data Management Support','2022-08-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,221,NULL,19501.04,19501.04,19501.04,19501.04),
	(853,3,22,'1.7.4.4.1','Data Management Support','2022-09-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,105,NULL,9265.20,9265.20,9265.20,9265.20),
	(854,3,36,'1.7.4.4.1','Data Management Support','2022-09-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,105,NULL,9265.20,9265.20,9265.20,9265.20),
	(855,3,22,'1.7.4.1.1','Project Management Support','2021-10-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,125,NULL,11030.00,11030.00,11030.00,11030.00),
	(856,3,36,'1.7.4.1.1','Project Management Support','2021-10-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,125,NULL,11030.00,11030.00,11030.00,11030.00),
	(857,3,22,'1.7.4.1.1','Project Management Support','2021-11-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,247,NULL,21795.28,21795.28,21795.28,21795.28),
	(858,3,36,'1.7.4.1.1','Project Management Support','2021-11-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,247,NULL,21795.28,21795.28,21795.28,21795.28),
	(859,3,22,'1.7.4.1.1','Project Management Support','2021-12-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,288,NULL,25413.12,25413.12,25413.12,25413.12),
	(860,3,36,'1.7.4.1.1','Project Management Support','2021-12-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,288,NULL,25413.12,25413.12,25413.12,25413.12),
	(861,3,22,'1.7.4.1.1','Project Management Support','2022-01-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,158,NULL,13941.92,13941.92,13941.92,13941.92),
	(862,3,36,'1.7.4.1.1','Project Management Support','2022-01-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,158,NULL,13941.92,13941.92,13941.92,13941.92),
	(863,3,22,'1.7.4.1.1','Project Management Support','2022-02-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,195,NULL,17206.80,17206.80,17206.80,17206.80),
	(864,3,36,'1.7.4.1.1','Project Management Support','2022-02-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,195,NULL,17206.80,17206.80,17206.80,17206.80),
	(865,3,22,'1.7.4.1.1','Project Management Support','2022-03-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(866,3,36,'1.7.4.1.1','Project Management Support','2022-03-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(867,3,22,'1.7.4.1.1','Project Management Support','2022-04-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,322,NULL,28413.28,28413.28,28413.28,28413.28),
	(868,3,36,'1.7.4.1.1','Project Management Support','2022-04-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,322,NULL,28413.28,28413.28,28413.28,28413.28),
	(869,3,22,'1.7.4.1.1','Project Management Support','2022-05-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(870,3,36,'1.7.4.1.1','Project Management Support','2022-05-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(871,3,22,'1.7.4.1.1','Project Management Support','2022-06-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(872,3,36,'1.7.4.1.1','Project Management Support','2022-06-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(873,3,22,'1.7.4.1.1','Project Management Support','2022-07-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,140,NULL,12353.60,12353.60,12353.60,12353.60),
	(874,3,36,'1.7.4.1.1','Project Management Support','2022-07-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,140,NULL,12353.60,12353.60,12353.60,12353.60),
	(875,3,22,'1.7.4.1.1','Project Management Support','2022-08-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,152,NULL,13412.48,13412.48,13412.48,13412.48),
	(876,3,36,'1.7.4.1.1','Project Management Support','2022-08-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,152,NULL,13412.48,13412.48,13412.48,13412.48),
	(877,3,22,'1.7.4.1.1','Project Management Support','2022-09-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,146,NULL,12883.04,12883.04,12883.04,12883.04),
	(878,3,36,'1.7.4.1.1','Project Management Support','2022-09-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,146,NULL,12883.04,12883.04,12883.04,12883.04),
	(879,3,22,'1.7.4.1.1','Project Management Support','2021-10-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,188,NULL,18659.00,18659.00,18659.00,18659.00),
	(880,3,36,'1.7.4.1.1','Project Management Support','2021-10-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,188,NULL,18659.00,18659.00,18659.00,18659.00),
	(881,3,22,'1.7.4.1.1','Project Management Support','2021-11-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,244,NULL,24217.00,24217.00,24217.00,24217.00),
	(882,3,36,'1.7.4.1.1','Project Management Support','2021-11-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,244,NULL,24217.00,24217.00,24217.00,24217.00),
	(883,3,22,'1.7.4.1.1','Project Management Support','2021-12-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,266,NULL,26400.50,26400.50,26400.50,26400.50),
	(884,3,36,'1.7.4.1.1','Project Management Support','2021-12-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,266,NULL,26400.50,26400.50,26400.50,26400.50),
	(885,3,22,'1.7.4.1.1','Project Management Support','2022-01-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,354,NULL,35134.50,35134.50,35134.50,35134.50),
	(886,3,36,'1.7.4.1.1','Project Management Support','2022-01-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,354,NULL,35134.50,35134.50,35134.50,35134.50),
	(887,3,22,'1.7.4.1.1','Project Management Support','2022-02-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,165,NULL,16376.25,16376.25,16376.25,16376.25),
	(888,3,36,'1.7.4.1.1','Project Management Support','2022-02-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,165,NULL,16376.25,16376.25,16376.25,16376.25),
	(889,3,22,'1.7.4.1.1','Project Management Support','2022-03-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,256,NULL,25408.00,25408.00,25408.00,25408.00),
	(890,3,36,'1.7.4.1.1','Project Management Support','2022-03-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,256,NULL,25408.00,25408.00,25408.00,25408.00),
	(891,3,22,'1.7.4.1.1','Project Management Support','2022-04-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,255,NULL,25308.75,25308.75,25308.75,25308.75),
	(892,3,36,'1.7.4.1.1','Project Management Support','2022-04-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,255,NULL,25308.75,25308.75,25308.75,25308.75),
	(893,3,22,'1.7.4.1.1','Project Management Support','2022-05-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,311,NULL,30866.75,30866.75,30866.75,30866.75),
	(894,3,36,'1.7.4.1.1','Project Management Support','2022-05-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,311,NULL,30866.75,30866.75,30866.75,30866.75),
	(895,3,22,'1.7.4.1.1','Project Management Support','2022-06-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,325,NULL,32256.25,32256.25,32256.25,32256.25),
	(896,3,36,'1.7.4.1.1','Project Management Support','2022-06-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,325,NULL,32256.25,32256.25,32256.25,32256.25),
	(897,3,22,'1.7.4.1.1','Project Management Support','2022-07-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,345,NULL,34241.25,34241.25,34241.25,34241.25),
	(898,3,36,'1.7.4.1.1','Project Management Support','2022-07-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,345,NULL,34241.25,34241.25,34241.25,34241.25),
	(899,3,22,'1.7.4.1.1','Project Management Support','2022-08-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,362,NULL,35928.50,35928.50,35928.50,35928.50),
	(900,3,36,'1.7.4.1.1','Project Management Support','2022-08-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,362,NULL,35928.50,35928.50,35928.50,35928.50),
	(901,3,22,'1.7.4.2.1','Financial Management Support','2022-09-03','1.7.4.2.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,254,NULL,25209.50,25209.50,25209.50,25209.50),
	(902,3,36,'1.7.4.2.1','Financial Management Support','2022-09-03','1.7.4.2.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,254,NULL,25209.50,25209.50,25209.50,25209.50),
	(903,3,22,'1.7.4.2.1','Financial Management Support','2021-10-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,221,NULL,14707.55,14707.55,14707.55,14707.55),
	(904,3,36,'1.7.4.2.1','Financial Management Support','2021-10-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,221,NULL,14707.55,14707.55,14707.55,14707.55),
	(905,3,22,'1.7.4.2.1','Financial Management Support','2021-11-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,105,NULL,6987.75,6987.75,6987.75,6987.75),
	(906,3,36,'1.7.4.2.1','Financial Management Support','2021-11-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,105,NULL,6987.75,6987.75,6987.75,6987.75),
	(907,3,22,'1.7.4.2.1','Financial Management Support','2021-12-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,125,NULL,8318.75,8318.75,8318.75,8318.75),
	(908,3,36,'1.7.4.2.1','Financial Management Support','2021-12-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,125,NULL,8318.75,8318.75,8318.75,8318.75),
	(909,3,22,'1.7.4.2.1','Financial Management Support','2022-01-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,247,NULL,16437.85,16437.85,16437.85,16437.85),
	(910,3,36,'1.7.4.2.1','Financial Management Support','2022-01-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,247,NULL,16437.85,16437.85,16437.85,16437.85),
	(911,3,22,'1.7.4.2.1','Financial Management Support','2022-02-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,288,NULL,19166.40,19166.40,19166.40,19166.40),
	(912,3,36,'1.7.4.2.1','Financial Management Support','2022-02-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,288,NULL,19166.40,19166.40,19166.40,19166.40),
	(913,3,22,'1.7.4.2.1','Financial Management Support','2022-03-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,158,NULL,10514.90,10514.90,10514.90,10514.90),
	(914,3,36,'1.7.4.2.1','Financial Management Support','2022-03-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,158,NULL,10514.90,10514.90,10514.90,10514.90),
	(915,3,22,'1.7.4.2.1','Financial Management Support','2022-04-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,195,NULL,12977.25,12977.25,12977.25,12977.25),
	(916,3,36,'1.7.4.2.1','Financial Management Support','2022-04-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,195,NULL,12977.25,12977.25,12977.25,12977.25),
	(917,3,22,'1.7.4.2.1','Financial Management Support','2022-05-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,244,NULL,16238.20,16238.20,16238.20,16238.20),
	(918,3,36,'1.7.4.2.1','Financial Management Support','2022-05-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,244,NULL,16238.20,16238.20,16238.20,16238.20),
	(919,3,22,'1.7.4.2.1','Financial Management Support','2022-06-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,322,NULL,21429.10,21429.10,21429.10,21429.10),
	(920,3,36,'1.7.4.2.1','Financial Management Support','2022-06-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,322,NULL,21429.10,21429.10,21429.10,21429.10),
	(921,3,22,'1.7.4.2.1','Financial Management Support','2022-07-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,362,NULL,24091.10,24091.10,24091.10,24091.10),
	(922,3,36,'1.7.4.2.1','Financial Management Support','2022-07-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,362,NULL,24091.10,24091.10,24091.10,24091.10),
	(923,3,22,'1.7.4.2.1','Financial Management Support','2022-08-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,100,NULL,6655.00,6655.00,6655.00,6655.00),
	(924,3,36,'1.7.4.2.1','Financial Management Support','2022-08-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,100,NULL,6655.00,6655.00,6655.00,6655.00),
	(925,3,22,'1.7.4.2.1','Financial Management Support','2022-09-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,140,NULL,9317.00,9317.00,9317.00,9317.00),
	(926,3,36,'1.7.4.2.1','Financial Management Support','2022-09-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,140,NULL,9317.00,9317.00,9317.00,9317.00),
	(1086,3,22,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,165,NULL,12736.35,12736.35,12736.35,12736.35),
	(1087,3,36,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,165,NULL,12736.35,12736.35,12736.35,12736.35),
	(1088,3,22,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,256,NULL,14123.52,14123.52,14123.52,14123.52),
	(1089,3,36,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,256,NULL,14123.52,14123.52,14123.52,14123.52),
	(1090,3,22,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,255,NULL,22501.20,22501.20,22501.20,22501.20),
	(1091,3,36,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,255,NULL,22501.20,22501.20,22501.20,22501.20),
	(1092,3,22,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,311,NULL,27442.64,27442.64,27442.64,27442.64),
	(1093,3,36,'1.6.1.1.1','PDR Support','2021-10-23','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,311,NULL,27442.64,27442.64,27442.64,27442.64),
	(1094,3,22,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,325,NULL,25086.75,25086.75,25086.75,25086.75),
	(1095,3,36,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,325,NULL,25086.75,25086.75,25086.75,25086.75),
	(1096,3,22,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,345,NULL,19033.65,19033.65,19033.65,19033.65),
	(1097,3,36,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,345,NULL,19033.65,19033.65,19033.65,19033.65),
	(1098,3,22,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(1099,3,36,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(1100,3,22,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,254,NULL,22412.96,22412.96,22412.96,22412.96),
	(1101,3,36,'1.6.1.1.1','PDR Support','2021-11-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,254,NULL,22412.96,22412.96,22412.96,22412.96),
	(1102,3,22,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,221,NULL,17058.99,17058.99,17058.99,17058.99),
	(1103,3,36,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,221,NULL,17058.99,17058.99,17058.99,17058.99),
	(1104,3,22,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,105,NULL,5792.85,5792.85,5792.85,5792.85),
	(1105,3,36,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,105,NULL,5792.85,5792.85,5792.85,5792.85),
	(1106,3,22,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,125,NULL,11030.00,11030.00,11030.00,11030.00),
	(1107,3,36,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,125,NULL,11030.00,11030.00,11030.00,11030.00),
	(1108,3,22,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,247,NULL,21795.28,21795.28,21795.28,21795.28),
	(1109,3,36,'1.6.1.1.1','PDR Support','2021-12-24','1.6.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,247,NULL,21795.28,21795.28,21795.28,21795.28),
	(1110,3,22,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,288,NULL,22230.72,22230.72,22230.72,22230.72),
	(1111,3,36,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,288,NULL,22230.72,22230.72,22230.72,22230.72),
	(1112,3,22,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,158,NULL,8716.86,8716.86,8716.86,8716.86),
	(1113,3,36,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,158,NULL,8716.86,8716.86,8716.86,8716.86),
	(1114,3,22,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,195,NULL,17206.80,17206.80,17206.80,17206.80),
	(1115,3,36,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,195,NULL,17206.80,17206.80,17206.80,17206.80),
	(1116,3,22,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(1117,3,36,'1.6.1.1.2','CDR Support','2022-01-25','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(1118,3,22,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,322,NULL,24855.18,24855.18,24855.18,24855.18),
	(1119,3,36,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,322,NULL,24855.18,24855.18,24855.18,24855.18),
	(1120,3,22,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,362,NULL,19971.54,19971.54,19971.54,19971.54),
	(1121,3,36,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,362,NULL,19971.54,19971.54,19971.54,19971.54),
	(1122,3,22,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(1123,3,36,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(1124,3,22,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,140,NULL,12353.60,12353.60,12353.60,12353.60),
	(1125,3,36,'1.6.1.1.2','CDR Support','2022-02-03','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,140,NULL,12353.60,12353.60,12353.60,12353.60),
	(1126,3,22,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,152,NULL,11732.88,11732.88,11732.88,11732.88),
	(1127,3,36,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,152,NULL,11732.88,11732.88,11732.88,11732.88),
	(1128,3,22,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,146,NULL,8054.82,8054.82,8054.82,8054.82),
	(1129,3,36,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,146,NULL,8054.82,8054.82,8054.82,8054.82),
	(1130,3,22,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,188,NULL,16589.12,16589.12,16589.12,16589.12),
	(1131,3,36,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,188,NULL,16589.12,16589.12,16589.12,16589.12),
	(1132,3,22,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(1133,3,36,'1.6.1.1.2','CDR Support','2021-12-24','1.6.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(1134,3,22,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,266,NULL,17603.88,17603.88,17603.88,17603.88),
	(1135,3,36,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,266,NULL,17603.88,17603.88,17603.88,17603.88),
	(1136,3,22,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,354,NULL,27325.26,27325.26,27325.26,27325.26),
	(1137,3,36,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,354,NULL,27325.26,27325.26,27325.26,27325.26),
	(1138,3,22,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,165,NULL,9103.05,9103.05,9103.05,9103.05),
	(1139,3,36,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,165,NULL,9103.05,9103.05,9103.05,9103.05),
	(1140,3,22,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,256,NULL,22589.44,22589.44,22589.44,22589.44),
	(1141,3,36,'1.6.2.1.1','Rev X Drawing Production','2022-02-03','1.6.2.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,256,NULL,22589.44,22589.44,22589.44,22589.44),
	(1142,3,22,'1.6.2.1.2','Rev X Drawing Delivery','2022-02-03','1.6.2.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,255,NULL,22501.20,22501.20,22501.20,22501.20),
	(1143,3,36,'1.6.2.1.2','Rev X Drawing Delivery','2022-02-03','1.6.2.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,255,NULL,22501.20,22501.20,22501.20,22501.20),
	(1144,3,22,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,311,NULL,20581.98,20581.98,20581.98,20581.98),
	(1145,3,36,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,311,NULL,20581.98,20581.98,20581.98,20581.98),
	(1146,3,22,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,325,NULL,17930.25,17930.25,17930.25,17930.25),
	(1147,3,36,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,325,NULL,17930.25,17930.25,17930.25,17930.25),
	(1148,3,22,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,345,NULL,26630.55,26630.55,26630.55,26630.55),
	(1149,3,36,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,345,NULL,26630.55,26630.55,26630.55,26630.55),
	(1150,3,22,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,362,NULL,16000.40,16000.40,16000.40,16000.40),
	(1151,3,36,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,362,NULL,16000.40,16000.40,16000.40,16000.40),
	(1152,3,22,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,254,NULL,14023.34,14023.34,14023.34,14023.34),
	(1153,3,36,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,254,NULL,14023.34,14023.34,14023.34,14023.34),
	(1154,3,22,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,221,NULL,14625.78,14625.78,14625.78,14625.78),
	(1155,3,36,'1.8.1.1.2','Test Plan Production','2022-01-03','1.8.1.1.2',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,221,NULL,14625.78,14625.78,14625.78,14625.78),
	(1156,3,22,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,105,NULL,5792.85,5792.85,5792.85,5792.85),
	(1157,3,36,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,105,NULL,5792.85,5792.85,5792.85,5792.85),
	(1158,3,22,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,125,NULL,9648.75,9648.75,9648.75,9648.75),
	(1159,3,36,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,125,NULL,9648.75,9648.75,9648.75,9648.75),
	(1160,3,22,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,247,NULL,10917.40,10917.40,10917.40,10917.40),
	(1161,3,36,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,247,NULL,10917.40,10917.40,10917.40,10917.40),
	(1162,3,22,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,288,NULL,15900.48,15900.48,15900.48,15900.48),
	(1163,3,36,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,288,NULL,15900.48,15900.48,15900.48,15900.48),
	(1164,3,22,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,158,NULL,10456.44,10456.44,10456.44,10456.44),
	(1165,3,36,'1.8.1.1.2','Test Plan Production','2022-02-03','1.8.1.1.2',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,158,NULL,10456.44,10456.44,10456.44,10456.44),
	(1166,3,22,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,195,NULL,10758.15,10758.15,10758.15,10758.15),
	(1167,3,36,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,195,NULL,10758.15,10758.15,10758.15,10758.15),
	(1168,3,22,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,244,NULL,18834.36,18834.36,18834.36,18834.36),
	(1169,3,36,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,244,NULL,18834.36,18834.36,18834.36,18834.36),
	(1170,3,22,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,322,NULL,14232.40,14232.40,14232.40,14232.40),
	(1171,3,36,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,322,NULL,14232.40,14232.40,14232.40,14232.40),
	(1172,3,22,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,362,NULL,19986.02,19986.02,19986.02,19986.02),
	(1173,3,36,'1.8.1.1.2','Test Plan Production','2022-03-03','1.8.1.1.2',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,362,NULL,19986.02,19986.02,19986.02,19986.02),
	(1174,3,22,'1.8.1.1.3','Test Plan Delivery','2022-03-03','1.8.1.1.3',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(1175,3,36,'1.8.1.1.3','Test Plan Delivery','2022-03-03','1.8.1.1.3',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(1176,3,22,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,140,NULL,9265.20,9265.20,9265.20,9265.20),
	(1177,3,36,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,140,NULL,9265.20,9265.20,9265.20,9265.20),
	(1178,3,22,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,152,NULL,8385.84,8385.84,8385.84,8385.84),
	(1179,3,36,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,152,NULL,8385.84,8385.84,8385.84,8385.84),
	(1180,3,22,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,146,NULL,11269.74,11269.74,11269.74,11269.74),
	(1181,3,36,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,146,NULL,11269.74,11269.74,11269.74,11269.74),
	(1182,3,22,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,188,NULL,8309.60,8309.60,8309.60,8309.60),
	(1183,3,36,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,188,NULL,8309.60,8309.60,8309.60,8309.60),
	(1184,3,22,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','ME-01','Junior Test Support','Labor',33.22,244,NULL,8105.68,8105.68,8105.68,8105.68),
	(1185,3,36,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','ME-01','Junior Test Support','Labor',33.22,244,NULL,8105.68,8105.68,8105.68,8105.68),
	(1186,3,22,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,266,NULL,14685.86,14685.86,14685.86,14685.86),
	(1187,3,36,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,266,NULL,14685.86,14685.86,14685.86,14685.86),
	(1188,3,22,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,4324.00,4324.00,4324.00,4324.00),
	(1189,3,36,'1.8.1.2.1','Lab Testing','2022-04-03','1.8.1.2.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,4324.00,4324.00,4324.00,4324.00),
	(1190,3,22,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,165,NULL,10919.70,10919.70,10919.70,10919.70),
	(1191,3,36,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,165,NULL,10919.70,10919.70,10919.70,10919.70),
	(1192,3,22,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,256,NULL,14123.52,14123.52,14123.52,14123.52),
	(1193,3,36,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,256,NULL,14123.52,14123.52,14123.52,14123.52),
	(1194,3,22,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,255,NULL,19683.45,19683.45,19683.45,19683.45),
	(1195,3,36,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,255,NULL,19683.45,19683.45,19683.45,19683.45),
	(1196,3,22,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,311,NULL,13746.20,13746.20,13746.20,13746.20),
	(1197,3,36,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,311,NULL,13746.20,13746.20,13746.20,13746.20),
	(1198,3,22,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','ME-01','Junior Test Support','Labor',33.22,325,NULL,10796.50,10796.50,10796.50,10796.50),
	(1199,3,36,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','ME-01','Junior Test Support','Labor',33.22,325,NULL,10796.50,10796.50,10796.50,10796.50),
	(1200,3,22,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,345,NULL,19047.45,19047.45,19047.45,19047.45),
	(1201,3,36,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,345,NULL,19047.45,19047.45,19047.45,19047.45),
	(1202,3,22,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,4124.00,4124.00,4124.00,4124.00),
	(1203,3,36,'1.8.1.2.1','Lab Testing','2022-05-03','1.8.1.2.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,4124.00,4124.00,4124.00,4124.00),
	(1204,3,22,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,254,NULL,14013.18,14013.18,14013.18,14013.18),
	(1205,3,36,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,254,NULL,14013.18,14013.18,14013.18,14013.18),
	(1206,3,22,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,221,NULL,17058.99,17058.99,17058.99,17058.99),
	(1207,3,36,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,221,NULL,17058.99,17058.99,17058.99,17058.99),
	(1208,3,22,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,105,NULL,4641.00,4641.00,4641.00,4641.00),
	(1209,3,36,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,105,NULL,4641.00,4641.00,4641.00,4641.00),
	(1210,3,22,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,125,NULL,6901.25,6901.25,6901.25,6901.25),
	(1211,3,36,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,125,NULL,6901.25,6901.25,6901.25,6901.25),
	(1212,3,22,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,9838.00,9838.00,9838.00,9838.00),
	(1213,3,36,'1.8.1.3.1','Ground Testing','2022-06-03','1.8.1.3.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,9838.00,9838.00,9838.00,9838.00),
	(1214,3,22,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,288,NULL,15888.96,15888.96,15888.96,15888.96),
	(1215,3,36,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,288,NULL,15888.96,15888.96,15888.96,15888.96),
	(1216,3,22,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,158,NULL,12196.02,12196.02,12196.02,12196.02),
	(1217,3,36,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,158,NULL,12196.02,12196.02,12196.02,12196.02),
	(1218,3,22,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,195,NULL,8619.00,8619.00,8619.00,8619.00),
	(1219,3,36,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,195,NULL,8619.00,8619.00,8619.00,8619.00),
	(1220,3,22,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,244,NULL,13471.24,13471.24,13471.24,13471.24),
	(1221,3,36,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,244,NULL,13471.24,13471.24,13471.24,13471.24),
	(1222,3,22,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,9457.00,9457.00,9457.00,9457.00),
	(1223,3,36,'1.8.1.4.1','Flight Testing','2022-07-03','1.8.1.4.1',1001,'Direct','SUB','Helpers Inc.','Subcontractor',NULL,NULL,NULL,9457.00,9457.00,9457.00,9457.00),
	(1224,3,22,'1.8.1.5.1','Test Report Production','2022-08-03','1.8.1.5.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,362,NULL,23957.16,23957.16,23957.16,23957.16),
	(1225,3,36,'1.8.1.5.1','Test Report Production','2022-08-03','1.8.1.5.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,362,NULL,23957.16,23957.16,23957.16,23957.16),
	(1226,3,22,'1.8.1.5.1','Test Report Production','2022-08-03','1.8.1.5.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,100,NULL,4420.00,4420.00,4420.00,4420.00),
	(1227,3,36,'1.8.1.5.1','Test Report Production','2022-08-03','1.8.1.5.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,100,NULL,4420.00,4420.00,4420.00,4420.00),
	(1228,3,22,'1.8.1.5.1','Test Report Production','2022-08-03','1.8.1.5.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,140,NULL,7729.40,7729.40,7729.40,7729.40),
	(1229,3,36,'1.8.1.5.1','Test Report Production','2022-08-03','1.8.1.5.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,140,NULL,7729.40,7729.40,7729.40,7729.40),
	(1230,3,22,'1.8.1.5.2','Test Report Delivery','2022-08-03','1.8.1.5.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,152,NULL,13412.48,13412.48,13412.48,13412.48),
	(1231,3,36,'1.8.1.5.2','Test Report Delivery','2022-08-03','1.8.1.5.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,152,NULL,13412.48,13412.48,13412.48,13412.48),
	(1232,3,22,'1.6.3.1.1','Rev A Drawing Production','2022-08-03','1.6.3.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,146,NULL,9662.28,9662.28,9662.28,9662.28),
	(1233,3,36,'1.6.3.1.1','Rev A Drawing Production','2022-08-03','1.6.3.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,146,NULL,9662.28,9662.28,9662.28,9662.28),
	(1234,3,22,'1.6.3.1.1','Rev A Drawing Production','2022-08-03','1.6.3.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,188,NULL,14511.72,14511.72,14511.72,14511.72),
	(1235,3,36,'1.6.3.1.1','Rev A Drawing Production','2022-08-03','1.6.3.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,188,NULL,14511.72,14511.72,14511.72,14511.72),
	(1236,3,22,'1.6.3.1.1','Rev A Drawing Production','2022-08-03','1.6.3.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,244,NULL,13461.48,13461.48,13461.48,13461.48),
	(1237,3,36,'1.6.3.1.1','Rev A Drawing Production','2022-08-03','1.6.3.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,244,NULL,13461.48,13461.48,13461.48,13461.48),
	(1238,3,22,'1.6.3.1.1','Rev A Drawing Production','2022-09-03','1.6.3.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,266,NULL,17603.88,17603.88,17603.88,17603.88),
	(1239,3,36,'1.6.3.1.1','Rev A Drawing Production','2022-09-03','1.6.3.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,266,NULL,17603.88,17603.88,17603.88,17603.88),
	(1240,3,22,'1.6.3.1.1','Rev A Drawing Production','2022-09-03','1.6.3.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,354,NULL,27325.26,27325.26,27325.26,27325.26),
	(1241,3,36,'1.6.3.1.1','Rev A Drawing Production','2022-09-03','1.6.3.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,354,NULL,27325.26,27325.26,27325.26,27325.26),
	(1242,3,22,'1.6.3.1.1','Rev A Drawing Production','2022-09-03','1.6.3.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,165,NULL,9103.05,9103.05,9103.05,9103.05),
	(1243,3,36,'1.6.3.1.1','Rev A Drawing Production','2022-09-03','1.6.3.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,165,NULL,9103.05,9103.05,9103.05,9103.05),
	(1244,3,22,'1.6.3.1.2','Rev A Drawing Delivery','2022-09-03','1.6.3.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,256,NULL,22589.44,22589.44,22589.44,22589.44),
	(1245,3,36,'1.6.3.1.2','Rev A Drawing Delivery','2022-09-03','1.6.3.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,256,NULL,22589.44,22589.44,22589.44,22589.44),
	(1246,3,22,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,255,NULL,16875.90,16875.90,16875.90,16875.90),
	(1247,3,36,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,255,NULL,16875.90,16875.90,16875.90,16875.90),
	(1248,3,22,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,311,NULL,24006.09,24006.09,24006.09,24006.09),
	(1249,3,36,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,311,NULL,24006.09,24006.09,24006.09,24006.09),
	(1250,3,22,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,325,NULL,17930.25,17930.25,17930.25,17930.25),
	(1251,3,36,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,325,NULL,17930.25,17930.25,17930.25,17930.25),
	(1252,3,22,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,345,NULL,30442.80,30442.80,30442.80,30442.80),
	(1253,3,36,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,345,NULL,30442.80,30442.80,30442.80,30442.80),
	(1254,3,22,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,362,NULL,16000.40,16000.40,16000.40,16000.40),
	(1255,3,36,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,362,NULL,16000.40,16000.40,16000.40,16000.40),
	(1256,3,22,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,254,NULL,14023.34,14023.34,14023.34,14023.34),
	(1257,3,36,'1.6.5.3.1','Tech Data Production','2022-05-03','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,254,NULL,14023.34,14023.34,14023.34,14023.34),
	(1258,3,22,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,221,NULL,14625.78,14625.78,14625.78,14625.78),
	(1259,3,36,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,221,NULL,14625.78,14625.78,14625.78,14625.78),
	(1260,3,22,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,105,NULL,8104.95,8104.95,8104.95,8104.95),
	(1261,3,36,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,105,NULL,8104.95,8104.95,8104.95,8104.95),
	(1262,3,22,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,125,NULL,6896.25,6896.25,6896.25,6896.25),
	(1263,3,36,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,125,NULL,6896.25,6896.25,6896.25,6896.25),
	(1264,3,22,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,247,NULL,21795.28,21795.28,21795.28,21795.28),
	(1265,3,36,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,247,NULL,21795.28,21795.28,21795.28,21795.28),
	(1266,3,22,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,288,NULL,12729.60,12729.60,12729.60,12729.60),
	(1267,3,36,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,288,NULL,12729.60,12729.60,12729.60,12729.60),
	(1268,3,22,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,158,NULL,8723.18,8723.18,8723.18,8723.18),
	(1269,3,36,'1.6.5.3.1','Tech Data Production','2022-06-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,158,NULL,8723.18,8723.18,8723.18,8723.18),
	(1270,3,22,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,195,NULL,12905.10,12905.10,12905.10,12905.10),
	(1271,3,36,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,195,NULL,12905.10,12905.10,12905.10,12905.10),
	(1272,3,22,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,244,NULL,18834.36,18834.36,18834.36,18834.36),
	(1273,3,36,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,244,NULL,18834.36,18834.36,18834.36,18834.36),
	(1274,3,22,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,322,NULL,17764.74,17764.74,17764.74,17764.74),
	(1275,3,36,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,322,NULL,17764.74,17764.74,17764.74,17764.74),
	(1276,3,22,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(1277,3,36,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(1278,3,22,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,100,NULL,4420.00,4420.00,4420.00,4420.00),
	(1279,3,36,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,100,NULL,4420.00,4420.00,4420.00,4420.00),
	(1280,3,22,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,140,NULL,7729.40,7729.40,7729.40,7729.40),
	(1281,3,36,'1.6.5.3.1','Tech Data Production','2022-07-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,140,NULL,7729.40,7729.40,7729.40,7729.40),
	(1282,3,22,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,152,NULL,10059.36,10059.36,10059.36,10059.36),
	(1283,3,36,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,152,NULL,10059.36,10059.36,10059.36,10059.36),
	(1284,3,22,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,146,NULL,11269.74,11269.74,11269.74,11269.74),
	(1285,3,36,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,146,NULL,11269.74,11269.74,11269.74,11269.74),
	(1286,3,22,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,188,NULL,10371.96,10371.96,10371.96,10371.96),
	(1287,3,36,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,188,NULL,10371.96,10371.96,10371.96,10371.96),
	(1288,3,22,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(1289,3,36,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(1290,3,22,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,266,NULL,11757.20,11757.20,11757.20,11757.20),
	(1291,3,36,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,266,NULL,11757.20,11757.20,11757.20,11757.20),
	(1292,3,22,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,354,NULL,19544.34,19544.34,19544.34,19544.34),
	(1293,3,36,'1.6.5.3.1','Tech Data Production','2022-08-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,354,NULL,19544.34,19544.34,19544.34,19544.34),
	(1294,3,22,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,165,NULL,10919.70,10919.70,10919.70,10919.70),
	(1295,3,36,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,165,NULL,10919.70,10919.70,10919.70,10919.70),
	(1296,3,22,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,256,NULL,19760.64,19760.64,19760.64,19760.64),
	(1297,3,36,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,256,NULL,19760.64,19760.64,19760.64,19760.64),
	(1298,3,22,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,255,NULL,14068.35,14068.35,14068.35,14068.35),
	(1299,3,36,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,255,NULL,14068.35,14068.35,14068.35,14068.35),
	(1300,3,22,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,311,NULL,27442.64,27442.64,27442.64,27442.64),
	(1301,3,36,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,311,NULL,27442.64,27442.64,27442.64,27442.64),
	(1302,3,22,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,325,NULL,14365.00,14365.00,14365.00,14365.00),
	(1303,3,36,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,325,NULL,14365.00,14365.00,14365.00,14365.00),
	(1304,3,22,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,345,NULL,19047.45,19047.45,19047.45,19047.45),
	(1305,3,36,'1.6.5.3.1','Tech Data Production','2022-09-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,345,NULL,19047.45,19047.45,19047.45,19047.45),
	(1306,3,22,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,362,NULL,23957.16,23957.16,23957.16,23957.16),
	(1307,3,36,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,362,NULL,23957.16,23957.16,23957.16,23957.16),
	(1308,3,22,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,254,NULL,19606.26,19606.26,19606.26,19606.26),
	(1309,3,36,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,254,NULL,19606.26,19606.26,19606.26,19606.26),
	(1310,3,22,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,221,NULL,12192.57,12192.57,12192.57,12192.57),
	(1311,3,36,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,221,NULL,12192.57,12192.57,12192.57,12192.57),
	(1312,3,22,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,105,NULL,9265.20,9265.20,9265.20,9265.20),
	(1313,3,36,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,105,NULL,9265.20,9265.20,9265.20,9265.20),
	(1314,3,22,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,125,NULL,5525.00,5525.00,5525.00,5525.00),
	(1315,3,36,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,125,NULL,5525.00,5525.00,5525.00,5525.00),
	(1316,3,22,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,247,NULL,13636.87,13636.87,13636.87,13636.87),
	(1317,3,36,'1.6.5.3.1','Tech Data Production','2022-04-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,247,NULL,13636.87,13636.87,13636.87,13636.87),
	(1318,3,22,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,288,NULL,19059.84,19059.84,19059.84,19059.84),
	(1319,3,36,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,288,NULL,19059.84,19059.84,19059.84,19059.84),
	(1320,3,22,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,158,NULL,12196.02,12196.02,12196.02,12196.02),
	(1321,3,36,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,158,NULL,12196.02,12196.02,12196.02,12196.02),
	(1322,3,22,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,195,NULL,10758.15,10758.15,10758.15,10758.15),
	(1323,3,36,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,195,NULL,10758.15,10758.15,10758.15,10758.15),
	(1324,3,22,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(1325,3,36,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(1326,3,22,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,322,NULL,14232.40,14232.40,14232.40,14232.40),
	(1327,3,36,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','ME-02','Mid Test Support','Labor',44.20,322,NULL,14232.40,14232.40,14232.40,14232.40),
	(1328,3,22,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,362,NULL,19986.02,19986.02,19986.02,19986.02),
	(1329,3,36,'1.6.5.3.1','Tech Data Production','2022-03-24','1.6.5.3.1',1001,'Direct','ME-03','Senior Test Support','Labor',55.21,362,NULL,19986.02,19986.02,19986.02,19986.02),
	(1330,3,22,'1.6.5.3.2','Tech Data Delivery','2022-09-24','1.6.5.3.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(1331,3,36,'1.6.5.3.2','Tech Data Delivery','2022-09-24','1.6.5.3.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(1332,3,22,'1.9.1.1.1','Training Material Production','2022-09-24','1.9.1.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,140,NULL,9265.20,9265.20,9265.20,9265.20),
	(1333,3,36,'1.9.1.1.1','Training Material Production','2022-09-24','1.9.1.1.1',1001,'Direct','PE-02','Mid Project Engineer','Labor',66.18,140,NULL,9265.20,9265.20,9265.20,9265.20),
	(1334,3,22,'1.9.1.1.1','Training Material Production','2022-09-24','1.9.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,152,NULL,11732.88,11732.88,11732.88,11732.88),
	(1335,3,36,'1.9.1.1.1','Training Material Production','2022-09-24','1.9.1.1.1',1001,'Direct','PE-03','Senior Project Engineer','Labor',77.19,152,NULL,11732.88,11732.88,11732.88,11732.88),
	(1336,3,22,'1.9.1.1.1','Training Material Production','2022-09-24','1.9.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,146,NULL,8054.82,8054.82,8054.82,8054.82),
	(1337,3,36,'1.9.1.1.1','Training Material Production','2022-09-24','1.9.1.1.1',1001,'Direct','PE-01','Junior Project Engineer','Labor',55.17,146,NULL,8054.82,8054.82,8054.82,8054.82),
	(1338,3,22,'1.9.1.1.2','Training Material Delivery','2022-09-24','1.9.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,188,NULL,16589.12,16589.12,16589.12,16589.12),
	(1339,3,36,'1.9.1.1.2','Training Material Delivery','2022-09-24','1.9.1.1.2',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,188,NULL,16589.12,16589.12,16589.12,16589.12),
	(1340,3,22,'1.10.1.1.1','Contract Closeout','2022-09-24','1.10.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(1341,3,36,'1.10.1.1.1','Contract Closeout','2022-09-24','1.10.1.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(1342,3,22,'1.7.4.4.1','Data Management Support','2021-10-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,266,NULL,23471.84,23471.84,23471.84,23471.84),
	(1343,3,36,'1.7.4.4.1','Data Management Support','2021-10-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,266,NULL,23471.84,23471.84,23471.84,23471.84),
	(1344,3,22,'1.7.4.4.1','Data Management Support','2021-11-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,354,NULL,31236.96,31236.96,31236.96,31236.96),
	(1345,3,36,'1.7.4.4.1','Data Management Support','2021-11-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,354,NULL,31236.96,31236.96,31236.96,31236.96),
	(1346,3,22,'1.7.4.4.1','Data Management Support','2021-12-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,165,NULL,14559.60,14559.60,14559.60,14559.60),
	(1347,3,36,'1.7.4.4.1','Data Management Support','2021-12-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,165,NULL,14559.60,14559.60,14559.60,14559.60),
	(1348,3,22,'1.7.4.4.1','Data Management Support','2022-01-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,256,NULL,22589.44,22589.44,22589.44,22589.44),
	(1349,3,36,'1.7.4.4.1','Data Management Support','2022-01-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,256,NULL,22589.44,22589.44,22589.44,22589.44),
	(1350,3,22,'1.7.4.4.1','Data Management Support','2022-02-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,255,NULL,22501.20,22501.20,22501.20,22501.20),
	(1351,3,36,'1.7.4.4.1','Data Management Support','2022-02-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,255,NULL,22501.20,22501.20,22501.20,22501.20),
	(1352,3,22,'1.7.4.4.1','Data Management Support','2022-03-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,311,NULL,27442.64,27442.64,27442.64,27442.64),
	(1353,3,36,'1.7.4.4.1','Data Management Support','2022-03-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,311,NULL,27442.64,27442.64,27442.64,27442.64),
	(1354,3,22,'1.7.4.4.1','Data Management Support','2022-04-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,325,NULL,28678.00,28678.00,28678.00,28678.00),
	(1355,3,36,'1.7.4.4.1','Data Management Support','2022-04-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,325,NULL,28678.00,28678.00,28678.00,28678.00),
	(1356,3,22,'1.7.4.4.1','Data Management Support','2022-05-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,345,NULL,30442.80,30442.80,30442.80,30442.80),
	(1357,3,36,'1.7.4.4.1','Data Management Support','2022-05-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,345,NULL,30442.80,30442.80,30442.80,30442.80),
	(1358,3,22,'1.7.4.4.1','Data Management Support','2022-06-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(1359,3,36,'1.7.4.4.1','Data Management Support','2022-06-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(1360,3,22,'1.7.4.4.1','Data Management Support','2022-07-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,254,NULL,22412.96,22412.96,22412.96,22412.96),
	(1361,3,36,'1.7.4.4.1','Data Management Support','2022-07-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,254,NULL,22412.96,22412.96,22412.96,22412.96),
	(1362,3,22,'1.7.4.4.1','Data Management Support','2022-08-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,221,NULL,19501.04,19501.04,19501.04,19501.04),
	(1363,3,36,'1.7.4.4.1','Data Management Support','2022-08-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,221,NULL,19501.04,19501.04,19501.04,19501.04),
	(1364,3,22,'1.7.4.4.1','Data Management Support','2022-09-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,105,NULL,9265.20,9265.20,9265.20,9265.20),
	(1365,3,36,'1.7.4.4.1','Data Management Support','2022-09-03','1.7.4.4.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,105,NULL,9265.20,9265.20,9265.20,9265.20),
	(1366,3,22,'1.7.4.1.1','Project Management Support','2021-10-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,125,NULL,11030.00,11030.00,11030.00,11030.00),
	(1367,3,36,'1.7.4.1.1','Project Management Support','2021-10-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,125,NULL,11030.00,11030.00,11030.00,11030.00),
	(1368,3,22,'1.7.4.1.1','Project Management Support','2021-11-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,247,NULL,21795.28,21795.28,21795.28,21795.28),
	(1369,3,36,'1.7.4.1.1','Project Management Support','2021-11-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,247,NULL,21795.28,21795.28,21795.28,21795.28),
	(1370,3,22,'1.7.4.1.1','Project Management Support','2021-12-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,288,NULL,25413.12,25413.12,25413.12,25413.12),
	(1371,3,36,'1.7.4.1.1','Project Management Support','2021-12-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,288,NULL,25413.12,25413.12,25413.12,25413.12),
	(1372,3,22,'1.7.4.1.1','Project Management Support','2022-01-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,158,NULL,13941.92,13941.92,13941.92,13941.92),
	(1373,3,36,'1.7.4.1.1','Project Management Support','2022-01-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,158,NULL,13941.92,13941.92,13941.92,13941.92),
	(1374,3,22,'1.7.4.1.1','Project Management Support','2022-02-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,195,NULL,17206.80,17206.80,17206.80,17206.80),
	(1375,3,36,'1.7.4.1.1','Project Management Support','2022-02-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,195,NULL,17206.80,17206.80,17206.80,17206.80),
	(1376,3,22,'1.7.4.1.1','Project Management Support','2022-03-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(1377,3,36,'1.7.4.1.1','Project Management Support','2022-03-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,244,NULL,21530.56,21530.56,21530.56,21530.56),
	(1378,3,22,'1.7.4.1.1','Project Management Support','2022-04-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,322,NULL,28413.28,28413.28,28413.28,28413.28),
	(1379,3,36,'1.7.4.1.1','Project Management Support','2022-04-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,322,NULL,28413.28,28413.28,28413.28,28413.28),
	(1380,3,22,'1.7.4.1.1','Project Management Support','2022-05-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(1381,3,36,'1.7.4.1.1','Project Management Support','2022-05-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,362,NULL,31942.88,31942.88,31942.88,31942.88),
	(1382,3,22,'1.7.4.1.1','Project Management Support','2022-06-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(1383,3,36,'1.7.4.1.1','Project Management Support','2022-06-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,100,NULL,8824.00,8824.00,8824.00,8824.00),
	(1384,3,22,'1.7.4.1.1','Project Management Support','2022-07-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,140,NULL,12353.60,12353.60,12353.60,12353.60),
	(1385,3,36,'1.7.4.1.1','Project Management Support','2022-07-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,140,NULL,12353.60,12353.60,12353.60,12353.60),
	(1386,3,22,'1.7.4.1.1','Project Management Support','2022-08-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,152,NULL,13412.48,13412.48,13412.48,13412.48),
	(1387,3,36,'1.7.4.1.1','Project Management Support','2022-08-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,152,NULL,13412.48,13412.48,13412.48,13412.48),
	(1388,3,22,'1.7.4.1.1','Project Management Support','2022-09-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,146,NULL,12883.04,12883.04,12883.04,12883.04),
	(1389,3,36,'1.7.4.1.1','Project Management Support','2022-09-03','1.7.4.1.1',1001,'Direct','PM-02','Mid Project Management','Labor',88.24,146,NULL,12883.04,12883.04,12883.04,12883.04),
	(1390,3,22,'1.7.4.1.1','Project Management Support','2021-10-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,188,NULL,18659.00,18659.00,18659.00,18659.00),
	(1391,3,36,'1.7.4.1.1','Project Management Support','2021-10-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,188,NULL,18659.00,18659.00,18659.00,18659.00),
	(1392,3,22,'1.7.4.1.1','Project Management Support','2021-11-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,244,NULL,24217.00,24217.00,24217.00,24217.00),
	(1393,3,36,'1.7.4.1.1','Project Management Support','2021-11-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,244,NULL,24217.00,24217.00,24217.00,24217.00),
	(1394,3,22,'1.7.4.1.1','Project Management Support','2021-12-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,266,NULL,26400.50,26400.50,26400.50,26400.50),
	(1395,3,36,'1.7.4.1.1','Project Management Support','2021-12-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,266,NULL,26400.50,26400.50,26400.50,26400.50),
	(1396,3,22,'1.7.4.1.1','Project Management Support','2022-01-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,354,NULL,35134.50,35134.50,35134.50,35134.50),
	(1397,3,36,'1.7.4.1.1','Project Management Support','2022-01-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,354,NULL,35134.50,35134.50,35134.50,35134.50),
	(1398,3,22,'1.7.4.1.1','Project Management Support','2022-02-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,165,NULL,16376.25,16376.25,16376.25,16376.25),
	(1399,3,36,'1.7.4.1.1','Project Management Support','2022-02-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,165,NULL,16376.25,16376.25,16376.25,16376.25),
	(1400,3,22,'1.7.4.1.1','Project Management Support','2022-03-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,256,NULL,25408.00,25408.00,25408.00,25408.00),
	(1401,3,36,'1.7.4.1.1','Project Management Support','2022-03-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,256,NULL,25408.00,25408.00,25408.00,25408.00),
	(1402,3,22,'1.7.4.1.1','Project Management Support','2022-04-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,255,NULL,25308.75,25308.75,25308.75,25308.75),
	(1403,3,36,'1.7.4.1.1','Project Management Support','2022-04-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,255,NULL,25308.75,25308.75,25308.75,25308.75),
	(1404,3,22,'1.7.4.1.1','Project Management Support','2022-05-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,311,NULL,30866.75,30866.75,30866.75,30866.75),
	(1405,3,36,'1.7.4.1.1','Project Management Support','2022-05-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,311,NULL,30866.75,30866.75,30866.75,30866.75),
	(1406,3,22,'1.7.4.1.1','Project Management Support','2022-06-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,325,NULL,32256.25,32256.25,32256.25,32256.25),
	(1407,3,36,'1.7.4.1.1','Project Management Support','2022-06-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,325,NULL,32256.25,32256.25,32256.25,32256.25),
	(1408,3,22,'1.7.4.1.1','Project Management Support','2022-07-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,345,NULL,34241.25,34241.25,34241.25,34241.25),
	(1409,3,36,'1.7.4.1.1','Project Management Support','2022-07-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,345,NULL,34241.25,34241.25,34241.25,34241.25),
	(1410,3,22,'1.7.4.1.1','Project Management Support','2022-08-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,362,NULL,35928.50,35928.50,35928.50,35928.50),
	(1411,3,36,'1.7.4.1.1','Project Management Support','2022-08-03','1.7.4.1.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,362,NULL,35928.50,35928.50,35928.50,35928.50),
	(1412,3,22,'1.7.4.2.1','Financial Management Support','2022-09-03','1.7.4.2.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,254,NULL,25209.50,25209.50,25209.50,25209.50),
	(1413,3,36,'1.7.4.2.1','Financial Management Support','2022-09-03','1.7.4.2.1',1001,'Direct','PM-03','Senior Project Management','Labor',99.25,254,NULL,25209.50,25209.50,25209.50,25209.50),
	(1414,3,22,'1.7.4.2.1','Financial Management Support','2021-10-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,221,NULL,14707.55,14707.55,14707.55,14707.55),
	(1415,3,36,'1.7.4.2.1','Financial Management Support','2021-10-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,221,NULL,14707.55,14707.55,14707.55,14707.55),
	(1416,3,22,'1.7.4.2.1','Financial Management Support','2021-11-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,105,NULL,6987.75,6987.75,6987.75,6987.75),
	(1417,3,36,'1.7.4.2.1','Financial Management Support','2021-11-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,105,NULL,6987.75,6987.75,6987.75,6987.75),
	(1418,3,22,'1.7.4.2.1','Financial Management Support','2021-12-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,125,NULL,8318.75,8318.75,8318.75,8318.75),
	(1419,3,36,'1.7.4.2.1','Financial Management Support','2021-12-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,125,NULL,8318.75,8318.75,8318.75,8318.75),
	(1420,3,22,'1.7.4.2.1','Financial Management Support','2022-01-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,247,NULL,16437.85,16437.85,16437.85,16437.85),
	(1421,3,36,'1.7.4.2.1','Financial Management Support','2022-01-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,247,NULL,16437.85,16437.85,16437.85,16437.85),
	(1422,3,22,'1.7.4.2.1','Financial Management Support','2022-02-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,288,NULL,19166.40,19166.40,19166.40,19166.40),
	(1423,3,36,'1.7.4.2.1','Financial Management Support','2022-02-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,288,NULL,19166.40,19166.40,19166.40,19166.40),
	(1424,3,22,'1.7.4.2.1','Financial Management Support','2022-03-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,158,NULL,10514.90,10514.90,10514.90,10514.90),
	(1425,3,36,'1.7.4.2.1','Financial Management Support','2022-03-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,158,NULL,10514.90,10514.90,10514.90,10514.90),
	(1426,3,22,'1.7.4.2.1','Financial Management Support','2022-04-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,195,NULL,12977.25,12977.25,12977.25,12977.25),
	(1427,3,36,'1.7.4.2.1','Financial Management Support','2022-04-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,195,NULL,12977.25,12977.25,12977.25,12977.25),
	(1428,3,22,'1.7.4.2.1','Financial Management Support','2022-05-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,244,NULL,16238.20,16238.20,16238.20,16238.20),
	(1429,3,36,'1.7.4.2.1','Financial Management Support','2022-05-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,244,NULL,16238.20,16238.20,16238.20,16238.20),
	(1430,3,22,'1.7.4.2.1','Financial Management Support','2022-06-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,322,NULL,21429.10,21429.10,21429.10,21429.10),
	(1431,3,36,'1.7.4.2.1','Financial Management Support','2022-06-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,322,NULL,21429.10,21429.10,21429.10,21429.10),
	(1432,3,22,'1.7.4.2.1','Financial Management Support','2022-07-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,362,NULL,24091.10,24091.10,24091.10,24091.10),
	(1433,3,36,'1.7.4.2.1','Financial Management Support','2022-07-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,362,NULL,24091.10,24091.10,24091.10,24091.10),
	(1434,3,22,'1.7.4.2.1','Financial Management Support','2022-08-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,100,NULL,6655.00,6655.00,6655.00,6655.00),
	(1435,3,36,'1.7.4.2.1','Financial Management Support','2022-08-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,100,NULL,6655.00,6655.00,6655.00,6655.00),
	(1436,3,22,'1.7.4.2.1','Financial Management Support','2022-09-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,140,NULL,9317.00,9317.00,9317.00,9317.00),
	(1437,3,36,'1.7.4.2.1','Financial Management Support','2022-09-03','1.7.4.2.1',1001,'Direct','FM-02','Mid Financial Management','Labor',66.55,140,NULL,9317.00,9317.00,9317.00,9317.00);

/*!40000 ALTER TABLE `task_resource_table` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_project_link
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_project_link`;

CREATE TABLE `user_project_link` (
  `user_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `mil_job_title_id` int(11) unsigned DEFAULT NULL,
  KEY `user_id` (`user_id`),
  KEY `project_id` (`project_id`),
  KEY `mil_job_title_id` (`mil_job_title_id`),
  CONSTRAINT `user_project_link_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_project_link_ibfk_4` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_project_link_ibfk_5` FOREIGN KEY (`mil_job_title_id`) REFERENCES `military_job_titles` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user_project_link` WRITE;
/*!40000 ALTER TABLE `user_project_link` DISABLE KEYS */;

INSERT INTO `user_project_link` (`user_id`, `project_id`, `mil_job_title_id`)
VALUES
	(1,1,1),
	(2,1,2),
	(3,1,3),
	(6,1,6),
	(31,1,7),
	(32,1,8),
	(33,1,9),
	(34,1,10),
	(4,1,4),
	(4,4,1),
	(2,2,2),
	(2,3,2),
	(5,1,5),
	(30,95,3),
	(8,95,10),
	(4,119,1),
	(4,2,8),
	(4,3,9),
	(9,1,NULL),
	(36,1,NULL);

/*!40000 ALTER TABLE `user_project_link` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contractor_id` int(11) unsigned DEFAULT NULL,
  `user_name` varchar(80) DEFAULT NULL,
  `user_role` enum('Contractor','IPT Member','Admin') NOT NULL,
  `user_email` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contractor_id` (`contractor_id`),
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`contractor_id`) REFERENCES `contractor` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `contractor_id`, `user_name`, `user_role`, `user_email`)
VALUES
	(1,NULL,'Jamieson','Admin','jamieson.pierce.1.ctr@us.af.mil'),
	(2,NULL,'Daniel Couch','Admin','dcouch@Knights.ucf.edu'),
	(3,NULL,'Tanner Fleming','Admin','tanner.fleming@gmail.com'),
	(4,NULL,'Kat','Admin','kathleenpr@Knights.ucf.edu'),
	(5,NULL,'Bo','Admin','bo10pcfl@gmail.com'),
	(6,NULL,'Cooper','Admin','cooperurbec@gmail.com'),
	(8,NULL,'Jamieson','IPT Member','ja12321@us.af.mil'),
	(9,4,'Daniel Couch','Contractor','dcouch1997@gmail.com'),
	(30,NULL,'test IPT Member ','IPT Member','testIPT@gmail.com'),
	(31,NULL,'User1','IPT Member','user1@gmail.com'),
	(32,NULL,'User2','IPT Member','user2@gmail.com'),
	(33,NULL,'User3','IPT Member','user3@gmail.com'),
	(34,NULL,'User4','IPT Member','user4@gmail.com'),
	(36,4,'testContractor','Contractor','testCon@gmail.com'),
	(37,5,'contractor1','Contractor','contractor1@gmail.com'),
	(38,5,'contractor2','Contractor','contractor2@gmail.com'),
	(39,5,'contractor3','Contractor','contractor3@gmail.com');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;














# Dump of view view_approved_funding
# ------------------------------------------------------------

DROP TABLE IF EXISTS `view_approved_funding`; DROP VIEW IF EXISTS `view_approved_funding`;

CREATE ALGORITHM=UNDEFINED DEFINER=`usaf_admin`@`%` SQL SECURITY DEFINER VIEW `view_approved_funding` AS (select `af`.`id` AS `id`,`af`.`project_id` AS `project_id`,(select `funding_types`.`funding_type` from `funding_types` where (`funding_types`.`id` = `af`.`appro_funding_type`)) AS `Funding Type`,`af`.`appro_fiscal_year` AS `appro_fiscal_year`,`af`.`approved_amount` AS `approved_amount` from `approved_funding` `af`);

# Dump of view view_clin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `view_clin`; DROP VIEW IF EXISTS `view_clin`;

CREATE ALGORITHM=UNDEFINED DEFINER=`usaf_admin`@`%` SQL SECURITY DEFINER VIEW `view_clin`
AS SELECT
   `cd`.`id` AS `id`,
   `cd`.`clin_num` AS `clin_num`,
   `cd`.`project_id` AS `project_id`,
   `cd`.`clin_type` AS `clin_type`,
   `cd`.`clin_scope` AS `clin_scope`,
   `cd`.`ind_gov_est` AS `ind_gov_est`,(select sum(`trt`.`total_price`)
FROM `task_resource_table` `trt` where (`trt`.`clin_id` = `cd`.`id`)) AS `clin_value` from `clin_data` `cd`;

# Dump of view view_obligation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `view_obligation`; DROP VIEW IF EXISTS `view_obligation`;

CREATE ALGORITHM=UNDEFINED DEFINER=`usaf_admin`@`%` SQL SECURITY DEFINER VIEW `view_obligation` AS (select `o`.`id` AS `id`,`o`.`project_id` AS `project_id`,`o`.`obli_fiscal_year` AS `obli_fiscal_year`,`o`.`obli_funding_type` AS `obli_funding_type`,`o`.`obli_funding_date` AS `obli_funding_date`,`o`.`obli_projected` AS `obli_projected`,(select sum(`o2`.`obli_projected`) from (`obligation_funding_data` `o1` join `obligation_funding_data` `o2`) where ((`o1`.`obli_funding_date` >= `o2`.`obli_funding_date`) and (`o1`.`project_id` = `o`.`project_id`) and (`o2`.`project_id` = `o`.`project_id`) and (`o1`.`id` = `o`.`id`))) AS `obli_projected_total`,`o`.`obli_actual` AS `obli_actual`,(select sum(`o2`.`obli_actual`) from (`obligation_funding_data` `o1` join `obligation_funding_data` `o2`) where ((`o1`.`obli_funding_date` >= `o2`.`obli_funding_date`) and (`o1`.`project_id` = `o`.`project_id`) and (`o2`.`project_id` = `o`.`project_id`) and (`o1`.`id` = `o`.`id`))) AS `obli_actual_total` from `obligation_funding_data` `o`);

# Dump of view view_contract_award
# ------------------------------------------------------------

DROP TABLE IF EXISTS `view_contract_award`; DROP VIEW IF EXISTS `view_contract_award`;

CREATE ALGORITHM=UNDEFINED DEFINER=`usaf_admin`@`%` SQL SECURITY DEFINER VIEW `view_contract_award` AS (select `ca`.`id` AS `id`,`ca`.`project_id` AS `project_id`,`ca`.`contract_num` AS `contract_num`,`ca`.`contract_status` AS `contract_status`,(select sum(`task_resource_table`.`total_price`) from `task_resource_table` where (`task_resource_table`.`project_id` = `ca`.`project_id`)) AS `contract_value`,(select sum(`clin_data`.`ind_gov_est`) from `clin_data` where (`clin_data`.`project_id` = `ca`.`project_id`)) AS `ind_gov_est` from `contract_award` `ca`);

# Dump of view view_expenditure
# ------------------------------------------------------------

DROP TABLE IF EXISTS `view_expenditure`; DROP VIEW IF EXISTS `view_expenditure`;

CREATE ALGORITHM=UNDEFINED DEFINER=`usaf_admin`@`%` SQL SECURITY DEFINER VIEW `view_expenditure` AS (select `e`.`id` AS `id`,`e`.`project_id` AS `project_id`,`e`.`expen_funding_date` AS `expen_funding_date`,`e`.`expen_projected` AS `expen_projected`,(select sum(`e2`.`expen_projected`) from (`expenditure_funding_data` `e1` join `expenditure_funding_data` `e2`) where ((`e1`.`expen_funding_date` >= `e2`.`expen_funding_date`) and (`e1`.`project_id` = `e`.`project_id`) and (`e2`.`project_id` = `e`.`project_id`) and (`e1`.`id` = `e`.`id`))) AS `expen_projected_total`,`e`.`expen_actual` AS `expen_actual`,(select sum(`e2`.`expen_actual`) from (`expenditure_funding_data` `e1` join `expenditure_funding_data` `e2`) where ((`e1`.`expen_funding_date` >= `e2`.`expen_funding_date`) and (`e1`.`project_id` = `e`.`project_id`) and (`e2`.`project_id` = `e`.`project_id`) and (`e1`.`id` = `e`.`id`))) AS `expen_actual_total` from `expenditure_funding_data` `e`);

# Dump of view view_project
# ------------------------------------------------------------

DROP TABLE IF EXISTS `view_project`; DROP VIEW IF EXISTS `view_project`;

CREATE ALGORITHM=UNDEFINED DEFINER=`usaf_admin`@`%` SQL SECURITY DEFINER VIEW `view_project`
AS SELECT
   `p`.`id` AS `id`,
   `p`.`project_name` AS `project_name`,
   `p`.`project_type` AS `project_type`,
   `c`.`id` AS `contractor_id`,
   `c`.`contractor_name` AS `contractor_name`,
   `ca`.`id` AS `contract_award_id`,
   `ca`.`contract_num` AS `contract_num`,
   `ca`.`contract_status` AS `contract_status`,(select sum(`task_resource_table`.`total_price`)
FROM `task_resource_table` where (`task_resource_table`.`project_id` = `p`.`id`)) AS `contract_value`,(select sum(`clin_data`.`ind_gov_est`) from `clin_data` where (`clin_data`.`project_id` = `p`.`id`)) AS `ind_gov_est`,`b`.`id` AS `branch_id`,`b`.`branch_name` AS `branch`,`rt`.`id` AS `requirement_type_id`,`rt`.`requirement_type` AS `requirement_type`,`p`.`summary` AS `summary`,`p`.`ccar_num` AS `ccar_num`,(select (case when (min((to_days(`pm2`.`start_date`) - to_days(`pm1`.`end_date`))) < 0) then 'REALLY-BEHIND' when (min((to_days(`pm2`.`start_date`) - to_days(`pm1`.`end_date`))) between 0 and 5) then 'BEHIND' when (min((to_days(`pm2`.`start_date`) - to_days(`pm1`.`end_date`))) > 5) then 'ONTRACK' else NULL end) AS `depend_summary` from ((((`project_milestone_dependency` `pmd` join `project` `p1` on((`p1`.`id` = `pmd`.`predecessor_project`))) join `project_milestones` `pm1` on((`pm1`.`id` = `pmd`.`predecessor_milestone`))) join `project` `p2` on((`p2`.`id` = `pmd`.`successor_project`))) join `project_milestones` `pm2` on((`pm2`.`id` = `pmd`.`successor_milestone`))) where ((`pmd`.`predecessor_project` = `p`.`id`) and (`pmd`.`predecessor_project` <> `pmd`.`successor_project`))) AS `dependency_status`,`p`.`financial_status` AS `financial_status`,`p`.`schedule_status` AS `schedule_status` from ((((`project` `p` left join `contractor` `c` on((`c`.`id` = `p`.`contractor_id`))) left join `branches` `b` on((`b`.`id` = `p`.`branch_id`))) left join `requirement_types` `rt` on((`rt`.`id` = `p`.`requirement_type_id`))) left join `contract_award` `ca` on((`ca`.`project_id` = `p`.`id`))) order by `p`.`id`;


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
