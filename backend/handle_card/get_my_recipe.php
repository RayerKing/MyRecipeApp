<?php

// 🟩 API pro získání všech receptů uživatele receptu

include "../config/database.php";

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

    if (empty($_SESSION["id"])) {
        echo json_encode([
            "success" => false,
            "message" => "Uživatel není přihlášen.",
        ]);
        exit;
    }

    $start = $_GET["start"] ?? 1;
    $end = $_GET["end"] ?? 10;

    $offset = $start - 1;
    $limit = $end - $start + 1;

    if ($offset < 0) {
        $offset = 0;
        $limit = 10;
    }

    $stmt = $pdo->prepare("SELECT * FROM recipes WHERE user_id = ? ORDER BY created_at DESC
LIMIT ?, ?");
    $stmt->bindValue(1, $_SESSION["id"], PDO::PARAM_INT);
    $stmt->bindValue(2, $offset, PDO::PARAM_INT);
    $stmt->bindValue(3, $limit, PDO::PARAM_INT);

    $stmt->execute();

    $userRecipes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stmt = $pdo->prepare("SELECT COUNT(*) FROM recipes WHERE user_id = ?");
    $stmt->execute([$_SESSION["id"]]);
    $count = $stmt->fetchColumn();

    echo json_encode([
        "success" => true,
        "message" => "Recepty odeslány.",
        "data" => $userRecipes,
        "count" => $count,
    ]);
    exit;
}
