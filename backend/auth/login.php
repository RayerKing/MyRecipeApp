<?php

// 🟩 API pro login

include "../config/database.php";

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// 🟩 povolení localhostu pro komunikaci
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $errors = "";

    // 🟩 Kontrola, zda mám všechny potřebná data
    if (empty($data["nickname"]) || empty($data["password"])) {
        $errors = "Chybí data";
        echo json_encode(
            [
                "success" => false,
                "message" => $errors,
            ]

        );
        exit;
    }

    $nickname = trim(filter_var($data["nickname"], FILTER_SANITIZE_SPECIAL_CHARS));
    $password = $data["password"];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE nickname = ? ");
    $stmt->execute([$nickname]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (empty($user)) {
        $errors = "Data nejsou";
        echo json_encode([
            "success" => false,
            "message" => $errors
        ]);
        exit;
    }

    if ($user["is_deleted"]) {
        $errors = "Data nejsou";
        echo json_encode([
            "success" => false,
            "message" => $errors
        ]);
        exit;
    }

    if (!password_verify($password, $user["password_hash"])) {
        $errors = "Data nejsou";
        echo json_encode([
            "success" => false,
            "message" => $errors
        ]);
        exit;
    } else {

        $_SESSION["isDeleted"] = $user["is_deleted"];
        $_SESSION["nickname"] = $user["nickname"];
        $_SESSION["firstName"] = $user["firstName"];
        $_SESSION["lastName"] = $user["lastName"];
        $_SESSION["role"] = $user["role"];
        $_SESSION["id"] = $user["id"];
        $_SESSION["email"] = $user["email"];
        $_SESSION["isActive"] = $user["is_activated_email"];
        $_SESSION["createdAt"] = $user["created_at"];

        $userData = array(
            "id" => $user["id"],
            "firstName" => $user["firstName"],
            "lastName" => $user["lastName"],
            "nickname" => $user["nickname"],
            "role" => $user["role"],
            "email" => $user["email"],
            "isActive" => $user["is_activated_email"],
            "created" => $user["created_at"],


        );

        echo json_encode([
            "success" => true,
            "message" => "Login",
            "userData" => $userData
        ]);

        exit;
    }
}
