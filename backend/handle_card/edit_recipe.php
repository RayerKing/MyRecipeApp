<?php

// 🟩 API pro uložení editu daného receptu

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

    $detail = $data["detail"];
    $ingredients = $data["ingredients"];

    if (!$detail || empty($detail["id"])) {
        echo json_encode([
            "success" => false,
            "message" => "Chybí ID receptu."
        ]);
        exit;
    }

    // 🟩 najdu autora receptu a porovnám ho se session id
    $stmt = $pdo->prepare("SELECT user_id FROM recipes WHERE id = ? LIMIT 1");
    $stmt->execute([$detail["id"]]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode([
            "success" => false,
            "message" => "Recept nenalezen."
        ]);
        exit;
    }

    if ($user["user_id"] != $_SESSION["id"]) {
        echo json_encode([
            "success" => false,
            "message" => "Nemáte oprávnění."
        ]);
        exit;
    }

    $title = trim($detail["title"]);
    $description = trim($detail["description"]);
    $instructions = trim($detail["instructions"]);

    if ($title === "" || $description === "" || $instructions === "") {
        echo json_encode([
            "success" => false,
            "message" => "Chybí některé údaje."
        ]);
        exit;
    }

    // 🟩 získání ingrediencí, které mají vše nutné a smazání prázdných řádků
    $cleanIngredients = [];

    foreach ($ingredients as $ing) {

        $name = trim($ing["name"]);
        $value = trim($ing["amount_value"]);
        $unit = trim($ing["amount_unit"]);

        if ($name == "" && $value != "") {
            echo json_encode([
                "success" => false,
                "message" => "Chybí název u ingredience."
            ]);
            exit;
        }

        if ($name == "" && $value == "") {
            continue;
        }

        $cleanIngredients[] = [
            "name" => $name,
            "amount_value" => $value,
            "amount_unit" => $unit,
        ];
    }

    
    try {
        $pdo->beginTransaction();
        // 🟩 úprava title, popisu a instrukcí
        $stmt = $pdo->prepare("
        UPDATE recipes
        SET title = ?, description = ?, instructions = ?
        WHERE id = ? LIMIT 1
    ");
        $stmt->execute([$title, $description, $instructions, $detail["id"]]);

        $stmt = $pdo->prepare("DELETE FROM ingredients WHERE recipe_id = ?");
        $stmt->execute([$detail["id"]]);

        $position = 1;

        $stmt = $pdo->prepare("INSERT INTO ingredients (recipe_id, name, amount_value, amount_unit, position) VALUES (?,?,?,?,?)");
        foreach ($cleanIngredients as $ing) {



            $stmt->execute([$detail["id"], $ing["name"], $ing["amount_value"], $ing["amount_unit"], $position]);
            $position++;
        }

        $pdo->commit();

        echo json_encode([
            "success" => true,
            "message" => "Recept byl aktualizován."
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
