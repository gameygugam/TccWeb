<?php

require_once __DIR__ . "/../config/conexao.php";

class Consulta{
    private PDO $pdo;

    public function __construct() {
        $this->pdo = getConexao();
    }

    function Login($email, $senha)
    {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM usuarios WHERE email = :email AND senha = :senha"
        );
        $stmt->execute([
            ':email' => $email,
            ':senha' => $senha
        ]);
        return $stmt->fetch();
    }

    function ChecarCadastro($email, $senha)
    {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM usuarios WHERE email = :email AND senha = :senha"
        );
        $stmt->execute([
            ':email' => $email,
            ':senha' => $senha
        ]);
        return $stmt->fetch();
    }
}

?>