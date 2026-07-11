<?php

class Partida {

    private int    $id;
    private int    $id_usuario;
    private int    $id_personagem;
    private int    $fase;
    private int    $tempo;

    public function __construct(array $dados) {
        $this->id               = (int) ($dados['id']              ?? 0);
        $this->id_usuario       = (int) ($dados['id_usuario']      ?? 0);
        $this->id_personagem    = (int) ($dados['id_personagem']   ?? 0);
        $this->fase             = (int) ($dados['fase']            ?? 0);
        $this->tempo            = (int) ($dados['tempo']           ?? 0);
    }

    public function getId():               int    { return $this->id; }
    public function getIdUsuario():        int    { return $this->id_usuario; }
    public function getIdPersonagem():     int    { return $this->id_personagem; }
    public function getFase():             int    { return $this->fase; }
    public function getTempo():            int    { return $this->tempo; }
}
