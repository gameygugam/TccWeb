<?php

require_once __DIR__ . '\..\repository\UsuarioRepository.php';

session_start();

// Se já estiver logado, vai direto para a página principal
if (!empty($_SESSION['id_usuario'])) {
    header('Location: index.php');
    exit;
}

$erro = '';

$repo = new UsuarioRepository();
$nomeResponsavel = '';
$nome = '';
$idade = 0;

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
            $_SESSION['id'] = $usuario->getId();
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

                $_SESSION['fase'] = 'menu';

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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login — Castor's game</title>
    <link rel="stylesheet" href="../assets/style.css" />
</head>
<body class="login-body">

<div class="login-card">
    <div class="login-logo">Castor's game</div>
        <h1 class="login-title">Entrar no sistema</h1>

<?php if ($erro !== ''): ?>
    <div class="alert alert-erro"><?= htmlspecialchars($erro) ?></div>
<?php endif; ?>

<form method="POST" action="login.php">
    <div class="form-group">
        <label for="nomeResponsavel">Primeiro Nome Responsável</label><br>
        <input
        type="name"
        id="nomeResponsavel"
        name="nomeResponsavel"
        placeholder="Ex: Fulano"
        value="<?= htmlspecialchars($nomeResponsavel) ?>"
        required
        />
    </div><br>

    <div class="form-group">
        <label for="nome">Primeiro Nome</label><br>
        <input
        type="name"
        id="nome"
        name="nome"
        placeholder="Ex: Cicrano"
        value="<?= htmlspecialchars($nome) ?>"
        required
        />
    </div><br>

    <div class="form-group">
        <label for="idade">Idade</label><br>
        <input
        type="number"
        id="idade"
        name="idade"
        placeholder="Ex: 12"
        required
        />
    </div><br>

    <button type="submit" class="btn btn-primary btn-full">Entrar/Criar</button>
    </form>

</div>

</body>
</html>
