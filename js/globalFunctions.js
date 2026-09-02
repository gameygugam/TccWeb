//PLAYER ---------------------------------------------------------------------------------------------------------------->



function Movimentar() 
{
    if(!jogo.pause) {
        let dir = createVector(0, 0);
        if (keyIsDown(87) || keyIsDown(UP_ARROW)) dir.y -= 1;
        if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) dir.y += 1;
        if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) dir.x -= 1;
        if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) dir.x += 1;

        if ((keyIsDown(65) || keyIsDown(LEFT_ARROW))) {
            if(fase1.pegouLixo) jogo.playerImg = jogo.playerImgEsquerdaSegurandoLixo
            else jogo.playerImg = jogo.playerImgEsquerda
        } 
        if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW))) {
            if(fase1.pegouLixo) jogo.playerImg = jogo.playerImgDireitaSegurandoLixo
            else jogo.playerImg = jogo.playerImgDireita
        }

        // Normaliza o vetor para não alterar a velocidade do personagem. EX: W = 4, S = 4; W + S != 8; W + S = 4
        if (dir.mag() > 0) {
            dir.normalize();
            dir.mult(4 * jogo.escala);
            if (keyIsDown(16) || keyIsDown(SHIFT)) dir.mult(1.5)
        }
        jogo.player.x += dir.x;
        jogo.player.y += dir.y;   
    }
}

// <--------------------------------------------------------------------------

//FUNÇÃO MOVIMENTAR + DASH ------------------------------------------>
// function Movimentar() 
// {
//     let dir = createVector(0, 0);
//     if (keyIsDown(87) || keyIsDown(UP_ARROW)) dir.y -= 1;
//     if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) dir.y += 1;
//     if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) dir.x -= 1;
//     if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) dir.x += 1;
//     // Normaliza o vetor para não alterar a velocidade do personagem. EX: W = 4, S = 4; W + S != 8; W + S = 4
//     if (dir.mag() > 0) {
//         dir.normalize();
//         //dir.mult(3);
//         if ((jogo.player.dash_cooldown <= 50 && jogo.player.dash_cooldown >= 41) && jogo.shift_esquerdo){
//             jogo.player.dash_cooldown = 300
//             jogo.player.dash_duracao = 10
//         }

//         else if ((jogo.player.dash_cooldown <= 40 && jogo.player.dash_cooldown >= 30) && jogo.shift_esquerdo){
//             jogo.player.dash_cooldown = 250
//             jogo.player.dash_duracao = 10
//             jogo.pontos++;
//         }

//         else if (jogo.player.dash_cooldown < 30 && jogo.shift_esquerdo){
//             jogo.player.dash_cooldown = 300
//             jogo.player.dash_duracao = 10
//         }

//         if (jogo.player.dash_duracao === 9 || jogo.player.dash_duracao === 8) dir.mult(9)
//         else if (jogo.player.dash_duracao === 7 || jogo.player.dash_duracao === 6) dir.mult(12)
//         else if (jogo.player.dash_duracao === 5 || jogo.player.dash_duracao === 4) dir.mult(12)
//         else if (jogo.player.dash_duracao === 3 || jogo.player.dash_duracao === 2) dir.mult(9)
//         else if (jogo.player.dash_duracao === 1) dir.mult(6)
//         else if (jogo.player.dash_duracao === 0) dir.mult(3)
//     }
//     jogo.player.x += dir.x;
//     jogo.player.y += dir.y;    
// }
// <--------------------------------------------------------------------------

function Colidiu(a, b) 
{
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function MouseNoBotao(mouse, botao) {
    return (
        mouse.x >= botao.x &&
        mouse.x <= botao.x + botao.width &&
        mouse.y >= botao.y &&
        mouse.y <= botao.y + botao.height
    );
}

function Dash(){

    if (jogo.player.dash_cooldown > 0) jogo.player.dash_cooldown--;
    if (jogo.player.dash_duracao > 0) jogo.player.dash_duracao--;

    if (jogo.player.dash_cooldown <= 50 && jogo.player.dash_cooldown >= 41) fill(255, 0, 0)
    else if (jogo.player.dash_cooldown <= 40 && jogo.player.dash_cooldown >= 30) fill(0, 255, 0)
    else if (jogo.player.dash_cooldown < 30) fill(255, 0, 0)

    // textFont(texto.fonte);
    // text(jogo.player.dash_cooldown, 50, windowHeight - 50);
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

function TocarSom(sons) {

    let rnd = floor(random(sons.length))
    sons[rnd].volume = jogo.config.somVolume / 100
    sons[rnd].play()
}

function TocarMusica(musica) {
    musica.volume = jogo.config.musicaVolume / 100
    musica.play()
}

function TocarFundoMusical() {

    if(jogo.fase === "menu" || jogo.fase === "preFase1") {
        if(jogo.pause) jogo.musica.faseMenu.pause()
        else TocarMusica(jogo.musica.faseMenu)
    }
    else jogo.musica.faseMenu.pause()

    if(jogo.fase === "fase1") {
        if(jogo.pause) jogo.musica.fase1.pause()
        else if (jogo.timer.start > 261) TocarMusica(jogo.musica.fase1)
    }
    else jogo.musica.fase1.pause()
}

async function MudarIdioma(novoIdioma) {
    await loadJSON(`lang/${novoIdioma}.json`, dados => {

        jogo.textos = dados;
        jogo.idioma = novoIdioma;

        console.log("Idioma alterado para: ", jogo.idioma);
    });
}

function T(caminho, variaveis = {}) {

    let partes = caminho.split(".");
    let resultado = jogo.textos;

    for (let parte of partes) {
        resultado = resultado?.[parte];
    }

    if (resultado === undefined) {
        console.warn(`Tradução não encontrada: ${caminho}`);
        return caminho;
    }

    for (let chave in variaveis) {

        const valor = variaveis[chave];

        resultado = resultado.replaceAll(
            `{${chave}}`,
            valor
        );
    }

    return resultado;
}

async function MudarFase(fase) {
    jogo.fase = fase;
    ReiniciarDialogo(tutorial);

    await fetch("includes/salvar_fase.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "fase=" + fase
    });
}

async function RegistrarPartida(fase) {
    if(fase === "fase1") {
        await fetch("includes/salvar_partida.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "fase=" + fase + "&tempo=" + 0 + "&pontos=" + fase1.pontos
        })
        console.log("Partida Registrada");
    }
}

