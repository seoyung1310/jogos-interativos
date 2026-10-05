// =============================================
//   🐰 COELHO DAS ARTES - JOGO EDUCATIVO
// =============================================

// ---------- PERGUNTAS ----------
const PERGUNTAS = [
  // MÚSICA
  {
    q: "Qual elemento organiza os sons no tempo, dividindo a música em partes iguais?",
    opcoes: ["Melodia", "Ritmo", "Harmonia", "Timbre"],
    correta: 1
  },
  {
    q: "Qual instrumento é conhecido como 'rei dos instrumentos' e tem 88 teclas?",
    opcoes: ["Violão", "Piano", "Flauta", "Bateria"],
    correta: 1
  },
  {
    q: "O que é uma orquestra?",
    opcoes: [
      "Um grupo de dançarinos",
      "Um conjunto de instrumentos que tocam juntos",
      "Uma peça de teatro",
      "Um tipo de pintura"
    ],
    correta: 1
  },
  // DANÇA
  {
    q: "Qual dança brasileira tem passos rápidos e é típica do carnaval?",
    opcoes: ["Balé", "Samba", "Frevo", "Forró"],
    correta: 1
  },
  {
    q: "Em qual país surgiu o balé clássico?",
    opcoes: ["Itália", "França", "Rússia", "Brasil"],
    correta: 0
  },
  {
    q: "A dança é uma arte que usa principalmente:",
    opcoes: [
      "Apenas palavras",
      "O movimento do corpo",
      "Somente tintas",
      "Instrumentos de sopro"
    ],
    correta: 1
  },
  // TEATRO
  {
    q: "No teatro, como se chama o texto que os atores interpretam?",
    opcoes: ["Roteiro", "Peça", "Libreto", "Argumento"],
    correta: 1
  },
  {
    q: "Quem dirige os atores e coordena a montagem da peça?",
    opcoes: ["Cenógrafo", "Diretor", "Figurinista", "Iluminador"],
    correta: 1
  },
  // ARTES VISUAIS
  {
    q: "Qual técnica de pintura usa pequenos pontos coloridos?",
    opcoes: ["Pontilhismo", "Aquarela", "Grafite", "Colagem"],
    correta: 0
  },
  {
    q: "Quem pintou a famosa obra 'Mona Lisa'?",
    opcoes: ["Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Tarsila do Amaral"],
    correta: 1
  }
];

// ---------- ESTADO ----------
const TOTAL_DEGRAUS = 10;
let indiceAtual = 0;
let acertos = 0;
let respondida = false;

// ---------- REFERÊNCIAS DOM ----------
const telaInicial = document.getElementById('telaInicial');
const telaJogo = document.getElementById('telaJogo');
const telaFinal = document.getElementById('telaFinal');

const btnIniciar = document.getElementById('btnIniciar');
const btnReiniciar = document.getElementById('btnReiniciar');

const infoPergunta = document.getElementById('infoPergunta');
const infoAcertos = document.getElementById('infoAcertos');
const escada = document.getElementById('escada');
const textoPergunta = document.getElementById('textoPergunta');
const alternativas = document.getElementById('alternativas');
const mensagem = document.getElementById('mensagem');
const btnProxima = document.getElementById('btnProxima');

const emojiFinal = document.getElementById('emojiFinal');
const tituloFinal = document.getElementById('tituloFinal');
const placarFinal = document.getElementById('placarFinal');

// ---------- CRIA ESCADA E COELHO ----------
function montarCenario() {
  escada.innerHTML = '';

  // Cria os degraus
  for (let i = 0; i < TOTAL_DEGRAUS; i++) {
    const d = document.createElement('div');
    d.className = 'degrau';
    d.dataset.indice = i;
    // Altura crescente para dar ideia de escada
    d.style.marginBottom = (8 + i * 6) + 'px';
    escada.appendChild(d);
  }

  // Cria o coelho
  const coelho = document.createElement('div');
  coelho.className = 'coelho';
  coelho.id = 'coelho';
  coelho.innerHTML = '🐇<span class="cenoura">🥕</span>';
  escada.appendChild(coelho);
}

// ---------- POSICIONA O COELHO ----------
function posicionarCoelho(qtdAcertos) {
  const coelho = document.getElementById('coelho');
  if (!coelho) return;

  // Preenche os degraus
  const degraus = escada.querySelectorAll('.degrau');
  degraus.forEach((d, i) => {
    if (i < qtdAcertos) {
      d.classList.add('preenchido');
    } else {
      d.classList.remove('preenchido');
    }
  });

  // Calcula deslocamento horizontal (esquerda -> direita)
  // O coelho começa na esquerda e sobe. Quanto mais acertos, mais para cima e direita.
  const coelhoLargura = 60; // aprox
  const degrauLargura = 46 + 6; // largura + gap

  if (qtdAcertos === 0) {
    // No chão, na esquerda
    coelho.style.transform = `translate(0px, 0px)`;
  } else {
    const deslocX = qtdAcertos * degrauLargura;
    const deslocY = 8 + (qtdAcertos - 1) * 6 + 28; // altura do degrau + base
    coelho.style.transform = `translate(${deslocX}px, -${deslocY}px)`;
  }
}

