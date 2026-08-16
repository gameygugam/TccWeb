-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: bancastores.mysql.dbaas.com.br:3306
-- Tempo de geração: 16/08/2026 às 20:51
-- Versão do servidor: 5.7.32-35-log
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bancastores`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `partida`
--

CREATE TABLE `partida` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fase` int(1) DEFAULT NULL,
  `tempo` int(11) DEFAULT NULL,
  `pontuacao` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Despejando dados para a tabela `partida`
--

INSERT INTO `partida` (`id`, `id_usuario`, `fase`, `tempo`, `pontuacao`) VALUES
(1, 4, 1, 0, 240),
(2, 5, 1, 0, 90),
(3, 5, 1, 0, 85),
(4, 6, 1, 0, 80),
(5, 8, 1, 0, 145),
(6, 10, 1, 0, 45),
(7, 10, 1, 0, -35),
(8, 4, 1, 0, 0),
(9, 11, 1, 0, -45),
(10, 11, 1, 0, -50),
(11, 11, 1, 0, -10),
(12, 11, 1, 0, -5),
(13, 11, 1, 0, 0),
(14, 6, 1, 0, 0),
(15, 6, 1, 0, -85),
(16, 14, 1, 0, 45),
(17, 4, 1, 0, 0),
(18, 14, 1, 0, 75),
(19, 4, 1, 0, 0),
(20, 15, 1, 0, 35),
(21, 15, 1, 0, 150),
(22, 16, 1, 0, -5),
(23, 17, 1, 0, 15),
(24, 17, 1, 0, 80),
(25, 18, 1, 0, 60),
(26, 18, 1, 0, 145),
(27, 6, 1, 0, 120),
(28, 6, 1, 0, 175),
(29, 15, 1, 0, 160),
(30, 19, 1, 0, 160),
(31, 22, 1, 0, 200),
(32, 23, 1, 0, -10),
(33, 26, 1, 0, 100),
(34, 27, 1, 0, 5),
(35, 27, 1, 0, 20),
(36, 27, 1, 0, 20),
(37, 27, 1, 0, 85),
(38, 27, 1, 0, 25),
(39, 27, 1, 0, 110),
(40, 28, 1, 0, 50),
(41, 28, 1, 0, 90),
(42, 28, 1, 0, 160),
(43, 28, 1, 0, 190),
(44, 29, 1, 0, 85),
(45, 29, 1, 0, 65),
(46, 30, 1, 0, 210),
(47, 30, 1, 0, 200),
(48, 30, 1, 0, 220),
(49, 30, 1, 0, 210),
(50, 30, 1, 0, 240);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `responsavel` varchar(20) DEFAULT NULL,
  `nome` varchar(20) DEFAULT NULL,
  `idade` int(2) DEFAULT NULL,
  `turma` varchar(10) DEFAULT NULL,
  `colegio` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id`, `responsavel`, `nome`, `idade`, `turma`, `colegio`) VALUES
(4, 'Ana', 'Gustavo', 17, NULL, NULL),
(5, 'Terezinha', 'Camille', 45, NULL, NULL),
(6, 'Marco', 'Flavio', 14, NULL, NULL),
(7, 'Papai', 'JP', 16, NULL, NULL),
(8, 'Pai', 'Mateus', 18, NULL, NULL),
(9, 'Mateus', 'Rodrigo', 8, NULL, NULL),
(10, 'fulano', 'ciclano', 16, NULL, NULL),
(11, 'carol', 'miguel', 19, NULL, NULL),
(12, 'ciclano', 'fulano', 12, NULL, NULL),
(13, 'Igor', 'Guguti', 17, NULL, NULL),
(14, 'Adriana', 'Mari', 18, NULL, NULL),
(15, 'bibi', 'bubu', 8, NULL, NULL),
(16, 'rihana', 'rihana', 12, NULL, NULL),
(17, 'rihana', 'bubu', 13, NULL, NULL),
(18, 'bibi', 'bubu (agora vai)', 7, NULL, NULL),
(19, 'pai', 'filho', 18, NULL, NULL),
(20, 'teste', 'teste2', 44, NULL, NULL),
(21, 'teste', 'Branca', 44, NULL, NULL),
(22, 'Gilda', 'Igor', 17, NULL, NULL),
(23, 'Gustavo', 'Joao', 12, NULL, NULL),
(24, 'Gustavo', 'Igor', 15, NULL, NULL),
(25, 'Ciclano', 'Jorge', 99999999, NULL, NULL),
(26, 'Flavio', 'Marco', 46, NULL, NULL),
(27, 'Camille', 'Terezinha', 67, NULL, NULL),
(28, 'Flavio', 'matheus', 9, NULL, NULL),
(29, 'Giselle', 'Giselle', 43, NULL, NULL),
(30, 'Xavier', 'Paulo', 20, NULL, NULL),
(31, 'Paulo', 'João', 13, NULL, NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `partida`
--
ALTER TABLE `partida`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `partida`
--
ALTER TABLE `partida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `partida`
--
ALTER TABLE `partida`
  ADD CONSTRAINT `partida_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