async function PegarIdioma() {
    const resposta = await fetch("includes/pegar_idioma.php");
    const dados = await resposta.json();

    jogo.idioma = dados.idioma;
}

async function PegarNome() {
    const resposta = await fetch("includes/pegar_nome.php");
    const dados = await resposta.json();

    jogo.nomeUsuario = dados.nome;

    //console.log(jogo.nomeUsuario);
}

async function PegarFase() {
    const resposta = await fetch("includes/pegar_fase.php");
    const dados = await resposta.json();

    jogo.fase = dados.fase;
}

async function PegarColegio() {
    const resposta = await fetch("includes/pegar_colegio.php");
    const dados = await resposta.json();

    jogo.colegioUsuario = dados.colegio;

    //console.log(jogo.colegioUsuario);
}

function Interagir(item, itemString) {
    fill(255, 0, 0);
    textFont(texto.fonte);
    if(itemString === "placa") {
        textSize(64 * jogo.escala);
        text(T("jogo.pressioneE"), jogo.xFinalMapa/2-100 * jogo.escala, jogo.yFinalMapa-64 * jogo.escala);
    }
    else {
        textSize(16 * jogo.escala);
        text(T("jogo.pressioneE"), item.x - 10, item.y - 10);
    }
}

//<-----------------------------------------------------------------------------------------------------------------------

//DIALOGOS -------------------------------------------------------------------------------------------------------------->

function CaixaDialogo() {
    push();
    background(0, 0, 0, 125);
    scale(jogo.escala);
    tint(255, tutorial.alpha);
    image(tutorial.caixaDialogo, texto.caixaX, texto.caixaY, texto.caixaWidth, texto.caixaHeight);

    noTint();
    if (tutorial.alpha < 255) {
        tutorial.alpha += 3;
    }
    textFont(texto.fonte);
    textSize(32);
    text(T("jogo.pressioneE_avancar"), texto.caixaX + texto.caixaWidth*0.65, texto.caixaY + texto.caixaHeight*0.9);
}

