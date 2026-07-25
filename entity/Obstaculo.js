class Obstaculo {

    constructor(dados = {}) {
        this.id                 = dados.id              ?? 0;
        this.nome               = dados.nome            ?? "";
        this.caminho_image      = dados.caminho_image   ?? "";
        this.image              = dados.image           ?? "";
        this.width              = dados.width           ?? 0;
        this.height             = dados.height          ?? 0;
        this.x                  = dados.x               ?? 0;
        this.y                  = dados.y               ?? 0;
    }

    getId()                 { return this.id; }
    getNome()               { return this.nome; }
    getCaminhoImage()       { return this.caminho_image; }
    getImage()              { return this.image; }
    getWidth()              { return this.width; }
    getHeight()             { return this.height; }
    getX()                  { return this.x; }
    getY()                  { return this.y; }

    static novo(nome, caminho_image, image, width, height, x, y) {
        const obstaculo = new Obstaculo({});
        obstaculo.alterarDados(caminho_image, width, height, x, y);
        return obstaculo;
    }

    // static criarObstaculo(nome) {
    //     const obstaculo = new Obstaculo({});
        
    //     let caminho_image = ""
    //     let width = 25
    //     let height = 25
    //     let x = 0
    //     let y = 0
    //     let material = lixo_type

    //     // if (lixo_type === "papel") {
    //     //     image = "../imagens/lixos/bolinhaDePapelPixel.png"
    //     // }
    //     // else if (lixo_type === "vidro") {
    //     //     image = "../imagens/lixos/garrafaVidroPixel.png"
    //     // }
    //     // else if (lixo_type === "organico") {
    //     //     let rnd = floor(random(2))
    //     //     if (rnd === 0) image = "../imagens/lixos/bananaPixel.png"
    //     //     else image = "../imagens/lixos/bananaPodrePixel.png"
    //     // }
    //     // else if (lixo_type === "plastico") {
    //     //     image = "../imagens/lixos/garrafaDePlasticoPixel.png"
    //     // }

    //     obstaculo.alterarDados(caminho_image, width, height, x, y);
    //     return obstaculo;
    // }

    alterarDados(caminho_image, width, height, x, y) {
        this.caminho_image      = caminho_image;
        this.width              = width;
        this.height             = height;
        this.x                  = x;
        this.y                  = y;
    }

    CarregarImage(caminho_image) {
        this.image      = loadImage(caminho_image);
    }
}