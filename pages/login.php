<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    
    <title>TCCWEB</title>
</head>
<body>
    <div class="caixa_login">
        <h1>MENU</h1>
        <form action="cadastro.php" method="post">
            <input type="text" name="nome" placeholder="Nome" id="textoname" required> <br><br>
            <input type="email" name="email" placeholder="Email" id="textoemail" required> <br><br>
            <input type="password" name="senha" placeholder="Senha" id="textosenha" required> <br><br>

            <button type="submit" class="bcriar">
                Criar conta
            </button> <br><br>

            <button type="submit" class="bentrar">
                Entrar na conta
            </button> <br><br>
        </form>
    </div>
        <audio id="music" loop>
            <source src="../Audios/MenuSound.mp3" type="audio/mpeg">
        </audio>
</body>
</html>
<?php

require_once __DIR__ . "/../includes/consulta.php";

if(isset($_POST["bentrar"])) {
    $query = new Consulta();
    $login = $query->Login($_POST["email"], $_POST["senha"]);
}

if (isset($_GET['erro'])) {
   echo "<p style='color:red'>Login inválido</p>";
}
?>