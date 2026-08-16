<?php

class Usuario {

    private int     $id;
    private string  $responsavel;
    private string  $nome;
    private int     $idade;
    private string  $colegio;
    private string  $turma;

    public function __construct(array $dados) {
        $this->id             = (int) ($dados['id']                 ?? 0);
        $this->responsavel    =        $dados['nomeResponsavel']    ?? '';
        $this->nome           =        $dados['nome']               ?? '';
        $this->idade          = (int)  $dados['idade']              ?? 0;
        $this->colegio        =        $dados['colegio']            ?? '';
        $this->turma          =        $dados['turma']              ?? '';
    }

    public function getId():            int     { return $this->id; }
    public function getResponsavel():   string  { return $this->responsavel; }
    public function getNome():          string  { return $this->nome; }
    public function getIdade():         int     { return $this->idade; }
    public function getColegio():       string  { return $this->colegio; }
    public function getTurma():         string  { return $this->turma; }
}
