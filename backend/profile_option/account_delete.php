<?php

// 🟩 API pro odtsranění účtu

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
            "message" => "Uživatel nepřihlášen",
        ]);
        exit;
    }

    $data = json_decode(file_get_contents("php://input"), true);

    $password = $data["cancelPassword"];
    $isSure = $data["agree"];

    if (empty($password)) {
        echo json_encode([
            "success" => false,
            "message" => "Nejsou vyplněny všechny údaje."
        ]);
        exit;
    }

    if (!$isSure) {
        echo json_encode([
            "success" => false,
            "message" => "Nutno zaškrtnout!"


        ]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT password_hash FROM users WHERE id = ?");
    $stmt->execute([$_SESSION["id"]]);
    $userPassword = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$userPassword) {
    echo json_encode([
        "success" => false,
        "message" => "Uživatel nenalezen."
    ]);
    exit;
}

    if (!password_verify($password, $userPassword["password_hash"])) {
        echo json_encode([
            "success" => false,
            "message" => "Heslo je nesprávné."
        ]);
        exit;
    }



    $deleted = 1;

    $stmt = $pdo->prepare("UPDATE users SET is_deleted = ? WHERE id = ?");
    $stmt->execute([$deleted, $_SESSION["id"]]);

    $_SESSION = [];
    setcookie(session_name(), "", time() - 3600, "/");


    session_destroy();

    echo json_encode([
        "success" => true,
        "message" => "Uživatel odstraněn"
    ]);
    exit;
}
