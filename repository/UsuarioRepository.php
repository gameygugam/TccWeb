<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../entity/Usuario.php';

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

    public function buscarPorNomes(string $sobrenome, string $nome) : ?Usuario {
        $stmt = $this->pdo->prepare('SELECT * FROM usuario WHERE sobrenome = :sobrenome and nome = :nome');
        $stmt->execute([
            ':sobrenome' => $sobrenome,
            ':nome' => $nome
        ]);
        $dados = $stmt->fetch();

        if ($dados) {
            return new Usuario($dados);
        }
        return null;
    }

    public function criarUsuario(string $sobrenome, string $nome, int $idade, string $colegio, string $turma): void {
        $stmt = $this->pdo->prepare('INSERT INTO usuario (sobrenome, nome, idade, colegio, turma) VALUES (:sobrenome, :nome, :idade, :colegio, :turma)');
        $stmt->execute([':sobrenome' => $sobrenome, ':nome' => $nome, ':idade' => $idade, ':colegio' => $colegio, ':turma' => $turma]);
    }

    public function excluir(int $id): void {
        $stmt = $this->pdo->prepare('DELETE FROM usuario WHERE id = :id');
        $stmt->execute([':id' => $id]);
    }
}
