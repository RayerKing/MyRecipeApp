-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Úte 09. pro 2025, 20:08
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
-- Struktura tabulky `recipes`
--

CREATE TABLE `recipes` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'ID pro číslo receptu',
  `user_id` int(10) UNSIGNED NOT NULL COMMENT 'ID uživatele, kdo vytvořil recept',
  `title` varchar(255) NOT NULL COMMENT 'Název receptu',
  `description` varchar(255) NOT NULL COMMENT 'Krátký popis receptu.',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Čas vytvoření receptu',
  `instructions` text NOT NULL COMMENT 'Text postupu',
  `is_private` tinyint(1) NOT NULL COMMENT 'Soukromé/Veřejné',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Zda je recept smazán'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci COMMENT='Tabulka pro recepty';

--
-- Vypisuji data pro tabulku `recipes`
--

INSERT INTO `recipes` (`id`, `user_id`, `title`, `description`, `created_at`, `instructions`, `is_private`, `is_deleted`) VALUES
(36, 9, 'Rychlá omeleta', 'Jednoduchá snídaně na 5 minut.', '2025-12-08 20:06:46', 'Rozmíchat vejce, osolit, opéct.', 0, 0),
(37, 9, 'Pečené kuře', 'Klasika, která nikdy nezklame.', '2025-12-07 20:06:46', 'Okořenit, péct 80 minut.', 1, 0),
(38, 9, 'Těstoviny s pestem', 'Lehký oběd.', '2025-12-06 20:06:46', 'Uvařit těstoviny, přidat pesto.', 0, 0),
(39, 9, 'Česnečka', 'Rychlá polévka.', '2025-12-05 20:06:46', 'Orestovat česnek, přidat vývar.', 0, 0),
(40, 9, 'Hamburger', 'Domácí burger.', '2025-12-04 20:06:46', 'Usmažit maso, složit burger.', 1, 0),
(41, 9, 'Kuřecí kari', 'Lehké pikantní jídlo.', '2025-12-03 20:06:46', 'Orestovat kuře s kari.', 0, 0),
(42, 9, 'Špagety carbonara', 'Italská klasika.', '2025-12-02 20:06:46', 'Smíchat vejce, pancettu a těstoviny.', 0, 0),
(43, 9, 'Bramborová kaše', 'Jemná kaše.', '2025-12-08 20:06:46', 'Uvařit brambory, přidat máslo.', 0, 1),
(44, 9, 'Grilovaný losos', 'Rychlý zdravý oběd.', '2025-12-07 20:06:46', 'Opéct lososa na pánvi.', 1, 0),
(45, 9, 'Domácí pizza', 'Sýrová pizza.', '2025-12-06 20:06:46', 'Vypracovat těsto, upéct.', 0, 0),
(46, 9, 'Hovězí guláš', 'Klasický guláš.', '2025-12-05 20:06:46', 'Dusit maso 2 hodiny.', 0, 0),
(47, 9, 'Kuřecí řízek', 'Řízek jako od babičky.', '2025-12-04 20:06:46', 'Obalit, smažit.', 1, 0),
(48, 9, 'Smažený sýr', 'Rychlá večeře.', '2025-12-03 20:06:46', 'Obalit sýr, smažit.', 0, 0),
(49, 9, 'Rizoto', 'Jednoduché italské rizoto.', '2025-12-02 20:06:46', 'Přidat vývar postupně.', 0, 0),
(50, 9, 'Cizrnový salát', 'Zdravá volba.', '2025-12-08 20:06:46', 'Smíchat cizrnu se zeleninou.', 0, 1),
(51, 9, 'Bramborák', 'Křupavý bramborák.', '2025-12-07 20:06:46', 'Smažit na oleji.', 1, 0),
(52, 9, 'Kuřecí nudličky', 'Rychlovka do 15 min.', '2025-12-06 20:06:46', 'Orestovat nudličky, osolit.', 0, 0),
(53, 9, 'Zapečené těstoviny', 'Těstoviny se sýrem.', '2025-12-05 20:06:46', 'Zapéci na 20 minut.', 0, 0),
(54, 9, 'Palačinky', 'Sladké palačinky.', '2025-12-04 20:06:46', 'Usmažit těsto na pánvi.', 0, 0),
(55, 9, 'Vaječná pomazánka', 'Rychlá pomazánka.', '2025-12-03 20:06:46', 'Smíchat vejce s majonézou.', 1, 0),
(56, 9, 'Pečené brambory', 'Jednoduché a chutné.', '2025-12-02 20:06:46', 'Péct v troubě 40 min.', 0, 0),
(57, 9, 'Rajčatová polévka', 'Lehká polévka.', '2025-12-08 20:06:46', 'Rozmixovat rajčata.', 0, 0),
(58, 9, 'Smažená rýže', 'Na asijský styl.', '2025-12-07 20:06:46', 'Orestovat rýži se zeleninou.', 0, 0),
(59, 9, 'Kakaová bábovka', 'Domácí dezert.', '2025-12-06 20:06:46', 'Upéct v troubě 45 min.', 1, 0),
(60, 9, 'Hovězí steak', 'Středně propečený.', '2025-12-05 20:06:46', 'Opéct maso dle chuti.', 0, 0),
(61, 9, 'Kuřecí polévka', 'Vývar.', '2025-12-04 20:06:46', 'Vařit kuře 2 hodiny.', 0, 1),
(62, 9, 'Lasagne', 'Sýrové a masové.', '2025-12-03 20:06:46', 'Vrstvit maso a těstoviny.', 0, 0),
(63, 9, 'Tortilla', 'Rychlé do ruky.', '2025-12-02 20:06:46', 'Naplnit tortillu a zabalit.', 1, 0),
(64, 9, 'Fazolová polévka', 'Hustá polévka.', '2025-12-08 20:06:46', 'Vařit fazole do měkka.', 0, 0),
(65, 9, 'Grilovaný hermelín', 'Pikantní verze.', '2025-12-07 20:06:46', 'Grilovat 6 minut.', 0, 0),
(66, 9, 'Kuskus se zeleninou', 'Lehké jídlo.', '2025-12-06 20:06:46', 'Zalít kuskus vodou.', 0, 0),
(67, 9, 'Jahodový shake', 'Sladký nápoj.', '2025-12-05 20:06:46', 'Mixovat jahody s mlékem.', 1, 0),
(68, 9, 'Bramborová polévka', 'Hustá polévka.', '2025-12-04 20:06:46', 'Vařit brambory a zeleninu.', 0, 0),
(69, 9, 'Svíčková', 'Tradiční omáčka.', '2025-12-03 20:06:46', 'Dusit maso a mixovat zeleninu.', 0, 0),
(70, 9, 'Pečené žampiony', 'Plněné sýrem.', '2025-12-02 20:06:46', 'Péct 25 minut.', 0, 1),
(71, 9, 'Hranolky', 'Domácí hranolky.', '2025-12-08 20:06:46', 'Smažit do zlatova.', 0, 0),
(72, 9, 'Kure na paprice', 'Klasické jídlo.', '2025-12-07 20:06:46', 'Vařit maso v omáčce.', 1, 0),
(73, 9, 'Krémová brokolicová polévka', 'Jemný krém.', '2025-12-06 20:06:46', 'Rozmixovat brokolici.', 0, 0),
(74, 9, 'Ovocný salát', 'Lehká svačina.', '2025-12-05 20:06:46', 'Smíchat ovoce.', 0, 0),
(75, 9, 'Pečené kuře na bylinkách', 'Aromatické.', '2025-12-04 20:06:46', 'Péct se bylinkami.', 1, 0),
(76, 9, 'Rýžový nákyp', 'Sladký dezert.', '2025-12-03 20:06:46', 'Zapéci rýži s mlékem.', 0, 0),
(77, 9, 'Kari čočka', 'Zdravé jídlo.', '2025-12-02 20:06:46', 'Vařit čočku s kari.', 0, 0),
(78, 9, 'Boršč', 'Východní polévka.', '2025-12-08 20:06:46', 'Vařit zeleninu a červenou řepu.', 0, 0),
(79, 9, 'Tvarohové knedlíky', 'Sladká klasika.', '2025-12-07 20:06:46', 'Vařit knedlíky 8 minut.', 0, 1),
(80, 9, 'Masové koule', 'V rajčatové omáčce.', '2025-12-06 20:06:46', 'Dusit masové koule.', 1, 0),
(81, 9, 'Tuňákový salát', 'Rychlá večeře.', '2025-12-05 20:06:46', 'Smíchat tuňáka se zeleninou.', 0, 0),
(82, 9, 'Zapečené brambory se slaninou', 'Poctivá večeře.', '2025-12-04 20:06:46', 'Zapéci se sýrem.', 0, 0),
(83, 9, 'Domácí polévkové nudle', 'K vývaru.', '2025-12-03 20:06:46', 'Vyválet těsto a nakrájet.', 1, 0),
(84, 9, 'Cuketové placičky', 'Lehké jídlo.', '2025-12-02 20:06:46', 'Smažit na oleji.', 0, 0);

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
(9, 'testovaciData@seznam.cz', '$2y$10$WVDeuAk8Q7Pj72xpVHug..YlJAM1nFfMnYWZwjLqrA42ooTmXSlla', 'testovaci_data', 'Testovaci', 'Data', 'user', 0, 0, '2025-12-09 20:01:43', '2025-12-09 20:01:43');

--
-- Indexy pro exportované tabulky
--

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
-- AUTO_INCREMENT pro tabulku `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID pro číslo receptu', AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID uživatele', AUTO_INCREMENT=10;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `fk_recipes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
