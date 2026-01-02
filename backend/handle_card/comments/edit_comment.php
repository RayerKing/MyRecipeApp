<?php

// 🟩 API pro úpravu komentáře

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

    $text = trim($data["comment_text"]);
    $id = $data["comment_id"];

    if (!isset($_SESSION["id"])) {
    echo json_encode([
        "success" => false,
        "message" => "Uživatel není přihlášen."
    ]);
    exit;
}

    

    if(strlen($text) <= 0){
        echo json_encode([
            "success" => false,
            "message" => "Text je prázdný."
        ]);
        exit;
    }

    if(!is_int($id)){
        echo json_encode([
            "success" => false,
            "message" => "ID komentáře musí být číslo."
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

    $stmt = $pdo -> prepare("SELECT user_id, id FROM comments WHERE id = ? LIMIT 1");
    $stmt -> execute([$id]);
    $author = $stmt->fetch(PDO::FETCH_ASSOC);

    if(!$author){
        echo json_encode([
            "success" => false,
            "message" => "Komentář nenalezen."
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

    $stmt = $pdo -> prepare("UPDATE comments SET comment_body = ? WHERE id = ?");
    $stmt->execute([$text, $id]);

        echo json_encode([
        "success" => true,
        "message" => "Komentář byl úspěšně upraven."
    ]);
    exit;

}

?>