<?php

// 🟩 API pro přidání receptu

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
            "message" => "Uživatel nepřihlášen."
        ]);
        exit;
    }

    $data = json_decode(file_get_contents("php://input"), true);

    $title = trim($data["title"]);
    $description = trim($data["description"]);
    $instructions = trim($data["instructions"]);
    $is_private = $data["isPrivate"];
    $ingredients = $data["ingredients"];

    $cleanIngredients = [];

    $position = 1;

    foreach ($ingredients as $i) {


        $name = trim($i["name"] ?? "");
        $amount_value = trim($i["amount_value"] ?? "");
        $amount_unit = $i["amount_unit"];

        if ($name == "" && $amount_value == "") {
            continue;
        }

        $cleanIngredients[] = [
            "name" => $name,
            "amount_value" => $amount_value,
            "amount_unit" => $amount_unit,
            "position" => $position,
        ];

        $position++;
    }

    if ($title == "" || $description == "" || $instructions == "") {
        echo json_encode([
            "success" => false,
            "message" => "Nutno vyplnit všechny údaje."
        ]);
        exit;
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare("INSERT INTO recipes (user_id, title, description, instructions, is_private) VALUES (?,?,?,?,?)");
        $stmt->execute([$_SESSION["id"], $title, $description, $instructions, $is_private]);

        $newId = $pdo->lastInsertId();

        $stmt = $pdo->prepare("INSERT INTO ingredients (recipe_id, name, amount_value, amount_unit, position) VALUES (?,?,?,?,?)");
        foreach ($cleanIngredients as $i){
            $stmt -> execute([$newId, $i["name"], $i["amount_value"], $i["amount_unit"], $i["position"]]);
        }

        $pdo->commit();

        echo json_encode([
        "success" => true,
        "message" => "Recept byl přidán.",
        "id" => $newId,
    ]);
    exit;

    } catch (Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }

        echo json_encode([
            "success" => false,
            "message" => "Chyba při ukládání."
        ]);
        exit;
    }





    
}
