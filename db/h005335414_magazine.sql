-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: h005335414.mysql
-- Generation Time: Oct 23, 2020 at 02:00 PM
-- Server version: 5.6.41-84.1
-- PHP Version: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `h005335414_magazine`
--

-- --------------------------------------------------------

--
-- Table structure for table `autor`
--
-- Creation: Oct 21, 2020 at 11:19 AM
--

DROP TABLE IF EXISTS `autor`;
CREATE TABLE `autor` (
  `id` int(10) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `middle_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `autor`
--

INSERT INTO `autor` (`id`, `last_name`, `name`, `middle_name`) VALUES
(1, 'Danilov', 'Igor', 'Anatolievich'),
(2, 'Donsckow', 'Mihail', 'Vladimirovich'),
(3, 'Kaspersky', 'Evgenii', 'Valentinovich'),
(4, 'Korolev', 'Lev', 'Nikolaevich'),
(5, 'Krukov', 'Dmitry', 'Vitalievich'),
(6, 'Seganovich', 'Ilay', 'Valentinovich'),
(7, 'Sklayr', 'Dmitriy', 'Vitalievich'),
(8, 'Stepanov', 'Alexandr', 'Aleksandrovich'),
(9, 'Terehov', 'Andrey', 'Nicolaevich'),
(10, 'Durov', 'Pavel', 'Sergeevich'),
(11, 'Konstantin', 'Ilya', 'Semenovich'),
(12, 'Soros', 'Jhon', 'Maria');

-- --------------------------------------------------------

--
-- Table structure for table `generall`
--
-- Creation: Oct 21, 2020 at 08:47 AM
--

DROP TABLE IF EXISTS `generall`;
CREATE TABLE `generall` (
  `id` int(10) NOT NULL,
  `magazine_id` int(10) NOT NULL,
  `autor_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `generall`
--

INSERT INTO `generall` (`id`, `magazine_id`, `autor_id`) VALUES
(1, 7, 2),
(2, 4, 4),
(3, 1, 9),
(4, 5, 10),
(5, 6, 6),
(6, 3, 4),
(7, 3, 7),
(8, 8, 5),
(9, 7, 3),
(10, 2, 9),
(11, 4, 12),
(12, 6, 4),
(13, 1, 3),
(14, 2, 2),
(15, 4, 0),
(16, 65, 7),
(17, 65, 11),
(18, 65, 2),
(19, 66, 9),
(20, 66, 5),
(21, 66, 10),
(22, 66, 11),
(23, 67, 9),
(24, 67, 12),
(25, 67, 5),
(26, 68, 5),
(27, 68, 10),
(28, 69, 6),
(29, 69, 10),
(30, 69, 0),
(31, 69, 0),
(32, 69, 0),
(33, 69, 0),
(34, 70, 9),
(35, 70, 12),
(36, 71, 9),
(37, 72, 11),
(38, 69, 11),
(39, 73, 9),
(40, 74, 8),
(41, 75, 6),
(42, 76, 1),
(43, 77, 1),
(44, 78, 1),
(45, 79, 1),
(46, 80, 8),
(47, 80, 9),
(48, 81, 4),
(49, 81, 5),
(50, 82, 1),
(51, 82, 12),
(52, 83, 6),
(53, 83, 12),
(54, 84, 11),
(55, 84, 10),
(56, 84, 11),
(57, 85, 7),
(58, 85, 11),
(59, 86, 5),
(60, 86, 3),
(61, 87, 1),
(62, 87, 1),
(63, 87, 1),
(64, 88, 3),
(65, 88, 5),
(66, 88, 10),
(67, 89, 1),
(68, 89, 1),
(69, 90, 12),
(70, 90, 12),
(71, 91, 10),
(72, 91, 11),
(73, 92, 8),
(74, 93, 1),
(75, 94, 1),
(76, 95, 1),
(77, 96, 1),
(78, 97, 1),
(79, 98, 1),
(80, 99, 1),
(81, 100, 1),
(82, 101, 1),
(83, 102, 1),
(84, 103, 1),
(85, 104, 1),
(86, 105, 1),
(87, 106, 1),
(88, 107, 1),
(89, 108, 1),
(90, 109, 1),
(91, 109, 10),
(92, 110, 1);

-- --------------------------------------------------------

--
-- Table structure for table `magazines`
--
-- Creation: Oct 20, 2020 at 12:43 PM
--

DROP TABLE IF EXISTS `magazines`;
CREATE TABLE `magazines` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `short_name` text,
  `picture` varchar(255) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `magazines`
--

INSERT INTO `magazines` (`id`, `name`, `short_name`, `picture`, `date`) VALUES
(1, 'BYTE Russia', 'Issues of implementation and use of modern information technologies', '../images/BYTERussia.jpg', '2018-05-15 09:16:34'),
(2, 'C\'t', '\"Iron\" and software area of the computer world', '../images/cannot.jpg', '2019-10-08 09:37:20'),
(3, 'CHIP', 'Smartphones, tablets and photographic equipment, computers, software, the Internet, modern technologies, telecommunications and entertainment', '../images/chip.jpg', '2019-12-10 14:20:39'),
(4, 'CNews 3', 'News and analytical materials aimed at heads of IT departments and specialists in the field of high technologies', '../images/cnews.jpg', '2020-10-20 00:00:00'),
(5, 'Computer Bild', 'Computers, Internet, audio, video, photographic equipment, software and games', '../images/bild.jpg', '2020-08-10 13:18:13'),
(6, 'Computerworld Russia H', 'Overview of IT industry events in Russia and in the world', '../images/cworld.jpg', '2020-10-13 00:00:00'),
(8, 'Full Circlee', 'Free and independent magazine dedicated to the Linux-based Ubuntu family of operating systemsse', '../images/vonic.jpg', '2020-04-14 06:15:16'),
(110, 'sdfasdfsad 43453453', 'sdagadfsdfsa', '../images/1603460974797.jpg', '2020-10-13 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `generall`
--
ALTER TABLE `generall`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `magazines`
--
ALTER TABLE `magazines`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `autor`
--
ALTER TABLE `autor`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `generall`
--
ALTER TABLE `generall`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `magazines`
--
ALTER TABLE `magazines`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
