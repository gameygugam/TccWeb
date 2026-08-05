<?php

class Partida {

    private int    $id;
    private int    $id_usuario;
    // private int    $id_personagem;
    private int    $fase;
    private int    $tempo;
    private int    $pontuacao;

    public function __construct(array $dados) {
        $this->id               = (int) ($dados['id']              ?? 0);
        $this->id_usuario       = (int) ($dados['id_usuario']      ?? 0);
        // $this->id_personagem    = (int) ($dados['id_personagem']   ?? 0);
        $this->fase             = (int) ($dados['fase']            ?? 0);
        $this->tempo            = (int) ($dados['tempo']           ?? 0);
        $this->pontuacao        = (int) ($dados['pontuacao']       ?? 0);
    }

    public function getId():               int    { return $this->id; }
    public function getIdUsuario():        int    { return $this->id_usuario; }
    // public function getIdPersonagem():     int    { return $this->id_personagem; }
    public function getFase():             int    { return $this->fase; }
    public function getTempo():            int    { return $this->tempo; }
    public function getPontuacao():        int    { return $this->pontuacao; }

    public static function novo(int $id_usuario, int $fase, int $tempo, int $pontuacao): Partida {

        $partida = new Partida(['id_usuario' => $id_usuario]);
        $partida->alterarDados($fase, $tempo, $pontuacao);

        return $partida;
    }

    public function alterarDados(int $fase, int $tempo, int $pontuacao): void {
        $this->fase       = $fase;
        $this->tempo      = $tempo;
        $this->pontuacao  = $pontuacao;
    }

    public function registrarIdGerado(int $id): void {
        if ($id <= 0) {
            throw new InvalidArgumentException('ID inválido.');
        }

        $this->id = $id;
    }
}
