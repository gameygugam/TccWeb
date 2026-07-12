<?php

class Lixeira {

    private int    $id;
    private string $image;
    private int    $width;
    private int    $height;
    private string $material;

    public function __construct(array $dados) {
        $this->id               = (int) ($dados['id']            ?? 0);
        $this->image            =        $dados['image']         ?? '';
        $this->width            = (int) ($dados['width']         ?? 0);
        $this->height           = (int) ($dados['height']        ?? 0);
        $this->material         =        $dados['material']      ?? '';
    }

    public function getId():            int      { return $this->id; }
    public function getImage():         string   { return $this->image; }
    public function getWidth():         int      { return $this->width; }
    public function getHeight():        int      { return $this->height; }
    public function getMaterial():      string   { return $this->material; }
}
