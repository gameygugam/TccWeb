<?php
    function carregarIdioma($idioma)
    {
        $arquivo = __DIR__ . "/../lang/" . $idioma . ".json";

        if (!file_exists($arquivo)) {
            return [];
        }

        $json = file_get_contents($arquivo);

        return json_decode($json, true);
    }

    function t($chave)
    {
        global $traducao;

        $partes = explode(".", $chave);
        $valor = $traducao;

        foreach ($partes as $parte) {
            if (!isset($valor[$parte])) {
                return $chave;
            }

            $valor = $valor[$parte];
        }

        return $valor;
    }