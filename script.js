const telaMenuInicial = document.getElementById("tela-menu-inicial");
const botaoJogar = document.getElementById("botao-jogar");
const botaoSilenciar = document.getElementById("botao-silenciar");
const iconeSom = document.getElementById("icone-som");
const musicaMenu = document.getElementById("musica-menu");
const musicaJogo = document.getElementById("musica-jogo");
const tituloPrincipal = document.getElementById("titulo-principal");
const telaSelecaoJogadores = document.getElementById("tela-selecao-jogadores");
const botaoUmJogador = document.getElementById("botao-um-jogador");
const botaoDoisJogadores = document.getElementById("botao-dois-jogadores");
const telaEntradaPalavra = document.getElementById("tela-entrada-palavra");
const campoPalavraSecreta = document.getElementById("campo-palavra-secreta");
const campoDica = document.getElementById("campo-dica");
const botaoIniciarDoisJogadores = document.getElementById(
  "botao-iniciar-dois-jogadores"
);
const telaJogo = document.getElementById("tela-jogo");
const imagemFlor = document.getElementById("imagem-flor");
const exibicaoDica = document.getElementById("exibicao-dica");
const exibicaoPalavra = document.getElementById("exibicao-palavra");
const teclado = document.getElementById("teclado");
const mensagem = document.getElementById("mensagem");
const botaoProximaAcao = document.getElementById("botao-proxima-acao");
const exibicaoPontuacaoTotal = document.getElementById(
  "exibicao-pontuacao-total"
);

const botaoHome = document.getElementById("botao-home");
const botaoVoltar = document.getElementById("botao-voltar");
let historicoDeTelas = [];

let palavraAtual = "";
let dicaAtual = "";
let letrasAdivinhadas = [];
let errosCometidos = 0;
const maximoErros = 7;
let pontuacaoTotal = 0;
let listaDePalavrasAtual = [];
let somSilenciadoGlobal = false;

const bancoDePalavras = [
  { palavra: "guitarra", dica: "Instrumento musical de cordas" },
  { palavra: "elefante", dica: "Maior mamífero terrestre" },
  { palavra: "astronauta", dica: "Profissional que viaja ao espaço" },
  { palavra: "pizza", dica: "Comida italiana muito popular" },
  { palavra: "dinossauro", dica: "Animal pré-histórico extinto" },
  { palavra: "computador", dica: "Dispositivo eletrônico de processamento" },
  { palavra: "brasil", dica: "Maior país da América do Sul" },
  { palavra: "caneta", dica: "Usado para escrever com tinta" },
  { palavra: "palmeiras", dica: "Time de futebol brasileiro" },
  { palavra: "cinderela", dica: "Princesa famosa da Disney" },
  { palavra: "sorvete", dica: "Sobremesa gelada" },
  { palavra: "camaleão", dica: "Animal que muda de cor" },
  { palavra: "avião", dica: "Meio de transporte aéreo" },
  { palavra: "xadrez", dica: "Jogo de tabuleiro estratégico" },
  { palavra: "arcoíris", dica: "Fenômeno com várias cores no céu" },
  { palavra: "bicicleta", dica: "Meio de transporte com pedais" },
  { palavra: "baleia", dica: "Maior animal do oceano" },
  { palavra: "relógio", dica: "Serve para marcar as horas" },
  { palavra: "harrypotter", dica: "Bruxo famoso da literatura e cinema" },
  { palavra: "internet", dica: "Rede global de computadores" },
];

const imagensFlor = [
  "images/girassol/flor_7.png",
  "images/girassol/flor_6.png",
  "images/girassol/flor_5.png",
  "images/girassol/flor_4.png",
  "images/girassol/flor_3.png",
  "images/girassol/flor_2.png",
  "images/girassol/flor_1.png",
  "images/girassol/flor_0.png",
];

function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function tocarMusica(musica) {
  if (!somSilenciadoGlobal) {
    musica.play().catch((e) => {});
  }
}

function pararMusica(musica) {
  musica.pause();
  musica.currentTime = 0;
}

