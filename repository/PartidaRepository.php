<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../entity/Partida.php';

// class PartidaRepository {

//     private PDO $pdo;

//     public function __construct() {
//         $this->pdo = getConexao();
//     }

//     /** @return Partida[] */ // Lista todos salvas no Banco daquele usuário
//     public function listarPorUsuario(int $id_usuario): array {
//         $stmt = $this->pdo->prepare(
//             'SELECT * FROM partida WHERE id_usuario = :id_u ORDER BY id ASC'
//         );
//         $stmt->execute([':id_u' => $id_usuario]);
//         $lista = [];
//         foreach ($stmt->fetchAll() as $dados) {
//             $lista[] = new Partida($dados);
//         }
//         return $lista;
//     }

//     public function buscarPorId(int $id): ?Partida {
//         $stmt = $this->pdo->prepare('SELECT * FROM partida WHERE id = :id LIMIT 1');
//         $stmt->execute([':id' => $id]);
//         $dados = $stmt->fetch();

//         if ($dados) {
//             return new Partida($dados);
//         }
//         return null;
//     }

//     public function salvar(Partida $partida): void {
//         if ($partida->getId() > 0) {
//             $stmt = $this->pdo->prepare(
//                 'UPDATE partida SET fase = :fase, tempo = :tempo, pontuacao = :pontuacao WHERE id = :id'
//             );
//             $stmt->execute([
//                 ':id' => $partida->getId(),
//                 ':fase' => $partida->getFase(),
//                 ':tempo' => $partida->getTempo(),
//                 ':pontuacao' => $partida->getPontuacao()
//             ]);
//             return;
//         }

//         if ($partida->getIdUsuario() <= 0) {
//             throw new InvalidArgumentException('Usuário inválido. (Erro Banco)');
//         }

//         $stmt = $this->pdo->prepare(
//             'INSERT INTO partida (fase, tempo, pontuacao) VALUES (:fase, :tempo, :pontuacao)'
//         );
//         $stmt->execute([
//             ':fase' => $partida->getFase(),
//             ':tempo' => $partida->getTempo(),
//             ':pontuacao' => $partida->getPontuacao()
//         ]);

//         $partida->registrarIdGerado((int) $this->pdo->lastInsertId());
//     }

//     public function inserir(string $image, int $width, int $height,
//     int $x, int $y, string $material): void {
//         $lixeira = lixeira::novo($image, $width, $height, $x, $y, $material);
//         $this->salvar($lixeira);
//     }

//     public function atualizar(int $id, string $image, int $width, int $height,
//     int $x, int $y, string $material): void {
//         $lixeira = $this->buscarPorId($id);

//         if ($lixeira === null) {
//             throw new RuntimeException('Lixeira não encontrado.');
//         }

//         $lixeira->alterarDados($image, $width, $height, $x, $y, $material);
//         $this->salvar($lixeira);
//     }

//     public function excluir(int $id): void {
//         $stmt = $this->pdo->prepare('DELETE FROM lixeira WHERE id = :id');
//         $stmt->execute([':id' => $id]);
//     }
// }
