let player, walls, lixos, lixeiras;
let playerImg, lixoImg;
let pegouLixo, lastLixoPego;
let banana, bananaPodre, garrafaVidro, bolinhaPapel;
let cartazProcuradoLixo;

let canvas; //Cria a tela do Jogo [Gustavo bot esqueceu de atribuir a tela em uma variável]
let canvas_x, canvas_y;

function preload() {
    // Carrega a imagem do player
    playerImg = loadImage("imagens/Castor.png");

    // Carrega as imagens das lixeiras
    lixeiras_img = [
        lixeira_vermelha = loadImage("imagens/lixeiras/lixeiraVermelha.png"),
        lixeira_azul = loadImage("imagens/lixeiras/lixeiraAzul.png"),
        lixeira_amarela = loadImage("imagens/lixeiras/lixeiraAmarela.png"),
        lixeira_verde = loadImage("imagens/lixeiras/lixeiraVerde.png"),
    ];

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
    ];
    // Carrega as imagens sorteadas atrás
    lixosPixelImgCarregados = [
        lixo1 = loadImage(lixosPixelImg[0]),
        lixo2 = loadImage(lixosPixelImg[1]),
        lixo3 = loadImage(lixosPixelImg[2]),
        lixo4 = loadImage(lixosPixelImg[3]),
        lixo5 = loadImage(lixosPixelImg[4]),
        lixo6 = loadImage(lixosPixelImg[5]),
        lixo7 = loadImage(lixosPixelImg[6]),
        lixo8 = loadImage(lixosPixelImg[7]),
        lixo9 = loadImage(lixosPixelImg[8]),
        lixo10 = loadImage(lixosPixelImg[9]),
    ];

    // Carrega as imagens dos lixos reais
    bolinhaPapel = loadImage("imagens/lixos/bolinhaDePapel.png");
    garrafaVidro = loadImage("imagens/lixos/garrafaVidro.png");
    banana = loadImage("imagens/lixos/banana.png");
    bananaPodre = loadImage("imagens/lixos/bananaPodre.png");

    // Carrega a imagem do cartaz de procurado
    cartazProcuradoLixo = loadImage("imagens/cartazProcuradoLixo.png");
}

