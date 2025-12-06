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
header("Access-Control-Allow-Credentials: true");


$_SESSION = [];
setcookie(session_name(), "", time() - 3600, "/");


session_destroy();

echo json_encode([
    "success" => true,
    "message" => "Uživatel odhlášen"
]);
exit;
?>