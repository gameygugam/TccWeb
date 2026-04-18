let player, walls, lixos;
let playerImg, lixoImg;
let pegouLixo, lastLixoPego;

function preload() {
    playerImg = loadImage("imagens/Castor.png");
    lixoImg = loadImage(sortearLixo());
}

function setup() {
    createCanvas(1900, 970);
    noSmooth();

    pegouLixo = false;
    player = { x: 50, y: 50, w: 100, h: 100, oldX: 50, oldY: 50 };
    walls = [
        wall1 = { x: 0, y: -2, w: 1900, h: 10 }, // Parede superior
        wall2 = { x: -2, y: 0, w: 10, h: 1000 }, // Parede esquerda
        wall3 = { x: 1890, y: 0, w: 10, h: 1000 }, //Parede direita
        wall4 = { x: 0, y: 962, w: 1900, h: 10 } //Parede baixo
    ];
    lixos = [];
}

function draw() {
    background(0, 100, 0);

    ////repõe a quantidade de lixo no mapa
    if(lixos.length < 10) {
        lixos.push({ x: 0, y: 0, w: 25, h: 25, oldX: 0, oldY: 0, img: "" }); 
        lixos[lixos.length - 1].x = random(100, 1800);
        lixos[lixos.length - 1].y = random(100, 800);
    }
    

    //// Armazena posição antiga
    player.oldX = player.x;
    player.oldY = player.y;

    lixos.forEach(lixo => {
        lixo.oldX = lixo.x;
        lixo.oldY = lixo.y;
    });

    //// Movimento
    if (keyIsDown(87)) player.y -= 3;
    if (keyIsDown(83)) player.y += 3;
    if (keyIsDown(65)) player.x -= 3;
    if (keyIsDown(68)) player.x += 3;

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
    pegarLixo(player, lixos)

    if (pegouLixo) {
        
    }
    ////Desenha circulo de colisao
    // fill(0, 0, 255);
    // circle (player.x + player.w / 2, player.y + player.h / 2, 100);

    // fill(0, 0, 255);
    // circle (lixo.x + lixo.w / 2, lixo.y + lixo.h / 2, 100);

    ////Desenha personagem, lixo e parede
    // fill(0, 255, 0);
    image(playerImg, player.x, player.y, player.w, player.h);
    // rect(player.x, player.y, player.w, player.h);

    lixos.forEach(lixo => {
        // fill(255, 0, 0);
        
        image(lixoImg, lixo.x, lixo.y, lixo.w, lixo.h);
        // rect(lixo.x, lixo.y, lixo.w, lixo.h);
    })

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
            }
        })
    )
}

function sortearLixo() {
    let rand = random(4);
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