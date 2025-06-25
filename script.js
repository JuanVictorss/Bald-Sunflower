const telaMenuInicial = document.getElementById("tela-menu-inicial");
const botaoJogar = document.getElementById("botao-jogar");
const botaoSilenciar = document.getElementById("botao-silenciar");
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
const botaoReiniciarJogo = document.getElementById("botao-reiniciar-jogo");

let palavraAtual = "";
let dicaAtual = "";
let letrasAdivinhadas = [];
let errosCometidos = 0;
const maximoErros = 7;
let somSilenciadoGlobal = false;

const bancoDePalavras = [
  { palavra: "girassol", dica: "Uma flor que segue o sol." },
  { palavra: "margarida", dica: "Uma flor simples e campestre." },
  { palavra: "rosa", dica: "Uma flor clássica, símbolo do amor." },
  { palavra: "tulipa", dica: "Uma flor com formato de taça." },
  { palavra: "orquidea", dica: "Uma flor exótica e elegante." },
  { palavra: "jardim", dica: "Local onde as flores crescem." },
  { palavra: "primavera", dica: "Estação das flores." },
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
  botaoSilenciar.textContent = somSilenciadoGlobal
    ? "Ativar Som"
    : "Silenciar Som";
}

function exibirTela(telaParaExibir) {
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
}

function iniciarJogo(palavra, dica) {
  palavraAtual = palavra
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  dicaAtual = dica;
  letrasAdivinhadas = [];
  errosCometidos = 0;
  mensagem.textContent = "";
  botaoReiniciarJogo.classList.add("escondido");
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
    if (letrasAdivinhadas.includes(letra) || letra === " ") {
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
  const fileiras = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
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

  if (palavraAtual.includes(letraAdivinhada)) {
    evento.target.classList.add("correta");
    renderizarExibicaoPalavra();
    verificarVitoria();
  } else {
    errosCometidos++;
    const indiceImagem = Math.min(errosCometidos, imagensFlor.length - 1);
    imagemFlor.src = imagensFlor[indiceImagem];
    mensagem.textContent = `Que pena! A letra "${letraAdivinhada.toUpperCase()}" não está na palavra.`;
    verificarDerrota();
  }
}

function verificarVitoria() {
  if (
    palavraAtual
      .split("")
      .every((letra) => letrasAdivinhadas.includes(letra) || letra === " ")
  ) {
    mensagem.textContent = "Parabéns! Você acertou a palavra!";
    finalizarJogo(true);
  }
}

function verificarDerrota() {
  if (errosCometidos >= maximoErros) {
    mensagem.textContent = `Fim de jogo! A palavra era: "${palavraAtual.toUpperCase()}".`;
    finalizarJogo(false);
  }
}

function finalizarJogo() {
  document
    .querySelectorAll(".tecla")
    .forEach((tecla) => tecla.classList.add("desabilitado"));
  botaoReiniciarJogo.classList.remove("escondido");
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
  const { palavra, dica } =
    bancoDePalavras[Math.floor(Math.random() * bancoDePalavras.length)];
  iniciarJogo(palavra, dica);
});

botaoDoisJogadores.addEventListener("click", () => {
  exibirTela(telaEntradaPalavra);
});

botaoIniciarDoisJogadores.addEventListener("click", () => {
  const palavraSecreta = campoPalavraSecreta.value.trim();
  const dica = campoDica.value.trim();
  if (palavraSecreta && dica && /^[a-zA-ZçÇ\s]+$/.test(palavraSecreta)) {
    iniciarJogo(palavraSecreta, dica);
  } else {
    alert(
      "Por favor, digite uma palavra válida (apenas letras e espaços) e uma dica."
    );
  }
});

botaoReiniciarJogo.addEventListener("click", reiniciarJogo);

document.addEventListener("keydown", (evento) => {
  const letra = evento.key.toLowerCase();
  if (letra.match(/^[a-zç]$/) && telaJogo.classList.contains("ativo")) {
    const elementoTecla = document.querySelector(
      `.tecla[data-letra="${letra}"]`
    );
    if (elementoTecla && !elementoTecla.classList.contains("desabilitado")) {
      elementoTecla.click();
    }
  }
});

exibirTela(telaMenuInicial);
atualizarEstadoSilenciarBotao();
