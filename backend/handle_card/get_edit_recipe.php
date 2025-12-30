<?php

// 🟩 API pro získání detailu konkrétního receptu pro jeho edit

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

    if(empty($_SESSION["id"])){
        echo json_encode([
            "success" => false,
            "message" => "Uživatel nepřihlášen."
        ]);
        exit;
    }

    $data = json_decode(file_get_contents("php://input"), true);


    $id = $data["id"];

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

    $stmt = $pdo -> prepare("SELECT * FROM recipes WHERE id = ? LIMIT 1");
    $stmt -> execute([$id]);
    $authorRecipe = $stmt -> fetch(PDO::FETCH_ASSOC);
    
    if (!$authorRecipe){
        echo json_encode([
            "success" => false,
            "message" => "Recept nenalezen.",
        ]);
        exit;
    }


    if($authorRecipe["user_id"] !== $_SESSION["id"] && $_SESSION["role"] !== "admin"){
        echo json_encode([
            "success" => false,
            "message" => "Nemáte oprávnění měnit tento recept.",
            
        ]);
        exit;
    }

    $stmt = $pdo -> prepare("SELECT * FROM ingredients WHERE recipe_id = ? ORDER BY position ASC");
    $stmt -> execute([$id]);

    $recipeIngredient = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    for ($i = 0; $i < count($recipeIngredient); $i++){
        if ($recipeIngredient[$i]["amount_unit"] == "podle chuti"){
            $recipeIngredient[$i]["amount_value"] = "";
        }
    }

    echo json_encode([
        "success" => true,
        "message" => "Detail poslán.",
        "data" => $authorRecipe,
        "ingredient" => $recipeIngredient,
        
    ]);
    exit;

}

?>