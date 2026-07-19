class Sala {

    constructor(dados = {}) {
        this.id = dados.id ?? 0;
        this.org_cadeiras = dados.org_cadeiras ?? "";
        this.pos_quadro = dados.pos_quadro ?? "";
        this.image = dados.image ?? "";
    }

    getId() {
        return this.id;
    }

    getOrganizacaoCadeiras() {
        return this.org_cadeiras;
    }

    getPosicaoQuadro() {
        return this.pos_quadro;
    }

    getImage() {
        return this.image;
    }

    static novo(org_cadeiras, pos_quadro, image) {

        const sala = new Sala({});

        let id_org_cadeiras = random(1, 4)
        let id_pos_quadro = random(1, 4)

        if (org_cadeiras === null){
            if (id_org_cadeiras === 1) org_cadeiras = "Fileira"
            else if (id_org_cadeiras === 2) org_cadeiras = "Coluna"
            else if (id_org_cadeiras === 3) org_cadeiras = "Circulo"
            else if (id_org_cadeiras === 4) org_cadeiras = "Circulo"
        }
        
        if (pos_quadro === null){
            if (id_pos_quadro === 1) pos_quadro = "Norte"
            else if (id_pos_quadro === 2) pos_quadro = "Sul"
            else if (id_pos_quadro === 3) pos_quadro = "Leste"
            else if (id_pos_quadro === 4) pos_quadro = "Oeste"
        }
        
        sala.alterarDados(org_cadeiras, pos_quadro, image);

        return sala;
    }

    alterarDados(org_cadeiras, pos_quadro, image) {

        this.org_cadeiras = org_cadeiras;
        this.pos_quadro = pos_quadro;
        this.image = image;
    }

    registrarIdGerado(id) {

        if (id <= 0) {
            throw new Error("ID inválido.");
        }

        this.id = id;
    }
}