function Dialogo(dialogo) {
    fill(0, 0, 0)
    switch (dialogo) 
    {
        case "menu":
            texto.ativo = true;
            CaixaDialogo();

            switch(texto.incremento) {
                case 0:
                    texto.conteudo = T("menu.dialogos.fala1", {nomeUsuario: jogo.nomeUsuario});
                    break;

                case 1:
                    if(jogo.colegioUsuario === "cpii") texto.conteudo = T("menu.dialogos.fala2", {colegioUsuario: "Colégio Pedro II"});
                    else if(jogo.colegioUsuario === "cjba") texto.conteudo = T("menu.dialogos.fala2", {colegioUsuario: "Colégio CJBA"});
                    else if(jogo.colegioUsuario === "santosDummont") texto.conteudo = T("menu.dialogos.fala2", {colegioUsuario: "Colégio Santos Dummont"});
                    else if(jogo.colegioUsuario === "outros") texto.conteudo = T("menu.dialogos.fala2", {colegioUsuario: "Parque Internacional da Castorlândia"});
                    break;
                
                case 2:
                    texto.conteudo = T("menu.dialogos.fala3");
                    break;
                
                case 3:
                    texto.conteudo = T("menu.dialogos.fala4");
                    break;
                
                case 4:
                    texto.conteudo = T("menu.dialogos.fala5");
                    break;

                case 5:
                    texto.conteudo = T("menu.dialogos.fala6");
                    break;

                default:
                    ReiniciarDialogo(tutorial);
                    break;
            }
            Digitar();
            pop();
            break;

        case "preFase1":
            texto.ativo = true;
            CaixaDialogo();

            switch(texto.incremento) {
                case 0:
                    texto.conteudo = T("preFase1.dialogosInicio.fala1");
                    break;

                case 1:
                    texto.conteudo = T("preFase1.dialogosInicio.fala2");
                    break;
                
                default:
                    ReiniciarDialogo(tutorial);
                    break;
            }
            Digitar();
            pop();
            break;

        case "fase1":
            switch(tutorial.incremento) {
                case 0:
                    tint(255, tutorial.alpha);
                    image(tutorial.imagensFase1[0], 0, 0, windowWidth, windowHeight);

                    noTint();
                    if (tutorial.alpha < 255) {
                        tutorial.alpha += 3;
                    }
                    textFont(texto.fonte);
                    textSize(32);
                    text(T("jogo.pressioneE_avancar"), windowWidth*0.7, windowHeight*0.9);
                    break;

                case 1:
                    tutorial.alpha = 0;
                    image(tutorial.imagensFase1[1], 0, 0, windowWidth, windowHeight);
                    textFont(texto.fonte);
                    textSize(32);
                    text(T("jogo.pressioneE_avancar"), windowWidth*0.7, windowHeight*0.9);
                    break;
                
                case 2:
                    image(tutorial.imagensFase1[2], 0, 0, windowWidth, windowHeight);
                    textFont(texto.fonte);
                    textSize(32);
                    text(T("jogo.pressioneE_avancar"), windowWidth*0.7, windowHeight*0.9);
                    break;
                
                case 3:
                    image(tutorial.imagensFase1[3], 0, 0, windowWidth, windowHeight);
                    textFont(texto.fonte);
                    textSize(32);
                    text(T("jogo.pressioneE_avancar"), windowWidth*0.7, windowHeight*0.9);
                    break;
                
                case 4:
                    image(tutorial.imagensFase1[4], 0, 0, windowWidth, windowHeight);
                    textFont(texto.fonte);
                    textSize(32);
                    text(T("jogo.pressioneE_avancar"), windowWidth*0.7, windowHeight*0.9);
                    break;

                case 5:
                    image(tutorial.imagensFase1[5], 0, 0, windowWidth, windowHeight);
                    textFont(texto.fonte);
                    textSize(32);
                    text(T("jogo.pressioneE_avancar"), windowWidth*0.7, windowHeight*0.9);
                    break;

                case 6:
                    texto.ativo = true;
                    //// Cria o mapa
                    image(jogo.mapasImg[1], 0, 0, windowWidth, windowHeight);

                    ////Desenha personagem
                    image(jogo.playerImg, jogo.player.x, jogo.player.y, jogo.player.width * jogo.escala, jogo.player.height * jogo.escala);

                    fase1.lixeiras.forEach((lixeira, i) => { image(fase1.lixeiras_img[i], lixeira.x, lixeira.y, lixeira.width * jogo.escala, lixeira.height * jogo.escala) });

                    CaixaDialogo();

                    switch(texto.incremento) {
                        case 0:
                            texto.conteudo = T("fase1.dialogos.fala1");
                            break;
                        
                        case 1:
                            texto.conteudo = T("fase1.dialogos.fala2");
                            break;
                        
                        case 2:
                            texto.conteudo = T("fase1.dialogos.fala3");
                            break;
                        
                        case 3:
                            texto.conteudo = T("fase1.dialogos.fala4");
                            break;

                        case 4:
                            texto.conteudo = T("fase1.dialogos.fala5");
                            break;

                        case 5:
                            texto.conteudo = T("fase1.dialogos.fala6");
                            break;

                        case 6:
                            texto.conteudo = T("fase1.dialogos.fala7");
                            break;
//mlz  esteve aquui 
                        case 7:
                            texto.conteudo = T("fase1.dialogos.fala8", {nomeUsuario: jogo.nomeUsuario});
                            texto.ativo = false;
                            break;

                        default:
                            break;
                    }
                    Digitar();
                    pop();
                    break;

                default:
                    ReiniciarDialogo(tutorial);
                    break;
            }
            break;

        case "fimFase1":
            texto.ativo = true;
            CaixaDialogo();

            if(fase1.pontos >= 40) 
            {
                switch(texto.incremento) {
                    case 0:
                        texto.conteudo = T("preFase1.dialogosFinalBom.fala1");
                        break;
                    
                    case 1:
                        texto.conteudo = T("preFase1.dialogosFinalBom.fala2", {pontos: jogo.pontos});
                        break;

                    case 2:
                        texto.conteudo = T("preFase1.dialogosFinalBom.fala3");
                        break;

                    case 3:
                        texto.conteudo = T("preFase1.dialogosFinalBom.fala4");
                        break;

                    default:
                        fase1.terminou = false;
                        texto.ativo = false;
                        ReiniciarDialogo(tutorial);
                        break;
                }
                Digitar();
                pop();
                break;
            }
            else {
                switch(texto.incremento) {
                    case 0:
                        texto.conteudo = T("preFase1.dialogosFinalRuim.fala1");
                        break;
                    
                    case 1:
                        texto.conteudo = T("preFase1.dialogosFinalRuim.fala2", {pontos: fase1.pontos});
                        break;

                    case 2:
                        texto.conteudo = T("preFase1.dialogosFinalRuim.fala3");
                        break;

                    case 3:
                        texto.conteudo = T("preFase1.dialogosFinalRuim.fala4");
                        break;

                    default:
                        fase1.terminou = false;
                        texto.ativo = false;
                        ReiniciarDialogo(tutorial);
                        break;
                }
                Digitar();
                pop();
                break;
            }
        
    }
}

function ReiniciarDialogo(dialogo) {
    dialogo.incremento = 0;
    dialogo.ativo = false;
    dialogo.alpha = 0;
    texto.conteudo = "";
    texto.ativo = false;
    texto.intervalo = 50;
    texto.ultimoTempo = 0;
    texto.incremento = 0;
}
//<-----------------------------------------------------------------------------------------------------------------------

//ABA ------------------------------------------------------------------------------------------------------------------->

