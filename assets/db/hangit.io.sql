-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-m2x.alwaysdata.net
-- Generation Time: Nov 27, 2021 at 06:24 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `m2x_game`
--

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `id_game` int(11) NOT NULL,
  `round_number` int(11) NOT NULL,
  `max_player` int(11) NOT NULL,
  `player_activ` int(11) NOT NULL,
  `link_game` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`id_game`, `round_number`, `max_player`, `player_activ`, `link_game`) VALUES
(1, 3, 4, 5, ''),
(2, 3, 4, 1, ''),
(3, 2, 4, 1, ''),
(4, 6, 6, 6, ''),
(5, 0, 0, 0, ''),
(6, 0, 0, 0, ''),
(7, 0, 0, 0, ''),
(8, 0, 0, 1, ''),
(9, 0, 0, 1, ''),
(10, 0, 0, 1, ''),
(11, 0, 0, 1, ''),
(12, 0, 0, 0, 'https://matteoo34.github.io/hangit.io/?g=1637959123756'),
(13, 0, 0, 0, 'https://matteoo34.github.io/hangit.io/?g=1637959181021'),
(14, 0, 0, 1, 'https://matteoo34.github.io/hangit.io/?g=1637959252727'),
(15, 0, 0, 0, 'https://matteoo34.github.io/hangit.io/?g=1637960110874'),
(16, 0, 0, 0, 'http://localhost:1000/?g=1637960270740'),
(17, 0, 0, 1, 'http://localhost:1000/?g=1637960294718'),
(18, 0, 0, 0, 'http://localhost:1000/?g=1637960353199'),
(19, 0, 0, 0, 'http://localhost:1000/?g=1637960373007'),
(20, 0, 0, 1, 'http://localhost:1000/?g=1637960424363'),
(21, 0, 4, 1, ''),
(22, 2, 4, 1, ''),
(23, 4, 4, 1, ''),
(24, 3, 3, 3, 'lien'),
(25, 3, 3, 3, 'lien'),
(26, 3, 3, 3, 'lien'),
(27, 3, 3, 3, 'lien'),
(28, 3, 3, 3, 'lien'),
(29, 0, 0, 0, ''),
(30, 2, 4, 1, ''),
(31, 3, 4, 1, ''),
(32, 1, 4, 1, ''),
(33, 0, 0, 0, 'https://matteoo34.github.io/hangit.io/?g=1637966231245'),
(34, 0, 0, 0, 'https://matteoo34.github.io/hangit.io/?g=1637966284381'),
(35, 0, 0, 0, 'https://matteoo34.github.io/hangit.io/?g=1637966558170'),
(36, 0, 0, 0, 'https://matteoo34.github.io/hangit.io/?g=1637966573773'),
(37, 0, 0, 0, 'https://matteoo34.github.io/hangit.io/?g=1637966640743'),
(38, 0, 0, 0, 'https://matteoo34.github.io/hangit.io/?g=1637966677240'),
(39, 1, 4, 1, 'https://matteoo34.github.io/hangit.io/?g=1637966783906'),
(40, 1, 4, 1, 'https://matteoo34.github.io/hangit.io/?g=1637967300012'),
(41, 0, 0, 0, 'https://matteoo34.github.io/hangit.io/?g=1637967416248'),
(42, 1, 4, 1, 'https://matteoo34.github.io/hangit.io/?g=1637967499820'),
(43, 1, 4, 1, 'https://matteoo34.github.io/hangit.io/?g=1637967640971'),
(44, 1, 4, 1, 'https://matteoo34.github.io/hangit.io/?g=1637967902119'),
(45, 2, 4, 1, 'https://matteoo34.github.io/hangit.io/?g=1638004166724'),
(46, 3, 3, 3, 'moula.oi'),
(47, 3, 3, 3, 'moula.oi'),
(48, 3, 3, 3, 'moula.oi'),
(49, 3, 3, 3, 'moula.oi'),
(50, 3, 3, 3, 'moula.oi'),
(51, 3, 3, 3, 'moula.oi'),
(52, 0, 0, 1, 'https://matteoo34.github.io/hangit.io/?g=1638032530920'),
(53, 0, 0, 1, 'https://matteoo34.github.io/hangit.io/?g=1638032547886'),
(54, 0, 0, 0, 'https://matteoo34.github.io/hangit.io/?g=1638032566270');

-- --------------------------------------------------------

--
-- Table structure for table `hidden_word`
--

