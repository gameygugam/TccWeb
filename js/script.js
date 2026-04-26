let player, walls, lixos, lixeiras;
let botoes;
let playerImg, lixoImg;
let pegouLixo, lastLixoPego;
let banana, bananaPodre, garrafaVidro, bolinhaPapel;
let cartazProcuradoLixo;
let pontos;
let mapasImg;

let canvas; //Cria a tela do Jogo [Gustavo bot esqueceu de atribuir a tela em uma variável]
let canvas_x, canvas_y;
let fase;

function preload() {
    PreloadMenu(); // Pré carrega as imagens do Menu
    PreloadFase1(); // Pré carrega as imagens do Minigame 1
    PreloadFase2(); // Pré carrega as imagens do Minigame 1
    PreloadPause(); // Pré carrega as imagens do menu de Pause
}

function setup() {
    fase = "menu";
    SetupMenu();
    SetupFase1();
    SetupFase2();
    SetupPause();
}

function draw() {
    if(fase === "menu")
        DrawMenu(); // Desenha o Menu
    else if(fase === "fase1")
        DrawFase1(); // Desenha o Minigame 1
    else if(fase === "fase2")
        DrawFase2(); // Desenha o Minigame 2
    else if(fase === "pause")
        DrawPause(); // Desenha o menu de Pause
}

function keyPressed()
{
    if(fase === "menu" && keyCode === ENTER)
        fase = "fase1";
    if(fase === "fase1" && keyCode === ESCAPE)
        fase = "pause";
    if (fase === "pause" && keyCode === ESCAPE)
        fase = "fase1";
}

//MENU-----------------------------------------------------------------------------------------------------------------
function PreloadMenu()
{

}

function SetupMenu()
{
    botoes = [];

    botoes.push(botaoMenuIniciar = { x: (windowWidth / 2) - 200, y: 500, w: 400, h: 100, class: "botao" });
    botaoIniciar = botoes[0];

    botoes.push(botao_menu_fase_1 = { x: (windowWidth / 2) - 200, y: 650, w: 200, h: 50, class: "botao" });
    botao_menu_fase_1 = botoes[1];

    botoes.push(botao_menu_fase_2 = { x: (windowWidth / 2), y: 650, w: 200, h: 50, class: "botao" });
    botao_menu_fase_2 = botoes[2];
}

function DrawMenu()
{
    background(30);

    // Cria o texto do Menu
    fill(255, 255, 255);
    textSize(200);
    text("Menu", windowWidth / 2 - 250, 300);


    // Cria o botão para iniciar o jogo
    fill(255, 255, 255);
    rect(botaoIniciar.x, botaoIniciar.y, botaoIniciar.w, botaoIniciar.h);
    fill(0, 0, 0);
    textSize(100);
    text("Iniciar", botaoIniciar.x + 63, botaoIniciar.y + 85); // Cria o texto e centraliza no botão

    // Cria o botão para fase 1 do jogo
    fill(255, 255, 255);
    rect(botao_menu_fase_1.x, botao_menu_fase_1.y, botao_menu_fase_1.w, botao_menu_fase_1.h);
    fill(0, 0, 0);
    textSize(50);
    text("Fase 1", botao_menu_fase_1.x + 23, botao_menu_fase_1.y + 42); // Cria o texto e centraliza no botão

    // Cria o botão para fase 2 do jogo
    fill(255, 255, 255);
    rect(botao_menu_fase_2.x, botao_menu_fase_2.y, botao_menu_fase_2.w, botao_menu_fase_2.h);
    fill(0, 0, 0);
    textSize(50);
    text("Fase 2", botao_menu_fase_2.x + 23, botao_menu_fase_2.y + 42); // Cria o texto e centraliza no botão
    

    // Verifica se o mouse clicou no botão
    if (mouseIsPressed &&
        mouseX <= botao_menu_fase_1.x + botao_menu_fase_1.w
        && mouseX >= botao_menu_fase_1.x
        && mouseY <= botao_menu_fase_1.y + botao_menu_fase_1.h
        && mouseY >= botao_menu_fase_1.y)
        fase = "fase1";

    else if (mouseIsPressed &&
        mouseX <= botao_menu_fase_2.x + botao_menu_fase_2.w
        && mouseX >= botao_menu_fase_2.x
        && mouseY <= botao_menu_fase_2.y + botao_menu_fase_2.h
        && mouseY >= botao_menu_fase_2.y)
        fase = "fase2";
}
//MENU-----------------------------------------------------------------------------------------------------------------

