<?php

require_once __DIR__ . '\..\config\database.php';
require_once __DIR__ . '\..\entity\Usuario.php';

class UsuarioRepository {

    private PDO $pdo;

    public function __construct() {
        $this->pdo = getConexao();
    }

    public function buscarPorId(string $id): ?Usuario {
        $stmt = $this->pdo->prepare('SELECT * FROM usuario WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $id]);
        $dados = $stmt->fetch();

        if ($dados) {
            return new Usuario($dados);
        }

        return null;
    }

    public function buscarPorNomes(string $responsavel, string $nome) : ?Usuario {
        $stmt = $this->pdo->prepare('SELECT * FROM usuario WHERE responsavel = :responsavel and nome = :nome');
        $stmt->execute([
            ':responsavel' => $responsavel,
            ':nome' => $nome
        ]);
        $dados = $stmt->fetch();

        if ($dados) {
            return new Usuario($dados);
        }
        return null;
    }

    public function criarUsuario(string $responsavel, string $nome, string $idade): void {
        $stmt = $this->pdo->prepare('INSERT INTO usuario (responsavel, nome, idade) VALUES (:responsavel, :nome, :idade)');
        $stmt->execute([':responsavel' => $responsavel, ':nome' => $nome, ':idade' => $idade]);
    }

    public function excluir(int $id): void {
        $stmt = $this->pdo->prepare('DELETE FROM usuario WHERE id = :id');
        $stmt->execute([':id' => $id]);
    }
}