function atualizarEstadoSilenciarBotao() {
  if (somSilenciadoGlobal) {
    botaoSilenciar.classList.add("selecionado");
    botaoSilenciar.title = "Ativar Som";
  } else {
    botaoSilenciar.classList.remove("selecionado");
    botaoSilenciar.title = "Silenciar Som";
  }
}

function exibirTela(telaParaExibir) {
  if (telaParaExibir === telaMenuInicial) {
    historicoDeTelas = [];
  }
  historicoDeTelas.push(telaParaExibir);

  const telas = document.querySelectorAll(".tela");
  telas.forEach((tela) => tela.classList.remove("ativo"));
  telaParaExibir.classList.add("ativo");

  if (telaParaExibir === telaJogo) {
    tituloPrincipal.style.display = "none";
  } else {
    tituloPrincipal.style.display = "block";
  }

  if (telaParaExibir === telaJogo) {
    pararMusica(musicaMenu);
    tocarMusica(musicaJogo);
  } else {
    pararMusica(musicaJogo);
    tocarMusica(musicaMenu);
  }

  botaoHome.classList.add("escondido");
  botaoVoltar.classList.add("escondido");

  if (telaParaExibir === telaJogo) {
    botaoHome.classList.remove("escondido");
  }

  if (historicoDeTelas.length > 1) {
    botaoVoltar.classList.remove("escondido");
  }
}

function calcularPontuacaoDaRodada() {
  const pontuacaoBaseRodada = 100;
  const penalidadePorErro = pontuacaoBaseRodada / maximoErros;
  const pontuacaoRodada = Math.max(
    0,
    pontuacaoBaseRodada - errosCometidos * penalidadePorErro
  );
  return Math.floor(pontuacaoRodada);
}

function comecarNovoJogo(palavra, dica) {
  pontuacaoTotal = 0;
  exibicaoPontuacaoTotal.textContent = pontuacaoTotal;

  if (palavra && dica) {
    listaDePalavrasAtual = [{ palavra, dica }];
  } else {
    listaDePalavrasAtual = [...bancoDePalavras].sort(() => Math.random() - 0.5);
  }
  iniciarProximaFase();
}

function iniciarProximaFase() {
  const proximaPalavraInfo = listaDePalavrasAtual.shift();
  iniciarJogo(proximaPalavraInfo.palavra, proximaPalavraInfo.dica);
}

function iniciarJogo(palavra, dica) {
  palavraAtual = palavra.toLowerCase();
  dicaAtual = dica;
  letrasAdivinhadas = [];
  errosCometidos = 0;

  mensagem.textContent = "";
  exibicaoPontuacaoTotal.textContent = pontuacaoTotal;
  botaoProximaAcao.classList.add("escondido");
  imagemFlor.src = imagensFlor[0];
  exibicaoDica.textContent = `Dica: ${dicaAtual}`;

  renderizarExibicaoPalavra();
  gerarTeclado();
  exibirTela(telaJogo);
}

function renderizarExibicaoPalavra() {
  exibicaoPalavra.innerHTML = "";
  palavraAtual.split("").forEach((letra) => {
    const caixaLetra = document.createElement("div");
    caixaLetra.classList.add("caixa-letra");
    if (letrasAdivinhadas.includes(removerAcentos(letra)) || letra === " ") {
      caixaLetra.textContent = letra;
      if (letra === " ") caixaLetra.style.borderBottom = "none";
    } else {
      caixaLetra.textContent = "";
    }
    exibicaoPalavra.appendChild(caixaLetra);
  });
}

function gerarTeclado() {
  teclado.innerHTML = "";
  const fileiras = ["qwertyuiop", "asdfghjklç", "zxcvbnm"];
  fileiras.forEach((fileira) => {
    const divFileira = document.createElement("div");
    divFileira.classList.add("fileira-teclado");
    fileira.split("").forEach((letra) => {
      const botaoTecla = document.createElement("button");
      botaoTecla.classList.add("tecla");
      botaoTecla.textContent = letra.toUpperCase();
      botaoTecla.dataset.letra = letra;
      botaoTecla.addEventListener("click", lidarComAdivinhacao);
      divFileira.appendChild(botaoTecla);
    });
    teclado.appendChild(divFileira);
  });
}

