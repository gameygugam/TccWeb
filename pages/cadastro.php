<?php

require_once __DIR__ . "/../config/conexao.php";
require_once __DIR__ . "/../includes/consulta.php";

$query = new Consulta();

$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];

$result = $query->ChecarCadastro($email, $senha);

if ($result > 0) {
    header("Location: index.php");
}
else {
    echo "Email inexistente!";
}
// else {
//     $sql = "INSERT INTO usuarios (nome, email, senha)
//     VALUES ('$nome', '$email', '$senha')";

//     if ($connect->query($sql) === TRUE) {
//         echo "Conta criada com sucesso!";
//     } else {
//         echo "Erro: " . $connect->error;
//     }
// }
?>