function windowResized() 
{
    if(windowWidth >= 640 && windowHeight >= 480) {
        resizeCanvas(windowWidth, windowHeight);

        jogo.canvas_x = ((windowWidth - width) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (X)
        jogo.canvas_y = ((windowHeight - height) / 2); //A diferença do tamanho da tela e do canvas para centralizar o jogo (Y)
        jogo.canvas.position(jogo.canvas_x, jogo.canvas_y);
    }
    else {
        windowWidth = 640;
        windowHeight = 480;
    }

    pause.opcoes.musica.slider.remove()
    pause.opcoes.som.slider.remove()

    jogo.pause = true;
    setup();
}

//<-----------------------------------------------------------------------------------------------------------------------

//TIMER ----------------------------------------------------------------------------------------------------------------->

function TimerTick(fase_funcao){

    if(!jogo.pause){
        if (fase_funcao === "fase1"){
            jogo.timer.ticks++;
            if (jogo.timer.ticks % jogo.FPS === 0) jogo.timer.segundos--;
            if (jogo.timer.segundos <= 0) {
                fase1.terminou = true;
                ReiniciarFase1();
                MudarFase("preFase1");
                RegistrarPartida("fase1");
            }
        }

        else if (fase_funcao === "fase2"){
            jogo.timer.ticks++;
            if (jogo.timer.ticks % jogo.FPS === 0) {
                jogo.timer.ticks = 0;
                jogo.timer.segundos++;
            }
        }
    }
    

    // fill(0, 0, 0);
    // textSize(50 * jogo.escala);
    // text(jogo.timer.segundos, 63 * jogo.escala, 105 * jogo.escala);
    // image(fase1.relogio, windowWidth/64, windowHeight/48, windowWidth/16, windowHeight/8);
    
    // text(jogo.timer.ticks, 300, 100);

}

//<-----------------------------------------------------------------------------------------------------------------------

//TECLAS/MOUSE ---------------------------------------------------------------------------------------------------------->      

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
    if (tutorial.ativo && !texto.ativo && (key === "e" || key === "E")) tutorial.incremento++;
    if (texto.ativo && (key === "e" || key === "E")) {
        texto.letras = 0;
        texto.incremento++;
    }

    if (jogo.fase === "fase2") keyPressed2(fase2);


    if (event.code === "ShiftLeft") {
        jogo.shift_esquerdo = true;
    }

    if (event.code === "Escape") {
        if(jogo.fase != "fase1"){
            MenuAlternar()
        }
        else if (!tutorial.ativo && jogo.timer.start > 261) {
            MenuAlternar()
        }
    }

    if (jogo.fase === "preFase1" && Colidiu(jogo.player, fase1.placa) && (key === "e" || key === "E") && jogo.cooldownInteragir <= 0) {
        // console.log("clicou");
        jogo.player.x = jogo.xFinalMapa / 2;
        jogo.player.y = jogo.yFinalMapa / 2;
        ReiniciarDialogo(tutorial);
        // console.log(tutorial.ativo);
        jogo.cooldownInteragir = 15;
        MudarFase("fase1");
        tutorial.ativo = true;
    };

    if (jogo.fase === "fase1" && !fase1.pegouLixo && !jogo.pause && (key === "e" || key === "E") && jogo.cooldownInteragir <= 0) {
        PegarLixo(jogo.player, fase1.lixos);
        jogo.cooldownInteragir = 15
    }

    if (jogo.fase === "fase1" && fase1.pegouLixo && !jogo.pause && (key === "e" || key === "E") && jogo.cooldownInteragir <= 0) {
        DespejarLixo(jogo.player, fase1.lixeiras);
        TocarSom(jogo.som.despejarLixo)
        jogo.cooldownInteragir = 15
    }

    //TECLAS PARA REMOVER QUANDO ACABAR O JOGO!!! (ATALHO PROS PROGRAMMER)

    if (event.code === "Backspace") {
        jogo.sairDoJogo = true;
    }

    if (key === "l" || key === "L") {
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        fase1.lixos.push(CriarLixo())
        
    }

    if (key === "t" || key === "T") tutorial.ativo = false

    if(jogo.fase === "menu" && keyCode === ENTER) jogo.fase = "preFase1";

    if(jogo.fase === "fase1" && keyCode === ESCAPE) // jogo.fase = "pause";
    
    if (jogo.fase === "pause" && keyCode === ESCAPE) jogo.fase = "fase1";

    console.log("musica:" + jogo.config.musicaVolume)
    
}

function keyReleased(event) {
    if (event.code === "ShiftLeft") {
        jogo.shift_esquerdo = false;
    }

    // if (event.code === "Escape") {
    //     jogo.pause = false;
    // }

    if (event.code === "Backspace") {
        jogo.sairDoJogo = false;
    }
}

function mousePressed() {

    jogo.qtdMouseInteracoes++
    let mouse = {x: mouseX, y: mouseY}

    if(pause.menuPause){
        if(!pause.menuOpcoesON){
            if(MouseNoBotao(mouse, pause.botaoContinuar)) {
                MenuDespause()
            }

            else if(MouseNoBotao(mouse, pause.botaoReiniciar)) {

            if(jogo.fase === "menu") MudarFase("menu")
            else if(jogo.fase === "preFase1") MudarFase("preFase1")
            else if(jogo.fase === "fase1") MudarFase("fase1")
                setup()
                MenuDespause()
            }

            else if(MouseNoBotao(mouse, pause.botaoOpcoes)) {
                pause.menuOpcoesON = true;
            }

            else if(MouseNoBotao(mouse, pause.botaoSair)) {
                jogo.sairDoJogo = true;
                // setup()
                // MenuDespause()
                window.location.href = "pages/logout.php";
            }
        }
        else{
            if(MouseNoBotao(mouse, pause.opcoes.botaoRanking)) {
                window.location.href = "pages/ranking.php";
            }

            if(MouseNoBotao(mouse, pause.opcoes.botaoSair)) {
                pause.menuOpcoesON = false;
                pause.opcoes.musica.slider.hide()
                pause.opcoes.som.slider.hide()
            }

        }
        

        if(MouseNoBotao(mouse, pause) && jogo.config.somON) TocarSom(jogo.som.marteloMenu)
    }
}

