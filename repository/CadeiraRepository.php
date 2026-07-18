<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../entity/Cadeira.php';

class CadeiraRepository {

    private PDO $pdo;

    public function __construct() {
        $this->pdo = getConexao();
    }

    public function buscarPorId(int $id): ?Cadeira {
        $stmt = $this->pdo->prepare('SELECT * FROM cadeira WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $id]);
        $dados = $stmt->fetch();

        if ($dados) {
            return new Cadeira($dados);
        }
        return null;
    }

    public function salvar(Cadeira $cadeira): void {
        if ($cadeira->getId() > 0) {
            $stmt = $this->pdo->prepare(
                'UPDATE cadeira SET img = :img, w = :w, h = :h, x = :x, y = :y, direcao = :direcao WHERE id = :id'
            );
            $stmt->execute([
                ':id' => $cadeira->getId(),
                ':img' => $cadeira->getImage(),
                ':w' => $cadeira->getWidth(),
                ':h' => $cadeira->getHeight(),
                ':x' => $cadeira->getX(),
                ':y' => $cadeira->getY(),
                ':direcao' => $cadeira->getDirecao()
            ]);
            return;
        }

        $stmt = $this->pdo->prepare(
            'INSERT INTO lixeira (img, w, h, x, y, direcao) VALUES (:img, :w, :h, :x, :y, :direcao)'
        );
        $stmt->execute([
            ':img' => $cadeira->getImage(),
            ':w' => $cadeira->getWidth(),
            ':h' => $cadeira->getHeight(),
            ':x' => $cadeira->getX(),
            ':y' => $cadeira->getY(),
            ':direcao' => $cadeira->getDirecao(),
        ]);

        $cadeira->registrarIdGerado((int) $this->pdo->lastInsertId());
    }

    public function inserir(string $image, int $width, int $height,
    int $x, int $y, string $direcao): void {
        $cadeira = cadeira::novo($image, $width, $height, $x, $y, $direcao);
        $this->salvar($cadeira);
    }

    public function atualizar(int $id, string $image, int $width, int $height,
    int $x, int $y, string $direcao): void {
        $cadeira = $this->buscarPorId($id);

        if ($cadeira === null) {
            throw new RuntimeException('Cadeira não encontrado.');
        }

        $cadeira->alterarDados($image, $width, $height, $x, $y, $direcao);
        $this->salvar($cadeira);
    }

    public function excluir(int $id): void {
        $stmt = $this->pdo->prepare('DELETE FROM cadeira WHERE id = :id');
        $stmt->execute([':id' => $id]);
    }
    // public function excluirPorLixeira(int $id_lixeira): void {
    //     $stmt = $this->pdo->prepare('DELETE FROM lixo WHERE id_lixeira = :id_lixeira');
    //     $stmt->execute([':id_lixeira' => $id_lixeira]);
    // }

    // public function recuperarTodos(int $id_personagem): void {
    //     $stmt = $this->pdo->prepare('UPDATE item SET deletado = 0 WHERE id_lixeira = :id_lixeira');
    //     $stmt->execute([':id_lixeira' => $id_personagem]);
    // }
}
