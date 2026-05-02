let player, walls
let LastItemPego_OldX, LastItemPego_OldY;
let lixos, lixeiras;
let cadeiras;
let botoes;
let playerImg, lixoImg;
let pegouLixo, LastItemPego;
let banana, bananaPodre, garrafaVidro, bolinhaPapel;
let cartazProcuradoLixo;
let pontos;
let mapasImg;
let lixosPixelCarregados, lixosReaisCarregados, cadeirasCarregadas;
let lixeiras_img;

let canvas; //Cria a tela do Jogo [Gustavo bot esqueceu de atribuir a tela em uma variável]
let canvas_x, canvas_y;
let fase;

function preload() {
    // Carrega a imagem do player
    playerImg = loadImage("imagens/castor.png");
    mapasImg = [];

    PreloadMenu(); // Pré carrega as imagens do Menu
    PreloadFase1(); // Pré carrega as imagens do Minigame 1
    PreloadFase2(); // Pré carrega as imagens do Minigame 1
    PreloadPause(); // Pré carrega as imagens do menu de Pause
}

function setup() {
    fase = "fase2";

    player = { x: windowWidth / 2 - 50, y: windowHeight - 120, w: 100, h: 100, oldX: windowWidth / 2, oldY: windowHeight - 120, class: "player" };

    walls = [
        wall1 = { x: 0, y: 0, w: windowWidth, h: 10, class: "wall" }, // Parede superior
        wall2 = { x: 0, y: 0, w: 10, h: windowHeight, class: "wall" }, // Parede esquerda
        wall3 = { x: windowWidth - 10, y: 0, w: 10, h: windowHeight, class: "wall" }, //Parede direita
        wall4 = { x: 0, y: windowHeight - 10, w: windowWidth , h: 10, class: "wall" } //Parede baixo
    ];

    canvas = createCanvas(windowWidth, windowHeight);
    noSmooth();
    canvas_x = ((windowWidth - width) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (X)
    canvas_y = ((windowHeight - height) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (Y)
    canvas.position(canvas_x, canvas_y);

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

    if (fase === "fase2") keyPressed2();
}

//MENU-----------------------------------------------------------------------------------------------------------------
function PreloadMenu()
{
    mapasImg[0] = mapa1 = loadImage("imagens/mapas/mapaPrototipo.png");
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
}

function DrawMenu()
{
    //// Cria o mapa
    image(mapasImg[0], 0, 0, windowWidth, windowHeight);

    //// Armazena posição antiga
    player.oldX = player.x;
    player.oldY = player.y;

    //// Movimento
    Movimentar();

    //// Desenha o player
    image(playerImg, player.x, player.y, 100, 100);

    //// Verifica colisão com parede
    walls.forEach(wall => {
        if (Colidiu(player, wall)) {
            player.x = player.oldX;
            player.y = player.oldY;
        }
    })
    
    // // Visualizar paredes
    // walls.forEach(wall => {
    //     fill(0, 255, 0);
    //     rect(wall.x, wall.y, wall.w, wall.h);
    // });

    fill(0, 0, 0);
    rect(0, windowHeight/2 - 100, 35, 200);
    let portaEsquerda = {x: 0, y: windowHeight/2 - 100, w: 35, h: 200};

    fill(0, 0, 0);
    rect(windowWidth/2 - 100, 0, 200, 35);
    let portaMeio = {x: windowWidth/2 - 100, y: 0, w: 200, h: 35};

    fill(0, 0, 0);
    rect(windowWidth - 50, windowHeight/2 - 100, 35, 200);
    let portaDireita = {x: windowWidth - 50, y: windowHeight/2 - 100, w: 35, h: 200};

    // Verifica a colisão com as portas para mudar fase
    if (Colidiu(player, portaEsquerda))
    {
        fase = "fase1";
        player.x = windowWidth / 2 - 50;
        player.y = windowHeight - 120;
    }
    else if (Colidiu(player, portaMeio))
    {
        fase = "fase2";
        player.x = windowWidth / 2 - 50;
        player.y = windowHeight - 120;
    }
    else if (Colidiu(player, portaDireita)) 
    {
        fase = "fase1";
        player.x = 20;
        player.y = windowHeight / 2 - 50;
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
    mapasImg[1] = mapa2 = loadImage("imagens/mapas/mapaPrototipo.png");
    // Carrega as imagens das lixeiras
    lixeiras_img = [
        loadImage("imagens/lixeiras/lixeiraVermelha.png"),
        loadImage("imagens/lixeiras/lixeiraAzul.png"),
        loadImage("imagens/lixeiras/lixeiraAmarela.png"),
        loadImage("imagens/lixeiras/lixeiraVerde.png"),
        loadImage("imagens/lixeiras/lixeiraMarrom.png")
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
        loadImage("imagens/lixos/bolinhaDePapelPixel.png"),
        loadImage("imagens/lixos/garrafaVidroPixel.png"),
        loadImage("imagens/lixos/bananaPixel.png"),
        loadImage("imagens/lixos/bananaPodrePixel.png"),
        loadImage("imagens/lixos/garrafaDePlasticoPixel.png"),
    ];
    
    // Carrega as imagens dos lixos reais
    lixosReaisCarregados = [
        loadImage("imagens/lixos/bolinhaDePapel.png"), //0
        loadImage("imagens/lixos/garrafaVidro.png"), //1
        // loadImage("imagens/lixos/banana.png"), //2
        loadImage("imagens/lixos/bananaPodre.png"), //3 -> 2
        loadImage("imagens/lixos/garrafaDePlastico.png") //4 -> 3
    ]
    // Carrega a imagem do cartaz de procurado
    cartazProcuradoLixo = loadImage("imagens/cartazProcuradoLixo.png");
}

function SetupFase1()
{
    LastItemPego = { X: 0, y: 0, w: 0, h: 0 , img: "", img_carregada: null, type: "null", class: "lixo" };

    lixeiras = [
        { x: windowWidth - 100, y: windowHeight / 2 + 125, w: 100, h: 100, img: "imagens/lixeiras/lixeiraVermelha.png", descarte: "plastico", class: "lixeira" },
        { x:  windowWidth - 100, y: windowHeight / 2 + 275, w: 100, h: 100, img: "imagens/lixeiras/lixeiraAzul.png", descarte: "papel", class: "lixeira" },
        { x:  windowWidth - 100, y: windowHeight / 2 - 125, w: 100, h: 100, img: "imagens/lixeiras/lixeiraAmarela.png", descarte: "metal", class: "lixeira" },
        { x:  windowWidth - 100, y: windowHeight / 2 - 275, w: 100, h: 100, img: "imagens/lixeiras/lixeiraVerde.png", descarte: "vidro", class: "lixeira" },
        { x: windowWidth - 100, y: windowHeight / 2, w: 100, h: 100, img: "imagens/lixeiras/lixeiraMarrom.png", descarte: "organico", class: "lixeira" }
    ];
    lixos = [];
    pontos = 0;
}

function DrawFase1()
{
    // background(0, 100, 0);
    image(mapasImg[1], 0, 0, windowWidth, windowHeight);
    
    ////repõe a quantidade de lixo no mapa
    if(lixos.length < 10) CriarLixo()

    //// Armazena posição antiga
    player.oldX = player.x;
    player.oldY = player.y;

    LastItemPego_OldX = lixo.x;
    LastItemPego_OldY = lixo.y;

    //// Movimento
    Movimentar();

    ////Drag-Drop lixo
    // if (dragDrop(lixo)) {
    //     lixo.x = mouseX - lixo.w / 2;
    //     lixo.y = mouseY - lixo.h / 2;
    // }

    //// Verifica colisão com parede
    walls.forEach(wall => {
        if (Colidiu(player, wall) || Colidiu(LastItemPego, wall)) {
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
    if (LastItemPego && Colidiu(player, LastItemPego)) // o lastLixoPego no 'if' verifica se o objeto está vazio ou não
    {
        lixeiras.forEach(lixeira => {
            if (LastItemPego && Colidiu(LastItemPego, lixeira)) {
                if (LastItemPego.type === lixeira.descarte)
                    pontos += 10;
                else
                    pontos -= 5;
                lixos = lixos.filter(obj => obj !== LastItemPego);
                LastItemPego = { X: 0, y: 0, w: 0, h: 0 , img: "", img_carregada: null, type: "null", class: "lixo" };
            }
        })
    }

    // Checa se o botao de espaco foi pressionado
    PegarLixo(player, lixos);
    MostrarLixoReal();
    RotacionarLixo();

    ////Desenha personagem, lixo e parede
    image(playerImg, player.x, player.y, player.w, player.h);

    lixeiras.forEach((lixeira, i) => { image(lixeiras_img[i], lixeira.x, lixeira.y, lixeira.w, lixeira.h) });
    
    lixos.forEach(lixo =>{
        push();

        translate(lixo.x + lixo.w / 2, lixo.y + lixo.h / 2);
        rotate(lixo.angulo);
        imageMode(CENTER);

        image(lixo.imgCarregada, 0, 0, lixo.w, lixo.h);

        pop();
    })

    // walls.forEach(wall => {
    //     fill(0, 255, 0);
    //     rect(wall.x, wall.y, wall.w, wall.h);
    // });

    // Mostra a pontuação na tela
    fill(0, 0, 0);
    textSize(50);
    text(pontos, windowWidth - 100, 100);
}

// Funções Fase 1
function PegarLixo(player_funcao, lixos_funcao) {
    return (
        lixos_funcao.forEach(lixo => {
            if (keyIsDown(32) && Colidiu(player_funcao, lixo) && (LastItemPego == lixo || LastItemPego.type == "null")) { // 'lastLixoPego[6]' -> é considerado uma lista, não um objeto
                lixo.x = player_funcao.x + player_funcao.w - 10;
                lixo.y = player_funcao.y + player_funcao.h / 2;
                pegouLixo = true;
                LastItemPego = lixo;
                // window.alert(lastLixoPego.type);
            }
            else if (!keyIsDown(32)) LastItemPego = { x: 0, y: 0, w: 0, h: 0 , img: "", img_carregada: null, type: "null", class: "lixo", angulo: 0 };
        })
    )
}

function MostrarLixoReal() {
    if (LastItemPego && Colidiu(player, LastItemPego)) {// o lastLixoPego no 'if' verifica se o objeto está vazio ou não
        image(cartazProcuradoLixo, LastItemPego.x, LastItemPego.y - 75, 200, 300); // Mostra o cartaz de procurado

        // Verifica e mostra os lixos reais
        if(LastItemPego.type === "papel")
            image(lixosReaisCarregados[0], LastItemPego.x, LastItemPego.y, 200, 200);
        else if(LastItemPego.type === "vidro")
            image(lixosReaisCarregados[1], LastItemPego.x, LastItemPego.y, 150, 200);
        else if (LastItemPego.type === "organico")
            image(lixosReaisCarregados[2], LastItemPego.x, LastItemPego.y, 200, 200);
        else if (LastItemPego.type === "plastico")
            image(lixosReaisCarregados[3], LastItemPego.x, LastItemPego.y, 200, 200);
    }
}

function CriarLixo() {
    let dif_x = ((windowWidth - width) / 2);
    let dif_y = ((windowHeight - height) / 2);

    let lixo_x = random(dif_x + 50, (dif_x + width) - 200);
    let lixo_y = random(dif_y + 50, (dif_y + height) - 50);

    //let lixo = [0, 0, 25, 25, "", "", ""] //x, y, w, h, img, type, class
    let lixo_img = null;
    let lixo_img_carregada = null;
    let lixo_type = null;
        
    let rnd = floor(random(5));

    lixo_img_carregada = lixosPixelImgCarregados[rnd]
    //lixo_img = lixosPixelImgCarregados[rnd]

    if (rnd == 0) lixo_type = "papel" //0 -> BolinhaDePapel
    else if (rnd == 1) lixo_type = "vidro" //0 -> Banana
    else if (rnd == 2 || rnd == 3) lixo_type = "organico" //0 -> BananaPodre
    else if (rnd == 4) lixo_type = "plastico" //0 -> GarrafaDePlastico

    let lixo_angulo = random(TWO_PI)

    lixos.push({ x: lixo_x, y: lixo_y, w: 25, h: 25, img: lixo_img, imgCarregada: lixo_img_carregada, type: lixo_type, class: "lixo", angulo: lixo_angulo }); 

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

function RotacionarLixo() {
    if (keyIsDown(81) && LastItemPego.type != "null") { // 82 = tecla 'Q'
        LastItemPego.angulo -= 0.1; // gira aos poucos
    }

    else if (keyIsDown(69) && LastItemPego.type != "null") { // 82 = tecla 'E'
        LastItemPego.angulo += 0.1; // gira aos poucos
    }
}

// FASE 1---------------------------------------------------------------------------------------------------------------

// FASE 2--------------------------------------------------------------------------------------------------------------
function PreloadFase2()
{
    
}

function SetupFase2()
{
    cadeiras = [];
    cadeirasCarregadas = [
        loadImage("imagens/cadeiras/cadeira_0.png"),
        loadImage("imagens/cadeiras/cadeira_1.png"),
        loadImage("imagens/cadeiras/cadeira_2.png"),
        loadImage("imagens/cadeiras/cadeira_2.png"),
        loadImage("imagens/cadeiras/cadeira_4.png"),
        loadImage("imagens/cadeiras/cadeira_4.png"),
        loadImage("imagens/cadeiras/cadeira_6.png"),
        loadImage("imagens/cadeiras/cadeira_7.png"),
    ]
}

function DrawFase2()
{
    background(0, 100, 0);

    if(cadeiras.length < 10){
        CriarCadeiras()
    } 

    //// Armazena posição antiga
    player.oldX = player.x;
    player.oldY = player.y;

    //// Armazena posição antiga
    LastItemPego_OldX = LastItemPego.x;
    LastItemPego_OldY = LastItemPego.y;

    //// Movimento
    Movimentar();

    ////Drag-Drop lixo
    // if (dragDrop(lixo)) {
    //     lixo.x = mouseX - lixo.w / 2;
    //     lixo.y = mouseY - lixo.h / 2;
    // }

    PegarCadeira(player, cadeiras);
    if (LastItemPego) {
    //RotacionarCadeira();
}

    //// Verifica colisão com parede
    walls.forEach(wall => {
        if (Colidiu(player, wall) || Colidiu(LastItemPego, wall)) {
            player.x = player.oldX;
            player.y = player.oldY;
        }

        if (Colidiu(LastItemPego, wall)) {
            LastItemPego.x = LastItemPego_OldX;
            LastItemPego.y = LastItemPego_OldY;
        } 
    });

    //Desenha as cadeiras
    cadeiras.forEach(cadeira => {
        let rnd = floor(random(7));
        push();

        translate(cadeira.x + cadeira.w / 2, cadeira.y + cadeira.h / 2);
        rotate(cadeira.angulo);
        imageMode(CENTER);

        image(cadeira.imgCarregada, 0, 0, cadeira.w, cadeira.h);

        pop();
    });
    
    cadeiras.forEach(cadeira => {
        if (!keyIsDown(32) && Colidiu(player, cadeira)) {
            fill(255, 0, 0);
            textSize(16);
            text("Segure espaço", cadeira.x - 10, cadeira.y - 10);
        }
    })

    walls.forEach(wall => {
        fill(0, 255, 0);
        rect(wall.x, wall.y, wall.w, wall.h);
    });

    ////Desenha personagem
    image(playerImg, player.x, player.y, player.w, player.h);

    // Mostra a pontuação na tela
    fill(0, 0, 0);
    textSize(50);
    text(pontos, windowWidth - 100, 100);
}

function keyPressed2() {
    if (key === 'q' || key === 'Q') {

        // ROTAÇÂO DE IMAGEM
        if (LastItemPego) {

            LastItemPego.variante--;
            if (LastItemPego.variante < 0) LastItemPego.variante = 7;
            LastItemPego.imgCarregada = cadeirasCarregadas[LastItemPego.variante];

        }
    }

    else if (key === 'e' || key === 'E') {

        // ROTAÇÂO DE IMAGEM
        if (LastItemPego) {

            LastItemPego.variante++;
            if (LastItemPego.variante > 7) LastItemPego.variante = 0;
            LastItemPego.imgCarregada = cadeirasCarregadas[LastItemPego.variante];
            
        }
    }
}

function CriarCadeiras() {
    let dif_x = ((windowWidth - width) / 2);
    let dif_y = ((windowHeight - height) / 2);

    let cadeira_x;
    let cadeira_y;

    let tentativas = 0;
    let posicao_possivel = false;
    
    let cadeira_variante = floor(random(7));

    while (!posicao_possivel && tentativas < 100){

        posicao_possivel = true;
        cadeira_x = random(dif_x + 50, (dif_x + width) - 200);
        cadeira_y = random(dif_y + 50, (dif_y + height) - 50);

        cadeiras.forEach(cadeira => {
            if (Math.abs(cadeira.x - cadeira_x) < 50 && Math.abs(cadeira.y - cadeira_y) < 50) {
                posicao_possivel = false;
            }
        })
    }
    

    //let lixo = [0, 0, 25, 25, "", "", ""] //x, y, w, h, img, type, class
    let cadeira_img = null;
    let cadeira_img_carregada = null;

    cadeira_img_carregada = cadeirasCarregadas[cadeira_variante];
    //lixo_img = lixosPixelImgCarregados[rnd]

    cadeiras.push({ x: cadeira_x, y: cadeira_y, w: 75, h: 75, img: cadeira_img, imgCarregada: cadeira_img_carregada, class: "cadeira", variante: cadeira_variante }); 

}

function PegarCadeira(player_funcao, cadeiras_funcao) {
    return (
        cadeiras_funcao.forEach(cadeira => {
            if (keyIsDown(32) && Colidiu(player_funcao, cadeira) && (LastItemPego == cadeira || LastItemPego.type == "null")) { // 'lastLixoPego[6]' -> é considerado uma lista, não um objeto
                cadeira.x = player_funcao.x + player_funcao.w - 10;
                cadeira.y = player_funcao.y + player_funcao.h / 2;
                pegouLixo = true;
                LastItemPego = cadeira;
                // window.alert(lastLixoPego.type);
            }
            else if (!keyIsDown(32)) LastItemPego = { x: 0, y: 0, w: 0, h: 0 , img: "", img_carregada: null, type: "null", class: "cadeira", variante:0 };
        })
    )
}

// function RotacionarCadeira() {
//     if (keyIsDown(82) && LastItemPego.type != "null") { // 82 = tecla 'R'
//         LastItemPego.angulo += 0.25; // gira aos poucos
//     }
// }

// FASE 2--------------------------------------------------------------------------------------------------------------

function Movimentar() 
{
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
}
function windowResized() 
{
    resizeCanvas(windowWidth, windowHeight);

    canvas_x = ((windowWidth - width) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (X)
    canvas_y = ((windowHeight - height) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (Y)
    canvas.position(canvas_x, canvas_y);
}

function Colidiu(a, b) 
{
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

 window.addEventListener("click", () => {
    const musica = document.getElementById("music");

    if (musica) {
        musica.volume = 0.3;
        musica.play().catch(() => {});
        console.log("tocou");
    }
}, { once: true });