// ---------- CARREGA PERGUNTA ----------
function carregarPergunta() {
  respondida = false;
  btnProxima.classList.remove('visivel');
  mensagem.textContent = '';

  const pergunta = PERGUNTAS[indiceAtual];

  infoPergunta.textContent = `Pergunta ${indiceAtual + 1} de ${PERGUNTAS.length}`;
  infoAcertos.textContent = acertos;
  textoPergunta.textContent = pergunta.q;

  alternativas.innerHTML = '';
  const letras = ['A', 'B', 'C', 'D'];

  pergunta.opcoes.forEach((texto, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn-alternativa';
    btn.innerHTML = `<span class="letra">${letras[i]}</span> ${texto}`;
    btn.addEventListener('click', () => responder(i, btn));
    alternativas.appendChild(btn);
  });

  posicionarCoelho(acertos);
}

// ---------- RESPONDER ----------
function responder(indiceEscolhido, botaoClicado) {
  if (respondida) return;
  respondida = true;

  const pergunta = PERGUNTAS[indiceAtual];
  const todosBotoes = alternativas.querySelectorAll('.btn-alternativa');
  todosBotoes.forEach(b => (b.disabled = true));

  if (indiceEscolhido === pergunta.correta) {
    // ACERTO
    botaoClicado.classList.add('correta');
    acertos++;
    infoAcertos.textContent = acertos;
    mensagem.textContent = '✅ Acertou! O coelho subiu um degrau!';
    posicionarCoelho(acertos);
  } else {
    // ERRO
    botaoClicado.classList.add('errada');
    // Mostra a correta
    todosBotoes[pergunta.correta].classList.add('correta');
    mensagem.textContent = '❌ Errou! O coelho jogou a cenoura e chorou...';
    coelhoChoraEJogaCenoura();
  }

  btnProxima.classList.add('visivel');
}

// ---------- EFEITO DE ERRO ----------
function coelhoChoraEJogaCenoura() {
  const coelho = document.getElementById('coelho');
  if (!coelho) return;

  coelho.classList.add('chorando');
  coelho.classList.add('jogando-cenoura');

  setTimeout(() => {
    coelho.classList.remove('chorando');
    coelho.classList.remove('jogando-cenoura');
  }, 900);
}

// ---------- PRÓXIMA ----------
function proximaPergunta() {
  if (indiceAtual < PERGUNTAS.length - 1) {
    indiceAtual++;
    carregarPergunta();
  } else {
    finalizarJogo();
  }
}

// ---------- FINALIZAR ----------
function finalizarJogo() {
  telaJogo.classList.remove('ativa');
  telaFinal.classList.add('ativa');

  placarFinal.textContent = `Você acertou ${acertos} de ${PERGUNTAS.length} perguntas!`;

  if (acertos === PERGUNTAS.length) {
    tituloFinal.textContent = '🌟 Perfeito! Coelho no topo! 🌟';
    emojiFinal.textContent = '🐇🏆';
  } else if (acertos >= 7) {
    tituloFinal.textContent = '😊 Muito bem! Quase lá!';
    emojiFinal.textContent = '🐇✨';
  } else if (acertos >= 4) {
    tituloFinal.textContent = '🐰 Continue tentando!';
    emojiFinal.textContent = '🐇🌱';
  } else {
    tituloFinal.textContent = '🥕 Não desista!';
    emojiFinal.textContent = '🐇💪';
  }
}

// ---------- INICIAR ----------
function iniciarJogo() {
  indiceAtual = 0;
  acertos = 0;
  respondida = false;

  telaInicial.classList.remove('ativa');
  telaFinal.classList.remove('ativa');
  telaJogo.classList.add('ativa');

  montarCenario();
  carregarPergunta();
}

// ---------- EVENTOS ----------
btnIniciar.addEventListener('click', iniciarJogo);
btnProxima.addEventListener('click', proximaPergunta);
btnReiniciar.addEventListener('click', iniciarJogo);

// Garante que a tela inicial é a única ativa ao carregar
window.addEventListener('DOMContentLoaded', () => {
  telaInicial.classList.add('ativa');
  telaJogo.classList.remove('ativa');
  telaFinal.classList.remove('ativa');
});
