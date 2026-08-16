<?php

require_once __DIR__ . '/../repository/UsuarioRepository.php';
require_once __DIR__ . '/../repository/PartidaRepository.php';

session_start();

$erro = '';
$repo = null;
$repo = new UsuarioRepository();
$repoPartida = null;
$repoPartida = new PartidaRepository();

$leaderboard = [];
$leaderboard = $repoPartida->leaderboard(20);

$ultimaPartida = [];
if (isset($_SESSION['id_usuario'])) $ultimaPartida = $repoPartida->ultimaPartida($_SESSION['id_usuario']);

$melhorPartida = [];
if (isset($_SESSION['id_usuario'])) $melhorPartida = $repoPartida->melhorPartida($_SESSION['id_usuario']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pesquisa = $_POST['pesquisa'] ?? '';
    $leaderboard = $repoPartida->leaderboardPorNome($pesquisa);
}

?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Castor's game</title>
    <link rel="stylesheet" href="../assets/style.css"/>
</head>
<body class="login-body">

<div class="folha f1">🍃</div>
<div class="folha f2">🍃</div>
<div class="folha f3">🍃</div>
<div class="folha f4">🍃</div>
<div class="folha f5">🍃</div>
<div class="folha f6">🍃</div>
<div class="folha f7">🍃</div>
<div class="folha f8">🍃</div>

<div class="scoreboard">

    <div class="prego prego1"></div>
    <div class="prego prego2"></div>
    <div class="prego prego3"></div>
    <div class="prego prego4"></div>

    <form method="POST" action="ranking.php" class="login-form">
        <div class="pesquisa">
            <input 
                type="text" 
                name="pesquisa" 
                placeholder="Pesquisar..." 
            >
            <button type="submit" title="Pesquisar">🔍</button>
        </div>
    </form>

    <h2>Ranking</h2>

    <?php if (!empty($leaderboard)): ?>

        <?php foreach ($leaderboard as $posicao => $jogador): ?>

            <div class="linha <?= $posicao === 0 ? 'primeiro' : '' ?>">
                <span>
                    <?= ($posicao + 1) ?>#
                    <?= htmlspecialchars($jogador['nome']) ?>/
                    <?= htmlspecialchars($jogador['responsavel']) ?>
                </span>

                <span>
                    <?= $jogador['pontos'] ?>
                </span>
            </div>

        <?php endforeach; ?>

    <?php endif; ?>

</div>