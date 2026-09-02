<?php

require_once __DIR__ . '/includes/carregar_idioma.php';
session_start();


if(isset($_SESSION['idioma'])) {
    $traducao = carregarIdioma("{$_SESSION['idioma']}");
}
else {
    $traducao = carregarIdioma("pt-BR");
}

if($_SERVER['REQUEST_METHOD'] === 'GET')
{
    if(isset($_GET['idioma']))
    {
        $traducao = carregarIdioma("{$_GET['idioma']}");
        $_SESSION['idioma'] = $_GET['idioma'];
        header('Location: index.php');
        exit;
    }
}

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    if(isset($_POST['comecar']))
    {
        header('Location: pages/login.php');
        exit;
    }
}

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Sobre — BioSelect</title>
    <link rel="stylesheet" href="assets/styleIndex.css"/>
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

<main class="tela-container">

<form action="index.php" method="POST">
    <div class="tela-container">
        <div class="index-card">
    
            <div class="prego prego1"></div>
            <div class="prego prego2"></div>
            <div class="prego prego3"></div>
            <div class="prego prego4"></div>

            <div class="conteudo">
                <p class="texto">
                    <?php echo t("sobre.texto"); ?>
                </p>
            </div>
            <button type="submit" name="comecar" class="botao"><?php echo t("sobre.comecar"); ?></button>
        </div>
    </div>
</form>

<div class="logos">

    <div class="logo">
        <img src="assets/imagens/login/cp2Logo.png" alt="Logo 1">
    </div>

    <div class="logo">
        <img src="assets/imagens/login/CesdLogo.png" alt="Logo 2">
    </div>

    <div class="logo">
        <img src="assets/imagens/login/CjbaLogo.png" alt="Logo 3">
    </div>

</div>

<div class="idiomas">
    <a href="?idioma=pt-BR"><img src="assets/imagens/bandeiras/brasil.png" alt="BR" id="bandeira-brasil"></a>
    <a href="?idioma=en-US"><img src="assets/imagens/bandeiras/eua.png" alt="US" id="bandeira-eua"></a>
    <a href="?idioma=es"><img src="assets/imagens/bandeiras/espanha.png" alt="ES" id="bandeira-espanha"></a>
    <a href="?idioma=cn"><img src="assets/imagens/bandeiras/china.png" alt="CN" id="bandeira-china"></a>
</div>

</main>

</body>
</html>