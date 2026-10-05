// ===== BANCO DE PERGUNTAS =====
const perguntas = [
  {
    categoria: "🎵 Música",
    cor: "#FFB3C6",
    pergunta: "Qual instrumento tem teclas pretas e brancas?",
    alternativas: ["Violão", "Piano", "Flauta", "Bateria"],
    correta: 1
  },
  {
    categoria: "💃 Dança",
    cor: "#A8E6CF",
    pergunta: "O balé é um estilo de dança que se originou em qual país?",
    alternativas: ["Brasil", "Itália", "França", "Japão"],
    correta: 1
  },
  {
    categoria: "🎭 Teatro",
    cor: "#B5D8FF",
    pergunta: "Como se chama a pessoa que escreve peças de teatro?",
    alternativas: ["Ator", "Dramaturgo", "Diretor", "Cenógrafo"],
    correta: 1
  },
  {
    categoria: "🖼️ Artes Visuais",
    cor: "#FFD9A0",
    pergunta: "Quais são as cores primárias?",
    alternativas: ["Verde, laranja e roxo", "Vermelho, azul e amarelo", "Preto, branco e cinza", "Rosa, azul e verde"],
    correta: 1
  },
  {
    categoria: "🎵 Música",
    cor: "#FFB3C6",
    pergunta: "Quantas notas musicais existem na escala básica?",
    alternativas: ["5", "6", "7", "10"],
    correta: 2
  },
  {
    categoria: "💃 Dança",
    cor: "#A8E6CF",
    pergunta: "O samba é um ritmo e dança típico de qual país?",
    alternativas: ["Argentina", "Brasil", "México", "Espanha"],
    correta: 1
  },
  {
    categoria: "🎭 Teatro",
    cor: "#B5D8FF",
    pergunta: "O que é um 'monólogo' no teatro?",
    alternativas: ["Uma peça com muitos atores", "Um discurso feito por um só ator", "Um tipo de figurino", "Uma música de cena"],
    correta: 1
  },
  {
    categoria: "🖼️ Artes Visuais",
    cor: "#FFD9A0",
    pergunta: "Quem pintou a famosa obra 'Mona Lisa'?",
    alternativas: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Tarsila do Amaral"],
    correta: 2
  },
  {
    categoria: "🎵 Música",
    cor: "#FFB3C6",
    pergunta: "Qual destes é um instrumento de percussão?",
    alternativas: ["Violino", "Tambor", "Piano", "Flauta"],
    correta: 1
  },
  {
    categoria: "💃 Dança",
    cor: "#A8E6CF",
    pergunta: "O frevo é uma dança típica de qual estado brasileiro?",
    alternativas: ["Bahia", "Pernambuco", "Rio de Janeiro", "Amazonas"],
    correta: 1
  }
];

// ===== ESTADO DO JOGO =====
let indiceAtual = 0;
let acertos = 0;
let respondendo = false;
let perguntasEmbaralhadas = [];

// ===== ELEMENTOS =====
const telaAbertura = document.getElementById('telaAbertura');
const telaJogo = document.getElementById('telaJogo');
const telaFinal = document.getElementById('telaFinal');

const btnIniciar = document.getElementById('btnIniciar');
const btnReiniciar = document.getElementById('btnReiniciar');
const btnJogarNovamente = document.getElementById('btnJogarNovamente');

const numPerguntaEl = document.getElementById('numPergunta');
const acertosEl = document.getElementById('acertos');
const categoriaPerguntaEl = document.getElementById('categoriaPergunta');
const perguntaEl = document.getElementById('pergunta');
const alternativasEl = document.getElementById('alternativas');
const feedbackEl = document.getElementById('feedback');

const coelhoContainer = document.getElementById('coelhoContainer');
const coelho = document.getElementById('coelho');
const cenoura = document.getElementById('cenoura');
const balaoFala = document.getElementById('balaoFala');
const escadaEl = document.getElementById('escada');

const emojiFinal = document.getElementById('emojiFinal');
const tituloFinal = document.getElementById('tituloFinal');
const mensagemFinal = document.getElementById('mensagemFinal');
const acertosFinal = document.getElementById('acertosFinal');

// ===== FUNÇÕES =====
function mostrarTela(tela) {
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  tela.classList.add('ativa');
}

function embaralhar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function criarEscada() {
  escadaEl.innerHTML = '';
  // 10 degraus (um por pergunta)
  for (let i = 0; i < 10; i++) {
    const degrau = document.createElement('div');
    degrau.className = 'degrau';
    degrau.dataset.index = i;
    escadaEl.appendChild(degrau);
  }
}

function atualizarEscada() {
  const degraus = escadaEl.querySelectorAll('.degrau');
  degraus.forEach((d, i) => {
    d.classList.toggle('ativo', i < acertos);
  });
}

