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
        this.pode_sair          = dados.pode_sair       ?? true;
    }

    getId()                 { return this.id; }
    getNome()               { return this.nome; }
    getCaminhoImage()       { return this.caminho_image; }
    getImage()              { return this.image; }
    getWidth()              { return this.width; }
    getHeight()             { return this.height; }
    getX()                  { return this.x; }
    getY()                  { return this.y; }
    getPodeSair()           { return this.pode_sair; }

    static novo(nome, caminho_image, image, width, height, x, y, pode_sair) {
        const obstaculo = new Obstaculo({});
        obstaculo.alterarDados(caminho_image, width, height, x, y, pode_sair);
        return obstaculo;
    }

    alterarDados(caminho_image, width, height, x, y, pode_sair) {
        this.caminho_image      = caminho_image;
        this.width              = width;
        this.height             = height;
        this.x                  = x;
        this.y                  = y;
        this.pode_sair          = pode_sair;
    }

    CarregarImage(caminho_image) {
        this.image      = loadImage(caminho_image);
    }
}