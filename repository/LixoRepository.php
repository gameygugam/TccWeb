<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../entity/Lixo.php';

class LixoRepository {

    private PDO $pdo;

    public function __construct() {
        $this->pdo = getConexao();
    }

    // /** @return Lixo[] */ // Lista todos salvas no Banco daquele usuário
    public function listarPorLixeira(int $id_lixeira): array {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM lixo WHERE id_lixeira = :id_l ORDER BY id ASC'
        );
        $stmt->execute([':id_l' => $id_lixeira]);
        $lista = [];
        foreach ($stmt->fetchAll() as $dados) {
            $lista[] = new Lixo($dados);
        }
        return $lista;
    }

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

    public function buscarPorId(int $id): ?Lixo {
        $stmt = $this->pdo->prepare('SELECT * FROM lixo WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $id]);
        $dados = $stmt->fetch();

        if ($dados) {
            return new Lixo($dados);
        }
        return null;
    }

    public function salvar(Lixo $lixo): void {
        if ($lixo->getId() > 0) {
            $stmt = $this->pdo->prepare(
                'UPDATE lixo SET img = :img, w = :w, h = :h, x = :x, y = :y, material = :material, angulo = :angulo WHERE id = :id'
            );
            $stmt->execute([
                ':id' => $lixo->getId(),
                ':img' => $lixo->getImage(),
                ':w' => $lixo->getWidth(),
                ':h' => $lixo->getHeight(),
                ':x' => $lixo->getX(),
                ':y' => $lixo->getY(),
                ':material' => $lixo->getMaterial(),
                ':angulo' => $lixo->getAngulo(),
            ]);
            return;
        }

        if ($lixo->getIdLixeira() <= 0) {
            throw new InvalidArgumentException('Lixeira inválido. (Erro Banco)');
        }

        $stmt = $this->pdo->prepare(
            'INSERT INTO lixo (id_lixeira, img, w, h, x, y, material, angulo) VALUES (:id_l, :img, :w, :h, :x, :y, :material, :angulo)'
        );
        $stmt->execute([
            ':id_l' => $lixo->getIdLixeira(),
            ':img' => $lixo->getImage(),
            ':w' => $lixo->getWidth(),
            ':h' => $lixo->getHeight(),
            ':x' => $lixo->getX(),
            ':y' => $lixo->getY(),
            ':material' => $lixo->getMaterial(),
            ':angulo' => $lixo->getAngulo(),
        ]);

        $lixo->registrarIdGerado((int) $this->pdo->lastInsertId());
    }

    public function inserir(int $id_lixeira, string $image, int $width, int $height,
    int $x, int $y, string $material, int $angulo): void {
        $lixo = Lixo::novo($id_lixeira, $image, $width, $height, $x, $y, $material, $angulo);
        $this->salvar($lixo);
    }

    public function atualizar(int $id, string $image, int $width, int $height,
    int $x, int $y, string $material, int $angulo): void {
        $lixo = $this->buscarPorId($id);

        if ($lixo === null) {
            throw new RuntimeException('Lixo não encontrado.');
        }

        $lixo->alterarDados($image, $width, $height, $x, $y, $material, $angulo);
        $this->salvar($lixo);
    }

    public function excluir(int $id): void {
        $stmt = $this->pdo->prepare('DELETE FROM lixo WHERE id = :id');
        $stmt->execute([':id' => $id]);
    }
    public function excluirPorLixeira(int $id_lixeira): void {
        $stmt = $this->pdo->prepare('DELETE FROM lixo WHERE id_lixeira = :id_lixeira');
        $stmt->execute([':id_lixeira' => $id_lixeira]);
    }

    // public function recuperarTodos(int $id_personagem): void {
    //     $stmt = $this->pdo->prepare('UPDATE item SET deletado = 0 WHERE id_lixeira = :id_lixeira');
    //     $stmt->execute([':id_lixeira' => $id_personagem]);
    // }
}
