<?php
include("conexao.php");

$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];


$checa = "SELECT * FROM usuarios WHERE email='$email'"; // Verifica se o email já existe no banco de dados
$result = $connect->query($checa);

if ($result->num_rows > 0) {
    echo "Esse email já está cadastrado!";
} else {

    $sql = "INSERT INTO usuarios (nome, email, senha)
            VALUES ('$nome', '$email', '$senha')";

    if ($connect->query($sql) === TRUE) {
        echo "Conta criada com sucesso!";
    } else {
        echo "Erro: " . $connect->error;
    }
}
?>