function moverCoelho() {
  // Cada acerto sobe um degrau. 10 degraus.
  // Altura do cenário: ~320px. Cada degrau ~26px.
  const alturaBase = 40; // grama
  const alturaDegrau = 26;
  const novaAltura = alturaBase + (acertos * alturaDegrau);
  coelhoContainer.style.bottom = novaAltura + 'px';
}

function mostrarBalao(texto, duracao = 1500) {
  balaoFala.textContent = texto;
  balaoFala.classList.add('mostrar');
  clearTimeout(balaoFala._timeout);
  balaoFala._timeout = setTimeout(() => {
    balaoFala.classList.remove('mostrar');
  }, duracao);
}

function iniciarJogo() {
  indiceAtual = 0;
  acertos = 0;
  respondendo = false;
  perguntasEmbaralhadas = embaralhar(perguntas);

  acertosEl.textContent = '0';
  criarEscada();
  atualizarEscada();

  // Reset posição coelho
  coelhoContainer.style.bottom = '40px';
  coelho.classList.remove('chorando');

  mostrarTela(telaJogo);
  carregarPergunta();
}

function carregarPergunta() {
  if (indiceAtual >= perguntasEmbaralhadas.length) {
    finalizarJogo();
    return;
  }

  respondendo = false;
  const p = perguntasEmbaralhadas[indiceAtual];

  numPerguntaEl.textContent = indiceAtual + 1;
  categoriaPerguntaEl.textContent = p.categoria;
  categoriaPerguntaEl.style.background = p.cor;
  perguntaEl.textContent = p.pergunta;

  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';

  alternativasEl.innerHTML = '';

  const letras = ['A', 'B', 'C', 'D'];
  p.alternativas.forEach((alt, i) => {
    const btn = document.createElement('button');
    btn.className = 'alternativa';
    btn.innerHTML = `<strong>${letras[i]})</strong> ${alt}`;
    btn.addEventListener('click', () => responder(i, btn));
    alternativasEl.appendChild(btn);
  });

  // Animação de entrada
  perguntaEl.style.opacity = '0';
  setTimeout(() => { perguntaEl.style.opacity = '1'; }, 50);
}

function responder(indiceEscolhido, btnClicado) {
  if (respondendo) return;
  respondendo = true;

  const p = perguntasEmbaralhadas[indiceAtual];
  const botoes = alternativasEl.querySelectorAll('.alternativa');
  botoes.forEach(b => b.disabled = true);

  const acertou = indiceEscolhido === p.correta;

  if (acertou) {
    btnClicado.classList.add('correta');
    acertos++;
    acertosEl.textContent = acertos;

    // Coelho pula
    coelho.classList.add('pulando');
    setTimeout(() => coelho.classList.remove('pulando'), 600);

    // Sobe degrau
    setTimeout(() => {
      atualizarEscada();
      moverCoelho();
    }, 200);

    // Feedback
    const frases = ['Isso! 🎉', 'Muito bem! 🌟', 'Você é craque! 🎨', 'Perfeito! 💖', 'Uhuul! 🐰'];
    const frase = frases[Math.floor(Math.random() * frases.length)];
    feedbackEl.textContent = '✅ ' + frase;
    feedbackEl.className = 'feedback ok';
    mostrarBalao(frase, 1500);
  } else {
    btnClicado.classList.add('errada');
    // Mostra a correta
    botoes[p.correta].classList.add('correta');

    // Coelho chora e joga cenoura
    cenoura.classList.remove('jogar');
    void cenoura.offsetWidth; // reflow
    cenoura.classList.add('jogar');

    coelho.classList.add('chorando');
    setTimeout(() => coelho.classList.remove('chorando'), 1800);

    feedbackEl.textContent = '❌ Ops! A resposta certa era: ' + p.alternativas[p.correta];
    feedbackEl.className = 'feedback erro';
    mostrarBalao('Buaá! 😢', 1500);
  }

  // Próxima pergunta
  setTimeout(() => {
    indiceAtual++;
    carregarPergunta();
  }, 2200);
}

function finalizarJogo() {
  mostrarTela(telaFinal);
  acertosFinal.textContent = acertos;

  if (acertos === 10) {
    emojiFinal.textContent = '🏆';
    tituloFinal.textContent = 'PERFEITO! Artista Mestre!';
    mensagemFinal.textContent = 'Você acertou tudo! O coelhinho chegou no topo da escada com a cenoura inteirinha! 🐰🥕';
  } else if (acertos >= 7) {
    emojiFinal.textContent = '🌟';
    tituloFinal.textContent = 'Muito bem! Grande Artista!';
    mensagemFinal.textContent = `Você acertou ${acertos} de 10! Continue estudando arte, você é incrível! 🎨`;
  } else if (acertos >= 5) {
    emojiFinal.textContent = '🎨';
    tituloFinal.textContent = 'Bom trabalho!';
    mensagemFinal.textContent = `Você acertou ${acertos} de 10! Que tal jogar de novo para melhorar? 🐰`;
  } else {
    emojiFinal.textContent
