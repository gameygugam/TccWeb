<?php

include_once __DIR__ . '/../repository/PartidaRepository.php';
session_start();

$repo = new PartidaRepository();

if(isset($_SESSION['id_usuario'])) {
    if(isset($_POST['fase']) && $_POST['fase'] === 'fase1') {
        $repo->inserir($_SESSION['id_usuario'], 1, $_POST['tempo'], $_POST['pontos']);
    }
}