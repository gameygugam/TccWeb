class Lixo {

    constructor(dados = {}) {
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

    getId()         { return this.id; }
    getIdLixeira()  { return this.id_lixeira; }
    getImage()      { return this.image; }
    getWidth()      { return this.width; }
    getHeight()     { return this.height; }
    getX()          { return this.x; }
    getY()          { return this.y; }
    getMaterial()   { return this.material; }
    getAngulo()     { return this.angulo; }

    static novo(id_lixeira, image, width, height, x, y, material, angulo) {
        const lixo = new Lixo({ id_lixeira });
        lixo.alterarDados(image, width, height, x, y, material, angulo);
        return lixo;
    }

    alterarDados(image, width, height, x, y, material, angulo) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.x      = x;
        this.y = y;
        this.material = material;
        this.angulo = angulo;
    }
}