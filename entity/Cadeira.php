<?php

class Cadeira {

    private int    $id;
    private string $image;
    private int    $width;
    private int    $height;
    private string $direcao;
    
    private int    $x;
    private int    $y;

    public function __construct(array $dados) {
        $this->id               = (int) ($dados['id']            ?? 0);
        $this->image            =        $dados['image']         ?? '';
        $this->width            = (int) ($dados['width']         ?? 0);
        $this->height           = (int) ($dados['height']        ?? 0);
        $this->direcao          =        $dados['direcao']       ?? '';
        $this->x                = (int) ($dados['x']             ?? 0);
        $this->y                = (int) ($dados['y']             ?? 0);
    }

    public function getId():            int      { return $this->id; }
    public function getImage():         string   { return $this->image; }
    public function getWidth():         int      { return $this->width; }
    public function getHeight():        int      { return $this->height; }
    public function getDirecao():       string   { return $this->direcao; }
    public function getX():             int      { return $this->x; }
    public function getY():             int      { return $this->y; }

    public static function novo(string $image, int $width, int $height,
    int $x, int $y, string $direcao): Cadeira {

        $cadeira = new Cadeira([]);
        $cadeira->alterarDados($image, $width, $height, $x, $y, $direcao);

        return $cadeira;
    }

    public function alterarDados(string $image, int $width, int $height,
    int $x, int $y, string $direcao): void {

        $this->image         = $image;
        $this->width         = $width;
        $this->height        = $height;
        $this->x             = $x;
        $this->y             = $y;
        $this->direcao      = $direcao;
    }

    public function registrarIdGerado(int $id): void {
        if ($id <= 0) {
            throw new InvalidArgumentException('ID inválido.');
        }

        $this->id = $id;
    }
}
