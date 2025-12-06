<?php

// připojení k databázi

$servername = "__SERVERNAME__";
$username = "__USERNAME__";
$password = "__PASSWORD__";

try {
    $connection = new PDO("mysql:host=$servername;dbname=recipeapp;charset=utf8mb4", $username, $password);

    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Databáze připojena";
} catch(PDOException $e){
    echo "Databáze selhala: " . $e->getMessage();
}




?>