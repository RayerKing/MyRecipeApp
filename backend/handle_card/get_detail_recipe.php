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

    if (empty($id)) {
        echo json_encode([
            "success" => false,
            "message" => "Chybí id",
        ]);
        exit;
    }

    if (!ctype_digit($id)) {
        echo json_encode([
            "success" => false,
            "message" => "Id není číslo",
        ]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT r.*, u.nickname AS author FROM recipes r INNER JOIN users u ON r.user_id = u.id WHERE r.id = ?");
    $stmt->execute([$id]);

    $recipeDetail = $stmt->fetch(PDO::FETCH_ASSOC);

    // formát datumu
    $recipeDetail["created_at"] = (new DateTime($recipeDetail["created_at"]))->format("d. m. Y H:i");


    if (!$recipeDetail) {
        echo json_encode([
            "success" => false,
            "message" => "Recept nenalezen",
        ]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM ingredients WHERE recipe_id = ? ORDER BY position ASC");
    $stmt->execute([$id]);

    $recipeIngredient = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // změna formátu, pokud je množství podle chuti
    // změna formátu množství
    for ($i = 0; $i <= count($recipeIngredient) - 1; $i++) {
        if ($recipeIngredient[$i]["amount_unit"] == "podle chuti") {
            $recipeIngredient[$i]["amount_value"] = null;
        } else {
            $posledniCislo = $recipeIngredient[$i]["amount_value"][strlen($recipeIngredient[$i]["amount_value"]) - 1];
            $predposledniCislo = $recipeIngredient[$i]["amount_value"][strlen($recipeIngredient[$i]["amount_value"]) - 2];

            // pokud obě jsou nula = 8.00
            if ($posledniCislo == "0" && $predposledniCislo == "0") {
                $recipeIngredient[$i]["amount_value"] = substr($recipeIngredient[$i]["amount_value"], 0, strlen($recipeIngredient[$i]["amount_value"]) - 3);
            }
            // 8.50
            elseif ($posledniCislo == "0" && $predposledniCislo !== "0") {
                $recipeIngredient[$i]["amount_value"] = substr($recipeIngredient[$i]["amount_value"], 0, strlen($recipeIngredient[$i]["amount_value"]) - 1);
            }
            // 8.05
            elseif ($posledniCislo !== "0" && $predposledniCislo == "0") {
                continue;
            }
        }
    }



    echo json_encode([
        "success" => true,
        "message" => "Detail poslán.",
        "data" => $recipeDetail,
        "ingredient" => $recipeIngredient,
        "pokus" => $recipeIngredient


    ]);
    exit;
}
