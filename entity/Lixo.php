<?php

class Lixo {

    //Talvez adicionar nome no futuro no BD

    private int    $id;
    private int    $id_lixeira;
    private string $image;
    private int    $width;
    private int    $height;
    
    private int    $x;
    private int    $y;
    private string $material;
    private float  $angulo;

    public function __construct(array $dados) {
        $this->id               = (int)   ($dados['id']            ?? 0);
        $this->id_lixeira       = (int)   ($dados['id_lixeira']    ?? 0);
        $this->image            =          $dados['image']         ?? '';
        $this->width            = (int)   ($dados['width']         ?? 0);
        $this->height           = (int)   ($dados['height']        ?? 0);
        $this->x                = (int)   ($dados['x']             ?? 0);
        $this->y                = (int)   ($dados['y']             ?? 0);
        $this->material         =          $dados['material']      ?? '';
        $this->angulo           = (float) ($dados['angulo']        ?? 0);
    }

    public function getId():            int      { return $this->id; }
    public function getIdLixeira():     int      { return $this->id_lixeira; }
    public function getImage():         string   { return $this->image; }
    public function getWidth():         int      { return $this->width; }
    public function getHeight():        int      { return $this->height; }
    public function getX():             int      { return $this->x; }
    public function getY():             int      { return $this->y; }
    public function getMaterial():      string   { return $this->material; }
    public function getAngulo():        float    { return $this->angulo; }

    public static function novo(int $id_lixeira, string $image, int $width, int $height,
    int $x, int $y, string $material, int $angulo): Lixo {

        $lixo = new Lixo(['id_lixeira' => $id_lixeira]);
        $lixo->alterarDados($image, $width, $height, $x, $y, $material, $angulo);

        return $lixo;
    }

    public function alterarDados(string $image, int $width, int $height,
    int $x, int $y, string $material, int $angulo): void {

        $this->image         = $image;
        $this->width         = $width;
        $this->height        = $height;
        $this->x             = $x;
        $this->y             = $y;
        $this->material      = $material;
        $this->angulo        = $angulo;
    }

    public function registrarIdGerado(int $id): void {
        if ($id <= 0) {
            throw new InvalidArgumentException('ID inválido.');
        }

        $this->id = $id;
    }
}

// function CriarLixo() {
//     let dif_x = ((windowWidth - width) / 2);
//     let dif_y = ((windowHeight - height) / 2);

//     let lixo_x = random(dif_x + 50, (dif_x + width) - 200);
//     let lixo_y = random(dif_y + 50, (dif_y + height) - 50);

//     //let lixo = [0, 0, 25, 25, "", "", ""] //x, y, w, h, img, type, class
//     let lixo_img = null;
//     let lixo_img_carregada = null;
//     let lixo_type = null;
        
//     let rnd = floor(random(5));

//     lixo_img_carregada = lixosPixelImgCarregados[rnd]
//     //lixo_img = lixosPixelImgCarregados[rnd]

//     if (rnd == 0) lixo_type = "papel" //0 -> BolinhaDePapel
//     else if (rnd == 1) lixo_type = "vidro" //0 -> Banana
//     else if (rnd == 2 || rnd == 3) lixo_type = "organico" //0 -> BananaPodre
//     else if (rnd == 4) lixo_type = "plastico" //0 -> GarrafaDePlastico

//     let lixo_angulo = random(TWO_PI)

//     lixos.push({ x: lixo_x, y: lixo_y, w: 25, h: 25, img: lixo_img, imgCarregada: lixo_img_carregada, type: lixo_type, class: "lixo", angulo: lixo_angulo }); 

//     /*lixos[lixos.length - 1].img = lixosPixelImg[lixos.length - 1]; // Adiciona imagem pixel no parametro
//     lixos[lixos.length - 1].imgCarregada = lixosPixelImgCarregados[lixos.length - 1]; // Adiciona imagem pixel carregada no parametro
//     // Adiciona o tipo do lixo de acordo com as lixeiras existentes
//     if (lixos[lixos.length - 1].img === "../imagens/lixos/bolinhaDePapelPixel.png")
//         lixos[lixos.length - 1].type = "papel"; // Azul
//     else if (lixos[lixos.length - 1].img === "../imagens/lixos/garrafaVidroPixel.png")
//         lixos[lixos.length - 1].type = "vidro"; // Verde
//     else if (lixos[lixos.length - 1].img === "../imagens/lixos/bananaPixel.png")
//         lixos[lixos.length - 1].type = "organico"; // Marrom
//     else if (lixos[lixos.length - 1].img === "../imagens/lixos/bananaPodrePixel.png")
//         lixos[lixos.length - 1].type = "organico"; // Marrom
//     else if (lixos[lixos.length - 1].img === "../imagens/lixos/garrafaDePlasticoPixel.png")
//         lixos[lixos.length - 1].type = "plastico"; // Vermelha*/

//     /*lixos[lixos.length - 1].x = random(lixo_x + 50, (lixo_x + width) - 200);
//     lixos[lixos.length - 1].y = random(lixo_y + 50, (lixo_y + height) - 50);*/
// }
