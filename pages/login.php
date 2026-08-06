<?php

require_once __DIR__ . '\..\repository\UsuarioRepository.php';
require_once __DIR__ . '\..\repository\PartidaRepository.php';

session_start();

// Se já estiver logado, vai direto para a página principal
// if (!empty($_SESSION['id_usuario'])) {
//     header('Location: index.php');
//     exit;
// }

$erro = '';

$repo = new UsuarioRepository();
$repoPartida = new PartidaRepository();
$nomeResponsavel = '';
$nome = '';
$idade = 1;

$leaderboard = $repoPartida->leaderboard();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nomeResponsavel = $_POST['nomeResponsavel'];
    $nome = $_POST['nome'];
    $idade = $_POST['idade'];

    if($nomeResponsavel === '' || $nome === '' || ($idade < 7 && $idade > 99)) {
        $erro = 'Preencha todos os campos';
    } 
    else {
        $usuario = $repo->buscarPorNomes($nomeResponsavel, $nome);

        if ($usuario) {
            $_SESSION['id_usuario'] = $usuario->getId();
            $_SESSION['responsavel'] = $nomeResponsavel;
            $_SESSION['nome'] = $nome;
            $_SESSION['idade'] = $idade;
            
            if(empty($_SESSION['fase'])) {
                $_SESSION['fase'] = 'menu';
            }

            header('Location: index.php');
            exit;
        } else {
            try {
                $_SESSION['responsavel'] = $nomeResponsavel;
                $_SESSION['nome'] = $nome;
                $_SESSION['idade'] = $idade;

                $repo->criarUsuario($nomeResponsavel, $nome, $idade);
                $usuario = $repo->buscarPorNomes($nomeResponsavel, $nome);
                $_SESSION['id_usuario'] = $usuario->getId();

                if(empty($_SESSION['fase'])) {
                    $_SESSION['fase'] = 'menu';
                }

                header('Location: index.php');
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
    <title>Login — Castor's game</title>
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
        CASTOR'S GAME
    </h1>

    <p class="subtitulo">
        Uma aventura dentuça.
    </p>

    <?php if ($erro !== ''): ?>
        <div class="alert"><?= htmlspecialchars($erro) ?></div>
    <?php endif; ?>

    <form method="POST" action="login.php" class="login-form">
    <div class="campo">

        <span class="iconepixel"></span>

        <div>

            <label class="placa-label" for="nomeResponsavel">Primeiro Nome Responsável</label>

            <input
                type="text"
                id="nomeResponsavel"
                name="nomeResponsavel"
                placeholder="Ex: Fulano"
                value="<?= htmlspecialchars($nomeResponsavel) ?>"
                required
            >

        </div>

</div>

        <div class="campo">

        <span class="iconepixel"></span>

        <div>

            <label class="placa-label" for="nome">Primeiro Nome</label>


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

        <span class="iconepixel"></span>

        <div>

            <label class="placa-label" for="idade">Idade</label>

            <input
                type="number"
                id="idade"
                name="idade"
                placeholder="Ex: 12"
                value="<?= htmlspecialchars($idade) ?>"
                required
            >

        </div>

    </div>

        <button type="submit" class="botao">Entrar/Criar</button>
        </form>

    </div>

    <div class="scoreboard">

        <div class="prego prego1"></div>
        <div class="prego prego2"></div>
        <div class="prego prego3"></div>
        <div class="prego prego4"></div>

        <h2>Ranking Fase 1</h2>

        <?php if(!empty($leaderboard[0])): ?>
            <div class="linha primeiro">
                <span>1# <?= $leaderboard[0]['nome'] ?></span>
                <span><?= $leaderboard[0]['MAX(p.pontuacao)']?></span>
            </div>
            <?php if(!empty($leaderboard[1])): ?>
                <div class="linha">
                    <span>2# <?= $leaderboard[1]['nome'] ?></span>
                    <span><?= $leaderboard[1]['MAX(p.pontuacao)']?></span>
                </div>
                <?php if(!empty($leaderboard[2])): ?>
                    <div class="linha">
                        <span>3# <?= $leaderboard[2]['nome'] ?></span>
                        <span><?= $leaderboard[2]['MAX(p.pontuacao)']?></span>
                    </div>
                    <?php if(!empty($leaderboard[3])): ?>
                        <div class="linha">
                            <span>4# <?= $leaderboard[3]['nome'] ?></span>
                            <span><?= $leaderboard[3]['MAX(p.pontuacao)']?></span>
                        </div>
                        <?php if(!empty($leaderboard[4])): ?>
                            <div class="linha">
                                <span>5# <?= $leaderboard[4]['nome'] ?></span>
                                <span><?= $leaderboard[4]['MAX(p.pontuacao)']?></span>
                            </div>
                        <?php endif; ?>
                    <?php endif; ?>
                <?php endif; ?>
            <?php endif; ?>
        <?php endif; ?>
    </div>

</div>

</body>
</html>