function setup() {

    canvas = createCanvas(windowWidth, windowHeight); //1900, 970 [Gustavo/Antigo]
    noSmooth();

    pegouLixo = false;
    canvas_x = ((windowWidth - width) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (X)
    canvas_y = ((windowHeight - height) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (Y)
    canvas.position(canvas_x, canvas_y);

    player = { x: 50, y: 50, w: 100, h: 100, oldX: 50, oldY: 50, type: "player" };
    walls = [
        wall1 = { x: 0, y: 0, w: windowWidth, h: 10, type: "wall" }, // Parede superior
        wall2 = { x: 0, y: 0, w: 10, h: windowHeight, type: "wall" }, // Parede esquerda
        wall3 = { x: windowWidth - 10, y: 0, w: 10, h: windowHeight, type: "wall" }, //Parede direita
        wall4 = { x: 0, y: windowHeight - 10, w: windowWidth , h: 10, type: "wall" } //Parede baixo
    ];
    lixeiras = [
        lixeira_vermelha = { x: windowWidth - 100, y: windowHeight / 2 + 100, w: 100, h: 100, img: lixeiras_img[0], descarte: "plastico", type: "lixeira" }, // Parede superior
        lixeira_azul = { x:  windowWidth - 100, y: windowHeight / 2 + 200, w: 100, h: 100, img: lixeiras_img[1], descarte: "papel", type: "lixeira" }, // Parede esquerda
        lixeira_amarela = { x:  windowWidth - 100, y: windowHeight / 2 - 100, w: 100, h: 100, img: lixeiras_img[2], descarte: "metal", type: "lixeira" }, //Parede direita
        lixeira_verde = { x:  windowWidth - 100, y: windowHeight / 2 - 200, w: 100, h: 100, img: lixeiras_img[3], descarte: "vidro", type: "lixeira" } //Parede baixo
    ];
    lixos = [];
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    canvas_x = ((windowWidth - width) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (X)
    canvas_y = ((windowHeight - height) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (Y)
    canvas.position(canvas_x, canvas_y);
}

function draw() {
    background(0, 100, 0);

    ////repõe a quantidade de lixo no mapa
    if(lixos.length < 10) CriarLixo()

    //// Armazena posição antiga
    player.oldX = player.x;
    player.oldY = player.y;

    //// Movimento
    if (keyIsDown(87) || keyIsDown(UP_ARROW)) player.y -= 3; // 87 ASCII -> W
    if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) player.y += 3; // 83 ASCII -> S
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) player.x -= 3; // 65 ASCII -> A
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) player.x += 3; // 68 ASCII -> D

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

    //// Mostra o texto no lixo
    lixos.forEach(lixo => {
        if (Colidiu(player, lixo)) {
            fill(255, 0, 0);
            textSize(16);
            text("Segure espaço", lixo.x - 10, lixo.y - 10);
        }
    })

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
    
    lixos.forEach((lixo, i) => { image(lixosPixelImgCarregados[i], lixo.x, lixo.y, lixo.w, lixo.h) });

    walls.forEach(wall => {
        fill(0, 255, 0);
        rect(wall.x, wall.y, wall.w, wall.h);
    });
}

function Colidiu(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

function PegarLixo(a, b) {
    return (
        b.forEach(lixo => {
            if (keyIsDown(32) && Colidiu(a, lixo)) {
                lixo.x = a.x + a.w - 10;
                lixo.y = a.y + a.h / 2;
                pegouLixo = true;
                lastLixoPego = lixo;
                // window.alert(lastLixoPego.img);
            }
        })
    )
}

function MostrarLixoReal() {
    if (keyIsDown(32) && Colidiu(player, lastLixoPego)) {

        image(cartazProcuradoLixo, lastLixoPego.x, lastLixoPego.y - 75, 200, 300); // Mostra o cartaz de procurado

        // Mostra os lixos reais
        if(lastLixoPego.img === "imagens/lixos/bolinhaDePapelPixel.png")
            image(bolinhaPapel, lastLixoPego.x, lastLixoPego.y, 200, 200);
        else if(lastLixoPego.img === "imagens/lixos/garrafaVidroPixel.png")
            image(garrafaVidro, lastLixoPego.x, lastLixoPego.y, 150, 200);
        else if(lastLixoPego.img === "imagens/lixos/bananaPixel.png")
            image(banana, lastLixoPego.x, lastLixoPego.y, 200, 200);
        else if (lastLixoPego.img === "imagens/lixos/bananaPodrePixel.png")
            image(bananaPodre, lastLixoPego.x, lastLixoPego.y, 200, 200);
    }
}

function CriarLixo() {
    lixos.push({ x: 0, y: 0, w: 25, h: 25, img: "", type: "lixo" }); 
        
    let lixo_x = ((windowWidth - width) / 2);
    let lixo_y = ((windowHeight - height) / 2);

    lixos[lixos.length - 1].img = lixosPixelImg[lixos.length - 1]; //tentativa de adicionar o img no objeto
    lixos[lixos.length - 1].x = random(lixo_x + 50, (lixo_x + width) - 50);
    lixos[lixos.length - 1].y = random(lixo_y + 50, (lixo_y + height) - 50);
}

function SortearLixoPixel() {
    let rand = floor(random(5));
    if (rand === 0) return "imagens/lixos/bolinhaDePapelPixel.png";
    else if (rand === 1) return "imagens/lixos/garrafaVidroPixel.png";
    else if (rand === 2) return "imagens/lixos/bananaPixel.png";
    else if (rand === 3) return "imagens/lixos/garrafaDePlasticoPixel.png";
    else return "imagens/lixos/bananaPodrePixel.png";
}

// function dragDrop(a) {
//     return (
//         mouseIsPressed &&
//         mouseX <= a.x + a.w
//         && mouseX >= a.x
//         && mouseY <= a.y + a.h
//         && mouseY >= a.y
//     );
// }