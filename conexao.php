<?php 
$usuario = "root";
$senha = "";
$endereco = "localhost";
$nomeBanco = "tccweb";

$connect = new mysqli($endereco, $usuario, $senha, $nomeBanco);
if(!$connect){
    die("Falha na conexão: " . $connect->connect_error);
}


// try {
//     $conexao = new PDO("mysql:host=localhost;dbname=tccweb", $usuario, $senha);
//     $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// } catch (PDOException $e) {
//     echo "Erro de conexão: " . $e->getMessage();
// }
?>