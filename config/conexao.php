<?php 
define('DB_HOST', 'localhost');
define('DB_NAME', 'tccweb');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

function getConexao(): PDO {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $opcoes = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    return new PDO($dsn, DB_USER, DB_PASS, $opcoes);
}

// $connect = new mysqli($endereco, $usuario, $senha, $nomeBanco);
// if(!$connect){
//     die("Falha na conexão: " . $connect->connect_error);
// }

// try {
//     $conexao = new PDO("mysql:host=localhost;dbname=tccweb", $usuario, $senha);
//     $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// } catch (PDOException $e) {
//     echo "Erro de conexão: " . $e->getMessage();
// }
?>