<?php

class Sala {

    private int    $id;
    private string $org_cadeiras; //organização das cadeiras
    private string $pos_quadro; //posição do quadro
    private string $image;

    public function __construct(array $dados) {
        $this->id              = (int) ($dados['id']            ?? 0);
        $this->org_cadeiras    =        $dados['org_cadeiras']  ?? '';
        $this->pos_quadro      =        $dados['pos_quadro']    ?? '';
        $this->image           =        $dados['image']         ?? '';
    }

    public function getId():                    int      { return $this->id; }
    public function getOrganizacaoCadeiras():   string   { return $this->org_cadeiras; }
    public function getPosicaoQuadro():         string   { return $this->pos_quadro; }
    public function getImage():                 string   { return $this->image; }

    public static function novo(string $org_cadeiras, string $pos_quadro, string $image): Sala {

        $sala = new Sala([]);
        $sala->alterarDados($org_cadeiras, $pos_quadro, $image);

        return $sala;
    }

    public function alterarDados(string $org_cadeiras, string $pos_quadro, string $image): void {

        $this->org_cadeiras       = $org_cadeiras;
        $this->pos_quadro         = $pos_quadro;
        $this->image              = $image;
    }

    public function registrarIdGerado(int $id): void {
        if ($id <= 0) {
            throw new InvalidArgumentException('ID inválido.');
        }

        $this->id = $id;
    }
}
