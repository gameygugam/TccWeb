let player = { x: 50, y: 50, w: 50, h: 50, oldX: 50, oldY: 50, img: "../imagens/castor.png" };
let wall = { x: 200, y: 150, w: 100, h: 100 };
let lixo = { x: 150, y: 250, w: 25, h: 25, oldX: 150, oldY: 250, img: "../imagens/bolinhaDePapelPixel.png" };

function setup() {
    createCanvas(1725, 880);
}

function draw() {
    background(30);

    // Armazena posição antiga
    player.oldX = player.x;
    player.oldY = player.y;

    lixo.oldXldX = lixo.x;
    lixo.oldY = lixo.y;

    // Movimento
    if (keyIsDown(87)) player.y -= 3;
    if (keyIsDown(83)) player.y += 3;
    if (keyIsDown(65)) player.x -= 3;
    if (keyIsDown(68)) player.x += 3;

    //Drag-Drop lixo
    // if (dragDrop(lixo)) {
    //     lixo.x = mouseX - lixo.w / 2;
    //     lixo.y = mouseY - lixo.h / 2;
    // }

    // Verifica colisão com parede
    if (colidiu(player, wall)) {
        player.x = player.oldX;
        player.y = player.oldY;
    }

    // Mostra o texto no lixo
    if (colidiu(player, lixo)) {
        fill(255, 0, 0);
        textSize(16);
        text("Segure espaço", lixo.x - 10, lixo.y - 10);
    }

    //Mostra a imagem do lixo
    // if (colidiu(player, lixo)) {
    //     image(lixo.img, lixo.x, lixo.y, lixo.w, lixo.h);
    // }

    // Checa se o botao de espaco foi pressionado
    if (keyIsDown(32) && colidiu(player, lixo)) {
        lixo.x = player.x;
        lixo.y = player.y;
    }

    //Desenha circulo de colisao
    // fill(0, 0, 255);
    // circle (player.x + player.w / 2, player.y + player.h / 2, 100);

    // fill(0, 0, 255);
    // circle (lixo.x + lixo.w / 2, lixo.y + lixo.h / 2, 100);

    //Desenha personagem, lixo e parede
    fill(0, 255, 0);
    // image(player.img, player.x, player.y, player.w, player.h);
    rect(player.x, player.y, player.w, player.h);

    fill(255, 0, 0);
    // image(lixo.img, lixo.x, lixo.y, lixo.w, lixo.h);
    rect(lixo.x, lixo.y, lixo.w, lixo.h);

    fill(200);
    rect(wall.x, wall.y, wall.w, wall.h);

}

function colidiu(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
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