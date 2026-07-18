<?php
session_start();

if(isset($_POST['fase'])) {
    $_SESSION['fase'] = $_POST['fase'];
}