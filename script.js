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
  { palavra: "arcoiris", dica: "Fenômeno com várias cores no céu" },
  { palavra: "bicicleta", dica: "Meio de transporte com pedais" },
  { palavra: "baleia", dica: "Maior animal do oceano" },
  { palavra: "relogio", dica: "Serve para marcar as horas" },
  { palavra: "harrypotter", dica: "Bruxo famoso da literatura e cinema" },
  { palavra: "internet", dica: "Rede global de computadores" },
  { palavra: "banana", dica: "Fruta amarela e alongada" },
  { palavra: "girafa", dica: "Animal de pescoço longo" },
  { palavra: "futebol", dica: "Esporte jogado com uma bola" },
  { palavra: "macaco", dica: "Animal que vive em árvores" },
  { palavra: "sapato", dica: "Calçado usado nos pés" },
  { palavra: "escola", dica: "Instituição de ensino" },
  { palavra: "telefone", dica: "Aparelho para comunicação à distância" },
  { palavra: "verao", dica: "Estação do ano com temperaturas altas" },
  { palavra: "cachorro", dica: "Animal doméstico conhecido por sua lealdade" },
  { palavra: "gato", dica: "Animal de estimação independente" },
  { palavra: "lua", dica: "Satélite natural da Terra" },
  { palavra: "chocolate", dica: "Doce feito a partir do cacau" },
  { palavra: "praia", dica: "Faixa de areia à beira-mar" },
  { palavra: "filme", dica: "Obra cinematográfica" },
  { palavra: "livro", dica: "Obra literária" },
  { palavra: "teclado", dica: "Dispositivo para digitar" },
  { palavra: "melancia", dica: "Fruta grande e suculenta" },
  { palavra: "tomate", dica: "Fruto vermelho usado em saladas" },
  { palavra: "carro", dica: "Veículo de quatro rodas" },
  { palavra: "janela", dica: "Abertura em uma parede" },
  { palavra: "montanha", dica: "Elevação natural do terreno" },
  { palavra: "neve", dica: "Precipitação de cristais de gelo" },
  { palavra: "vassoura", dica: "Usado para varrer o chão" },
  { palavra: "colher", dica: "Utensílio para comer líquidos" },
  { palavra: "piscina", dica: "Local com água para nadar" },
  { palavra: "foguete", dica: "Veículo espacial" },
  { palavra: "papel", dica: "Material usado para escrever" },
  { palavra: "tigre", dica: "Felino selvagem listrado" },
  { palavra: "urso", dica: "Animal grande que hiberna" },
  { palavra: "formiga", dica: "Inseto trabalhador" },
  { palavra: "abelha", dica: "Inseto produtor de mel" },
  { palavra: "cebola", dica: "Faz chorar ao cortar" },
  { palavra: "cenoura", dica: "Raiz alaranjada comestível" },
  { palavra: "panela", dica: "Usada para cozinhar" },
  { palavra: "ventilador", dica: "Serve para refrescar" },
  { palavra: "espelho", dica: "Reflete a imagem" },
  { palavra: "martelo", dica: "Ferramenta para bater pregos" },
  { palavra: "serra", dica: "Corta madeira ou metal" },
  { palavra: "computador", dica: "Usado para acessar a internet" },
  { palavra: "escada", dica: "Serve para subir" },
  { palavra: "chuva", dica: "Água que cai do céu" },
  { palavra: "nuvem", dica: "Formação visível de vapor no céu" },
  { palavra: "copo", dica: "Usado para beber" },
  { palavra: "travesseiro", dica: "Apoio para a cabeça ao dormir" },
  { palavra: "tapete", dica: "Cobre o chão" },
  { palavra: "geladeira", dica: "Eletrodoméstico que conserva alimentos" },
  { palavra: "fogao", dica: "Serve para cozinhar" },
  { palavra: "sofa", dica: "Móvel para sentar" },
  { palavra: "televisao", dica: "Exibe imagens e vídeos" },
  { palavra: "chuveiro", dica: "Dispositivo para banho" },
  { palavra: "escova", dica: "Usada para pentear" },
  { palavra: "sabao", dica: "Serve para lavar" },
  { palavra: "trator", dica: "Máquina agrícola" },
  { palavra: "ônibus", dica: "Transporte coletivo urbano" },
  { palavra: "trem", dica: "Veículo sobre trilhos" },
  { palavra: "navio", dica: "Transporte marítimo" },
  { palavra: "ônix", dica: "Pedra preciosa escura" },
  { palavra: "bumerangue", dica: "Arremessado e retorna ao lançador" },
  { palavra: "esquilo", dica: "Roedor que vive em árvores" },
  { palavra: "iguana", dica: "Réptil tropical" },
  { palavra: "jacare", dica: "Répteis de grandes mandíbulas" },
  { palavra: "tartaruga", dica: "Animal com casco" },
  { palavra: "girassol", dica: "Flor que segue o sol" },
  { palavra: "zebra", dica: "Animal listrado" },
  { palavra: "pinguim", dica: "Ave que não voa e vive no gelo" },
  { palavra: "coelho", dica: "Animal de orelhas grandes" },
  { palavra: "leao", dica: "Rei da selva" },
  { palavra: "cavalo", dica: "Animal usado para montaria" },
  { palavra: "pantera", dica: "Felino negro e ágil" },
  { palavra: "morango", dica: "Fruta vermelha com sementes fora" },
  { palavra: "abacaxi", dica: "Fruta tropical com coroa" },
  { palavra: "laranja", dica: "Fruta cítrica e redonda" },
  { palavra: "limão", dica: "Fruta azeda" },
  { palavra: "uva", dica: "Fruta usada para fazer vinho" },
  { palavra: "pera", dica: "Fruta com formato de sino" },
  { palavra: "manga", dica: "Fruta doce e tropical" },
  { palavra: "figo", dica: "Fruta roxa por fora, doce por dentro" },
  { palavra: "jaca", dica: "Fruta grande e com espinhos" },
  { palavra: "melão", dica: "Fruta amarelada e refrescante" },
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
  exibicaoPontuacaoTotal.textContent = "score: " + pontuacaoTotal;

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
  exibicaoPontuacaoTotal.textContent = "score: " + pontuacaoTotal;
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

function tremerFlor() {
  var opcoes = {
    times: 3,
    distance: 10,
  };

  var duracao = 400;

  $("#imagem-flor").effect("shake", opcoes, duracao);
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
    tremerFlor();

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
    exibicaoPontuacaoTotal.textContent = "score: " + pontuacaoTotal;
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
