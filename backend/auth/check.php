<?php

// 🟩 Kontrola při reloadu, zda je uživatel přihlášen

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
            "isUser" => false,
            "message" => "Uživatel nepřihlášen"
        ]);
        exit;
    } else {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE id= ?");
        $stmt->execute([$_SESSION["id"]]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $userData = array(
            "id" => $user["id"],
            "firstName" => $user["firstName"],
            "lastName" => $user["lastName"],
            "nickname" => $user["nickname"],
            "role" => $user["role"],
            "email" => $user["email"],
            "isActive" => $user["is_activated_email"],


        );

        echo json_encode([
            "isUser" => true,
            "message" => "Login",
            "userData" => $userData
        ]);

        exit;
    }
}
