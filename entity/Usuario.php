<?php

class Usuario {

    private int    $id;
    private string $nome;
    private int    $idade;

    public function __construct(array $dados) {
        $this->id             = (int) ($dados['id']            ?? 0);
        $this->nome           =        $dados['nome']          ?? '';
        $this->idade          = (int) ($dados['idade']         ?? 0);
    }

    public function getId():            int    { return $this->id; }
    public function getNome():          string { return $this->nome; }
    public function getIdade():         int    { return $this->idade; }
}