//PAUSE----------------------------------------------------------------------------------------------------------------
function PreloadPause()
{

}

function SetupPause()
{

}

function DrawPause()
{

}
//PAUSE----------------------------------------------------------------------------------------------------------------

// FASE 1--------------------------------------------------------------------------------------------------------------
function PreloadFase1()
{
    // Carrega a imagem do mapa1
    mapasImg = [ mapa1 = loadImage("imagens/mapas/mapaPrototipo.png") ];
    // Carrega a imagem do player
    playerImg = loadImage("imagens/Castor.png");
    // Carrega as imagens das lixeiras
    lixeiras_img = [
        lixeira_vermelha = loadImage("imagens/lixeiras/lixeiraVermelha.png"),
        lixeira_azul = loadImage("imagens/lixeiras/lixeiraAzul.png"),
        lixeira_amarela = loadImage("imagens/lixeiras/lixeiraAmarela.png"),
        lixeira_verde = loadImage("imagens/lixeiras/lixeiraVerde.png"),
        lixeira_marrom = loadImage("imagens/lixeiras/lixeiraMarrom.png")
    ];
    /*
    // Sorteia em uma lista os diretórios das imagens dos lixos pixel art
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

    lixosPixelImgCarregados = [
        bolinhaPapel = loadImage("imagens/lixos/bolinhaDePapelPixel.png"),
        garrafaVidro = loadImage("imagens/lixos/garrafaVidroPixel.png"),
        banana = loadImage("imagens/lixos/bananaPixel.png"),
        bananaPodre = loadImage("imagens/lixos/bananaPodrePixel.png"),
        garrafaPlastico = loadImage("imagens/lixos/garrafaDePlasticoPixel.png"),
    ];
    
    // Carrega as imagens dos lixos reais
    lixosReaisCarregados = [
        bolinhaPapel = loadImage("imagens/lixos/bolinhaDePapel.png"), //0
        garrafaVidro = loadImage("imagens/lixos/garrafaVidro.png"), //1
        //banana = loadImage("imagens/lixos/banana.png"), //2
        bananaPodre = loadImage("imagens/lixos/bananaPodre.png"), //3 -> 2
        garrafaPlastico = loadImage("imagens/lixos/garrafaDePlastico.png") //4 -> 3
    ]
    // Carrega a imagem do cartaz de procurado
    cartazProcuradoLixo = loadImage("imagens/cartazProcuradoLixo.png");
}

function SetupFase1()
{
    lastLixoPego = { X: 0, y: 0, w: 0, h: 0 , img: "", img_carregada: loadImage(""), type: "null", class: "lixo" };

    canvas = createCanvas(windowWidth, windowHeight);
    
    noSmooth();

    pontos = 0;
    pegouLixo = false;
    canvas_x = ((windowWidth - width) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (X)
    canvas_y = ((windowHeight - height) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (Y)
    canvas.position(canvas_x, canvas_y);

    player = { x: 50, y: 50, w: 100, h: 100, oldX: 50, oldY: 50, class: "player" };
    walls = null;
    walls = [
        wall1 = { x: 0, y: 0, w: windowWidth, h: 10, class: "wall" }, // Parede superior
        wall2 = { x: 0, y: 0, w: 10, h: windowHeight, class: "wall" }, // Parede esquerda
        wall3 = { x: windowWidth - 10, y: 0, w: 10, h: windowHeight, class: "wall" }, //Parede direita
        wall4 = { x: 0, y: windowHeight - 10, w: windowWidth , h: 10, class: "wall" } //Parede baixo
    ];
    lixeiras = [
        lixeira_vermelha = { x: windowWidth - 100, y: windowHeight / 2 + 125, w: 100, h: 100, img: "imagens/lixeiras/lixeiraVermelha.png", descarte: "plastico", class: "lixeira" },
        lixeira_azul = { x:  windowWidth - 100, y: windowHeight / 2 + 275, w: 100, h: 100, img: "imagens/lixeiras/lixeiraAzul.png", descarte: "papel", class: "lixeira" },
        lixeira_amarela = { x:  windowWidth - 100, y: windowHeight / 2 - 125, w: 100, h: 100, img: "imagens/lixeiras/lixeiraAmarela.png", descarte: "metal", class: "lixeira" },
        lixeira_verde = { x:  windowWidth - 100, y: windowHeight / 2 - 275, w: 100, h: 100, img: "imagens/lixeiras/lixeiraVerde.png", descarte: "vidro", class: "lixeira" },
        lixeira_marrom = { x: windowWidth - 100, y: windowHeight / 2, w: 100, h: 100, img: "imagens/lixeiras/lixeiraMarrom.png", descarte: "organico", class: "lixeira" }
    ];
    lixos = [];
}

function DrawFase1()
{
    // background(0, 100, 0);
    image(mapasImg[0], 0, 0, windowWidth, windowHeight);
    ////repõe a quantidade de lixo no mapa
    if(lixos.length < 10) CriarLixo()

    //// Armazena posição antiga
    player.oldX = player.x;
    player.oldY = player.y;

    //// Movimento
    let dir = createVector(0, 0);
    if (keyIsDown(87) || keyIsDown(UP_ARROW)) dir.y -= 1;
    if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) dir.y += 1;
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) dir.x -= 1;
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) dir.x += 1;
    // Normaliza o vetor para não alterar a velocidade do personagem. EX: W = 4, S = 4; W + S != 8; W + S = 4
    if (dir.mag() > 0) {
        dir.normalize();
        dir.mult(3);
    }
    player.x += dir.x;
    player.y += dir.y;

    ////Drag-Drop lixo
    // if (dragDrop(lixo)) {
    //     lixo.x = mouseX - lixo.w / 2;
    //     lixo.y = mouseY - lixo.h / 2;
    // }

    //// Verifica colisão com parede
    walls.forEach(wall => {
        if (Colidiu(player, wall)) {
            player.x = player.oldX;
            player.y = player.oldY;
        }
    })

    // Verifica a colisão com lixeira
    lixeiras.forEach(lixeira => {
        if (Colidiu(player, lixeira)) {
            player.x = player.oldX;
            player.y = player.oldY;
        }
    })

    //// Mostra o texto no lixo
    lixos.forEach(lixo => {
        if (!keyIsDown(32) && Colidiu(player, lixo)) {
            fill(255, 0, 0);
            textSize(16);
            text("Segure espaço", lixo.x - 10, lixo.y - 10);
        }
    })

    // Verifica se o lixo está na lixeira certa
    if (lastLixoPego && Colidiu(player, lastLixoPego)) // o lastLixoPego no 'if' verifica se o objeto está vazio ou não
    {
        lixeiras.forEach(lixeira => {
            if (lastLixoPego && Colidiu(lastLixoPego, lixeira)) {
                if (lastLixoPego.type === lixeira.descarte)
                    pontos += 10;
                else
                    pontos -= 5;
                lixos = lixos.filter(obj => obj !== lastLixoPego);
                lastLixoPego = { X: 0, y: 0, w: 0, h: 0 , img: "", img_carregada: null, type: "null", class: "lixo" };
            }
        })
    }

    ////Mostra a imagem do lixo
    // if (Colidiu(player, lixo)) {
    //     image(lixo.img, lixo.x, lixo.y, lixo.w, lixo.h);
    // }

    // Checa se o botao de espaco foi pressionado
    PegarLixo(player, lixos);
    MostrarLixoReal();

    ////Desenha personagem, lixo e parede
    image(playerImg, player.x, player.y, player.w, player.h);

    lixeiras.forEach((lixeira, i) => { image(lixeiras_img[i], lixeira.x, lixeira.y, lixeira.w, lixeira.h) });
    
    lixos.forEach(lixo => { image(lixo.imgCarregada, lixo.x, lixo.y, lixo.w, lixo.h) });

    walls.forEach(wall => {
        fill(0, 255, 0);
        rect(wall.x, wall.y, wall.w, wall.h);
    });

    // Mostra a pontuação na tela
    fill(0, 0, 0);
    textSize(50);
    text(pontos, windowWidth - 100, 100);
}

// Funções Fase 1
function PegarLixo(player_funcao, lixos_funcao) {
    return (
        lixos_funcao.forEach(lixo => {
            if (keyIsDown(32) && Colidiu(player_funcao, lixo) && (lastLixoPego == lixo || lastLixoPego.type == "null")) { // 'lastLixoPego[6]' -> é considerado uma lista, não um objeto
                lixo.x = player_funcao.x + player_funcao.w - 10;
                lixo.y = player_funcao.y + player_funcao.h / 2;
                pegouLixo = true;
                lastLixoPego = lixo;
                // window.alert(lastLixoPego.type);
            }
            else if (!keyIsDown(32)) lastLixoPego = { x: 0, y: 0, w: 0, h: 0 , img: "", img_carregada: null, type: "null", class: "lixo" };
        })
    )
}

function MostrarLixoReal() {
    if (lastLixoPego && Colidiu(player, lastLixoPego)) {// o lastLixoPego no 'if' verifica se o objeto está vazio ou não
        image(cartazProcuradoLixo, lastLixoPego.x, lastLixoPego.y - 75, 200, 300); // Mostra o cartaz de procurado

        // Verifica e mostra os lixos reais
        if(lastLixoPego.type === "papel")
            image(lixosReaisCarregados[0], lastLixoPego.x, lastLixoPego.y, 200, 200);
        else if(lastLixoPego.type === "vidro")
            image(lixosReaisCarregados[1], lastLixoPego.x, lastLixoPego.y, 150, 200);
        else if (lastLixoPego.type === "organico")
            image(lixosReaisCarregados[2], lastLixoPego.x, lastLixoPego.y, 200, 200);
        else if (lastLixoPego.type === "plastico")
            image(lixosReaisCarregados[3], lastLixoPego.x, lastLixoPego.y, 200, 200);
    }
}

function CriarLixo() {
    let dif_x = ((windowWidth - width) / 2);
    let dif_y = ((windowHeight - height) / 2);

    let lixo_x = random(dif_x + 50, (dif_x + width) - 200);
    let lixo_y = random(dif_y + 50, (dif_y + height) - 50);

    //let lixo = [0, 0, 25, 25, "", "", ""] //x, y, w, h, img, type, class
    let lixo_img = "";
    let lixo_img_carregada = loadImage("");
    let lixo_type = "";
        
    let rnd = floor(random(5));

    lixo_img_carregada = lixosPixelImgCarregados[rnd]
    //lixo_img = lixosPixelImgCarregados[rnd]

    if (rnd == 0) lixo_type = "papel" //0 -> BolinhaDePapel
    else if (rnd == 1) lixo_type = "vidro" //0 -> Banana
    else if (rnd == 2 || rnd == 3) lixo_type = "organico" //0 -> BananaPodre
    else if (rnd == 4) lixo_type = "plastico" //0 -> GarrafaDePlastico

    lixos.push({ x: lixo_x, y: lixo_y, w: 25, h: 25, img: lixo_img, imgCarregada: lixo_img_carregada, type: lixo_type, class: "lixo" }); 

    /*lixos[lixos.length - 1].img = lixosPixelImg[lixos.length - 1]; // Adiciona imagem pixel no parametro
    lixos[lixos.length - 1].imgCarregada = lixosPixelImgCarregados[lixos.length - 1]; // Adiciona imagem pixel carregada no parametro
    // Adiciona o tipo do lixo de acordo com as lixeiras existentes
    if (lixos[lixos.length - 1].img === "imagens/lixos/bolinhaDePapelPixel.png")
        lixos[lixos.length - 1].type = "papel"; // Azul
    else if (lixos[lixos.length - 1].img === "imagens/lixos/garrafaVidroPixel.png")
        lixos[lixos.length - 1].type = "vidro"; // Verde
    else if (lixos[lixos.length - 1].img === "imagens/lixos/bananaPixel.png")
        lixos[lixos.length - 1].type = "organico"; // Marrom
    else if (lixos[lixos.length - 1].img === "imagens/lixos/bananaPodrePixel.png")
        lixos[lixos.length - 1].type = "organico"; // Marrom
    else if (lixos[lixos.length - 1].img === "imagens/lixos/garrafaDePlasticoPixel.png")
        lixos[lixos.length - 1].type = "plastico"; // Vermelha*/

    /*lixos[lixos.length - 1].x = random(lixo_x + 50, (lixo_x + width) - 200);
    lixos[lixos.length - 1].y = random(lixo_y + 50, (lixo_y + height) - 50);*/
}
// FASE 1--------------------------------------------------------------------------------------------------------------