//<-----------------------------------------------------------------------------------------------------------------------

//PAUSE ----------------------------------------------------------------------------------------------------------------->

function MenuPause(){
    pause.menuOpcoesON = false;
    pause.menuPause = true;
    jogo.pause = true;

    if(jogo.fase === "menu") jogo.som.faseMenu.pause()
    else if(jogo.fase === "fase1") jogo.som.fase1.pause()
}

function MenuDespause(){
    pause.menuOpcoesON = false;
    pause.menuPause = false;
    jogo.pause = false;
    pause.opcoes.musica.slider.hide()
    pause.opcoes.som.slider.hide()
}

function MenuAlternar(){
    if(pause.menuPause) {
        MenuDespause()
        console.log("DespausarMenu")
    }
    else {
        MenuPause()
        Toca
        console.log("PausarMenu")
    }
}
//<-----------------------------------------------------------------------------------------------------------------------

//FASES ----------------------------------------------------------------------------------------------------------------->

//fase1 -->

function ReiniciarFase1() {
    fase1.pegouLixo = false;
    fase1.lastItemPego = Lixo.novo(null, null, 0, 0, 0, 0, null, 0);
    fase1.is_fase_carregada = false;
    fase1.obstaculos = [];
    fase1.lixos = [];
}

function Digitar() {

    if (millis() - texto.ultimoTempo > texto.intervalo) {
        if (texto.letras < texto.conteudo.length) {
            texto.letras++;
            texto.ultimoTempo = millis();
        }
    }

    textFont(texto.fonte);
    textSize(48);
    text(texto.conteudo.substring(0, texto.letras), texto.caixaX + 40, texto.caixaY + texto.caixaHeight*0.5, texto.caixaWidth - texto.caixaWidth*0.2, texto.caixaHeight);
}

function PegarLixo(player_funcao, lixos_funcao) {
    return (
        
        lixos_funcao.forEach((lixo, i) => {
            if(Colidiu(player_funcao, lixo) && !fase1.pegouLixo){
                fase1.lastItemPego = lixo;
                fase1.pegouLixo = true;
                lixos_funcao.splice(i, 1);
            }
            else if(fase1.pegouLixo)
                return;
        })

        // lixos_funcao.forEach(lixo => {
        //     if (keyIsDown(32) && Colidiu(player_funcao, lixo) && (fase1.lastItemPego == lixo || fase1.lastItemPego.material == null)) { // 'lastLixoPego[6]' -> é considerado uma lista, não um objeto
        //         lixo.x = player_funcao.x + player_funcao.width - 10;
        //         lixo.y = player_funcao.y + player_funcao.height / 2;
        //         fase1.pegouLixo = true;
        //         fase1.lastItemPego = lixo;
        //         // window.alert(lastLixoPego.type);
        //     }
        //     else if (!keyIsDown(32)) fase1.lastItemPego = Lixo.novo("", null, null, 0, 0, 0, 0, null, 0);
        //     // fase1.lastItemPego = { x: 0, y: 0, w: 0, h: 0 , img: "", img_carregada: null, type: "null", class: "lixo", angulo: 0 };
        // })
    )
}

function DespejarLixo(player_funcao, lixeiras_funcao) {
    return (
        lixeiras_funcao.forEach(lixeira => {
            if(Colidiu(player_funcao, lixeira) && fase1.pegouLixo){
                if (fase1.lastItemPego.material === lixeira.descarte)
                    fase1.pontos += 10;
                else
                    fase1.pontos -= 5;
                fase1.lastItemPego = Lixo.novo(null, null, 0, 0, 0, 0, null, 0);
                fase1.pegouLixo = false;
            }
            else if(!fase1.pegouLixo)
                return;
        })
    )
}

