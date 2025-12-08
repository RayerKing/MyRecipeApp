<?php

// 🟩 API pro získání receptů

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
    $start = $_GET["start"] ?? 0;
    $end = $_GET["end"] ?? 10;

    $offset = $start - 1;
    $limit = $end - $start + 1;

    if ($offset < 0) {
        $offset = 0;
        $limit = 10;
    }

    $stmt = $pdo->prepare("SELECT 
    r.*, 
    u.nickname AS author
FROM recipes r
INNER JOIN users u ON r.user_id = u.id
WHERE r.is_deleted = 0
ORDER BY r.created_at DESC
LIMIT ?, ?
");
    $stmt->bindValue(1, $offset, PDO::PARAM_INT);
    $stmt->bindValue(2, $limit, PDO::PARAM_INT);
    $stmt->execute();
    $recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stmt = $pdo->prepare("SELECT COUNT(*) FROM recipes WHERE is_deleted = 0");
    $stmt->execute();
    $count = $stmt->fetchColumn();

    echo json_encode([
        "success" => true,
        "message" => "Recepty odeslány.",
        "data" => $recipes,
        "count" => $count,
    ]);
    exit;
}