// FASE 2--------------------------------------------------------------------------------------------------------------
function PreloadFase2()
{
    // Carrega a imagem do player
    playerImg = loadImage("imagens/Castor.png");
}

function SetupFase2()
{
    canvas = createCanvas(windowWidth, windowHeight);
    noSmooth();

    pontos = 0;
    canvas_x = ((windowWidth - width) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (X)
    canvas_y = ((windowHeight - height) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (Y)
    canvas.position(canvas_x, canvas_y);

    player = { x: 50, y: 50, w: 100, h: 100, oldX: 50, oldY: 50, class: "player" };

    walls = null;
    walls = [
        wall1 = { x: 0, y: 0, w: windowWidth, h: 10, class: "wall" }, // Parede superior
        wall2 = { x: 0, y: 0, w: 10, h: windowHeight, class: "wall" }, // Parede esquerda
        wall3 = { x: windowWidth - 10, y: 0, w: 10, h: windowHeight, class: "wall" }, //Parede direita
        wall4 = { x: 0, y: windowHeight - 10, w: windowWidth , h: 10, class: "wall" } //Parede baixo
    ];
}

function DrawFase2()
{
    background(0, 100, 0);

    //// Armazena posição antiga
    player.oldX = player.x;
    player.oldY = player.y;

    //// Movimento
    if (keyIsDown(87) || keyIsDown(UP_ARROW)) player.y -= 4; // 87 ASCII -> W
    if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) player.y += 4; // 83 ASCII -> S
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) player.x -= 4; // 65 ASCII -> A
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) player.x += 4; // 68 ASCII -> D

    if ((keyIsDown(87) || keyIsDown(UP_ARROW)) && keyIsDown(65) || keyIsDown(LEFT_ARROW)) player.y -= 2; // W + A -> Cima esquerda
    if ((keyIsDown(87) || keyIsDown(UP_ARROW)) && keyIsDown(68) || keyIsDown(RIGHT_ARROW)) player.y -= 2; // W + D -> Cima direita
    if ((keyIsDown(83) || keyIsDown(DOWN_ARROW)) && keyIsDown(65) || keyIsDown(LEFT_ARROW)) player.y += 2; // S + A -> Baixo esquerda
    if ((keyIsDown(83) || keyIsDown(DOWN_ARROW)) && keyIsDown(68) || keyIsDown(RIGHT_ARROW)) player.y += 2; // S + D -> Baixo direita

    ////Drag-Drop lixo
    // if (dragDrop(lixo)) {
    //     lixo.x = mouseX - lixo.w / 2;
    //     lixo.y = mouseY - lixo.h / 2;
    // }

    //// Verifica colisão com parede
    walls.forEach(wall => {
        if (Colidiu(player, wall)) {
            player.x = player.oldX;
            player.y = player.oldY;
        }
    });

    ////Desenha personagem
    image(playerImg, player.x, player.y, player.w, player.h);

    walls.forEach(wall => {
        fill(0, 255, 0);
        rect(wall.x, wall.y, wall.w, wall.h);
    });

    // Mostra a pontuação na tela
    fill(0, 0, 0);
    textSize(50);
    text(pontos, windowWidth - 100, 100);
}
// FASE 2--------------------------------------------------------------------------------------------------------------

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    canvas_x = ((windowWidth - width) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (X)
    canvas_y = ((windowHeight - height) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (Y)
    canvas.position(canvas_x, canvas_y);
}

function Colidiu(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

/*function SortearLixoPixel() {
    let rand = floor(random(5));
    if (rand === 0) return "imagens/lixos/bolinhaDePapelPixel.png";
    else if (rand === 1) return "imagens/lixos/garrafaVidroPixel.png";
    else if (rand === 2) return "imagens/lixos/bananaPixel.png";
    else if (rand === 3) return "imagens/lixos/bananaPodrePixel.png";
    else return "imagens/lixos/garrafaDePlasticoPixel.png";
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