function MostrarLixoReal() {
    let lixo_nome_real
    if (fase1.lastItemPego && fase1.pegouLixo) {// o lastItemPego no 'if' verifica se o objeto está vazio ou não
        // console.log(fase1.lastItemPego);
        image(fase1.cartazProcuradoLixo, (windowWidth) - 210 *jogo.escala, (windowHeight) - 460 *jogo.escala, 200 * jogo.escala, 300 * jogo.escala); // Mostra o cartaz de procurado

        // Verifica e mostra os lixos reais
        if(fase1.lastItemPego.nome === "bolinhaDePapel") {
            image(fase1.lixosImgCarregados.reais.papel[0], (windowWidth) - 205 *jogo.escala, (windowHeight) - 390 *jogo.escala, 200 * jogo.escala, 200 * jogo.escala);
            lixo_nome_real = "Bolinha de papel"
        }
        else if(fase1.lastItemPego.nome === "caixaDePapelao") {
            image(fase1.lixosImgCarregados.reais.papel[1], (windowWidth) - 165 * jogo.escala, (windowHeight) - 370 *jogo.escala, 125 * jogo.escala, 150 * jogo.escala);
            lixo_nome_real = "Caixa de papelão"
        }
        else if(fase1.lastItemPego.nome === "garrafaDeVidro") {
            image(fase1.lixosImgCarregados.reais.vidro[0], (windowWidth) - 168 *jogo.escala, (windowHeight) - 370 *jogo.escala, 125 * jogo.escala, 150 * jogo.escala);
            lixo_nome_real = "Garrafa de vidro"
        }
        else if(fase1.lastItemPego.nome === "tacaDeVidro") {
            image(fase1.lixosImgCarregados.reais.vidro[1], (windowWidth) - 168 *jogo.escala, (windowHeight) - 370 *jogo.escala, 125 * jogo.escala, 150 * jogo.escala);
            lixo_nome_real = "Taça de vidro"
        }
        else if (fase1.lastItemPego.nome === "banana") {
            image(fase1.lixosImgCarregados.reais.organico[0], (windowWidth) - 168 *jogo.escala, (windowHeight) - 355 *jogo.escala, 125 * jogo.escala, 125 * jogo.escala);
            lixo_nome_real = "Banana"
        }
        else if (fase1.lastItemPego.nome === "bananaPodre") {
            image(fase1.lixosImgCarregados.reais.organico[1], (windowWidth) - 175 *jogo.escala, (windowHeight) - 365 *jogo.escala, 150 * jogo.escala, 150 * jogo.escala);
            lixo_nome_real = "Banana podre"
        }
        else if (fase1.lastItemPego.nome === "macaComida") {
            image(fase1.lixosImgCarregados.reais.organico[2], (windowWidth) - 178 *jogo.escala, (windowHeight) - 390 *jogo.escala, 150 * jogo.escala, 170 * jogo.escala);
            lixo_nome_real = "Maçã comida"
        }
        else if (fase1.lastItemPego.nome === "garrafaDePlastico") {
            image(fase1.lixosImgCarregados.reais.plastico[0], (windowWidth) - 200 *jogo.escala, (windowHeight) - 370 *jogo.escala, 200 * jogo.escala, 150 * jogo.escala);
            lixo_nome_real = "Garrafa de água"
        }
        else if (fase1.lastItemPego.nome === "copoDePlastico") {
            image(fase1.lixosImgCarregados.reais.plastico[1], (windowWidth) - 182 *jogo.escala, (windowHeight) - 367 *jogo.escala, 150 * jogo.escala, 150 * jogo.escala);
            lixo_nome_real = "Copo descartável"
        }
        else if (fase1.lastItemPego.nome === "placaDeMetal") {
            image(fase1.lixosImgCarregados.reais.metal[0], (windowWidth) - 190 *jogo.escala, (windowHeight) - 370 *jogo.escala, 175 * jogo.escala, 150 * jogo.escala);
            lixo_nome_real = "Placa de metal"
        }
        else if (fase1.lastItemPego.nome === "latinha") {
            image(fase1.lixosImgCarregados.reais.metal[1], (windowWidth) - 195 *jogo.escala, (windowHeight) - 380 *jogo.escala, 180 * jogo.escala, 180 * jogo.escala);
            lixo_nome_real = "Latinha"
        }
        else if (fase1.lastItemPego.nome === "fotografia") {
            image(fase1.lixosImgCarregados.reais.naoReciclavel[0], (windowWidth) - 185 *jogo.escala, (windowHeight) - 360 *jogo.escala, 150 * jogo.escala, 135 * jogo.escala);
            lixo_nome_real = "Fotografia"
        }
        else if (fase1.lastItemPego.nome === "chicleteMascado") {
            image(fase1.lixosImgCarregados.reais.naoReciclavel[1], (windowWidth) - 185 *jogo.escala, (windowHeight) - 360 *jogo.escala, 150 * jogo.escala, 125 * jogo.escala);
            lixo_nome_real = "Chiclete mascado"
        }

        fill(0,0,0)
        textFont(texto.fonte)
        textSize(17 * jogo.escala)
        text(lixo_nome_real, (windowWidth) - 180 *jogo.escala, (windowHeight) - 200 *jogo.escala, 200 * jogo.escala, 200 * jogo.escala)

    }
}

function AleatorizarPosicao(objeto) {
    let dif_x = ((windowWidth - width) / 2);
    let dif_y = ((windowHeight - height) / 2);

    let objeto_x = random(dif_x + 50, (dif_x + width) - 50);
    let objeto_y = random(dif_y + 50, (dif_y + height) - 50);
}

function AleatorizarPosicaoLixo(lixo) {
    let pode_sair = false
    while(!pode_sair){
        pode_sair = true

        lixo.x = random(jogo.xInicialMapa*1.3, jogo.xFinalMapa*0.95);
        lixo.y = random(jogo.yInicialMapa*1.8, jogo.yFinalMapa*0.95);

        fase1.obstaculos.forEach(obstaculo => {
            console.log("TEM OBSTACULO")
            if (Colidiu(lixo, obstaculo)) {
                pode_sair = false
            }
        })

        fase1.lixeiras.forEach(lixeira => {
            if (Colidiu(lixo, lixeira)) {
                pode_sair = false
            }
        })
        console.log("a")
    }
    return lixo;
}

function AleatorizarPosicaoObstaculo(obstaculo) {
    let pode_sair = false
    while(!pode_sair){
        pode_sair = true

        obstaculo.x = random(jogo.xInicialMapa*1.8, jogo.xFinalMapa*0.9);
        obstaculo.y = random(jogo.yInicialMapa*3.5, jogo.yFinalMapa*0.8);

        if(Colidiu(obstaculo, jogo.player) || Colidiu(jogo.player, obstaculo)) {
            pode_sair = false;
        }
        
        fase1.obstaculos.forEach(obstaculo2 => {
            if (Colidiu(obstaculo, obstaculo2) || 
                Colidiu(obstaculo2, obstaculo)) 
            {
                pode_sair = false;
            }
        })

        fase1.lixeiras.forEach(lixeira => {
            if (Colidiu(obstaculo, lixeira)) {
                pode_sair = false;
            }
        })
        console.log("a");
    }
    return obstaculo
}

