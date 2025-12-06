-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Sob 06. pro 2025, 14:20
-- Verze serveru: 10.4.32-MariaDB
-- Verze PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `recipeapp`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'ID uživatele',
  `email` varchar(255) NOT NULL COMMENT 'Email uživatele',
  `password_hash` varchar(255) NOT NULL COMMENT 'Heslo hash uživatele',
  `nickname` varchar(255) NOT NULL COMMENT 'Přihlašovací jméno uživatele',
  `firstName` varchar(255) NOT NULL COMMENT 'Jméno uživatele',
  `lastName` varchar(255) NOT NULL COMMENT 'Příjmení uživatele',
  `role` enum('admin','user') NOT NULL DEFAULT 'user' COMMENT 'Role uživatele: Admin, nebo User',
  `is_activated_email` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 = no, 1 = yes',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = delete',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Čas vytvoření účtu',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Čas poslední změny'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci COMMENT='Tabulka pro uživatele';

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nickname` (`nickname`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID uživatele', AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
