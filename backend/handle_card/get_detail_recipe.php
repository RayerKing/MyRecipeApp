<?php

// 🟩 API pro získání detailu konkrétního receptu

include "../config/database.php";

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

// 🟩 povolení localhostu pro komunikaci
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");




if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $id = $_GET["id"];

    if(empty($id)){
        echo json_encode([
            "success" => false,
            "message" => "Chybí id",
        ]);
        exit;
    }

    if(!ctype_digit($id)){
        echo json_encode([
            "success" => false,
            "message" => "Id není číslo",
        ]);
        exit;
    }

    $stmt = $pdo -> prepare("SELECT r.*, u.nickname AS author FROM recipes r INNER JOIN users u ON r.user_id = u.id WHERE r.id = ?");
    $stmt -> execute([$id]);

    $recipeDetail = $stmt -> fetch(PDO::FETCH_ASSOC);

    if(!$recipeDetail){
        echo json_encode([
            "success" => false,
            "message" => "Recept nenalezen",
        ]);
        exit;
    }

    $stmt = $pdo -> prepare("SELECT * FROM ingredients WHERE recipe_id = ? ORDER BY position ASC");
    $stmt -> execute([$id]);

    $recipeIngredient = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "message" => "Detail poslán.",
        "data" => $recipeDetail,
        "ingredient" => $recipeIngredient,
    ]);
    exit;

}

?>