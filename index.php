<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link rel="stylesheet" href="css/style.css">
    <script src="js/script.js"></script>
    <title>Document</title>
</head>
<body>
    <div class="caixa_login">
        <h1>MENU</h1>
    <form>
        <input type="text" name="nome" placeholder="Nome" id="name">  <br><br>
        <input type="email" name="email" placeholder="Email" id="eemail"> <br><br>

        <button type="submit" class="bentrar" onclick="window.open('https://accounts.google.com/signup', '_blank')">
        Entrar com o google
       </button> <br> <br>

        <button type="button" class="bcriar">
        Criar conta
       </button> <br> <br>
    </form>
    </div>

     
</body>
</html>
 <?php
    if (isset($_GET['erro'])) {
        echo "<p style='color:red'>Login inválido</p>";
    }
    ?>