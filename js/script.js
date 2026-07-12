function preload() {
    // Carrega a imagem do player
    jogo.playerImg = loadImage("../imagens/castor.png");
    jogo.mapasImg = [];

    PreloadMenu(); // Pré carrega as ../imagens do Menu
    PreloadFase1(); // Pré carrega as ../imagens do Minigame 1
    PreloadFase2(); // Pré carrega as ../imagens do Minigame 1
    PreloadPause(); // Pré carrega as ../imagens do menu de Pause
}

function setup() {
    jogo.fase = "menu";
    fase1.is_fase_carregada = false;
    fase2.is_fase_carregada = false;

    jogo.player = { 
        x: windowWidth / 2 - 50, y: windowHeight - 120, w: 100, h: 100,
        oldX: windowWidth / 2, oldY: windowHeight - 120, class: "player", dash_cooldown: 80, dash_duracao: 0 
    };

    jogo.walls = [
        wall1 = { x: 0, y: 0, w: windowWidth, h: 10, class: "wall" }, // Parede superior
        wall2 = { x: 0, y: 0, w: 10, h: windowHeight, class: "wall" }, // Parede esquerda
        wall3 = { x: windowWidth - 10, y: 0, w: 10, h: windowHeight, class: "wall" }, //Parede direita
        wall4 = { x: 0, y: windowHeight - 10, w: windowWidth , h: 10, class: "wall" } //Parede baixo
    ];

    jogo.canvas = createCanvas(windowWidth, windowHeight);
    noSmooth();
    jogo.canvas_x = ((windowWidth - width) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (X)
    jogo.canvas_y = ((windowHeight - height) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (Y)
    jogo.canvas.position(jogo.canvas_x, jogo.canvas_y);

    SetupMenu();
    SetupFase1();
    SetupFase2();
    SetupPause();
}

function draw() {
        if(jogo.fase === "menu")
            DrawMenu(); // Desenha o Menu
        else if(jogo.fase === "fase1")
            DrawFase1(); // Desenha o Minigame 1
        else if(jogo.fase === "fase2")
            DrawFase2(); // Desenha o Minigame 2
        else if(jogo.fase === "pause")
            DrawPause(); // Desenha o menu de Pause

        Dash();
        fill(0, 0, 0)
        textSize(50)
        text(jogo.pontos, windowWidth - 100, 100);

        if (jogo.fase !== "menu" && jogo.tecla_esc) jogo.fase = "menu";
}

//MENU-----------------------------------------------------------------------------------------------------------------
function PreloadMenu()
{
    jogo.mapasImg[0] = mapa1 = loadImage("../imagens/mapas/mapaPrototipo.png");
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
    image(jogo.playerImg, jogo.player.x, jogo.player.y, 100, 100);

    //// Verifica colisão com parede
    jogo.walls.forEach(wall => {
        if (Colidiu(jogo.player, wall)) {
            jogo.player.x = jogo.player.oldX;
            jogo.player.y = jogo.player.oldY;
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
    if (Colidiu(jogo.player, portaEsquerda))
    {
        jogo.fase = "fase1";
        jogo.player.x = windowWidth / 2 - 50;
        jogo.player.y = windowHeight - 120;
    }
    else if (Colidiu(jogo.player, portaMeio))
    {
        jogo.fase = "fase2";
        jogo.player.x = windowWidth / 2 - 50;
        jogo.player.y = windowHeight - 120;
    }
    else if (Colidiu(jogo.player, portaDireita)) 
    {
        jogo.fase = "fase1";
        jogo.player.x = 20;
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
    jogo.mapasImg[1] = mapa2 = loadImage("../imagens/mapas/mapaPrototipo.png");

    // Carrega as ../imagens das lixeiras
    fase1.lixeiras_img = [
        loadImage("../imagens/lixeiras/lixeiraVermelha.png"),
        loadImage("../imagens/lixeiras/lixeiraAzul.png"),
        loadImage("../imagens/lixeiras/lixeiraAmarela.png"),
        loadImage("../imagens/lixeiras/lixeiraVerde.png"),
        loadImage("../imagens/lixeiras/lixeiraMarrom.png")
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
        loadImage("../imagens/lixos/bolinhaDePapelPixel.png"),
        loadImage("../imagens/lixos/garrafaVidroPixel.png"),
        loadImage("../imagens/lixos/bananaPixel.png"),
        loadImage("../imagens/lixos/bananaPodrePixel.png"),
        loadImage("../imagens/lixos/garrafaDePlasticoPixel.png"),
    ];
    
    // Carrega as ../imagens dos lixos reais
    fase1.lixosReaisCarregados = [
        loadImage("../imagens/lixos/bolinhaDePapel.png"), //0
        loadImage("../imagens/lixos/garrafaVidro.png"), //1
        // loadImage("../imagens/lixos/banana.png"), //2
        loadImage("../imagens/lixos/bananaPodre.png"), //3 -> 2
        loadImage("../imagens/lixos/garrafaDePlastico.png") //4 -> 3
    ]
    // Carrega a imagem do cartaz de procurado
    fase1.cartazProcuradoLixo = loadImage("../imagens/cartazProcuradoLixo.png");
}

function SetupFase1()
{
    fase1.lastItemPego = { x: 0, y: 0, w: 0, h: 0 , img: "", img_carregada: null, type: "null", class: null, angulo: 0 };

    fase1.lixeiras = [
        { x: windowWidth - 100, y: windowHeight / 2 + 125, w: 100, h: 100, img: "../imagens/lixeiras/lixeiraVermelha.png", descarte: "plastico", class: "lixeira" },
        { x:  windowWidth - 100, y: windowHeight / 2 + 275, w: 100, h: 100, img: "../imagens/lixeiras/lixeiraAzul.png", descarte: "papel", class: "lixeira" },
        { x:  windowWidth - 100, y: windowHeight / 2 - 125, w: 100, h: 100, img: "../imagens/lixeiras/lixeiraAmarela.png", descarte: "metal", class: "lixeira" },
        { x:  windowWidth - 100, y: windowHeight / 2 - 275, w: 100, h: 100, img: "../imagens/lixeiras/lixeiraVerde.png", descarte: "vidro", class: "lixeira" },
        { x: windowWidth - 100, y: windowHeight / 2, w: 100, h: 100, img: "../imagens/lixeiras/lixeiraMarrom.png", descarte: "organico", class: "lixeira" }
    ];
    fase1.lixos = [];

    jogo.pontos = 0;
    jogo.timer.segundos = 0;
    jogo.timer.ticks = 0;
}

function DrawFase1()
{

    if (!fase1.is_fase_carregada) {
        jogo.timer.ticks = 3600;
        jogo.timer.segundos = 60;
        jogo.pontos = 0;
        fase1.is_fase_carregada = true;
    }

    // background(0, 100, 0);
    image(jogo.mapasImg[1], 0, 0, windowWidth, windowHeight);

    ////repõe a quantidade de lixo no mapa
    if(fase1.lixos.length < 10) CriarLixo()

    //// Armazena posição antiga
    jogo.player.oldX = jogo.player.x;
    jogo.player.oldY = jogo.player.y;

    fase1.lastItemPego_OldX = fase1.lastItemPego.x;
    fase1.lastItemPego_OldY = fase1.lastItemPego.y;

    //// Movimento
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

    // Verifica a colisão com lixeira
    fase1.lixeiras.forEach(lixeira => {
        if (Colidiu(jogo.player, lixeira)) {
            jogo.player.x = jogo.player.oldX;
            jogo.player.y = jogo.player.oldY;
        }
    })

    //// Mostra o texto no lixo
    fase1.lixos.forEach(lixo => {
        if (!keyIsDown(32) && Colidiu(jogo.player, lixo)) {
            fill(255, 0, 0);
            textSize(16);
            text("Segure espaço", lixo.x - 10, lixo.y - 10);
        }
    })

    // Verifica se o lixo está na lixeira certa
    if (fase1.lastItemPego && Colidiu(jogo.player, fase1.lastItemPego)) // o lastLixoPego no 'if' verifica se o objeto está vazio ou não
    {
        fase1.lixeiras.forEach(lixeira => {
            if (fase1.lastItemPego && Colidiu(fase1.lastItemPego, lixeira)) {
                if (fase1.lastItemPego.type === lixeira.descarte)
                    jogo.pontos += 10;
                else
                    jogo.pontos -= 5;
                fase1.lixos = fase1.lixos.filter(obj => obj !== fase1.lastItemPego);
                fase1.lastItemPego = { X: 0, y: 0, w: 0, h: 0 , img: "", img_carregada: null, type: "null", class: "lixo", angulo: 0 };
            }
        })
    }

    // Checa se o botao de espaco foi pressionado
    PegarLixo(jogo.player, fase1.lixos);
    MostrarLixoReal();
    RotacionarLixo();

    fase1.lixeiras.forEach((lixeira, i) => { image(fase1.lixeiras_img[i], lixeira.x, lixeira.y, lixeira.w, lixeira.h) });
    
    fase1.lixos.forEach(lixo =>{
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

    ////Desenha personagem
    image(jogo.playerImg, jogo.player.x, jogo.player.y, jogo.player.w, jogo.player.h);

    TimerTick("Fase1");
}

// FASE 1---------------------------------------------------------------------------------------------------------------

// FASE 2--------------------------------------------------------------------------------------------------------------
function PreloadFase2()
{
    fase2.cadeirasCarregadas = [
        loadImage("../imagens/cadeiras/cadeira_0.png"),
        loadImage("../imagens/cadeiras/cadeira_1.png"),
        loadImage("../imagens/cadeiras/cadeira_2.png"),
        loadImage("../imagens/cadeiras/cadeira_2.png"),
        loadImage("../imagens/cadeiras/cadeira_4.png"),
        loadImage("../imagens/cadeiras/cadeira_4.png"),
        loadImage("../imagens/cadeiras/cadeira_6.png"),
        loadImage("../imagens/cadeiras/cadeira_7.png"),
    ]
}

function SetupFase2()
{
    fase2.cadeiras = [];
    fase2.lastItemPego = { x: 0, y: 0, w: 0, h: 0 , img: "", img_carregada: null, type: "null", class: null, angulo: 0 };
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
    image(jogo.playerImg, jogo.player.x, jogo.player.y, jogo.player.w, jogo.player.h);

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
    if (rand === 0) return "../imagens/lixos/bolinhaDePapelPixel.png";
    else if (rand === 1) return "../imagens/lixos/garrafaVidroPixel.png";
    else if (rand === 2) return "../imagens/lixos/bananaPixel.png";
    else if (rand === 3) return "../imagens/lixos/bananaPodrePixel.png";
    else return "../imagens/lixos/garrafaDePlasticoPixel.png";
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
