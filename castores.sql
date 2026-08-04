-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04/08/2026 às 21:32
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `castores`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `cadeira`
--

CREATE TABLE `cadeira` (
  `id` int(11) NOT NULL,
  `image` varchar(150) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `direcao` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `lixeira`
--

CREATE TABLE `lixeira` (
  `id` int(11) NOT NULL,
  `image` varchar(150) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `material` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `lixo`
--

CREATE TABLE `lixo` (
  `id` int(11) NOT NULL,
  `id_lixeira` int(11) DEFAULT NULL,
  `image` varchar(150) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `partida`
--

CREATE TABLE `partida` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_personagem` int(11) DEFAULT NULL,
  `fase` int(1) DEFAULT NULL,
  `tempo` int(11) DEFAULT NULL,
  `pontuacao` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `personagem`
--

CREATE TABLE `personagem` (
  `id` int(11) NOT NULL,
  `image` varchar(150) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sala`
--

CREATE TABLE `sala` (
  `id` int(11) NOT NULL,
  `organizacao_cadeiras` varchar(20) DEFAULT NULL,
  `posicao_quadro` varchar(20) DEFAULT NULL,
  `image` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `responsavel` varchar(20) DEFAULT NULL,
  `nome` varchar(20) DEFAULT NULL,
  `idade` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id`, `responsavel`, `nome`, `idade`) VALUES
(1, 'a', 'f', 2),
(2, 'Igor', 'Bola de Fogo', 1),
(3, 'Igor', 'Xavier', 17);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `cadeira`
--
ALTER TABLE `cadeira`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `lixeira`
--
ALTER TABLE `lixeira`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `lixo`
--
ALTER TABLE `lixo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_lixeira` (`id_lixeira`);

--
-- Índices de tabela `partida`
--
ALTER TABLE `partida`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_personagem` (`id_personagem`);

--
-- Índices de tabela `personagem`
--
ALTER TABLE `personagem`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `sala`
--
ALTER TABLE `sala`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cadeira`
--
ALTER TABLE `cadeira`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `lixeira`
--
ALTER TABLE `lixeira`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `lixo`
--
ALTER TABLE `lixo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `partida`
--
ALTER TABLE `partida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `personagem`
--
ALTER TABLE `personagem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `sala`
--
ALTER TABLE `sala`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `lixo`
--
ALTER TABLE `lixo`
  ADD CONSTRAINT `lixo_ibfk_1` FOREIGN KEY (`id_lixeira`) REFERENCES `lixeira` (`id`);

--
-- Restrições para tabelas `partida`
--
ALTER TABLE `partida`
  ADD CONSTRAINT `partida_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `partida_ibfk_2` FOREIGN KEY (`id_personagem`) REFERENCES `personagem` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
