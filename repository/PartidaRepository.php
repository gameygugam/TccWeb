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

    public function leaderboard(int $qtd): array {
        $stmt = $this->pdo->prepare(
            'SELECT p.id_usuario, u.nome, u.sobrenome, MAX(p.pontuacao) as pontos
            FROM usuario u, partida p
            WHERE u.id = p.id_usuario
            GROUP BY p.id_usuario
            ORDER BY MAX(p.pontuacao) DESC LIMIT :qtd'
        );
        $stmt->execute([':qtd' => $qtd]);
        $leaderboard = [];
        foreach ($stmt->fetchAll() as $dados) {
            $leaderboard[] = $dados;
        }
        return $leaderboard;
    }

    public function leaderboardPorNome(string $nome): array {
        $stmt = $this->pdo->prepare(
            'SELECT p.id_usuario, u.nome, u.sobrenome, MAX(p.pontuacao) as pontos
            FROM usuario u, partida p
            WHERE u.id = p.id_usuario
            AND u.nome LIKE :nome
            GROUP BY p.id_usuario
            ORDER BY MAX(p.pontuacao) DESC LIMIT 100'
        );
        $stmt->execute([':nome' => "%$nome%"]);
        $lista = [];
        foreach ($stmt->fetchAll() as $dados) {
            $lista[] = $dados;
        }
        return $lista;
    }

    public function leaderboardPorTurma(string $turma): array {
        $stmt = $this->pdo->prepare(
            'SELECT p.id_usuario, u.nome, u.sobrenome, MAX(p.pontuacao) as pontos
            FROM usuario u, partida p
            WHERE u.id = p.id_usuario
            AND u.turma LIKE :turma
            GROUP BY p.id_usuario
            ORDER BY MAX(p.pontuacao) DESC LIMIT 100'
        );
        $stmt->execute([':turma' => "%$turma%"]);
        $lista = [];
        foreach ($stmt->fetchAll() as $dados) {
            $lista[] = $dados;
        }
        return $lista;
    }

    public function leaderboardPorColegio(string $colegio): array {
        $stmt = $this->pdo->prepare(
            'SELECT p.id_usuario, u.nome, u.sobrenome, MAX(p.pontuacao) as pontos
            FROM usuario u, partida p
            WHERE u.id = p.id_usuario
            AND u.colegio LIKE :colegio
            GROUP BY p.id_usuario
            ORDER BY MAX(p.pontuacao) DESC LIMIT 100'
        );
        $stmt->execute([':colegio' => "%$colegio%"]);
        $lista = [];
        foreach ($stmt->fetchAll() as $dados) {
            $lista[] = $dados;
        }
        return $lista;
    }

    public function melhorPartida(int $idUsuario): array {
        $stmt = $this->pdo->prepare(
            'SELECT p.id_usuario, u.nome, u.sobrenome, MAX(p.pontuacao) as pontos
            FROM usuario u, partida p
            WHERE u.id = p.id_usuario
			AND p.id_usuario = :idUsuario
            GROUP BY p.id_usuario
            ORDER BY MAX(p.pontuacao) DESC LIMIT 1'
        );
        $stmt->execute([':idUsuario' => $idUsuario]);
        $leaderboard = [];
        foreach ($stmt->fetchAll() as $dados) {
            $leaderboard[] = $dados;
        }
        return $leaderboard;
    }

    public function ultimaPartida(int $idUsuario): array {
        $stmt = $this->pdo->prepare(
            'SELECT p.id_usuario, u.nome, u.sobrenome, MAX(p.pontuacao) as pontos
            FROM usuario u, partida p
            WHERE u.id = p.id_usuario
			AND p.id_usuario = :idUsuario
            GROUP BY p.id_usuario
            ORDER BY MAX(p.id) DESC LIMIT 1'
        );
        $stmt->execute([':idUsuario' => $idUsuario]);
        $leaderboard = [];
        foreach ($stmt->fetchAll() as $dados) {
            $leaderboard[] = $dados;
        }
        return $leaderboard;
    }
}
