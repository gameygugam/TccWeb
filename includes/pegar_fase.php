<?php

session_start();

header('Content-Type: application/json; charset=utf-8');

echo json_encode([
    "fase" => $_SESSION['fase'] ?? "menu"
]);