CREATE TABLE `hidden_word` (
  `id_word` int(11) NOT NULL,
  `word` varchar(50) NOT NULL,
  `try` int(11) NOT NULL,
  `id_player` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hidden_word`
--

INSERT INTO `hidden_word` (`id_word`, `word`, `try`, `id_player`) VALUES
(1, 'Pistache', 0, 18),
(2, 'Pistache', 0, 22),
(3, 'popo', 0, 23),
(4, 'lopy', 0, 24),
(5, 'trytr', 0, 25),
(6, 'ghfg', 0, 26),
(7, 'dgff', 0, 27),
(8, 'lllh', 0, 28),
(9, 'ghgg', 0, 29),
(10, 'ryty', 0, 30),
(11, 'ffhgf', 0, 31),
(12, 'cocote', 0, 32),
(13, 'Pistache', 0, 33),
(14, 'Pistache', 0, 34),
(15, 'Pistache', 0, 35),
(16, 'Pistache', 0, 36),
(17, 'Pistache', 0, 37),
(18, 'Pistache', 0, 38),
(19, 'pouetpouet', 0, 40);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id_message` int(11) NOT NULL,
  `text` varchar(250) NOT NULL,
  `id_game` int(11) NOT NULL,
  `id_player` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id_message`, `text`, `id_game`, `id_player`) VALUES
(1, 'Moula', 1, 1),
(2, 'pouet', 1, 1),
(3, 'pouet pouet', 3, 2),
(4, 'gfgh', 32, 25),
(5, 'fggf', 39, 26),
(6, 'fhgf', 40, 27),
(7, 'ghh', 42, 28),
(8, 'tyyt', 43, 29),
(9, 'rrytrtyy', 43, 29),
(10, 'ytytutuy', 43, 29),
(11, 'ghf', 43, 30),
(12, 'ghf', 44, 31),
(13, '!p', 54, 40),
(14, '!ou', 54, 40),
(15, '!sg', 54, 40),
(16, '!ouet', 54, 40),
(17, '!pouetpouet', 54, 40);

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

CREATE TABLE `player` (
  `id_player` int(11) NOT NULL,
  `nickname` varchar(25) NOT NULL,
  `score` int(11) NOT NULL,
  `id_game` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`id_player`, `nickname`, `score`, `id_game`) VALUES
(1, 'Moula', 0, 1),
(2, 'thomas', 0, 3),
(3, 'Mateo', 25, 4),
(4, 'poulet', 0, 5),
(5, 'Moula', 0, 6),
(6, 'moulay', 0, 7),
(7, 'moulali', 0, 8),
(8, 'moulali', 0, 9),
(9, 'moulali', 0, 10),
(10, 'moulali', 0, 11),
(11, 'moulali', 0, 14),
(12, 'moulali', 0, 17),
(13, 'moulali', 0, 17),
(14, 'moulali', 0, 20),
(15, 'moulali', 0, 21),
(16, 'moulali', 0, 22),
(17, 'moulali', 0, 23),
(18, 'lorem', 0, 24),
(19, 'lorem', 0, 25),
(20, 'lorem', 0, 26),
(21, 'lorem', 0, 27),
(22, 'lorem', 0, 28),
(23, 'moulali', 0, 30),
(24, 'moulali', 0, 31),
(25, 'moulali', 0, 32),
(26, 'moulali', 0, 39),
(27, 'moulali', 0, 40),
(28, 'moulali', 0, 42),
(29, 'moulalig', 0, 43),
(30, 'moulalig', 0, 43),
(31, 'moulalig', 0, 44),
(32, 'm2x', 0, 45),
(33, 'lorem', 0, 46),
(34, 'lorem', 0, 47),
(35, 'lorem', 0, 48),
(36, 'lorem', 0, 49),
(37, 'lorem', 0, 50),
(38, 'lorem', 0, 51),
(39, 'pouet', 0, 52),
(40, 'pouet2', 0, 53);

-- --------------------------------------------------------

--
-- Table structure for table `round`
--

CREATE TABLE `round` (
  `id_round` int(11) NOT NULL,
  `id_game` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `round`
--

INSERT INTO `round` (`id_round`, `id_game`) VALUES
(1, 11),
(2, 46),
(3, 47),
(4, 48),
(5, 49),
(6, 50),
(7, 51);

-- --------------------------------------------------------

--
-- Table structure for table `round_player`
--

CREATE TABLE `round_player` (
  `id_player` int(11) NOT NULL,
  `id_round` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `round_player`
--

INSERT INTO `round_player` (`id_player`, `id_round`) VALUES
(22, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id_game`);

--
-- Indexes for table `hidden_word`
--
ALTER TABLE `hidden_word`
  ADD PRIMARY KEY (`id_word`),
  ADD KEY `hidden_word_player_FK` (`id_player`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `message_game_FK` (`id_game`),
  ADD KEY `message_player0_FK` (`id_player`);

--
-- Indexes for table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`id_player`),
  ADD KEY `player_game_FK` (`id_game`);

--
-- Indexes for table `round`
--
ALTER TABLE `round`
  ADD PRIMARY KEY (`id_round`),
  ADD KEY `round_game_FK` (`id_game`);

--
-- Indexes for table `round_player`
--
ALTER TABLE `round_player`
  ADD PRIMARY KEY (`id_player`,`id_round`),
  ADD KEY `relation2_round0_FK` (`id_round`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `id_game` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `hidden_word`
--
ALTER TABLE `hidden_word`
  MODIFY `id_word` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `id_player` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `round`
--
ALTER TABLE `round`
  MODIFY `id_round` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hidden_word`
--
ALTER TABLE `hidden_word`
  ADD CONSTRAINT `hidden_word_player_FK` FOREIGN KEY (`id_player`) REFERENCES `player` (`id_player`);

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_game_FK` FOREIGN KEY (`id_game`) REFERENCES `game` (`id_game`),
  ADD CONSTRAINT `message_player0_FK` FOREIGN KEY (`id_player`) REFERENCES `player` (`id_player`);

--
-- Constraints for table `player`
--
ALTER TABLE `player`
  ADD CONSTRAINT `player_game_FK` FOREIGN KEY (`id_game`) REFERENCES `game` (`id_game`);

--
-- Constraints for table `round`
--
ALTER TABLE `round`
  ADD CONSTRAINT `round_game_FK` FOREIGN KEY (`id_game`) REFERENCES `game` (`id_game`);

--
-- Constraints for table `round_player`
--
ALTER TABLE `round_player`
  ADD CONSTRAINT `relation2_player_FK` FOREIGN KEY (`id_player`) REFERENCES `player` (`id_player`),
  ADD CONSTRAINT `relation2_round0_FK` FOREIGN KEY (`id_round`) REFERENCES `round` (`id_round`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
