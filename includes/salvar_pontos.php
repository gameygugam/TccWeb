<?php
session_start();

if(isset($_POST['pontos'])) {
    if(isset($_POST['fase']) && $_POST['fase'] === 'fase1') {
        $_SESSION['pontos_fase1'] = $_POST['pontos'];
    }
}