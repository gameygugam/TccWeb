<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../entity/Sala.php';

class SalaRepository {

    private PDO $pdo;

    public function __construct() {
        $this->pdo = getConexao();
    }

    public function buscarPorId(int $id): ?Sala {
        $stmt = $this->pdo->prepare('SELECT * FROM sala WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $id]);
        $dados = $stmt->fetch();

        if ($dados) {
            return new Sala($dados);
        }
        return null;
    }

    public function salvar(Sala $sala): void {
        if ($sala->getId() > 0) {
            $stmt = $this->pdo->prepare(
                'UPDATE sala SET organizacao_cadeiras = :organizacao_cadeiras, posicao_quadro = :posicao_quadro, img = :img WHERE id = :id'
            );
            $stmt->execute([
                ':id' => $sala->getId(),
                ':organizacao_cadeiras' => $sala->getOrganizacaoCadeiras(),
                ':posicao_quadro' => $sala->getPosicaoQuadro(),
                ':img' => $sala->getImage()
                
            ]);
            return;
        }

        $stmt = $this->pdo->prepare(
            'INSERT INTO sala (organizacao_cadeiras, posicao_quadro, img) VALUES (:organizacao_cadeiras, :posicao_quadro, :img)'
        );
        $stmt->execute([
            ':organizacao_cadeiras' => $sala->getOrganizacaoCadeiras(),
            ':posicao_quadro' => $sala->getPosicaoQuadro(),
            ':img' => $sala->getImage()
        ]);

        $sala->registrarIdGerado((int) $this->pdo->lastInsertId());
    }

    public function inserir(string $org_cadeiras, string $pos_quadro, string $image): void {
        $sala = sala::novo($org_cadeiras, $pos_quadro, $image);
        $this->salvar($sala);
    }

    public function atualizar(int $id, string $org_cadeiras, string $pos_quadro, string $image): void {
        $sala = $this->buscarPorId($id);

        if ($sala === null) {
            throw new RuntimeException('Sala não encontrado.');
        }

        $sala->alterarDados($org_cadeiras, $pos_quadro, $image);
        $this->salvar($sala);
    }

    public function excluir(int $id): void {
        $stmt = $this->pdo->prepare('DELETE FROM sala WHERE id = :id');
        $stmt->execute([':id' => $id]);
    }
}