function CriarLixo() {

    let dif_x = ((windowWidth - width) / 2);
    let dif_y = ((windowHeight - height) / 2);

    let lixo_x = null
    let lixo_y = null
    let lixo_coordenadas = {x: null, y: null}
    let pode_sair = false

    // while(!pode_sair){
    //     pode_sair = true

    //     lixo_x = random(jogo.xInicialMapa + 10 * jogo.escala, jogo.xFinalMapa - 10 * jogo.escala);
    //     lixo_y = random(jogo.yInicialMapa + 10 * jogo.escala, jogo.yFinalMapa - 10 * jogo.escala);

    //     lixo_coordenadas = {x: lixo_x, y: lixo_y}

    //     fase1.obstaculos.forEach(obstaculo => {
    //         console.log("TEM OBSTACULO")
    //         if (Colidiu(lixo_coordenadas, obstaculo)) {
    //             pode_sair = false
    //         }
    //     })

    //     fase1.lixeiras.forEach(lixeira => {
    //         if (Colidiu(lixo_coordenadas, lixeira)) {
    //             pode_sair = false
    //         }
    //     })
    //     console.log("a")
    // }

    

    //let lixo = [0, 0, 25, 25, "", "", ""] //x, y, w, h, img, type, class
    let lixo_type = RandomizarLixoType()
    let lixo_nome = RandomizarLixoNomePorTipo(lixo_type);
    let lixo_img = CarregarLixoImgPorNome(lixo_nome);
    let lixo_width = 30;
    let lixo_height = 30;
    if (lixo_nome === "garrafaDePlastico" || lixo_nome === "latinha" || lixo_nome === "macaComida") {
        lixo_width = 20;
        lixo_height = 30;
    }
    else if (lixo_nome === "caixaDePapelao") {
        lixo_width = 35;
        lixo_height = 35;
    }
    else if (lixo_nome === "chicleteMascado") {
        lixo_width = 20;
        lixo_height = 20;
    }

    // if (lixo_type === "papel") {
    //     lixo_nome = "bolinhaDePapel"
    //     lixo_img_carregada = fase1.lixosImgCarregados.pixel.papel[0]
    // }
    // else if (indice == 1) {
    //     lixo_nome = "garrafaDeVidro"
    //     lixo_type = "vidro"
    //     lixo_img_carregada = fase1.lixosImgCarregados.pixel.vidro[0]
    // }
    // else if (indice == 2 || indice == 3) {
    //     if (indice == 2) {
    //         lixo_nome = "banana"
    //         lixo_img_carregada = fase1.lixosImgCarregados.pixel.organico[0]
    //     }
    //     else if (indice == 3) {
    //         lixo_nome = "bananaPodre"
    //         lixo_img_carregada = fase1.lixosImgCarregados.pixel.organico[1]
    //     }

    //     lixo_type = "organico"
    // }
    // else if (indice == 4) {
    //     lixo_nome = "garrafaDePlastico"
    //     lixo_type = "plastico"
    //     lixo_img_carregada = fase1.lixosImgCarregados.pixel.plastico[0]
    //     lixo_width = 15
    //     lixo_height = 25
    // }
    // else if (indice == 5) {
    //     lixo_nome = "placaDeMetal"
    //     lixo_type = "metal"
    //     lixo_img_carregada = fase1.lixosImgCarregados.pixel.metal[0]
    // }
    // else if (indice == 6) {
    //     lixo_nome = "pilha"
    //     lixo_type = "nao_reciclavel"
    //     lixo_img_carregada = fase1.lixosImgCarregados.pixel.naoReciclavel[0]
    //     lixo_width = 15
    //     lixo_height = 25
    // }
    // else if (rnd == 2 || rnd == 3) lixo_type = "organico" //0 -> BananaPodre
    // else if (rnd == 4) lixo_type = "plastico" //0 -> GarrafaDePlastico
    // else if (rnd == 5) lixo_type = "metal" //0 -> GarrafaDePlastico

    // lixo_img_carregada = null
    //lixo_img = lixosPixelImgCarregados[indice]


    let lixo_angulo = random(TWO_PI)
    let variacao = floor(random(-3, 3))
    lixo_width += variacao
    lixo_height += variacao

    // let lixo = fase1.lixos.push({ x: lixo_x, y: lixo_y, width: 25, height: 25, img: lixo_img, imgCarregada: lixo_img_carregada, type: lixo_type, class: "lixo", angulo: lixo_angulo });
    
    let lixo = Lixo.novo(null, lixo_nome, lixo_img, lixo_width * jogo.escala, lixo_height * jogo.escala, lixo_x, lixo_y, lixo_type, lixo_angulo);
    
    lixo = AleatorizarPosicaoLixo(lixo)

    return lixo
    
    // fase1.lixos.push(lixo);

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

function RandomizarLixoType(){
    let rnd = floor(random(6))
    let lixo_type = null

    if (rnd === 0) lixo_type = "papel"
    else if (rnd === 1) lixo_type = "vidro"
    else if (rnd === 2) lixo_type = "organico"
    else if (rnd === 3) lixo_type = "plastico"
    else if (rnd === 4) lixo_type = "metal"
    else if (rnd === 5) lixo_type = "nao_reciclavel"

    if (lixo_type === null) throw new Error("variável LIXO_TYPE é NULL na função 'RandomizarLixoType'")

    return lixo_type
}

function RandomizarLixoNomePorTipo(lixo_type){
    let lixo_nome = ""

    if (lixo_type === "papel") {
        let rnd = floor(random(2))
        if (rnd === 0) lixo_nome = "bolinhaDePapel"
        else if (rnd === 1) lixo_nome = "caixaDePapelao"
    }

    else if (lixo_type === "vidro") {
        let rnd = floor(random(2))
        if (rnd === 0) lixo_nome = "garrafaDeVidro"
        else if (rnd === 1) lixo_nome = "tacaDeVidro"
    }

    else if (lixo_type === "organico") {
        let rnd = floor(random(3))
        if (rnd === 0) lixo_nome = "banana"
        else if (rnd === 1) lixo_nome = "bananaPodre"
        else if (rnd === 2) lixo_nome = "macaComida"
    }

    else if (lixo_type === "plastico") {
        let rnd = floor(random(2))
        if (rnd === 0) lixo_nome = "garrafaDePlastico"
        else if (rnd === 1) lixo_nome = "copoDePlastico"
    }

    else if (lixo_type === "metal") {
        let rnd = floor(random(2))
        if (rnd === 0) lixo_nome = "placaDeMetal"
        else if (rnd === 1) lixo_nome = "latinha"
    }

    else if (lixo_type === "nao_reciclavel") {
       let rnd = floor(random(2))
        if (rnd === 0) lixo_nome = "fotografia"
        else if (rnd === 1) lixo_nome = "chicleteMascado"
    }

    if (lixo_nome === null) throw new Error("variável LIXO_NOME é NULL na função 'RandomizarLixoNomePorTipo'")

    return lixo_nome
}

function CarregarLixoImgPorNome(lixo_nome){
    let lixo_img = null

    if (lixo_nome === "bolinhaDePapel"){
        lixo_img = fase1.lixosImgCarregados.pixel.papel[0]
    }
    else if (lixo_nome === "caixaDePapelao"){
        lixo_img = fase1.lixosImgCarregados.pixel.papel[1]
    }
    else if (lixo_nome === "garrafaDeVidro"){
        lixo_img = fase1.lixosImgCarregados.pixel.vidro[0]
    }
    else if (lixo_nome === "tacaDeVidro"){
        lixo_img = fase1.lixosImgCarregados.pixel.vidro[1]
    }
    else if (lixo_nome === "banana"){
        lixo_img = fase1.lixosImgCarregados.pixel.organico[0]
    }
    else if (lixo_nome === "bananaPodre"){
        lixo_img = fase1.lixosImgCarregados.pixel.organico[1]
    }
    else if (lixo_nome === "macaComida"){
        lixo_img = fase1.lixosImgCarregados.pixel.organico[2]
    }
    else if (lixo_nome === "garrafaDePlastico"){
        lixo_img = fase1.lixosImgCarregados.pixel.plastico[0]
    }
    else if (lixo_nome === "copoDePlastico"){
        lixo_img = fase1.lixosImgCarregados.pixel.plastico[1]
    }
    else if (lixo_nome === "placaDeMetal"){
        lixo_img = fase1.lixosImgCarregados.pixel.metal[0]
    }
    else if (lixo_nome === "latinha"){
        lixo_img = fase1.lixosImgCarregados.pixel.metal[1]
    }
    else if (lixo_nome === "fotografia"){
        lixo_img = fase1.lixosImgCarregados.pixel.naoReciclavel[0]
    }
    else if (lixo_nome === "chicleteMascado"){
        lixo_img = fase1.lixosImgCarregados.pixel.naoReciclavel[1]
    }

    if (lixo_img === null) throw new Error("variável LIXO_IMG é NULL na função 'CarregarLixoImgPorNome'")

    return lixo_img
}



function CriarObstaculo() {

    let dif_x = ((windowWidth - width) / 2);
    let dif_y = ((windowHeight - height) / 2);

    let obstaculo_x = random(jogo.xInicialMapa*1.2, jogo.xFinalMapa/5);
    let obstaculo_y = random(jogo.yInicialMapa + 40, jogo.yFinalMapa - 50);

    let obstaculo_img = null;
    let obstaculo_img_carregada = null;
    
    // let rnd = floor(random(5));

    obstaculo_img_carregada = fase1.obstaculos_img[0]

    let obstaculo = Obstaculo.novo("brinquedo", "caminho", obstaculo_img_carregada, 100 * jogo.escala, 100 * jogo.escala, obstaculo_x, obstaculo_y);

    AleatorizarPosicaoObstaculo(obstaculo);

    return obstaculo
    // fase1.obstaculos.push(obstaculo);
}

function RotacionarLixo() {
    if (keyIsDown(81) && fase1.lastItemPego.material != "null") { // 82 = tecla 'Q'
        fase1.lastItemPego.angulo += 0.1; // gira aos poucos
    }

    else if (keyIsDown(69) && fase1.lastItemPego.material != "null") { // 82 = tecla 'E'
        fase1.lastItemPego.angulo -= 0.1; // gira aos poucos
    }
}

function AnimacaoRelogio() {
    let angulo = 0
    if (!jogo.pause) angulo = sin(frameCount * 0.03) * radians(8);
    const tamanho = 128 * jogo.escala;
    const x = 24 * jogo.escala;
    const y = 24 * jogo.escala;

    push();

    translate(x + tamanho / 2, y + tamanho / 2);
    rotate(angulo);
    image(fase1.relogio, -tamanho / 2, -tamanho / 2, tamanho, tamanho);
    
    fill(0)
    textSize(50 * jogo.escala);
    textFont(texto.fonte)
    textAlign(CENTER, CENTER);
    text(jogo.timer.segundos, 0, -(5 * jogo.escala));

    pop();
    
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