-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Ned 04. led 2026, 16:30
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
-- Struktura tabulky `comments`
--

CREATE TABLE `comments` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'ID komentáře',
  `user_id` int(10) UNSIGNED NOT NULL COMMENT 'ID uživatele',
  `recipe_id` int(10) UNSIGNED NOT NULL COMMENT 'ID receptu',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Datum vytvoření',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Aktualizace komentáře',
  `comment_body` text NOT NULL COMMENT 'Vložený text komentáře'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci COMMENT='Tabulka pro komentáře k receptům';

--
-- Vypisuji data pro tabulku `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `recipe_id`, `created_at`, `updated_at`, `comment_body`) VALUES
(4, 9, 105, '2026-01-02 15:43:11', '2026-01-02 15:43:11', 'Moc dobré'),
(6, 9, 105, '2026-01-02 15:43:41', '2026-01-04 14:59:50', 'úžasné jídlo, nejlepší, báječné jídlo! 😊');

-- --------------------------------------------------------

--
-- Struktura tabulky `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'ID ingredience',
  `recipe_id` int(10) UNSIGNED NOT NULL COMMENT 'ID receptu',
  `name` varchar(255) NOT NULL COMMENT 'Název ingredience',
  `amount_value` decimal(6,2) DEFAULT NULL COMMENT 'Množství - číslo',
  `amount_unit` enum('hrnek','lžička','lžíce','g','kg','l','ml','ks','podle chuti') DEFAULT NULL COMMENT 'Množství - jednotka',
  `position` int(10) UNSIGNED NOT NULL COMMENT 'Pořadí ingrediencí'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `ingredients`
--

INSERT INTO `ingredients` (`id`, `recipe_id`, `name`, `amount_value`, `amount_unit`, `position`) VALUES
(51, 95, 'Kuřecí maso', 500.00, 'g', 1),
(52, 95, 'Cibule', 1.00, 'ks', 2),
(53, 95, 'Mletá paprika', 1.00, 'lžíce', 3),
(54, 95, 'Smetana', 200.00, 'ml', 4),
(55, 95, 'Olej', 0.00, 'podle chuti', 5),
(56, 95, 'Sůl a pepř', 0.00, 'podle chuti', 6),
(57, 96, 'Špagety', 400.00, 'g', 1),
(58, 96, 'Slanina', 150.00, 'g', 2),
(59, 96, 'Vejce', 3.00, 'ks', 3),
(60, 96, 'Parmazán', 80.00, 'g', 4),
(61, 97, 'Mleté maso', 500.00, 'g', 1),
(62, 97, 'Rajský protlak', 200.00, 'g', 2),
(63, 97, 'Cukr', 1.00, 'lžíce', 3),
(64, 97, 'Cibule', 1.00, 'ks', 4),
(65, 97, 'Česnek', 0.00, 'podle chuti', 5),
(66, 98, 'Hovězí', 700.00, 'g', 1),
(67, 98, 'Cibule', 2.00, 'ks', 2),
(68, 98, 'Mletá paprika', 0.00, 'podle chuti', 3),
(69, 99, 'Kuře', 1.00, 'ks', 1),
(70, 99, 'Brambory', 1.00, 'kg', 2),
(71, 100, 'Rýže', 300.00, 'g', 1),
(72, 100, 'Kuřecí maso', 400.00, 'g', 2),
(73, 100, 'Mražená zelenina', 200.00, 'g', 3),
(74, 101, 'Brambory', 300.00, 'g', 1),
(75, 101, 'Česnek', 0.00, 'podle chuti', 2),
(76, 101, 'Vývar', 500.00, 'ml', 3),
(77, 102, 'Eidam', 250.00, 'g', 1),
(78, 102, 'Vejce', 2.00, 'ks', 2),
(79, 102, 'Strouhanka', 300.00, 'g', 3),
(87, 106, 'Vepřová panenka', 500.00, 'g', 1),
(88, 107, 'Fazole', 400.00, 'g', 1),
(89, 107, 'Cibule', 1.00, 'ks', 2),
(90, 107, 'Paprika', 1.00, 'lžíce', 3),
(91, 104, 'Brambory', 800.00, 'g', 1),
(92, 104, 'Mouka', 2.00, 'lžíce', 2),
(93, 103, 'Těstoviny', 400.00, 'g', 1),
(94, 103, 'Rajčata v plechu', 400.00, 'g', 2),
(95, 103, 'Bazalka', 0.00, 'podle chuti', 3),
(96, 103, 'Sůl a pepř', 0.00, 'podle chuti', 4),
(97, 105, 'Losos', 4.00, 'ks', 1),
(98, 105, 'Máslo', 30.00, 'g', 2);

-- --------------------------------------------------------

--
-- Struktura tabulky `recipes`
--

