let player = { x: 50, y: 50, w: 50, h: 50 };
let wall = { x: 200, y: 150, w: 100, h: 100 };

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(30);

    let oldX = player.x;
    let oldY = player.y;

    // Movimento
    if (keyIsDown(87)) player.y -= 3;
    if (keyIsDown(83)) player.y += 3;
    if (keyIsDown(65)) player.x -= 3;
    if (keyIsDown(68)) player.x += 3;

    if (mouseIsPressed && mouseX <= player.x + player.w && mouseX >= player.x && mouseY <= player.y + player.h && mouseY >= player.y)
    {
        player.x = mouseX - 20;
        player.y = mouseY - 20;
    }

    // Verifica colisão
    if (colidiu(player, wall)) {
        player.x = oldX;
        player.y = oldY;
    }

    fill(0, 255, 0);
    rect(player.x, player.y, player.w, player.h);

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