<?php

session_start();

header('Content-Type: application/json; charset=utf-8');

echo json_encode([
    "nome" => $_SESSION['nome'] ?? "default"
]);