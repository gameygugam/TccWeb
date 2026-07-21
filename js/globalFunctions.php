<?php

require_once __DIR__ . '\..\includes\auth.php';

?>

<script>

//PLAYER ---------------------------------------------------------------------------------------------------------------->

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
        //dir.mult(3);
        if ((jogo.player.dash_cooldown <= 50 && jogo.player.dash_cooldown >= 41) && jogo.shift_esquerdo){
            jogo.player.dash_cooldown = 300
            jogo.player.dash_duracao = 10
        }

        else if ((jogo.player.dash_cooldown <= 40 && jogo.player.dash_cooldown >= 30) && jogo.shift_esquerdo){
            jogo.player.dash_cooldown = 250
            jogo.player.dash_duracao = 10
            jogo.pontos++;
        }

        else if (jogo.player.dash_cooldown < 30 && jogo.shift_esquerdo){
            jogo.player.dash_cooldown = 300
            jogo.player.dash_duracao = 10
        }

        if (jogo.player.dash_duracao === 9 || jogo.player.dash_duracao === 8) dir.mult(9)
        else if (jogo.player.dash_duracao === 7 || jogo.player.dash_duracao === 6) dir.mult(12)
        else if (jogo.player.dash_duracao === 5 || jogo.player.dash_duracao === 4) dir.mult(12)
        else if (jogo.player.dash_duracao === 3 || jogo.player.dash_duracao === 2) dir.mult(9)
        else if (jogo.player.dash_duracao === 1) dir.mult(6)
        else if (jogo.player.dash_duracao === 0) dir.mult(3)
    }
    jogo.player.x += dir.x;
    jogo.player.y += dir.y;    
}

function Colidiu(a, b) 
{
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function Dash(){

    if (jogo.player.dash_cooldown > 0) jogo.player.dash_cooldown--;
    if (jogo.player.dash_duracao > 0) jogo.player.dash_duracao--;

    if (jogo.player.dash_cooldown <= 50 && jogo.player.dash_cooldown >= 41) fill(255, 0, 0)
    else if (jogo.player.dash_cooldown <= 40 && jogo.player.dash_cooldown >= 30) fill(0, 255, 0)
    else if (jogo.player.dash_cooldown < 30) fill(255, 0, 0)

    text(jogo.player.dash_cooldown, 50, windowHeight - 50);
}

function AnimacaoStandBy(){
    // if (jogo.timerGlobal === 128 || jogo.timerGlobal === 129){
    //     jogo.player.w = 105
    //     jogo.player.h = 105
    // }

    // else if (jogo.timerGlobal === 130 || jogo.timerGlobal === 131){
    //     jogo.player.w = 110
    //     jogo.player.h = 110
    // }

    // else if (jogo.timerGlobal === 132 || jogo.timerGlobal === 133){
    //     jogo.player.w = 115
    //     jogo.player.h = 115
    // }

    // else if (jogo.timerGlobal === 134 || jogo.timerGlobal === 135){
    //     jogo.player.w = 110
    //     jogo.player.h = 110
    // }

    // else if (jogo.timerGlobal === 136 || jogo.timerGlobal === 137){
    //     jogo.player.w = 105
    //     jogo.player.h = 105
    // }

    // else if (jogo.timerGlobal === 138 || jogo.timerGlobal === 139){
    //     jogo.player.w = 100
    //     jogo.player.h = 100
    // }
}

function MudarFase(fase) {
    jogo.fase = fase;

    fetch("../includes/salvar_fase.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "fase=" + fase
    });
}

//<-----------------------------------------------------------------------------------------------------------------------

//ABA ------------------------------------------------------------------------------------------------------------------->

