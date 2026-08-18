<?php

class Usuario {

    private int     $id;
    private string  $nome;
    private string  $sobrenome;
    private int     $idade;
    private string  $colegio;
    private string  $turma;

    public function __construct(array $dados) {
        $this->id             = (int) ($dados['id']                 ?? 0);
        $this->nome           =        $dados['nome']               ?? '';
        $this->sobrenome      =        $dados['sobrenome']          ?? '';
        $this->idade          = (int)  $dados['idade']              ?? 0;
        $this->colegio        =        $dados['colegio']            ?? '';
        $this->turma          =        $dados['turma']              ?? '';
    }

    public function getId():            int     { return $this->id; }
    public function getSobrenome():     string  { return $this->sobrenome; }
    public function getNome():          string  { return $this->nome; }
    public function getIdade():         int     { return $this->idade; }
    public function getColegio():       string  { return $this->colegio; }
    public function getTurma():         string  { return $this->turma; }
}
