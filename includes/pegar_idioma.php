<?php

session_start();

header('Content-Type: application/json; charset=utf-8');

echo json_encode([
    "idioma" => $_SESSION['idioma'] ?? "pt-BR"
]);