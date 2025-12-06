<?php

// nahrání z reactu

include "../config/database.php";

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// povolení localhostu pro komunikaci
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $errors = "";
    
    if (
        empty($data["firstName"]) || empty($data["lastName"]) || empty($data["nickname"])
        || empty($data["email"]) || empty($data["password"]) || empty($data["passwordRepeat"])
    ) {
        $errors = "Data missing";
        echo json_encode([
            "success" => false,
            "message" => $errors
        ]);
        exit;
    }

    $firstName = trim(filter_var($data["firstName"], FILTER_SANITIZE_SPECIAL_CHARS));
    $lastName = trim(filter_var($data["lastName"], FILTER_SANITIZE_SPECIAL_CHARS));
    $nickname = trim(filter_var($data["nickname"], FILTER_SANITIZE_SPECIAL_CHARS));
    $email = trim(filter_var($data["email"], FILTER_SANITIZE_EMAIL));

    $password = $data["password"];
    $passwordRepeat = $data["passwordRepeat"];

    if ($password !== $passwordRepeat) {
        $errors = "Different passwords";

        echo json_encode([
            "success" => false,
            "message" => $errors
        ]);
        exit;
    }

    if (strlen($password) < 8) {
        $errors = "Short password";

        echo json_encode([
            "success" => false,
            "message" => $errors
        ]);
        exit;
    }

    $isExists = $pdo->prepare("SELECT email, nickname FROM users WHERE email = ? OR nickname = ? LIMIT 1");
    $isExists->execute([$email, $nickname]);

    $user = $isExists->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        if ($user["email"] == $email) {
            $errors = "Email exists";

            echo json_encode([
                "success" => false,
                "message" => $errors
            ]);
            exit;
        }

        if ($user["nickname"] == $nickname) {
            $errors = "Nickname exists";

            echo json_encode([
                "success" => false,
                "message" => $errors
            ]);
            exit;
        }
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO users (email, password_hash, nickname, firstName, lastName) 
    VALUES (?,?,?,?,?)");
    $stmt->execute([$email, $hash, $nickname, $firstName, $lastName]);

    

    echo json_encode([
        "success" => true

    ]);
    exit;
}

?>