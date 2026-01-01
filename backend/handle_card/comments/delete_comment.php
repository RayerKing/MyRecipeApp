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
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");


if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $id = json_decode(file_get_contents("php://input"), true);

    if(empty($_SESSION["id"])){
        echo json_encode([
            "message" => "Uživatel není přihlášen.",
            "success" => false,
        ]);
        exit;
    }

    if (!isset($id)) {
        echo json_encode([
            "message" => "Chybí ID komentáře.",
            "success" => false,
        ]);
        exit;
    }

    // zda je id kladne
    if ($id <= 0) {
        echo json_encode([
            "success" => false,
            "message" => "ID komentáře musí být kladné."
        ]);
        exit;
    }

    $stmt = $pdo -> prepare("SELECT user_id FROM comments WHERE id = ? LIMIT 1");
    $stmt -> execute([$id]);
    $author = $stmt->fetch();

    if(!$author){
        echo json_encode([
            "success" => false,
            "message" => "Autor nenalezen."
        ]);
        exit;
    }

    if($author["user_id"] != $_SESSION["id"] && $_SESSION["role"] != "admin"){
        echo json_encode([
            "success" => false,
            "message" => "Nemáte oprávnění."
        ]);
        exit;
    }

    $stmt = $pdo -> prepare("DELETE FROM comments WHERE id = ?");
    $stmt -> execute([$id]);
    $row = $stmt->rowCount();

    if($row == 0){
        echo json_encode([
            "success" => false,
            "message" => "Komentář se nepodařilo odstranit."
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "message" => "Komentář byl úspěšně odstraněn."
    ]);
    exit;
}



?>