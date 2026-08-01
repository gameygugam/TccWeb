class Lixo {

    constructor(dados = {}) {
        this.nome       = dados.nome        ?? "";    
        this.id         = dados.id          ?? 0;
        this.id_lixeira = dados.id_lixeira  ?? 0;
        this.image      = dados.image       ?? "";
        this.width      = dados.width       ?? 0;
        this.height     = dados.height      ?? 0;
        this.x          = dados.x           ?? 0;
        this.y          = dados.y           ?? 0;
        this.material   = dados.material    ?? "";
        this.angulo     = dados.angulo      ?? 0;
    }

    getNome()       { return this.nome; }
    getId()         { return this.id; }
    getIdLixeira()  { return this.id_lixeira; }
    getImage()      { return this.image; }
    getWidth()      { return this.width; }
    getHeight()     { return this.height; }
    getX()          { return this.x; }
    getY()          { return this.y; }
    getMaterial()   { return this.material; }
    getAngulo()     { return this.angulo; }

    static novo(id_lixeira, nome, image, width, height, x, y, material, angulo) {
        const lixo = new Lixo({ id_lixeira });
        lixo.alterarDados(nome, image, width, height, x, y, material, angulo);
        return lixo;
    }

    static criarLixo(id_lixeira, lixo_type) {
        const lixo = new Lixo({ id_lixeira });
        
        let image = ""
        let width = 25
        let height = 25
        let x = 0
        let y = 0
        let material = lixo_type
        let angulo = random(TWO_PI)

        // if (lixo_type === "papel") {
        //     image = "../imagens/lixos/bolinhaDePapelPixel.png"
        // }
        // else if (lixo_type === "vidro") {
        //     image = "../imagens/lixos/garrafaVidroPixel.png"
        // }
        // else if (lixo_type === "organico") {
        //     let rnd = floor(random(2))
        //     if (rnd === 0) image = "../imagens/lixos/bananaPixel.png"
        //     else image = "../imagens/lixos/bananaPodrePixel.png"
        // }
        // else if (lixo_type === "plastico") {
        //     image = "../imagens/lixos/garrafaDePlasticoPixel.png"
        // }

        lixo.alterarDados(nome, loadImage(image), width, height, x, y, material, angulo);
        return lixo;
    }

    alterarDados(nome, image, width, height, x, y, material, angulo) {
        this.nome       = nome;
        this.image      = image;
        this.width      = width;
        this.height     = height;
        this.x          = x;
        this.y          = y;
        this.material   = material;
        this.angulo     = angulo;
    }
}