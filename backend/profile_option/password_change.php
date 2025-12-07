<?php

// 🟩 API pro změnu hesla

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

    $oldPassword = $data["oldPassword"];
    $newPassword = $data["newPassword"];
    $newPasswordRepeat = $data["newPasswordRepeat"];

    if (empty($oldPassword) || empty($newPassword) || empty($newPasswordRepeat)) {
        echo json_encode([
            "success" => false,
            "message" => "Chybí data"
        ]);
        exit;
    }

    if($oldPassword == $newPassword){
        echo json_encode([
            "success" => false,
            "message" => "Nové heslo není nové."
        ]);
        exit;
    }

    if ($newPassword !== $newPasswordRepeat) {
        echo json_encode([
            "success" => false,
            "message" => "Hesla nejsou stejná.",
        ]);
        exit;
    }

    if (strlen($newPassword) < 8) {
        echo json_encode([
            "success" => false,
            "message" => "Hesla je moc krátké.",
        ]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT password_hash FROM users WHERE id = ?");
    $stmt->execute([$_SESSION["id"]]);
    $userPassword = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$userPassword) {
        echo json_encode([
            "success" => false,
            "message" => "Uživatel nenalezen.",
        ]);
        exit;
    }


    if (!password_verify($oldPassword, $userPassword["password_hash"])) {
        echo json_encode([
            "success" => false,
            "message" => "Původní heslo je špatně.",
        ]);
        exit;
    }


    $hash = password_hash($newPassword, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("UPDATE users SET password_hash = ? WHERE id = ?");
    $stmt->execute([$hash, $_SESSION["id"]]);

    echo json_encode([
        "success" => true,
        "message" => "Heslo bylo úspěšně změněno."
    ]);
    exit;
}
