<?php

// 🟩 API pro změnu nickname, firstName, lastName

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

    $password = $data["optionPassword"];
    $nickname = trim(filter_var($data["optionNickname"], FILTER_SANITIZE_SPECIAL_CHARS));
    $firstName = trim(filter_var($data["optionFirstName"], FILTER_SANITIZE_SPECIAL_CHARS));
    $lastName  = trim(filter_var($data["optionLastName"], FILTER_SANITIZE_SPECIAL_CHARS));

    // 🟩 Pokud nějaký input byl prázdný
    if (empty($password) || empty($nickname) || empty($firstName) || empty($lastName)) {
        echo json_encode([
            "success" => false,
            "message" => "Chybí doplnit data",
        ]);
        exit;
    }

    // 🟩 Dotaz pro získání a kontrolu hesla
    $stmt = $pdo->prepare("SELECT password_hash FROM users WHERE id = ?");
    $stmt->execute([$_SESSION["id"]]);

    $user_password = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user_password == false) {
        echo json_encode([
            "success" => false,
            "message" => "Uživatel neexistuje",
        ]);
        exit;
    }

    if (!password_verify($password, $user_password["password_hash"])) {
        echo json_encode([
            "success" => false,
            "message" => "Chybné heslo",
        ]);
        exit;
    }

    $stmt = $pdo -> prepare("SELECT id FROM users WHERE nickname = ? AND id != ? LIMIT 1");
    $stmt -> execute([$nickname, $_SESSION["id"]]);
    $uniqueNickname = $stmt->fetch();

    if($uniqueNickname){
        echo json_encode([
            "success" => false,
            "message" => "Přezdívka je již používaná."
        ]);
        exit;
    }

    // 🟩 Dotaz pro aktualizaci dat
    $stmt = $pdo->prepare("UPDATE users SET nickname = ?, firstName = ?, lastName = ? WHERE id= ?");
    $stmt->execute([$nickname, $firstName, $lastName, $_SESSION["id"]]);

    echo json_encode([
        "success" => true,
        "message" => "Data byla změněna.",
        "nickname" => $nickname,
        "firstName" => $firstName,
        "lastName" => $lastName,
    ]);
    exit;
}
