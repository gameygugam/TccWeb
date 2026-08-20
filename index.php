<?php

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
    <title>Login — BioSelect</title>
    <link rel="stylesheet" href="assets/StyleIndex.css"/>
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

<form action="index.php" method="POST">
    <div class="tela-container">
        <div class="index-card">
    
            <div class="prego prego1"></div>
            <div class="prego prego2"></div>
            <div class="prego prego3"></div>
            <div class="prego prego4"></div>

            <div class="conteudo">
                <p class="texto">
                    O BIOSELECT nasceu da inquietação da professora Giselle Furtado, 
                    da rede pública de ensino de Volta Redonda, 
                    ao perceber a necessidade de engajar os alunos no cuidado coletivo e na corresponsabilidade com o ambiente escolar. 
                    Ao introduzir discussões sobre limpeza, coleta seletiva, resíduos e rejeitos, 
                    a educadora compreendeu a urgência do tema e buscou formas de torná-lo mais próximo, 
                    interessante e significativo para os estudantes.
                     <br> <br> 
                    Para transformar essa ideia em realidade, 
                    ela entrou em contato com o professor Flavio Costa, 
                    coordenador do Curso Técnico em Desenvolvimento de Sistemas do Colégio Pedro II, 
                    no Rio de Janeiro. Dessa parceria, 
                    surgiram reflexões sobre como a computação e a tecnologia poderiam estimular uma participação mais ativa dos jovens.
                      <br> <br>  
                    O desafio foi apresentado aos alunos do curso técnico, que propuseram uma solução alinhada ao que mais gostam de criar: um jogo digital.
                       <br> <br> 
                    Assim ganhou vida o BioSelect: um jogo desafiador, 
                    divertido e educativo, projetado para transformar o aprendizado sobre sustentabilidade em uma experiência interativa e envolvente.
                        <br> <br> 
                    Mais do que um software, o BioSelect reflete a união entre educação, 
                    tecnologia e criatividade, demonstrando como a colaboração entre diferentes professores, 
                    escolas e estudantes pode transformar um desafio real em uma solução construída pelos próprios alunos.
                </p>
            </div>
            <button type="submit" name="comecar" class="botao">Começar</button>
        </div>
    </div>
</form>

<div class="logos">

    <div class="logo">
        <img src="imagens/login/cp2Logo.png" alt="Logo 1">
    </div>

    <div class="logo">
        <img src="imagens/login/CesdLogo.jpeg" alt="Logo 2">
    </div>

    <div class="logo">
        <img src="imagens/login/CjbaLogo.jpeg" alt="Logo 3">
    </div>

</div>

</body>
</html>