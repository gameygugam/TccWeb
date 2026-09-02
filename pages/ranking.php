<?php

require_once __DIR__ . '/../repository/UsuarioRepository.php';
require_once __DIR__ . '/../repository/PartidaRepository.php';
require_once __DIR__ . '/../includes/carregar_idioma.php';

session_start();

if(isset($_SESSION['idioma']))
    $traducao = carregarIdioma("{$_SESSION['idioma']}");
else
    $traducao = carregarIdioma("pt-BR");

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

    $acao = $_POST['acao'] ?? '';

    $filtro_nome = $_POST['pesquisa-nome'] ?? '';
    $filtro_colegio = $_POST['colegio'] ?? '';
    $filtro_turma = $_POST['pesquisa-turma'] ?? '';

    if($filtro_colegio === 'nenhum') {
        $filtro_colegio = '';
        $filtro_turma = '';
    }

    if ($acao === "excluir"){

        $filtro_nome = '';
        $filtro_colegio = '';
        $filtro_turma = '';

    }

    $leaderboard = $repoPartida->leaderboardFiltrando($filtro_nome, $filtro_colegio, $filtro_turma);
}

?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>

    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <title>Ranking — Bio Select</title>

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

        <div class="pesquisa pesquisa-nome">

            <input
                type="text"
                name="pesquisa-nome"
                placeholder="<?php echo t("ranking.placeholder_nome"); ?>"
            >

            <button type="submit" class="lupa" name="acao" value="pesquisar">
                🔍
            </button>

            <button type="submit" class="excluir" name="acao" value="excluir">
                ❌
            </button>

        </div>

        <div class="colegios">

            <label class="colegio">
                <input type="radio" name="colegio" value="cpii">
                <img src="../assets/imagens/login/cp2Logo.png" alt="CPII">
            </label>

            <label class="colegio">
                <input type="radio" name="colegio" value="cjba">
                <img src="../assets/imagens/login/CjbaLogo.png" alt="CJBA">
            </label>

            <label class="colegio">
                <input type="radio" name="colegio" value="santosDumont">
                <img src="../assets/imagens/login/CesdLogo.png" alt="Santos Dumont">
            </label>

            <label class="colegio">
                <input type="radio" name="colegio" value="nenhum">
                <img src="../assets/imagens/login/excluir.png" alt="Nenhum">
            </label>

        </div>

        <div class="pesquisa pesquisa-turma">

            <input
                type="text"
                name="pesquisa-turma"
                placeholder="<?php echo t("ranking.placeholder_turma"); ?>"
            >
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

                    <?= htmlspecialchars($jogador['nome']) ?> <?= htmlspecialchars($jogador['sobrenome']) ?>

                </span>

                <span>

                    <?= $jogador['pontos'] ?>

                </span>

            </div>

        <?php endforeach; ?>

    <?php else: ?>

        <div class="sem-resultados">
            <?php echo t("ranking.nenhum_encontrado"); ?>
        </div>

    <?php endif; ?>


    <!-- PREGOS INFERIORES -->

    <div class="pregos-inferiores">

        <div class="prego prego3"></div>
        <div class="prego prego4"></div>

    </div>


    <!-- BOTÃO VOLTAR -->

    <a href="../jogo.php" class="botao-voltar">
        <?php echo t("ranking.voltar"); ?>
    </a>


</div>

<div class="idiomas">
    <a href="?idioma=pt-BR"><img src="../assets/imagens/bandeiras/brasil.png" alt="BR" id="bandeira-brasil"></a>
    <a href="?idioma=en-US"><img src="../assets/imagens/bandeiras/eua.png" alt="US" id="bandeira-eua"></a>
    <a href="?idioma=es"><img src="../assets/imagens/bandeiras/espanha.png" alt="ES" id="bandeira-espanha"></a>
    <a href="?idioma=cn"><img src="../assets/imagens/bandeiras/china.png" alt="CN" id="bandeira-china"></a>
</div>


</body>
</html>