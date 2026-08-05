<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../entity/Partida.php';

class PartidaRepository {

    private PDO $pdo;

    public function __construct() {
        $this->pdo = getConexao();
    }

    /** @return Partida[] */ // Lista todos salvas no Banco daquele usuário
    public function listarPorUsuario(int $id_usuario): array {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM partida WHERE id_usuario = :id_u ORDER BY id ASC'
        );
        $stmt->execute([':id_u' => $id_usuario]);
        $lista = [];
        foreach ($stmt->fetchAll() as $dados) {
            $lista[] = new Partida($dados);
        }
        return $lista;
    }

    public function buscarPorId(int $id): ?Partida {
        $stmt = $this->pdo->prepare('SELECT * FROM partida WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $id]);
        $dados = $stmt->fetch();

        if ($dados) {
            return new Partida($dados);
        }
        return null;
    }

    public function salvar(Partida $partida): void {
        if ($partida->getId() > 0) {
            $stmt = $this->pdo->prepare(
                'UPDATE partida SET fase = :fase, tempo = :tempo, pontuacao = :pontuacao WHERE id = :id'
            );
            $stmt->execute([
                ':id' => $partida->getId(),
                ':fase' => $partida->getFase(),
                ':tempo' => $partida->getTempo(),
                ':pontuacao' => $partida->getPontuacao()
            ]);
            return;
        }

        if ($partida->getIdUsuario() <= 0) {
            throw new InvalidArgumentException('Usuário inválido. (Erro Banco)');
        }

        $stmt = $this->pdo->prepare(
            'INSERT INTO partida (id_usuario, fase, tempo, pontuacao) VALUES (:id_usuario, :fase, :tempo, :pontuacao)'
        );
        $stmt->execute([
            ':id_usuario' => $partida->getIdUsuario(),
            ':fase' => $partida->getFase(),
            ':tempo' => $partida->getTempo(),
            ':pontuacao' => $partida->getPontuacao()
        ]);

        $partida->registrarIdGerado((int) $this->pdo->lastInsertId());
    }

    public function inserir(int $id_usuario, int $fase, int $tempo, int $pontuacao): void {
        $partida = partida::novo($id_usuario, $fase, $tempo, $pontuacao);
        $this->salvar($partida);
    }

    public function atualizar(int $id, int $id_usuario, int $fase, int $tempo, int $pontuacao): void {
        $partida = $this->buscarPorId($id);

        if ($partida === null) {
            throw new RuntimeException('Partida não encontrada.');
        }

        $partida->alterarDados($fase, $tempo, $pontuacao);
        $this->salvar($partida);
    }

    public function excluir(int $id): void {
        $stmt = $this->pdo->prepare('DELETE FROM partida WHERE id = :id');
        $stmt->execute([':id' => $id]);
    }
}
