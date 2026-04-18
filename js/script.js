let player, walls, lixos;
let playerImg, lixoImg;
let pegouLixo, lastLixoPego;

let canvas; //Cria a tela do Jogo [Gustavo bot esqueceu de atribuir a tela em uma variável]
let canvas_x, canvas_y;

function preload() {
    playerImg = loadImage("imagens/Castor.png");
    lixosPixelImg = [
        lixo1 = loadImage(sortearLixoPixel()),
        lixo2 = loadImage(sortearLixoPixel()),
        lixo3 = loadImage(sortearLixoPixel()),
        lixo4 = loadImage(sortearLixoPixel()),
        lixo5 = loadImage(sortearLixoPixel()),
        lixo6 = loadImage(sortearLixoPixel()),
        lixo7 = loadImage(sortearLixoPixel()),
        lixo8 = loadImage(sortearLixoPixel()),
        lixo9 = loadImage(sortearLixoPixel()),
        lixo10 = loadImage(sortearLixoPixel())
    ];
    // lixosPixelImg = [
    //     lixo1 = sortearLixoPixel(),
    //     lixo2 = sortearLixoPixel(),
    //     lixo3 = sortearLixoPixel(),
    //     lixo4 = ortearLixoPixel(),
    //     lixo5 = sortearLixoPixel(),
    //     lixo6 = sortearLixoPixel(),
    //     lixo7 = sortearLixoPixel(),
    //     lixo8 = sortearLixoPixel(),
    //     lixo9 = sortearLixoPixel(),
    //     lixo10 = sortearLixoPixel()
    // ];
    // lixosPixelCarregados = [
    //     lixo1 = loadImage(lixosPixelImg[0]),
    //     lixo2 = loadImage(lixosPixelImg[1]),
    //     lixo3 = loadImage(lixosPixelImg[2]),
    //     lixo4 = loadImage(lixosPixelImg[3]),
    //     lixo5 = loadImage(lixosPixelImg[4]),
    //     lixo6 = loadImage(lixosPixelImg[5]),
    //     lixo7 = loadImage(lixosPixelImg[6]),
    //     lixo8 = loadImage(lixosPixelImg[7]),
    //     lixo9 = loadImage(lixosPixelImg[8]),
    //     lixo10 = loadImage(lixosPixelImg[9]),
    // ]
    lixosReaisImg = [
        bolinha = loadImage("imagens/lixos/bolinhaDePapel.png"),
        garrafa = loadImage("imagens/lixos/garrafaVidro.png"),
        banana = loadImage("imagens/lixos/banana.png"),
        bananaPodre = loadImage("imagens/lixos/bananaPodre.png"),
    ];
}

function setup() {

    canvas = createCanvas(windowWidth, windowHeight); //1900, 970 [Gustavo/Antigo]
    noSmooth();

    pegouLixo = false;
    canvas_x = ((windowWidth - width) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (X)
    canvas_y = ((windowHeight - height) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (Y)
    canvas.position(canvas_x, canvas_y);

    player = { x: 50, y: 50, w: 100, h: 100, oldX: 50, oldY: 50 };
    walls = [
        wall1 = { x: 0, y: 0, w: windowWidth, h: 10 }, // Parede superior
        wall2 = { x: 0, y: 0, w: 10, h: windowHeight }, // Parede esquerda
        wall3 = { x: windowWidth - 10, y: 0, w: 10, h: windowHeight}, //Parede direita
        wall4 = { x: 0, y: windowHeight - 10, w: windowWidth , h: 10 } //Parede baixo
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
        if (colidiu(player, wall)) {
            player.x = player.oldX;
            player.y = player.oldY;
        }
    });

    //// Mostra o texto no lixo
    lixos.forEach(lixo => {
        if (colidiu(player, lixo)) {
            fill(255, 0, 0);
            textSize(16);
            text("Segure espaço", lixo.x - 10, lixo.y - 10);
        }
    })

    ////Mostra a imagem do lixo
    // if (colidiu(player, lixo)) {
    //     image(lixo.img, lixo.x, lixo.y, lixo.w, lixo.h);
    // }

    // Checa se o botao de espaco foi pressionado
    pegarLixo(player, lixos);

    if (pegouLixo) {
        lixosPixelImg.forEach(lixoPx => {
            if(lixoPx === "imagens/lixos/bolinhaDePapelPixel.png")
                image(lixosReaisImg.bolinha, lastLixoPego.x, lastLixoPego.y, 100, 100);
            else if(lixoPx === "imagens/lixos/garrafaVidro.png")
                image(lixosReaisImg.garrafa, lastLixoPego.x, lastLixoPego.y, 100, 100);
            else if(lixoPx === "imagens/lixos/banana.png")
                image(lixosReaisImg.banana, lastLixoPego.x, lastLixoPego.y, 100, 100);
            else if(lixoPx === "imagens/lixos/bananaPodre.png")
                image(lixosReaisImg.bananaPodre, lastLixoPego.x, lastLixoPego.y, 100, 100);
            });
    }

    ////Desenha personagem, lixo e parede
    image(playerImg, player.x, player.y, player.w, player.h);

    lixos.forEach((lixo, i) => { image(lixosPixelImg[i], lixo.x, lixo.y, lixo.w, lixo.h) });

    walls.forEach(wall => {
        fill(0, 255, 0);
        rect(wall.x, wall.y, wall.w, wall.h);
    });
}

function colidiu(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

function pegarLixo(a, b) {
    return (
        b.forEach(lixo => {
            if (keyIsDown(32) && colidiu(a, lixo)) {
                lixo.x = a.x + a.w - 10;
                lixo.y = a.y + a.h / 2;
                pegouLixo = true;
                lastLixoPego = lixo;
                // window.alert(lastLixoPego.img);
            }
        })
    )
}

function CriarLixo(){
    lixos.push({ x: 0, y: 0, w: 25, h: 25, img: "" }); 
        
    let lixo_x = ((windowWidth - width) / 2);
    let lixo_y = ((windowHeight - height) / 2);

    // lixos[lixos.length - 1].img = lixosPixelImg[1]; //tentativa de adicionar o img no objeto
    lixos[lixos.length - 1].x = random(lixo_x + 50, (lixo_x + width) - 50);
    lixos[lixos.length - 1].y = random(lixo_y + 50, (lixo_y + height) - 50);
}

function sortearLixoPixel() {
    let rand = floor(random(4));
    if (rand === 0) return "imagens/lixos/bolinhaDePapelPixel.png";
    else if (rand === 1) return "imagens/lixos/garrafaVidroPixel.png";
    else if (rand === 2) return "imagens/lixos/bananaPixel.png";
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