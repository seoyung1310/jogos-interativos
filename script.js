// ==========================================
//  🎨 JOGO DAS ARTES - VERSÃO QUE FUNCIONA
// ==========================================

// ---------- BANCO DE PERGUNTAS ----------
var perguntas = [
  // MÚSICA
  {
    pergunta: "🎵 Qual instrumento tem teclas pretas e brancas?",
    alternativas: ["Violão", "Piano", "Flauta", "Bateria"],
    correta: 1
  },
  {
    pergunta: "🎶 Quem é o autor da famosa 'Nona Sinfonia'?",
    alternativas: ["Mozart", "Bach", "Beethoven", "Chopin"],
    correta: 2
  },
  // DANÇA
  {
    pergunta: "💃 Qual dança é típica do Brasil e tem passos rápidos com os pés?",
    alternativas: ["Balé", "Samba", "Tango", "Hip Hop"],
    correta: 1
  },
  {
    pergunta: "🩰 Como se chama a dança clássica com sapatilhas de ponta?",
    alternativas: ["Jazz", "Balé", "Sapateado", "Forró"],
    correta: 1
  },
  // TEATRO
  {
    pergunta: "🎭 No teatro, como chamamos a pessoa que interpreta um personagem?",
    alternativas: ["Diretor", "Ator", "Cenógrafo", "Figurinista"],
    correta: 1
  },
  {
    pergunta: "🎬 O que é o 'figurino' em uma peça de teatro?",
    alternativas: ["O cenário", "As roupas dos personagens", "As falas", "A iluminação"],
    correta: 1
  },
  // ARTES VISUAIS
  {
    pergunta: "🎨 Quem pintou a famosa obra 'Mona Lisa'?",
    alternativas: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Tarsila do Amaral"],
    correta: 2
  },
  {
    pergunta: "🖌️ Qual artista brasileira pintou o quadro 'Abaporu'?",
    alternativas: ["Tarsila do Amaral", "Anita Malfatti", "Beatriz Milhazes", "Adriana Varejão"],
    correta: 0
  },
  {
    pergunta: "🌈 Quais são as cores primárias?",
    alternativas: ["Verde, Laranja e Roxo", "Vermelho, Azul e Amarelo", "Rosa, Azul e Verde", "Preto, Branco e Cinza"],
    correta: 1
  },
  {
    pergunta: "🗿 O que é uma escultura?",
    alternativas: ["Uma pintura em tela", "Uma obra de arte tridimensional", "Um desenho a lápis", "Uma colagem"],
    correta: 1
  }
];

// ---------- VARIÁVEIS ----------
var rodadaAtual = 0;
var acertos = 0;
var respondeu = false;
var timer = null;

