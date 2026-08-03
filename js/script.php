<?php

require_once __DIR__ . '\..\includes\auth.php';

?>

<script>

function preload() {
    // Carrega a imagem do player
    jogo.playerImg = loadImage("../assets/imagens/castorDireita.png");
    jogo.playerImgEsquerda = loadImage("../assets/imagens/castorEsquerda.png");
    jogo.playerImgDireita = loadImage("../assets/imagens/castorDireita.png");
    tutorial.caixaDialogo = loadImage("../assets/imagens/tutorial/caixaTutorial.png");
    texto.fonte = loadFont("../assets/fonts/pixel_operator/PixelOperatorMono-Bold.ttf");

    PreloadMenu(); // Pré carrega as ../imagens do Menu
    PreloadPreFase1();
    PreloadFase1(); // Pré carrega as ../imagens do Minigame 1
    PreloadFase2(); // Pré carrega as ../imagens do Minigame 1
    PreloadPause(); // Pré carrega as ../imagens do menu de Pause
}

function setup() {
    MudarFase("menu");

    jogo.canvas = createCanvas(windowWidth, windowHeight);
    noSmooth();
    jogo.canvas_x = ((windowWidth - width) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (X)
    jogo.canvas_y = ((windowHeight - height) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (Y)
    jogo.canvas.position(jogo.canvas_x, jogo.canvas_y);

    jogo.escala = min(width / 1920, height / 1080); //1920 -> Width Padrão, 1080 -> Height Padrão

    fase1.is_fase_carregada = false;
    fase2.is_fase_carregada = false;

    // jogo.xInicialMapa = windowWidth / 2 - 785; // ERRADO!!!
    jogo.xInicialMapa = windowWidth / 2 - windowWidth / 2.45;
    // jogo.xFinalMapa = windowWidth - 188; // ERRADO!!!
    jogo.xFinalMapa = windowWidth - windowWidth * 0.093;

    // jogo.yInicialMapa = windowHeight / 2 - 430; // ERRADO!!!
    jogo.yInicialMapa = windowHeight / 2 - windowHeight / 2.3;
    // jogo.yFinalMapa = windowHeight - 77; // ERRADO!!!
    jogo.yFinalMapa = windowHeight - windowHeight * 0.07;

    jogo.player = { 
        x: jogo.xFinalMapa / 2, y: jogo.yFinalMapa / 2, width: 100, height: 100,
        oldX: jogo.xFinalMapa / 2, oldY: jogo.yFinalMapa / 2, class: "player", dash_cooldown: 80, dash_duracao: 0 
    };

    jogo.walls = [
        wall1 = { x: 0, y: jogo.yInicialMapa, width: windowWidth, height: 10, class: "wall" }, // Parede superior
        wall2 = { x: jogo.xInicialMapa, y: 0, width: 10, height: windowHeight, class: "wall" }, // Parede esquerda
        wall3 = { x: jogo.xFinalMapa, y: 0, width: 10, height: windowHeight, class: "wall" }, //Parede direita
        wall4 = { x: 0, y: jogo.yFinalMapa, width: windowWidth , height: 10, class: "wall" } //Parede baixo
    ];

    jogo.timerGlobal = 0;
    tutorial.ativo = false;
    jogo.contagemIniciar = 4;

    texto.caixaX = 0;
    texto.caixaY = (windowHeight/2 + 75);
    texto.caixaWidth = (windowWidth/2 + 375);
    texto.caixaHeight = (windowHeight/2 - 150);

    SetupMenu();
    SetupPreFase1();
    SetupFase1();
    SetupFase2();
    SetupPause();
}

function draw() {
    if (jogo.timerGlobal === 256) jogo.timerGlobal = 0
    jogo.escala = min(width / 1920, height / 1080); //1920 -> Width Padrão, 1080 -> Height Padrão

    if(jogo.fase === "menu")
        DrawMenu(); // Desenha o Menu
    else if(jogo.fase === "preFase1")
        DrawPreFase1(); // Desenha o PreMinigame 1
    else if(jogo.fase === "fase1")
        DrawFase1(); // Desenha o Minigame 1
    else if(jogo.fase === "fase2")
        DrawFase2(); // Desenha o Minigame 2

    if(pause.menuPause) DrawPause(); // Desenha o menu de Pause

    AnimacaoStandBy()
    Dash();
    fill(0, 0, 0)
    textSize(50)
    text(jogo.pontos, windowWidth - 100, 100);

    if (jogo.fase !== "menu" && jogo.sairDoJogo) 
    {
        MudarFase("menu");
        jogo.sairDoJogo = false
    }

    text(jogo.timerGlobal, 50, windowHeight - 100);
    jogo.timerGlobal++
}

function mousePressed() {

    let mouse = {x: mouseX, y: mouseY}

    if(MouseNoBotao(mouse, pause.botaoContinuar)) {
        MenuPause()
    }

    else if(MouseNoBotao(mouse, pause.botaoReiniciar)) {
        MudarFase("fase1")
        MenuPause()
    }

    else if(MouseNoBotao(mouse, pause.botaoOpcoes)) {
        pause.menuPause = false;
        jogo.pause = false;
    }

    else if(MouseNoBotao(mouse, pause.botaoSair)) {
        jogo.sairDoJogo = true;
        MenuPause()
    }
}

//MENU ----------------------------------------------------------------------------------------------------------->
function PreloadMenu()
{
    jogo.mapasImg[0] = mapa1 = loadImage("../assets/imagens/mapas/mapaPrototipo.png");
}

function SetupMenu()
{
    // botoes = [];
    // botoes.push(botaoMenuIniciar = { x: (windowWidth / 2) - 200, y: 500, w: 400, h: 100, class: "botao" });
    // botaoIniciar = botoes[0];
    // botoes.push(botao_menu_fase_1 = { x: (windowWidth / 2) - 200, y: 650, w: 200, h: 50, class: "botao" });
    // botao_menu_fase_1 = botoes[1];
    // botoes.push(botao_menu_fase_2 = { x: (windowWidth / 2), y: 650, w: 200, h: 50, class: "botao" });
    // botao_menu_fase_2 = botoes[2];

    jogo.timer.segundos = 0;
    jogo.timer.ticks = 0;
}

function DrawMenu()
{
    //// Cria o mapa
    image(jogo.mapasImg[0], 0, 0, windowWidth, windowHeight);

    //// Armazena posição antiga
    jogo.player.oldX = jogo.player.x;
    jogo.player.oldY = jogo.player.y;

    //// Movimento
    Movimentar();

    //// Desenha o player
    image(jogo.playerImg, jogo.player.x, jogo.player.y, jogo.player.width * jogo.escala, jogo.player.height * jogo.escala);

    //// Verifica colisão com parede
    jogo.walls.forEach(wall => {
        if (Colidiu(jogo.player, wall)) {
            jogo.player.x = jogo.player.oldX;
            jogo.player.y = jogo.player.oldY;
        }
    })
    
    // Visualizar paredes
    jogo.walls.forEach(wall => {
        fill(0, 255, 0);
        rect(wall.x, wall.y, wall.width, wall.height);
    });

    fill(0, 0, 0);
    rect(jogo.xInicialMapa, jogo.yFinalMapa / 2 - 100, 35, 200);
    let portaEsquerda = {x: jogo.xInicialMapa, y: jogo.yFinalMapa / 2 - 100, width: 35, height: 200};

    fill(0, 0, 0);
    rect(jogo.xFinalMapa / 2 - 100, jogo.yInicialMapa, 200, 35);
    let portaMeio = {x: jogo.xFinalMapa / 2 - 100, y: jogo.yInicialMapa, width: 200, height: 35};

    fill(0, 0, 0);
    rect(jogo.xFinalMapa - 35, jogo.yFinalMapa / 2 - 100, 35, 200);
    let portaDireita = {x: jogo.xFinalMapa - 35, y: jogo.yFinalMapa / 2 - 100, width: 35, height: 200};

    // Verifica a colisão com as portas para mudar fase
    if (Colidiu(jogo.player, portaEsquerda))
    {
        MudarFase("fase1");
        jogo.player.x = windowWidth / 2 - 50;
        jogo.player.y = windowHeight - 120;
    }
    else if (Colidiu(jogo.player, portaMeio))
    {
        MudarFase("fase2");
        jogo.player.x = windowWidth / 2 - 50;
        jogo.player.y = windowHeight - 120;
    }
    else if (Colidiu(jogo.player, portaDireita)) 
    {
        MudarFase("preFase1");
        jogo.player.x = jogo.xInicialMapa + 50;
        jogo.player.y = windowHeight / 2 - 50;
    }

    // // Cria o texto do Menu
    // fill(255, 255, 255);
    // textSize(200);
    // text("Menu", windowWidth / 2 - 250, 300);

    // // Cria o botão para iniciar o jogo
    // fill(255, 255, 255);
    // rect(botaoIniciar.x, botaoIniciar.y, botaoIniciar.w, botaoIniciar.h);
    // fill(0, 0, 0);
    // textSize(100);
    // text("Iniciar", botaoIniciar.x + 63, botaoIniciar.y + 85); // Cria o texto e centraliza no botão

    // // Cria o botão para fase 1 do jogo
    // fill(255, 255, 255);
    // rect(botao_menu_fase_1.x, botao_menu_fase_1.y, botao_menu_fase_1.w, botao_menu_fase_1.h);
    // fill(0, 0, 0);
    // textSize(50);
    // text("Fase 1", botao_menu_fase_1.x + 23, botao_menu_fase_1.y + 42); // Cria o texto e centraliza no botão

    // // Cria o botão para fase 2 do jogo
    // fill(255, 255, 255);
    // rect(botao_menu_fase_2.x, botao_menu_fase_2.y, botao_menu_fase_2.w, botao_menu_fase_2.h);
    // fill(0, 0, 0);
    // textSize(50);
    // text("Fase 2", botao_menu_fase_2.x + 23, botao_menu_fase_2.y + 42); // Cria o texto e centraliza no botão

    // // Verifica se o mouse clicou no botão
    // if (mouseIsPressed &&
    //     mouseX <= botao_menu_fase_1.x + botao_menu_fase_1.w
    //     && mouseX >= botao_menu_fase_1.x
    //     && mouseY <= botao_menu_fase_1.y + botao_menu_fase_1.h
    //     && mouseY >= botao_menu_fase_1.y)
    //     fase = "fase1";

    // else if (mouseIsPressed &&
    //     mouseX <= botao_menu_fase_2.x + botao_menu_fase_2.w
    //     && mouseX >= botao_menu_fase_2.x
    //     && mouseY <= botao_menu_fase_2.y + botao_menu_fase_2.h
    //     && mouseY >= botao_menu_fase_2.y)
    //     fase = "fase2";

    //Cria o tutorial
    if (tutorial.ativo) {
        Dialogo("tutorial");
    }
}

//<----------------------------------------------------------------------------------------------------------------

//PAUSE ---------------------------------------------------------------------------------------------------------->
function PreloadPause()
{

}

function SetupPause()
{
    pause.background = loadImage("../assets/imagens/pause/background.png");
    pause.width = 500 * jogo.escala
    pause.height = 600 * jogo.escala
    pause.x = (width / 2) - (pause.width / 2)
    pause.y = (height / 2) - (pause.height / 2)

    pause.btnImg = loadImage("../assets/imagens/pause/background.png");
    pause.btnWidth = 150 * jogo.escala
    pause.btnHeight = 50 * jogo.escala

    pause.txtTamanho = 20 * jogo.escala
    pause.txtFonte = loadFont("../assets/fonts/pixel_operator/PixelOperatorMono-Bold.ttf")

    pause.titulo.tamanho = 50 * jogo.escala
    pause.titulo.x = pause.x + (pause.width / 6)
    pause.titulo.y = pause.y + (pause.height / 5)

    pause.botaoXCentralizado = pause.x + ((pause.width / 2) - ((125 * jogo.escala) / 2))
    // pause.x -> posição inicial, borda da esquerda do menu
    // (pause.width / 2) -> Centralizado no meio do menu, porém a centralização ocorre a partir do ponto esquerdo superior do botão
    // ((125 * jogo.escala) / 2)) -> tamanho do botão dividido por 2 para finalmente achar o meio certinho do menu alinhado com o botão

    // let textoTamanho = 20 * jogo.escala
    // let textoFonte = loadFont("../assets/fonts/pixel_operator/PixelOperatorMono-Bold.ttf")

    pause.botaoContinuar.width = pause.btnWidth
    pause.botaoContinuar.height = pause.btnHeight
    pause.botaoContinuar.x = pause.x + ((pause.width / 2) - (pause.btnWidth / 2))
    pause.botaoContinuar.y = pause.y + ((pause.height / 2) - (75 * jogo.escala))
    pause.botaoContinuar.texto_x = pause.botaoContinuar.x + (pause.btnWidth / 5)
    pause.botaoContinuar.texto_y = pause.botaoContinuar.y + (pause.btnHeight / 1.75)

    pause.botaoReiniciar.width = pause.btnWidth
    pause.botaoReiniciar.height = pause.btnHeight
    pause.botaoReiniciar.x = pause.x + ((pause.width / 2) - (pause.btnWidth / 2))
    pause.botaoReiniciar.y = pause.y + ((pause.height / 2))
    pause.botaoReiniciar.texto_x = pause.botaoReiniciar.x + (pause.btnWidth / 5)
    pause.botaoReiniciar.texto_y = pause.botaoReiniciar.y + (pause.btnHeight / 1.75)

    pause.botaoOpcoes.width = pause.btnWidth
    pause.botaoOpcoes.height = pause.btnHeight
    pause.botaoOpcoes.x = pause.x + ((pause.width / 2) - (pause.btnWidth / 2))
    pause.botaoOpcoes.y = pause.y + ((pause.height / 2) + (75 * jogo.escala))
    pause.botaoOpcoes.texto_x = pause.botaoOpcoes.x + (pause.btnWidth / 3.5)
    pause.botaoOpcoes.texto_y = pause.botaoOpcoes.y + (pause.btnHeight / 1.75)
    
    pause.botaoSair.width = pause.btnWidth
    pause.botaoSair.height = pause.btnHeight
    pause.botaoSair.x = pause.x + ((pause.width / 2) - (pause.btnWidth / 2))
    pause.botaoSair.y = pause.y + ((pause.height / 2) + (150 * jogo.escala))
    pause.botaoSair.texto_x = pause.botaoSair.x + (pause.btnWidth / 2.75)
    pause.botaoSair.texto_y = pause.botaoSair.y + (pause.btnHeight / 1.75)
}

function DrawPause()
{    
    image(pause.btnImg, pause.x, pause.y, pause.width, pause.height)
    
    textFont(pause.txtFonte)
    textSize(pause.txtTamanho)

    image(pause.btnImg, pause.botaoContinuar.x, pause.botaoContinuar.y, pause.btnWidth, pause.btnHeight)
    text("Continuar", pause.botaoContinuar.texto_x, pause.botaoContinuar.texto_y)

    image(pause.btnImg, pause.botaoReiniciar.x, pause.botaoReiniciar.y, pause.btnWidth, pause.btnHeight)
    text("Reiniciar", pause.botaoReiniciar.texto_x, pause.botaoReiniciar.texto_y)

    image(pause.btnImg, pause.botaoOpcoes.x, pause.botaoOpcoes.y, pause.btnWidth, pause.btnHeight)
    text("Opções", pause.botaoOpcoes.texto_x, pause.botaoOpcoes.texto_y)

    image(pause.btnImg, pause.botaoSair.x, pause.botaoSair.y, pause.btnWidth, pause.btnHeight)
    text("Sair", pause.botaoSair.texto_x, pause.botaoSair.texto_y)

    textSize(pause.titulo.tamanho)
    text("CASTOR'S GAME", pause.titulo.x, pause.titulo.y)
    
}
//<----------------------------------------------------------------------------------------------------------------

//PREFASE1 ------------------------------------------------------------------------------------------------------->

function PreloadPreFase1() 
{
    // Carrega a imagem do mapa1
    jogo.mapasImg[1] = mapaFase1 = loadImage("../assets/imagens/mapas/mapaFase1.png");
    tutorial.imagensFase1[0] = loadImage("../assets/imagens/tutorial/tutorialFase1_1.png");
    tutorial.imagensFase1[1] = loadImage("../assets/imagens/tutorial/tutorialFase1_2.png");
    tutorial.imagensFase1[2] = loadImage("../assets/imagens/tutorial/tutorialFase1_3.png");
    tutorial.imagensFase1[3] = loadImage("../assets/imagens/tutorial/tutorialFase1_4.png");
    tutorial.imagensFase1[4] = loadImage("../assets/imagens/tutorial/tutorialFase1_5.png");
    tutorial.imagensFase1[5] = loadImage("../assets/imagens/tutorial/tutorialFase1_6.png");
}

function SetupPreFase1()
{
    
}

function DrawPreFase1()
{
    image(jogo.mapasImg[1], 0, 0, windowWidth, windowHeight);

    // Visualizar paredes
    jogo.walls.forEach(wall => {
        fill(0, 255, 0);
        rect(wall.x, wall.y, wall.width, wall.height);
    });

    //// Armazena posição antiga
    jogo.player.oldX = jogo.player.x;
    jogo.player.oldY = jogo.player.y;

    //// Movimento
    Movimentar();

    //// Desenha o player
    // imageMode(CENTER)
    image(jogo.playerImg, jogo.player.x, jogo.player.y, jogo.player.width * jogo.escala, jogo.player.height * jogo.escala);
    // imageMode(CORNER)

    //// Verifica colisão com parede
    jogo.walls.forEach(wall => {
        if (Colidiu(jogo.player, wall)) {
            jogo.player.x = jogo.player.oldX;
            jogo.player.y = jogo.player.oldY;
        }
    })

    if (Colidiu(jogo.player, fase1.lixeiras[0])) {
        Interagir(fase1.lixeiras[0]);
    }
    image(fase1.lixeiras_img[0], fase1.lixeiras[0].x, fase1.lixeiras[0].y, fase1.lixeiras[0].width * jogo.escala, fase1.lixeiras[0].height * jogo.escala);
}

//<----------------------------------------------------------------------------------------------------------------

//FASE 1 --------------------------------------------------------------------------------------------------------->
function PreloadFase1()
{
    // fase1.pranchetaLixo = loadImage("../assets/imagens/fase1/pranchetaLixo.png");
    fase1.relogio = loadImage("../assets/imagens/fase1/relogio.png");

    // Carrega as imagens das lixeiras
    fase1.lixeiras_img = [
        loadImage("../assets/imagens/fase1/lixeiras/lixeiraVermelha.png"),
        loadImage("../assets/imagens/fase1/lixeiras/lixeiraAzul.png"),
        loadImage("../assets/imagens/fase1/lixeiras/lixeiraAmarela.png"),
        loadImage("../assets/imagens/fase1/lixeiras/lixeiraVerde.png"),
        loadImage("../assets/imagens/fase1/lixeiras/lixeiraMarrom.png"),
        loadImage("../assets/imagens/fase1/lixeiras/lixeiraCinza.png")
    ];

    fase1.obstaculos_img = [
        loadImage("../assets/imagens/fase1/obstaculos/gangorraPixel.png"),
        loadImage("../assets/imagens/fase1/lixeiras/lixeiraAzul.png"),
        loadImage("../assets/imagens/fase1/lixeiras/lixeiraAmarela.png"),
        loadImage("../assets/imagens/fase1/lixeiras/lixeiraVerde.png"),
        loadImage("../assets/imagens/fase1/lixeiras/lixeiraMarrom.png")
    ];

    /*
    // Sorteia em uma lista os diretórios das ../imagens dos lixos pixel art
    lixosPixelImg = [
        lixo1 = SortearLixoPixel(),
        lixo2 = SortearLixoPixel(),
        lixo3 = SortearLixoPixel(),
        lixo4 = SortearLixoPixel(),
        lixo5 = SortearLixoPixel(),
        lixo6 = SortearLixoPixel(),
        lixo7 = SortearLixoPixel(),
        lixo8 = SortearLixoPixel(),
        lixo9 = SortearLixoPixel(),
        lixo10 = SortearLixoPixel()
    ];*/

    fase1.lixosPixelImgCarregados = [
        loadImage("../assets/imagens/fase1/lixos/bolinhaDePapelPixel.png"),
        loadImage("../assets/imagens/fase1/lixos/garrafaVidroPixel.png"),
        loadImage("../assets/imagens/fase1/lixos/bananaPixel.png"),
        loadImage("../assets/imagens/fase1/lixos/bananaPodrePixel.png"),
        loadImage("../assets/imagens/fase1/lixos/garrafaDePlasticoPixel.png"),
        loadImage("../assets/imagens/fase1/lixos/placaDeMetalPixel.png"), //5
        loadImage("../assets/imagens/fase1/lixos/pilhaPixel.png"),
    ];
    
    // Carrega as ../imagens dos lixos reais
    fase1.lixosReaisCarregados = [
        loadImage("../assets/imagens/fase1/lixos/bolinhaDePapel.png"), //0
        loadImage("../assets/imagens/fase1/lixos/garrafaVidro.png"), //1
        loadImage("../assets/imagens/fase1/lixos/banana.png"), //2
        loadImage("../assets/imagens/fase1/lixos/bananaPodre.png"), //3
        loadImage("../assets/imagens/fase1/lixos/garrafaDePlastico.png"), //4
        loadImage("../assets/imagens/fase1/lixos/placaDeMetalPixel.png"), //5
        loadImage("../assets/imagens/fase1/lixos/pilha.png"), //6
    ]
    // Carrega a imagem do cartaz de procurado
    fase1.cartazProcuradoLixo = loadImage("../assets/imagens/fase1/cartazProcuradoLixo.png");
}

function SetupFase1()
{
    fase1.lastItemPego = Lixo.novo(null, null, 0, 0, 0, 0, null, 0);

    fase1.lixeiras = [
        { x: jogo.xFinalMapa - 100, y: windowHeight / 2 + 125 - 25, width: 100, height: 100, img: "../assets/imagens/fase1/lixeiras/lixeiraVermelha.png", descarte: "plastico", class: "lixeira" },
        { x: jogo.xFinalMapa - 100, y: windowHeight / 2 + 275 - 25, width: 100, height: 100, img: "../assets/imagens/fase1/lixeiras/lixeiraAzul.png", descarte: "papel", class: "lixeira" },
        { x: jogo.xFinalMapa - 100, y: windowHeight / 2 - 125 - 75, width: 100, height: 100, img: "../assets/imagens/fase1/lixeiras/lixeiraAmarela.png", descarte: "metal", class: "lixeira" },
        { x: jogo.xFinalMapa - 100, y: windowHeight / 2 - 275 - 75, width: 100, height: 100, img: "../assets/imagens/fase1/lixeiras/lixeiraVerde.png", descarte: "vidro", class: "lixeira" },
        { x: jogo.xFinalMapa - 100, y: windowHeight / 2 - 50, width: 100, height: 100, img: "../assets/imagens/fase1/lixeiras/lixeiraMarrom.png", descarte: "organico", class: "lixeira" },
        { x: jogo.xFinalMapa - 300, y: windowHeight / 2 - 50, width: 100, height: 100, img: "../assets/imagens/fase1/lixeiras/lixeiraCinza.png", descarte: "nao_reciclavel", class: "lixeira" }
    ];
    fase1.lixos = [];
    fase1.obstaculos = [];
    tutorial.ativo = false;

    jogo.pontos = 0;
    jogo.timer.segundos = 0;
    jogo.timer.ticks = 0;
}

function DrawFase1()
{
    if (tutorial.ativo)
    {
        // //// Cria o mapa
        // image(jogo.mapasImg[1], 0, 0, windowWidth, windowHeight);
        Dialogo("fase1");
    }
    else if(!tutorial.ativo) 
    {
        if (!fase1.is_fase_carregada) {
            jogo.timer.ticks = 3600;
            jogo.timer.segundos = 60;
            jogo.pontos = 0;
            fase1.is_fase_carregada = true;
        }

        //// Cria o mapa
        image(jogo.mapasImg[1], 0, 0, windowWidth, windowHeight);

        // //// Cria a prancheta
        // image(fase1.pranchetaLixo, jogo.xFinalMapa + 10, jogo.yFinalMapa - 300, 175, 275);

        ////repõe a quantidade de lixo no mapa
        if(fase1.lixos.length < 10) CriarLixo();
        if(fase1.obstaculos.length < 3) CriarObstaculo();

        //// Armazena posição antiga
        jogo.player.oldX = jogo.player.x;
        jogo.player.oldY = jogo.player.y;

        fase1.lastItemPego_OldX = fase1.lastItemPego.x;
        fase1.lastItemPego_OldY = fase1.lastItemPego.y;

        Movimentar();        

        ////Drag-Drop lixo
        // if (dragDrop(lixo)) {
        //     lixo.x = mouseX - lixo.w / 2;
        //     lixo.y = mouseY - lixo.h / 2;
        // }

        //// Verifica colisão com parede
        jogo.walls.forEach(wall => {
            if (Colidiu(jogo.player, wall) || Colidiu(fase1.lastItemPego, wall)) {
                jogo.player.x = jogo.player.oldX;
                jogo.player.y = jogo.player.oldY;
            }
        })

        // // Verifica a colisão com lixeira
        // fase1.lixeiras.forEach(lixeira => {
        //     if (Colidiu(jogo.player, lixeira)) {
        //         jogo.player.x = jogo.player.oldX;
        //         jogo.player.y = jogo.player.oldY;
        //     }
        // })

        fase1.obstaculos.forEach(obstaculo => {
            if (Colidiu(jogo.player, obstaculo)) {
                jogo.player.x = jogo.player.oldX;
                jogo.player.y = jogo.player.oldY;
            }
        })

        //// Mostra o texto no lixo
        fase1.lixos.forEach(lixo => {
            if (!fase1.pegouLixo && Colidiu(jogo.player, lixo)) {
                Interagir(lixo);
            }
        })

        fase1.lixeiras.forEach(lixeira => {
            if (fase1.pegouLixo && Colidiu(jogo.player, lixeira)) {
                Interagir(lixeira);
            }
        })

        // Verifica se o lixo está na lixeira certa
        // if (fase1.lastItemPego && Colidiu(jogo.player, fase1.lastItemPego)) // o lastLixoPego no 'if' verifica se o objeto está vazio ou não
        // {
        //     fase1.lixeiras.forEach(lixeira => {
        //         if (fase1.lastItemPego && Colidiu(fase1.lastItemPego, lixeira)) {
        //             if (fase1.lastItemPego.material === lixeira.descarte)
        //                 jogo.pontos += 10;
        //             else
        //                 jogo.pontos -= 5;
        //             fase1.lixos = fase1.lixos.filter(obj => obj !== fase1.lastItemPego);
        //             fase1.lastItemPego = Lixo.novo(null, null, 0, 0, 0, 0, null, 0);
        //         }
        //     })
        // }

        // Checa se o botao de espaco foi pressionado
        MostrarLixoReal();
        RotacionarLixo();

        fase1.lixeiras.forEach((lixeira, i) => { image(fase1.lixeiras_img[i], lixeira.x, lixeira.y, lixeira.width * jogo.escala, lixeira.height * jogo.escala) });
        
        fase1.obstaculos.forEach((obstaculo, i) => { image(fase1.obstaculos_img[i], obstaculo.x, obstaculo.y, obstaculo.width * jogo.escala, obstaculo.height * jogo.escala) });

        fase1.lixos.forEach(lixo =>{
            push();

            translate(lixo.x + lixo.width / 2, lixo.y + lixo.height / 2);
            rotate(lixo.angulo);
            imageMode(CENTER);

            image(lixo.image, 0, 0, lixo.width, lixo.height);

            pop();
        })

        // fase1.obstaculos.forEach(obstaculo =>{
        //     push();

        //     translate(obstaculo.x + obstaculo.width / 2, obstaculo.y + obstaculo.height / 2);
        //     imageMode(CENTER);

        //     image(obstaculo.image, 0, 0, obstaculo.width, obstaculo.height);

        //     pop();
        // })

        // jogo.walls.forEach(wall => {
        //     fill(0, 255, 0);
        //     rect(wall.x, wall.y, wall.width, wall.height);
        // });

        ////Desenha personagem
        image(jogo.playerImg, jogo.player.x, jogo.player.y, jogo.player.width * jogo.escala, jogo.player.height * jogo.escala);

        // //// Cria o relógio
        // image(fase1.relogio, windowWidth/64, windowHeight/48, windowWidth/16, windowHeight/8);
        // image(fase1.relogio, 24* jogo.escala, 24* jogo.escala, 128 * jogo.escala, 128 * jogo.escala); //128 -> tamanho padrão do relógio
        AnimacaoRelogio()
        TimerTick("Fase1");
        

        text("Escala:" + jogo.escala, 2000, 50);
        text("Height:" + windowWidth, 100, 50);
        text("Height:" + windowHeight, 1000, 50);
    }
}

//<----------------------------------------------------------------------------------------------------------------

//FASE 2 --------------------------------------------------------------------------------------------------------->
function PreloadFase2()
{
    fase2.cadeirasCarregadas = [
        loadImage("../assets/imagens/fase2/cadeiras/cadeira_0.png"),
        loadImage("../assets/imagens/fase2/cadeiras/cadeira_1.png"),
        loadImage("../assets/imagens/fase2/cadeiras/cadeira_2.png"),
        loadImage("../assets/imagens/fase2/cadeiras/cadeira_2.png"),
        loadImage("../assets/imagens/fase2/cadeiras/cadeira_4.png"),
        loadImage("../assets/imagens/fase2/cadeiras/cadeira_4.png"),
        loadImage("../assets/imagens/fase2/cadeiras/cadeira_6.png"),
        loadImage("../assets/imagens/fase2/cadeiras/cadeira_7.png"),
    ]
}

function SetupFase2()
{
    fase2.cadeiras = [];
    // fase1.lastItemPego = Cadeira.novo(null, null, 0, 0, 0, 0, null, 0);
    fase2.sala = Sala.novo("1", "2", null)
}

function DrawFase2()
{

    if(jogo.timer.ticks === 3600) {
        jogo.pontos = 0;
        jogo.timer.ticks = 0;
        jogo.timer.segundos = 0;
    }

    background(0, 100, 0);

    if(fase2.cadeiras.length < 10){
        CriarCadeiras()
    }

    //// Armazena posição antiga
    jogo.player.oldX = jogo.player.x;
    jogo.player.oldY = jogo.player.y;

    //// Armazena posição antiga
    fase2.lastItemPego_OldX = fase2.lastItemPego.x;
    fase2.lastItemPego_OldY = fase2.lastItemPego.y;

    //// Movimento
    Movimentar();

    ////Drag-Drop lixo
    // if (dragDrop(lixo)) {
    //     lixo.x = mouseX - lixo.w / 2;
    //     lixo.y = mouseY - lixo.h / 2;
    // }

    PegarCadeira(jogo.player, fase2.cadeiras);
    if (fase2.lastItemPego) {
    //RotacionarCadeira();
}

    //// Verifica colisão com parede
    jogo.walls.forEach(wall => {
        if (Colidiu(jogo.player, wall) || Colidiu(fase2.lastItemPego, wall)) {
            jogo.player.x = jogo.player.oldX;
            jogo.player.y = jogo.player.oldY;
        }

        if (Colidiu(fase2.lastItemPego, wall)) {
            fase2.lastItemPego.x = fase2.lastItemPego_OldX;
            fase2.lastItemPego.y = fase2.lastItemPego_OldY;
        } 
    });

    //Desenha as cadeiras
    fase2.cadeiras.forEach(cadeira => {
        let rnd = floor(random(7));
        push();

        translate(cadeira.x + cadeira.w / 2, cadeira.y + cadeira.h / 2);
        rotate(cadeira.angulo);
        imageMode(CENTER);

        image(cadeira.imgCarregada, 0, 0, cadeira.w, cadeira.h);

        pop();
    });
    
    fase2.cadeiras.forEach(cadeira => {
        if (!keyIsDown(32) && Colidiu(jogo.player, cadeira)) {
            fill(255, 0, 0);
            textSize(16);
            text("Segure espaço", cadeira.x - 10, cadeira.y - 10);
        }
    })

    jogo.walls.forEach(wall => {
        fill(0, 255, 0);
        rect(wall.x, wall.y, wall.w, wall.h);
    });

    ////Desenha personagem
    image(jogo.playerImg, jogo.player.x, jogo.player.y, jogo.player.width * jogo.escala, jogo.player.height * jogo.escala);

    TimerTick("Fase2");
}

// function RotacionarCadeira() {
//     if (keyIsDown(82) && lastItemPego.type != "null") { // 82 = tecla 'R'
//         lastItemPego.angulo += 0.25; // gira aos poucos
//     }
// }

// FASE 2--------------------------------------------------------------------------------------------------------------

/*function SortearLixoPixel() {
    let rand = floor(random(5));
    if (rand === 0) return "../assets/imagens/fase1/lixos/bolinhaDePapelPixel.png";
    else if (rand === 1) return "../assets/imagens/fase1/lixos/garrafaVidroPixel.png";
    else if (rand === 2) return "../assets/imagens/fase1/lixos/bananaPixel.png";
    else if (rand === 3) return "../assets/imagens/fase1/lixos/bananaPodrePixel.png";
    else return "../assets/imagens/fase1/lixos/garrafaDePlasticoPixel.png";
}*/

// function DragDrop(a) {
//     return (
//         mouseIsPressed &&
//         mouseX <= a.x + a.w
//         && mouseX >= a.x
//         && mouseY <= a.y + a.h
//         && mouseY >= a.y
//     );
// }

 window.addEventListener("click", () => { //Dando play na musica de fundo quando clica em um lugar aleatório da tela
    const musica = document.getElementById("music");
    if (musica) {
        musica.volume = 0.3; 
        musica.play().catch(() => {});
    }
}, { once: true });

//<---------------------------------------------------------------------------------------------------------------
</script>