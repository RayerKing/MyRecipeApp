<?php

// 🟩 API pro přidání komentáře

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

    $data = json_decode(file_get_contents("php://input"), true);

    $textComment = trim($data["text"]);
    $recipe_id = $data["recipe_id"];

    if (empty($_SESSION["nickname"])) {
        echo json_encode([
            "message" => "Uživatel nepřihlášen.",
            "success" => false,
        ]);
        exit;
    }

    if(empty($textComment)){
        echo json_encode([
            "message" => "Komentář není vyplněn.",
            "success" => false,
            
        ]);
        exit;
    }

    $stmt = $pdo -> prepare("INSERT INTO comments(user_id, recipe_id, comment_body) VALUES (?,?,?)");
    $stmt->execute([$_SESSION["id"], $recipe_id, $textComment]);
    $row = $stmt->rowCount();
    

    if($row < 1){
        echo json_encode([
            "message" => "Nepodařilo se přidat komentář.",
            "success" => false,
        ]);
        exit;
    }

    $newId = $pdo -> lastInsertId();

    $stmt = $pdo -> prepare("SELECT created_at FROM comments WHERE id = ?");
    $stmt->execute([$newId]);
    $date = $stmt->fetch(PDO::FETCH_ASSOC);

    $date["created_at"] = (new DateTime($date["created_at"]))->format("d. m. Y H:i");

    $newComment = array(
        "id" => $newId,
        "created_at" => $date["created_at"],
        "author" => $_SESSION["nickname"]
    );

      echo json_encode([
        "success" => true,
        "message" => "Komentář byl přidán.",
        "data" => $newComment
    ]);
    exit;
}