function lidarComAdivinhacao(evento) {
  const letraAdivinhada = evento.target.dataset.letra;
  if (evento.target.classList.contains("desabilitado")) return;

  letrasAdivinhadas.push(letraAdivinhada);
  evento.target.classList.add("desabilitado");

  if (removerAcentos(palavraAtual).includes(letraAdivinhada)) {
    evento.target.classList.add("correta");
    renderizarExibicaoPalavra();
    verificarVitoria();
  } else {
    errosCometidos++;
    const indiceImagem = Math.min(errosCometidos, imagensFlor.length - 1);
    imagemFlor.src = imagensFlor[indiceImagem];
    verificarDerrota();
  }
}

function verificarVitoria() {
  const vitoria = palavraAtual
    .split("")
    .every(
      (letra) =>
        letrasAdivinhadas.includes(removerAcentos(letra)) || letra === " "
    );

  if (vitoria) {
    finalizarJogo(true);
  }
}

function verificarDerrota() {
  if (errosCometidos >= maximoErros) {
    finalizarJogo(false);
  }
}

function finalizarJogo(vitoria) {
  document
    .querySelectorAll(".tecla")
    .forEach((tecla) => tecla.classList.add("desabilitado"));
  botaoProximaAcao.classList.remove("escondido");

  if (vitoria) {
    const pontosGanhos = calcularPontuacaoDaRodada();
    pontuacaoTotal += pontosGanhos;
    exibicaoPontuacaoTotal.textContent = pontuacaoTotal;
    mensagem.textContent = `Você acertou! Ganhou +${pontosGanhos} pontos.`;

    if (listaDePalavrasAtual.length > 0) {
      botaoProximaAcao.textContent = "Próxima Fase";
      botaoProximaAcao.onclick = iniciarProximaFase;
    } else {
      mensagem.textContent = `Parabéns! Pontuação Final: ${pontuacaoTotal}`;
      botaoProximaAcao.textContent = "Jogar Novamente";
      botaoProximaAcao.onclick = reiniciarJogo;
    }
  } else {
    mensagem.textContent = `A palavra era: "${palavraAtual.toUpperCase()}".`;
    botaoProximaAcao.textContent = "Jogar Novamente";
    botaoProximaAcao.onclick = reiniciarJogo;
  }
}

function reiniciarJogo() {
  exibirTela(telaMenuInicial);
  campoPalavraSecreta.value = "";
  campoDica.value = "";
}

botaoJogar.addEventListener("click", () => {
  musicaMenu.muted = false;
  if (somSilenciadoGlobal) {
    musicaMenu.muted = true;
  }
  exibirTela(telaSelecaoJogadores);
});

botaoSilenciar.addEventListener("click", () => {
  somSilenciadoGlobal = !somSilenciadoGlobal;
  musicaMenu.muted = somSilenciadoGlobal;
  musicaJogo.muted = somSilenciadoGlobal;
  atualizarEstadoSilenciarBotao();
});

botaoUmJogador.addEventListener("click", () => {
  comecarNovoJogo();
});

botaoDoisJogadores.addEventListener("click", () => {
  exibirTela(telaEntradaPalavra);
});

botaoIniciarDoisJogadores.addEventListener("click", () => {
  const palavraSecreta = campoPalavraSecreta.value.trim();
  const dica = campoDica.value.trim();
  if (palavraSecreta && dica) {
    comecarNovoJogo(palavraSecreta, dica);
  }
});

botaoHome.addEventListener("click", () => {
  reiniciarJogo();
});

botaoVoltar.addEventListener("click", () => {
  if (historicoDeTelas.length > 1) {
    historicoDeTelas.pop();
    const telaAnterior = historicoDeTelas.pop();
    exibirTela(telaAnterior);
  }
});

exibirTela(telaMenuInicial);
atualizarEstadoSilenciarBotao();