CREATE TABLE `recipes` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'ID pro číslo receptu',
  `user_id` int(10) UNSIGNED NOT NULL COMMENT 'ID uživatele, kdo vytvořil recept',
  `title` varchar(255) NOT NULL COMMENT 'Název receptu',
  `description` varchar(255) NOT NULL COMMENT 'Krátký popis receptu.',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Čas vytvoření receptu',
  `instructions` text NOT NULL COMMENT 'Text postupu',
  `is_private` tinyint(1) NOT NULL COMMENT 'Soukromé-1/Veřejné-0',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Zda je recept smazán'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci COMMENT='Tabulka pro recepty';

--
-- Vypisuji data pro tabulku `recipes`
--

INSERT INTO `recipes` (`id`, `user_id`, `title`, `description`, `created_at`, `instructions`, `is_private`, `is_deleted`) VALUES
(95, 9, 'Kuřecí na paprice', 'Klasické české jídlo s jemnou paprikovou omáčkou.', '2025-12-21 21:10:26', 'Na oleji orestuj cibuli, přidej kuřecí maso, zapraš paprikou, podlij vodou a dust do měkka. Přidej smetanu a krátce povař.', 0, 1),
(96, 9, 'Špagety carbonara', 'Rychlé italské těstoviny bez smetany.', '2025-12-21 21:11:25', 'Uvař špagety. Na pánvi opeč slaninu, přidej těstoviny a zalij směsí vajec a sýra.', 1, 0),
(97, 9, 'Rajská omáčka s masovými koulemi', 'Sladkokyselá omáčka oblíbená u dětí.', '2025-12-21 21:12:48', 'Uvař rajskou omáčku z protlaku, vytvoř koule z masa a povař je v omáčce.', 0, 0),
(98, 9, 'Hovězí guláš', 'Poctivý hospodský guláš.', '2025-12-21 21:13:34', 'Na sádle orestuj cibuli, přidej maso, papriku a dust do měkka.', 0, 0),
(99, 9, 'Pečené kuře s bramborami', 'Jednoduchý nedělní oběd.', '2025-12-21 21:14:15', 'Kuře osol, okmínuj a peč s bramborami dozlatova.', 1, 0),
(100, 9, 'Rizoto s kuřecím masem', 'Rychlá večeře z jednoho hrnce.', '2025-12-21 21:14:56', 'Orestuj maso, přidej rýži, zeleninu a vař doměkka.', 0, 0),
(101, 9, 'Česneková polévka', 'Ideální na zahřátí nebo kocovinu.', '2025-12-21 21:15:42', 'Uvař brambory, přidej česnek a dochuť.', 0, 0),
(102, 9, 'Smažený sýr', 'Česká klasika.', '2025-12-21 21:16:22', 'Sýr obal v trojobalu a smaž dozlatova.', 1, 0),
(103, 9, 'Těstoviny s rajčatovou omáčkou', 'Lehký bezmasý oběd.', '2025-12-21 21:16:57', 'Uvař těstoviny, připrav rajčatovou omáčku a smíchej.', 0, 0),
(104, 9, 'Bramboráky', 'Křupavé placičky z brambor.', '2025-12-21 21:17:36', 'Smíchej suroviny a smaž na pánvi.', 0, 0),
(105, 10, 'Losos na másle', 'Rychlé a zdravé jídlo.', '2025-12-21 21:32:24', 'Lososa osol a opeč na másle.', 0, 0),
(106, 10, 'Vepřová panenka', 'Jemné maso na rychlou úpravu.', '2025-12-21 21:32:52', 'Panenku opeč a nech dojít v troubě.', 0, 1),
(107, 10, 'Fazolový guláš', 'Fazolový guláš', '2025-12-21 21:33:30', 'Uvař fazole, přidej cibuli a papriku.', 1, 0);

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
-- Vypisuji data pro tabulku `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `nickname`, `firstName`, `lastName`, `role`, `is_activated_email`, `is_deleted`, `created_at`, `updated_at`) VALUES
(9, 'testovaciData@seznam.cz', '$2y$10$WVDeuAk8Q7Pj72xpVHug..YlJAM1nFfMnYWZwjLqrA42ooTmXSlla', 'testovaci_data', 'Testovaci', 'Data', 'admin', 0, 0, '2025-12-09 20:01:43', '2025-12-30 21:11:21'),
(10, 'test@seznam.cz', '$2y$10$eZdEZ5SZCWMOyKqeiA2Xp.iT.e7aF3xej3tVLGS89LyjL.tUJrQyC', 'test', 'Test', 'Data', 'user', 0, 0, '2025-12-21 21:31:24', '2025-12-21 21:31:24');

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_comments_user_id` (`user_id`),
  ADD KEY `fk_comments_recipe_id` (`recipe_id`);

--
-- Indexy pro tabulku `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_recipe_id` (`recipe_id`);

--
-- Indexy pro tabulku `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_recipes_user` (`user_id`);

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
-- AUTO_INCREMENT pro tabulku `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID komentáře', AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pro tabulku `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID ingredience', AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT pro tabulku `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID pro číslo receptu', AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID uživatele', AUTO_INCREMENT=11;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_recipe_id` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_comments_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Omezení pro tabulku `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `fk_recipe_id` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `fk_recipes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
