<?php

require_once __DIR__ . '/../repository/UsuarioRepository.php';
require_once __DIR__ . '/../repository/PartidaRepository.php';

session_start();

$erro = '';

$repo = new UsuarioRepository();
$repoPartida = new PartidaRepository();

$leaderboard = $repoPartida->leaderboard(20);

$ultimaPartida = [];

if (isset($_SESSION['id_usuario'])) {
    $ultimaPartida = $repoPartida->ultimaPartida($_SESSION['id_usuario']);
}

$melhorPartida = [];

if (isset($_SESSION['id_usuario'])) {
    $melhorPartida = $repoPartida->melhorPartida($_SESSION['id_usuario']);
}

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

    <title>Castor's Game — Ranking</title>

    <link rel="stylesheet" href="../assets/StyleRanking.css"/>

</head>

<body class="ranking-body">


<!-- ==========================
     FOLHAS
========================== -->

<div class="folha f1">🍃</div>
<div class="folha f2">🍃</div>
<div class="folha f3">🍃</div>
<div class="folha f4">🍃</div>
<div class="folha f5">🍃</div>
<div class="folha f6">🍃</div>
<div class="folha f7">🍃</div>
<div class="folha f8">🍃</div>


<!-- ==========================
     RANKING
========================== -->

<div class="scoreboard">


    <!-- PREGOS SUPERIORES -->

    <div class="prego prego1"></div>
    <div class="prego prego2"></div>


    <!-- PESQUISA -->

    <form method="POST" action="ranking.php" class="ranking-form">

        <div class="pesquisa">

            <input
                type="text"
                name="pesquisa"
                placeholder="Pesquisar..."
            >

            <button type="submit">
                🔍
            </button>

        </div>

    </form>


    <!-- TÍTULO -->

    <h2>Ranking</h2>


    <!-- LISTA DE JOGADORES -->

    <?php if (!empty($leaderboard)): ?>

        <?php foreach ($leaderboard as $posicao => $jogador): ?>

            <div class="linha <?= $posicao === 0 ? 'primeiro' : '' ?>">

                <span>

                    <?= ($posicao + 1) ?>#

                    <?= htmlspecialchars($jogador['nome']) ?>

                    /

                    <?= htmlspecialchars($jogador['responsavel']) ?>

                </span>

                <span>

                    <?= $jogador['pontos'] ?>

                </span>

            </div>

        <?php endforeach; ?>

    <?php else: ?>

        <div class="sem-resultados">
            Nenhum jogador encontrado.
        </div>

    <?php endif; ?>


    <!-- PREGOS INFERIORES -->

    <div class="pregos-inferiores">

        <div class="prego prego3"></div>
        <div class="prego prego4"></div>

    </div>


    <!-- BOTÃO VOLTAR -->

    <a href="../index.php" class="botao-voltar">
        VOLTAR
    </a>


</div>


</body>
</html>