// ---------- INICIALIZAÇÃO ----------
window.addEventListener('load', function () {
  console.log('✅ script.js carregado!');

  // Elementos
  var startScreen = document.getElementById('start-screen');
  var gameScreen = document.getElementById('game-screen');
  var endScreen = document.getElementById('end-screen');
  var btnIniciar = document.getElementById('btn-iniciar');
  var btnReiniciar = document.getElementById('btn-reiniciar');
  var perguntaTexto = document.getElementById('pergunta-texto');
  var alternativasContainer = document.getElementById('alternativas-container');
  var feedback = document.getElementById('feedback');
  var currentRoundSpan = document.getElementById('current-round');
  var scoreSpan = document.getElementById('score');
  var finalScoreSpan = document.getElementById('final-score');
  var finalMessage = document.getElementById('final-message');
  var endTitle = document.getElementById('end-title');
  var coelho = document.getElementById('coelho');

  // Verifica se todos os elementos existem
  if (!btnIniciar) { console.error('❌ Botão iniciar não encontrado!'); return; }
  if (!startScreen || !gameScreen || !endScreen) { console.error('❌ Telas não encontradas!'); return; }
  console.log('✅ Todos os elementos encontrados!');

  // ---------- FUNÇÕES ----------

  function iniciarJogo() {
    console.log('🎮 Iniciando jogo...');

    if (timer) { clearTimeout(timer); timer = null; }

    rodadaAtual = 0;
    acertos = 0;
    respondeu = false;

    coelho.classList.remove('triste');

    startScreen.classList.remove('active');
    endScreen.classList.remove('active');
    gameScreen.classList.add('active');

    carregarPergunta();
  }

  function carregarPergunta() {
    if (rodadaAtual >= perguntas.length) {
      finalizarJogo();
      return;
    }

    respondeu = false;
    feedback.textContent = '';
    feedback.style.color = '#64b5f6';

    currentRoundSpan.textContent = rodadaAtual + 1;
    scoreSpan.textContent = acertos;

    var p = perguntas[rodadaAtual];
    perguntaTexto.textContent = p.pergunta;

    alternativasContainer.innerHTML = '';

    p.alternativas.forEach(function (texto, i) {
      var btn = document.createElement('button');
      btn.className = 'alternativa-btn';
      btn.textContent = texto;
      btn.onclick = function () { verificarResposta(i); };
      alternativasContainer.appendChild(btn);
    });

    coelho.classList.remove('triste');
  }

  function verificarResposta(escolhido) {
    if (respondeu) return;
    respondeu = true;

    var p = perguntas[rodadaAtual];
    var botoes = alternativasContainer.querySelectorAll('.alternativa-btn');

    botoes.forEach(function (b) { b.disabled = true; });

    if (escolhido === p.correta) {
      // ACERTOU
      acertos++;
      scoreSpan.textContent = acertos;
      botoes[escolhido].classList.add('correta');
      feedback.textContent = '✅ Muito bem! Você acertou!';
      feedback.style.color = '#66bb6a';

      timer = setTimeout(function () {
        rodadaAtual++;
        carregarPergunta();
      }, 1200);

    } else {
      // ERROU
      botoes[escolhido].classList.add('errada');
      botoes[p.correta].classList.add('correta');
      coelho.classList.add('triste');
      feedback.textContent = '❌ Ops! Resposta errada. O coelhinho ficou triste...';
      feedback.style.color = '#ef5350';

      timer = setTimeout(function () {
        rodadaAtual++;
        carregarPergunta();
      }, 1800);
    }
  }

  function finalizarJogo() {
    gameScreen.classList.remove('active');
    endScreen.classList.add('active');

    finalScoreSpan.textContent = acertos;

    if (acertos === perguntas.length) {
      endTitle.textContent = '🏆 Perfeito! Você é um artista!';
      finalMessage.textContent = 'Uau! Você acertou tudo! Parabéns! 🎉';
      finalMessage.style.color = '#66bb6a';
    } else if (acertos >= 7) {
      endTitle.textContent = '🌟 Muito bem!';
      finalMessage.textContent = 'Você conhece muito sobre arte! Continue assim! 😊';
      finalMessage.style.color = '#81c784';
    } else if (acertos >= 4) {
      endTitle.textContent = '🎨 Bom trabalho!';
      finalMessage.textContent = 'Você está no caminho certo! Estude um pouquinho mais! 📚';
      finalMessage.style.color = '#64b5f6';
    } else {
      endTitle.textContent = '💪 Continue tentando!';
      finalMessage.textContent = 'Não desanime! A arte é um mundo maravilhoso! 🌈';
      finalMessage.style.color = '#f48fb1';
    }

    coelho.classList.remove('triste');
  }

  // ---------- EVENTOS ----------
  btnIniciar.addEventListener('click', iniciarJogo);

  btnReiniciar.addEventListener('click', function () {
    if (timer) { clearTimeout(timer); timer = null; }
    endScreen.classList.remove('active');
    startScreen.classList.add('active');
    coelho.classList.remove('triste');
  });

  console.log('✅ Eventos configurados! Clique em INICIAR.');
});
