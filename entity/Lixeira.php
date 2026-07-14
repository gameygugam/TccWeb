<?php

class Lixeira {

    private int    $id;
    private string $image;
    private int    $width;
    private int    $height;
    private string $material;
    
    private int    $x;
    private int    $y;

    public function __construct(array $dados) {
        $this->id               = (int) ($dados['id']            ?? 0);
        $this->image            =        $dados['image']         ?? '';
        $this->width            = (int) ($dados['width']         ?? 0);
        $this->height           = (int) ($dados['height']        ?? 0);
        $this->material         =        $dados['material']      ?? '';
        $this->x                = (int) ($dados['x']             ?? 0);
        $this->y                = (int) ($dados['y']             ?? 0);
    }

    public function getId():            int      { return $this->id; }
    public function getImage():         string   { return $this->image; }
    public function getWidth():         int      { return $this->width; }
    public function getHeight():        int      { return $this->height; }
    public function getMaterial():      string   { return $this->material; }
    public function getX():             int      { return $this->x; }
    public function getY():             int      { return $this->y; }
}
