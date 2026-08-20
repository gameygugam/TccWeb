<?php

require_once __DIR__ . '/../repository/UsuarioRepository.php';
require_once __DIR__ . '/../repository/PartidaRepository.php';

session_start();

$erro = '';
$repo = null;
$repo = new UsuarioRepository();
$repoPartida = null;
$repoPartida = new PartidaRepository();
$sobrenome = '';
$nome = '';
$colegio = '';
$turma = '';
$idade = 1;

$leaderboard = [];
$leaderboard = $repoPartida->leaderboard(5);

$ultimaPartida = [];
if (isset($_SESSION['id_usuario'])) $ultimaPartida = $repoPartida->ultimaPartida($_SESSION['id_usuario']);

$melhorPartida = [];
if (isset($_SESSION['id_usuario'])) $melhorPartida = $repoPartida->melhorPartida($_SESSION['id_usuario']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sobrenome = $_POST['sobrenome'];
    $nome  = $_POST['nome'];
    $idade = $_POST['idade'];
    $colegio = $_POST['colegio'];
    $turma = $_POST["turma"] ?? '';
    

    if($sobrenome === '' || $nome === '' || $colegio === '' || $turma === '') {
        $erro = 'Preencha todos os campos';
    }
    if($idade < 7 || $idade > 99) {
        $erro = 'Idade inválida';
    }
    else {
        $usuario = $repo->buscarPorNomes($sobrenome, $nome);

        if ($usuario) {
            $_SESSION['id_usuario']  = $usuario->getId();
            $_SESSION['sobrenome'] = $sobrenome;
            $_SESSION['nome']        = $nome;
            $_SESSION['idade']       = $idade;
            $_SESSION['colegio']     = $colegio;
            $_SESSION['turma']       = $turma;
            
            if(empty($_SESSION['fase'])) {
                $_SESSION['fase'] = 'menu';
            }

            if(empty($_SESSION['turma'])) {
                $_SESSION['turma'] = 'nenhuma';
            }

            header('Location: ../jogo.php');
            exit;
        } else {
            try {
                $_SESSION['sobrenome'] = $sobrenome;
                $_SESSION['nome']        = $nome;
                $_SESSION['idade']       = $idade;
                $_SESSION['colegio']     = $colegio;
                $_SESSION['turma']       = $turma;

                $repo->criarUsuario($sobrenome, $nome, $idade, $colegio, $turma);
                $usuario = $repo->buscarPorNomes($sobrenome, $nome);
                $_SESSION['id_usuario'] = $usuario->getId();

                if(empty($_SESSION['fase'])) {
                    $_SESSION['fase'] = 'menu';
                }

                header('Location: ../jogo.php');
                exit;
            } catch (Exception $e) {
                $erro = 'Ocorreu um erro ao criar a conta';
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Login — Bio Select</title>
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





<div class="tela-container">
    <div class="login-card">
    
        <div class="prego prego1"></div>
        <div class="prego prego2"></div>
        <div class="prego prego3"></div>
        <div class="prego prego4"></div>

    <h1 class="titulo">
        Bio Select
    </h1>

    <p class="subtitulo">
        Uma aventura dentuça.
    </p>

    <?php if ($erro !== ''): ?>
        <div class="alert"><?= htmlspecialchars($erro) ?></div>
    <?php endif; ?>

    <form method="POST" action="login.php" class="login-form">

    <div class="campo">

        <span class="iconepixel"><img src="../assets/imagens/login/userIcon2.png" class="icone-img"></span>
        <div>
            <label class="placa-label" for="nome">Nome</label>
            <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Ex: Ciclano"
                value="<?= htmlspecialchars($nome) ?>"
                required
            >
        </div>
    </div>

    <div class="campo">

        <span class="iconepixel"><img src="../assets/imagens/login/responsavelIcon.png" class="icone-img"></span>
        <div>
            <label class="placa-label" for="sobrenome">Sobrenome</label>
            <input
                type="text"
                id="sobrenome"
                name="sobrenome"
                placeholder="Ex: Fulano"
                value="<?= htmlspecialchars($sobrenome) ?>"
                required
            >
        </div>
    </div>

    <div class="campo">

        <span class="iconepixel"><img src="../assets/imagens/login/idadeIcon.png" class="idade-img"></span>
        <div>
            <label class="placa-label" for="idade">Idade</label>
            <input
                type="number"
                id="idade"
                name="idade"
                placeholder="Ex: 12"
                value=""
                required
            >
        </div>
    </div>

    <div class="campo">

        <span class="iconepixel"> <img src="../assets/imagens/login/escolaIcon.png" class="icone-escola"> </span>
        <div>
            <label class="placa-label" for="colegio">Colégio</label>
            <select id="colegio" name="colegio" required>
                <option value="">Selecione seu colégio</option>
                <option value="cpii">CPII</option>
                <option value="cjba">CJBA</option>
                <option value="santosDumont">Santos Dumont</option>
                <option value="outros">Outros</option>
            </select>
        </div>
    </div>

    <div class="campo">

        <span class="iconepixel"><img src="../assets/imagens/login/turmaIcon.png" class="icone-img"></span>
        <div>
            <label class="placa-label" for="turma">Turma</label>
            <input
                type="text"
                id="turma"
                name="turma"
                placeholder="Ex: DS313"
                value="<?= htmlspecialchars($turma) ?>"
                required
            >
        </div>
    </div>

        <button type="submit" class="botao">Iniciar</button>
        </form>

    </div>

    <div class="scoreboard">

        <div class="prego prego1"></div>
        <div class="prego prego2"></div>
        <div class="prego prego3"></div>
        <div class="prego prego4"></div>

        <h2>Top 5</h2>

        <?php if(!empty($leaderboard[0])): ?>
            <div class="linha primeiro">
                <span>1# <?= $leaderboard[0]['nome'] ?> <?= $leaderboard[0]['sobrenome'] ?></span>
                <span><?= $leaderboard[0]['pontos']?></span>
            </div>
            <?php if(!empty($leaderboard[1])): ?>
                <div class="linha">
                    <span>2# <?= $leaderboard[1]['nome'] ?> <?= $leaderboard[1]['sobrenome'] ?></span>
                    <span><?= $leaderboard[1]['pontos']?></span>
                </div>
                <?php if(!empty($leaderboard[2])): ?>
                    <div class="linha">
                           <span>3# <?= $leaderboard[2]['nome'] ?> <?= $leaderboard[2]['sobrenome'] ?></span>
                        <span><?= $leaderboard[2]['pontos']?></span>
                    </div>
                    <?php if(!empty($leaderboard[3])): ?>
                        <div class="linha">
                            <span>4# <?= $leaderboard[3]['nome'] ?> <?= $leaderboard[3]['sobrenome'] ?></span>
                            <span><?= $leaderboard[3]['pontos']?></span>
                        </div>
                        <?php if(!empty($leaderboard[4])): ?>
                            <div class="linha">
                                <span>5# <?= $leaderboard[4]['nome'] ?> <?= $leaderboard[4]['sobrenome'] ?></span>
                                <span><?= $leaderboard[4]['pontos']?></span>
                            </div>
                        <?php endif; ?>
                    <?php endif; ?>
                <?php endif; ?>
            <?php endif; ?>
        <?php endif; ?>

        <a href="ranking.php" class="botao botao-ver-ranking">Ver Ranking</a>
        <br>

        <?php if(isset($_SESSION['id_usuario']) && !empty($ultimaPartida[0])): ?>

            <div class="linha">
                <span>última <?= $ultimaPartida[0]['nome'] ?> <?= $ultimaPartida[0]['sobrenome'] ?></span>
                <span><?= $ultimaPartida[0]['pontos']?></span>
            </div>
            <div class="linha">
                <span>melhor <?= $melhorPartida[0]['nome'] ?> <?= $melhorPartida[0]['sobrenome'] ?></span>
                <span><?= $melhorPartida[0]['pontos']?></span>
        <?php endif; ?>

        </div>
    </div>

</div>

</body>
</html>