function windowResized() 
{
    resizeCanvas(windowWidth, windowHeight);

    jogo.canvas_x = ((windowWidth - width) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (X)
    jogo.canvas_y = ((windowHeight - height) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (Y)
    jogo.canvas.position(jogo.canvas_x, jogo.canvas_y);
}

//<-----------------------------------------------------------------------------------------------------------------------

//TIMER ----------------------------------------------------------------------------------------------------------------->

function TimerTick(fase_funcao){

    if (fase_funcao === "Fase1"){
        jogo.timer.ticks--;
        if (jogo.timer.ticks % 60 === 0) jogo.timer.segundos--;
        if (jogo.timer.segundos <= 0) {
            jogo.fase = 'menu';
            fase1.is_fase_carregada = false;
        }
    }

    else if (fase_funcao === "Fase2"){
        jogo.timer.ticks++;
        if (jogo.timer.ticks % 60 === 0) {
            jogo.timer.ticks = 0;
            jogo.timer.segundos++;
        }
    }

    fill(0, 0, 0);
        textSize(50);
        text(jogo.timer.segundos, 100, 100);
        text(jogo.timer.ticks, 300, 100);

}

//<-----------------------------------------------------------------------------------------------------------------------

//TECLAS ----------------------------------------------------------------------------------------------------------------->

function keyPressed2(fase) {
    if (key === 'q' || key === 'Q') {

        // ROTAÇÂO DE IMAGEM
        if (fase.lastItemPego) {

            fase.lastItemPego.variante--;
            if (fase.lastItemPego.variante < 0) fase.lastItemPego.variante = 7;
            fase.lastItemPego.imgCarregada = fase.cadeirasCarregadas[fase.lastItemPego.variante];

        }
    }

    else if (key === 'e' || key === 'E') {

        // ROTAÇÂO DE IMAGEM
        if (fase.lastItemPego) {

            fase.lastItemPego.variante++;
            if (fase.lastItemPego.variante > 7) fase.lastItemPego.variante = 0;
            fase.lastItemPego.imgCarregada = fase.cadeirasCarregadas[fase.lastItemPego.variante];

        }
    }
}

function keyPressed()
{
    if(jogo.fase === "menu" && keyCode === ENTER)
        jogo.fase = "fase1";
    if(jogo.fase === "fase1" && keyCode === ESCAPE)
        // jogo.fase = "pause";
        
    if (jogo.fase === "pause" && keyCode === ESCAPE)
        jogo.fase = "fase1";

    if (jogo.fase === "fase2") keyPressed2(fase2);

    if (event.code === "ShiftLeft") {
        jogo.shift_esquerdo = true;
    }

    if (event.code === "Escape") {
        jogo.tecla_esc = true;
    }
}

function keyReleased(event) {
    if (event.code === "ShiftLeft") {
        jogo.shift_esquerdo = false;
    }

    if (event.code === "Escape") {
        jogo.tecla_esc = false;
    }
}

//<-----------------------------------------------------------------------------------------------------------------------

//FASES ----------------------------------------------------------------------------------------------------------------->

//fase1 -->

function PegarLixo(player_funcao, lixos_funcao) {
    return (
        lixos_funcao.forEach(lixo => {
            if (keyIsDown(32) && Colidiu(player_funcao, lixo) && (fase1.lastItemPego == lixo || fase1.lastItemPego.material == "null")) { // 'lastLixoPego[6]' -> é considerado uma lista, não um objeto
                lixo.x = player_funcao.x + player_funcao.width - 10;
                lixo.y = player_funcao.y + player_funcao.height / 2;
                fase1.pegouLixo = true;
                fase1.lastItemPego = lixo;
                // window.alert(lastLixoPego.type);
            }
            else if (!keyIsDown(32)) fase1.lastItemPego = Lixo.novo(null, null, 0, 0, 0, 0, null, 0);
            // fase1.lastItemPego = { x: 0, y: 0, w: 0, h: 0 , img: "", img_carregada: null, type: "null", class: "lixo", angulo: 0 };
        })
    )
}

function MostrarLixoReal() {
    if (fase1.lastItemPego && Colidiu(jogo.player, fase1.lastItemPego)) {// o lastLixoPego no 'if' verifica se o objeto está vazio ou não
        image(fase1.cartazProcuradoLixo, fase1.lastItemPego.x, fase1.lastItemPego.y - 75, 200, 300); // Mostra o cartaz de procurado

        // Verifica e mostra os lixos reais
        if(fase1.lastItemPego.material === "papel")
            image(fase1.lixosReaisCarregados[0], fase1.lastItemPego.x, fase1.lastItemPego.y, 200, 200);
        else if(fase1.lastItemPego.material === "vidro")
            image(fase1.lixosReaisCarregados[1], fase1.lastItemPego.x, fase1.lastItemPego.y, 150, 200);
        else if (fase1.lastItemPego.material === "organico")
            image(fase1.lixosReaisCarregados[2], fase1.lastItemPego.x, fase1.lastItemPego.y, 200, 200);
        else if (fase1.lastItemPego.material === "plastico")
            image(fase1.lixosReaisCarregados[3], fase1.lastItemPego.x, fase1.lastItemPego.y, 200, 200);
    }
}

function AleatoriezarPosicao(objeto) {
    let dif_x = ((windowWidth - width) / 2);
    let dif_y = ((windowHeight - height) / 2);

    let objeto_x = random(dif_x + 50, (dif_x + width) - 50);
    let objeto_y = random(dif_y + 50, (dif_y + height) - 50);
}

function AleatoriezarPosicaoLixo(lixo) {
    let dif_x = ((windowWidth - width) / 2);
    let dif_y = ((windowHeight - height) / 2);

    let lixo_x = random(dif_x + 50, (dif_x + width) - 200);
    let lixo_y = random(dif_y + 50, (dif_y + height) - 50);
}

function CriarLixo() {

    let dif_x = ((windowWidth - width) / 2);
    let dif_y = ((windowHeight - height) / 2);

    let lixo_x = random(jogo.xInicialMapa, jogo.xFinalMapa - 250);
    let lixo_y = random(dif_y + 50, height - 50);

    //let lixo = [0, 0, 25, 25, "", "", ""] //x, y, w, h, img, type, class
    let lixo_img = null;
    let lixo_img_carregada = null;
    let lixo_type = null;
        
    let rnd = floor(random(5));

    lixo_img_carregada = fase1.lixosPixelImgCarregados[rnd]
    //lixo_img = lixosPixelImgCarregados[rnd]

    if (rnd == 0) lixo_type = "papel" //0 -> BolinhaDePapel
    else if (rnd == 1) lixo_type = "vidro" //0 -> Banana
    else if (rnd == 2 || rnd == 3) lixo_type = "organico" //0 -> BananaPodre
    else if (rnd == 4) lixo_type = "plastico" //0 -> GarrafaDePlastico

    let lixo_angulo = random(TWO_PI)

    // let lixo = fase1.lixos.push({ x: lixo_x, y: lixo_y, w: 25, h: 25, img: lixo_img, imgCarregada: lixo_img_carregada, type: lixo_type, class: "lixo", angulo: lixo_angulo });
    let lixo = Lixo.novo(null, lixo_img_carregada, 25, 25, lixo_x, lixo_y, lixo_type, lixo_angulo);
    fase1.lixos.push(lixo);

    /*lixos[lixos.length - 1].img = lixosPixelImg[lixos.length - 1]; // Adiciona imagem pixel no parametro
    lixos[lixos.length - 1].imgCarregada = lixosPixelImgCarregados[lixos.length - 1]; // Adiciona imagem pixel carregada no parametro
    // Adiciona o tipo do lixo de acordo com as lixeiras existentes
    if (lixos[lixos.length - 1].img === "../imagens/lixos/bolinhaDePapelPixel.png")
        lixos[lixos.length - 1].type = "papel"; // Azul
    else if (lixos[lixos.length - 1].img === "../imagens/lixos/garrafaVidroPixel.png")
        lixos[lixos.length - 1].type = "vidro"; // Verde
    else if (lixos[lixos.length - 1].img === "../imagens/lixos/bananaPixel.png")
        lixos[lixos.length - 1].type = "organico"; // Marrom
    else if (lixos[lixos.length - 1].img === "../imagens/lixos/bananaPodrePixel.png")
        lixos[lixos.length - 1].type = "organico"; // Marrom
    else if (lixos[lixos.length - 1].img === "../imagens/lixos/garrafaDePlasticoPixel.png")
        lixos[lixos.length - 1].type = "plastico"; // Vermelha*/

    /*lixos[lixos.length - 1].x = random(lixo_x + 50, (lixo_x + width) - 200);
    lixos[lixos.length - 1].y = random(lixo_y + 50, (lixo_y + height) - 50);*/
}

function RotacionarLixo() {
    if (keyIsDown(81) && fase1.lastItemPego.material != "null") { // 82 = tecla 'Q'
        fase1.lastItemPego.angulo += 0.1; // gira aos poucos
    }

    else if (keyIsDown(69) && fase1.lastItemPego.material != "null") { // 82 = tecla 'E'
        fase1.lastItemPego.angulo -= 0.1; // gira aos poucos
    }
}

//<--------

//fase2 -->

function CriarSala() {
    const sala_de_aula = Sala.novo(null, null, null)
    fase2.sala = sala_de_aula
}

function CriarQuadro() {

    let quadro_x;
    let quadro_y;

    let quadro_width;
    let quadro_height;
    
    let quadro_variante = 1//floor(random(3));

    if (quadro_variante === 1) { //Quadro Superior
        quadro_x = 0
        quadro_y = 10
        quadro_width = windowWidth
        quadro_height = 10;
    }

    // walls = [
    //     wall1 = { x: 0, y: 0, w: windowWidth, h: 10, class: "wall" }, // Parede superior
    //     wall2 = { x: 0, y: 0, w: 10, h: windowHeight, class: "wall" }, // Parede esquerda
    //     wall3 = { x: windowWidth - 10, y: 0, w: 10, h: windowHeight, class: "wall" }, //Parede direita
    //     wall4 = { x: 0, y: windowHeight - 10, w: windowWidth , h: 10, class: "wall" } //Parede baixo
    // ];
    

    // //let lixo = [0, 0, 25, 25, "", "", ""] //x, y, w, h, img, type, class
    // let cadeira_img = null;
    // let cadeira_img_carregada = null;

    // cadeira_img_carregada = cadeirasCarregadas[cadeira_variante];
    //lixo_img = lixosPixelImgCarregados[rnd]

    fase2.cadeiras.push({ x: quadro_x, y: quadro_y, w: quadro_width, h: quadro_height, class: "quadro", variante: quadro_variante }); 

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

        fase2.cadeiras.forEach(cadeira => {
            if (Math.abs(cadeira.x - cadeira_x) < 50 && Math.abs(cadeira.y - cadeira_y) < 50) {
                posicao_possivel = false;
            }
        })
    }
    

    //let lixo = [0, 0, 25, 25, "", "", ""] //x, y, w, h, img, type, class
    let cadeira_img = null;
    let cadeira_img_carregada = null;

    cadeira_img_carregada = fase2.cadeirasCarregadas[cadeira_variante];
    //lixo_img = lixosPixelImgCarregados[rnd]

    fase2.cadeiras.push({ x: cadeira_x, y: cadeira_y, w: 75, h: 75, img: cadeira_img, imgCarregada: cadeira_img_carregada, class: "cadeira", variante: cadeira_variante }); 

}

function PegarCadeira(player_funcao, cadeiras_funcao) {
    return (
        cadeiras_funcao.forEach(cadeira => {
            if (keyIsDown(32) && Colidiu(player_funcao, cadeira) && (fase2.lastItemPego == cadeira || fase2.lastItemPego.material == "null")) { // 'lastLixoPego[6]' -> é considerado uma lista, não um objeto
                cadeira.x = player_funcao.x + player_funcao.width - 10;
                cadeira.y = player_funcao.y + player_funcao.height / 2;
                fase2.pegouCadeira = true;
                fase2.lastItemPego = cadeira;
                // window.alert(lastLixoPego.type);
            }
            else if (!keyIsDown(32)) fase2.lastItemPego = { x: 0, y: 0, w: 0, h: 0 , img: "", img_carregada: null, type: "null", class: "cadeira", variante:0 };
        })
    )
}

//<--------

//<-----------------------------------------------------------------------------------------------------------------------

</script>