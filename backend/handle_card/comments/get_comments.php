<?php

// 🟩 API pro získání všech komentářů k receptu

include "../../config/database.php";

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// 🟩 povolení localhostu pro komunikaci
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");


if ($_SERVER["REQUEST_METHOD"] === "GET") {

    // zda není id receptu prázdné
    if (!isset($_GET['recipe_id'])) {
        echo json_encode([
            "message" => "Chybí ID repcetu.",
            "success" => false,
        ]);
        exit;
    }

    $recipe_id = $_GET["recipe_id"];

    // zda je id číslo
    if (!ctype_digit($recipe_id)) {
        echo json_encode([
            "message" => "ID receptu není číslo.",
            "success" => false,
        ]);
        exit;
    }

    // zda je id kladne
    if ($recipe_id <= 0) {
        echo json_encode([
            "success" => false,
            "message" => "ID receptu musí být kladné."
        ]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT user_id, is_private FROM recipes WHERE id = ? LIMIT 1");
    $stmt->execute([$recipe_id]);

    $recipe = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$recipe) {
        echo json_encode([
            "success" => false,
            "message" => "Recept nenalezen."
        ]);
        exit;
    }

    // kontrola publicity, pokud je recept soukromý a uživatel není přihlášen
    if ($recipe["is_private"] == 1) {

        if (empty($_SESSION["id"])) {
            echo json_encode([
                "success" => false,
                "message" => "K zobrazení se musíte přihlásit."
            ]);
            exit;
        }

        // kontrola publicity, pokud je recept soukromý a uživatel není autorem, anebo admin
        if ($recipe["user_id"] != $_SESSION["id"] && $_SESSION["role"] != "admin") {
            echo json_encode([
                "success" => false,
                "message" => "Nemáte oprávnění.",
            ]);
            exit;
        }
    }

    $stmt = $pdo->prepare(
        "SELECT c.*, u.nickname AS author FROM comments c INNER JOIN users u ON c.user_id = u.id WHERE recipe_id = ? ORDER BY created_at DESC");
    $stmt->execute([$recipe_id]);
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    for($i = 0; $i < count($comments); $i++){
        $comments[$i]["created_at"] = (new DateTime($comments[$i]["created_at"]))->format("d. m. Y H:i");
        $comments[$i]["updated_at"] = (new DateTime($comments[$i]["updated_at"]))->format("d. m. Y H:i");
        
    }

    echo json_encode([
        "message" => $comments,
        //"message" => "Komentáře se načetly.",
        "success" => true,
        "data" => $comments

    ]);
    exit;
}
