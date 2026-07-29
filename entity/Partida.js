// class Partida {

//     constructor(dados = {}) {
//         this.id             = dados.id              ?? 0;
//         this.id_usuario     = dados.id_usuario      ?? 0;
//         this.id_personagem  = dados.id_personagem   ?? 0;
//         this.fase           = dados.fase            ?? 0;
//         this.tempo          = dados.tempo           ?? 0;
//         this.pontuacao      = dados.pontuacao       ?? 0;
//     }

//     getId()             { return this.id; }
//     getIdUsuario()      { return this.id_usuario; }
//     getIdPersonagem()   { return this.id_personagem; }
//     getFase()           { return this.fase; }
//     getTempo()          { return this.tempo; }
//     getPontuacao()      { return this.pontuacao; }

//     static novo(id_usuario, id_personagem, fase, tempo, pontuacao) {
//         const partida = new Partida();
//         partida.id_usuario      = id_usuario
//         partida.id_personagem   = id_personagem
//         partida.alterarDados(fase, tempo, pontuacao);
//         return partida;
//     }

//     alterarDados(fase, tempo, pontuacao) {
//         this.fase       = fase;
//         this.tempo      = tempo;
//         this.pontuacao  = pontuacao;
//     }

//     registrarIdGerado(id){
//         if (id <= 0) {
//             throw new InvalidArgumentException('ID inválido.');
//         }

//         this.id = id
//     }
// }