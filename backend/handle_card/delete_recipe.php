<?php

// 🟩 API pro smazání receptu

include "../config/database.php";

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

    if (empty($_SESSION["id"])) {
        echo json_encode([
            "success" => false,
            "message" => "Uživatel nepřihlášen."
        ]);
        exit;
    }

    $id = json_decode(file_get_contents("php://input"), true);

    $stmt = $pdo -> prepare("SELECT user_id FROM recipes WHERE id = ? LIMIT 1");
    $stmt -> execute([$id]);
    $user = $stmt -> fetch(PDO::FETCH_ASSOC);

    if(!$user){
        echo json_encode([
            "success" => false,
            "message" => "Recept nenalezen."
        ]);
        exit;
    }

    if($user["user_id"] != $_SESSION["id"] && $_SESSION["role"] !== "admin"){
        echo json_encode([
            "success" => false,
            "message" => "Nemáte oprávnění."
        ]);
        exit;
    }

    $stmt = $pdo -> prepare("UPDATE recipes SET is_deleted = 1 WHERE id = ?");
    $stmt -> execute([$id]);
    $row = $stmt->rowCount();

    if($row === 0){
        echo json_encode([
            "success" => false,
            "message" => "Něco se pokazilo."
        ]);
        exit;
    }

    
    echo json_encode([
        "success" => true,
        "message" => "Recept byl odstraněn."
    ]);
    exit;

}

?>