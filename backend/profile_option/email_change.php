<?php

// 🟩 API pro změnu emailu

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

    $email = trim($data["email"]);
    $password = $data["emailPassword"];

    if(empty($email) || empty($password)){
        echo json_encode([
            "success" => false,
            "message" => "Nejsou vyplněny všechny údaje.",
        ]);
        exit;
    }

    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        echo json_encode([
            "success"  => false,
            "message" => "Neplatný email.",
        ]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT password_hash FROM users WHERE id = ?");
    $stmt->execute([$_SESSION["id"]]);

    $userPassword = $stmt->fetch(PDO::FETCH_ASSOC);

    if(!$userPassword){
        echo json_encode([
            "success" => false,
            "message" => "Uživatel neexistuje."
        ]);
        exit;
    }

    if(!password_verify($password, $userPassword["password_hash"])){
        echo json_encode([
            "success" => false,
            "message" => "Heslo je špatně.",
        ]);
        exit;
    }

    $stmt = $pdo -> prepare("SELECT id FROM users WHERE email = ? AND id != ?");
    $stmt-> execute([$email, $_SESSION["id"]]);

    $emailExist = $stmt->fetch();

    if($emailExist){
        echo json_encode([
            "success" => false,
            "message" => "Email je už používaný.",
        ]);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE users SET email = ? WHERE id = ?");
    $stmt->execute([$email, $_SESSION["id"]]);

    echo json_encode([
        "success" => true,
        "message" => "Email byl změněn.",
        "email" => $email,
    ]);
    exit;

}

?>