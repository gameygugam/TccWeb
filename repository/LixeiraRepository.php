<?php

require_once __DIR__ . '/../config/conexao.php';
require_once __DIR__ . '/../entity/Lixeira.php';

class LixeiraRepository {

    private PDO $pdo;

    public function __construct() {
        $this->pdo = getConexao();
    }

    // /** @return Lixeira[] */ // Lista todos salvas no Banco daquele usuário
    // public function listarPorLixeira(int $id_lixeira): array {
    //     $stmt = $this->pdo->prepare(
    //         'SELECT * FROM lixo WHERE id_lixeira = :id_l ORDER BY id ASC'
    //     );
    //     $stmt->execute([':id_l' => $id_lixeira]);
    //     $lista = [];
    //     foreach ($stmt->fetchAll() as $dados) {
    //         $lista[] = new Lixo($dados);
    //     }
    //     return $lista;
    // }

    // public function listarFiltrando(int $usuarioId, string $nome_pesquisa): array {
    //     $pesquisa = '%' . $nome_pesquisa . '%';
    //     $stmt = $this->pdo->prepare(
    //         'SELECT * FROM habilidade WHERE id_usuario = :idu AND nome LIKE :pesquisa ORDER BY nome ASC'
    //     );
    //     $stmt->execute([':idu' => $usuarioId, ':pesquisa' => $pesquisa]);
    //     $lista = [];
    //     foreach ($stmt->fetchAll() as $dados) {
    //         $lista[] = new Habilidade($dados);
    //     }
    //     return $lista;
    // }

    public function buscarPorId(int $id): ?Lixeira {
        $stmt = $this->pdo->prepare('SELECT * FROM lixeira WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $id]);
        $dados = $stmt->fetch();

        if ($dados) {
            return new Lixeira($dados);
        }
        return null;
    }

    public function salvar(Lixeira $lixeira): void {
        if ($lixeira->getId() > 0) {
            $stmt = $this->pdo->prepare(
                'UPDATE lixeira SET img = :img, w = :w, h = :h, x = :x, y = :y, material = :material WHERE id = :id'
            );
            $stmt->execute([
                ':id' => $lixeira->getId(),
                ':img' => $lixeira->getImage(),
                ':w' => $lixeira->getWidth(),
                ':h' => $lixeira->getHeight(),
                ':x' => $lixeira->getX(),
                ':y' => $lixeira->getY(),
                ':material' => $lixeira->getMaterial()
            ]);
            return;
        }

        // if ($lixeira->getIdLixeira() <= 0) {
        //     throw new InvalidArgumentException('Lixeira inválido. (Erro Banco)');
        // }

        $stmt = $this->pdo->prepare(
            'INSERT INTO lixeira (img, w, h, x, y, material) VALUES (:img, :w, :h, :x, :y, :material)'
        );
        $stmt->execute([
            ':id_l' => $lixeira->getIdLixeira(),
            ':img' => $lixeira->getImage(),
            ':w' => $lixeira->getWidth(),
            ':h' => $lixeira->getHeight(),
            ':x' => $lixeira->getX(),
            ':y' => $lixeira->getY(),
            ':material' => $lixeira->getMaterial(),
        ]);

        $lixeira->registrarIdGerado((int) $this->pdo->lastInsertId());
    }

    public function inserir(string $image, int $width, int $height,
    int $x, int $y, string $material): void {
        $lixeira = lixeira::novo($image, $width, $height, $x, $y, $material);
        $this->salvar($lixeira);
    }

    public function atualizar(int $id, string $image, int $width, int $height,
    int $x, int $y, string $material): void {
        $lixeira = $this->buscarPorId($id);

        if ($lixeira === null) {
            throw new RuntimeException('Lixeira não encontrado.');
        }

        $lixeira->alterarDados($image, $width, $height, $x, $y, $material);
        $this->salvar($lixeira);
    }

    public function excluir(int $id): void {
        $stmt = $this->pdo->prepare('DELETE FROM lixeira WHERE id = :id');
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
