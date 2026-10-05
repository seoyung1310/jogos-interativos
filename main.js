(function () {
  'use strict';

  // ---------- BANCO DE PERGUNTAS (6º ano - Artes) ----------
  const QUESTIONS = [
    // Música
    {
      question: "Qual é o nome do elemento que organiza os sons no tempo, dividindo a música em partes iguais?",
      options: ["Melodia", "Ritmo", "Harmonia", "Timbre"],
      correct: 1
    },
    {
      question: "Qual instrumento musical é conhecido como 'rei dos instrumentos' e tem 88 teclas?",
      options: ["Violão", "Piano", "Flauta", "Bateria"],
      correct: 1
    },
    {
      question: "O que é uma 'orquestra'?",
      options: [
        "Um grupo de dançarinos",
        "Um conjunto de instrumentos musicais que tocam juntos",
        "Uma apresentação teatral",
        "Uma pintura famosa"
      ],
      correct: 1
    },
    // Dança
    {
      question: "Qual dança típica brasileira é conhecida pelos passos rápidos e pela saia rodada?",
      options: ["Balé", "Samba", "Frevo", "Forró"],
      correct: 1
    },
    {
      question: "O balé clássico surgiu em qual país?",
      options: ["Itália", "França", "Rússia", "Brasil"],
      correct: 0
    },
    {
      question: "A dança é uma forma de arte que usa:",
      options: [
        "Apenas palavras",
        "O movimento do corpo",
        "Somente tintas",
        "Instrumentos de sopro"
      ],
      correct: 1
    },
    // Teatro
    {
      question: "No teatro, qual é o nome do texto que os atores interpretam?",
      options: ["Roteiro", "Peça", "Libreto", "Argumento"],
      correct: 1
    },
    {
      question: "Quem é o profissional que dirige os atores e monta a peça teatral?",
      options: ["Cenógrafo", "Diretor", "Figurinista", "Iluminador"],
      correct: 1
    },
    // Artes Visuais
    {
      question: "Qual é o nome da técnica de pintura com pequenos pontos coloridos?",
      options: ["Pontilhismo", "Aquarela", "Grafite", "Colagem"],
      correct: 0
    },
    {
      question: "Quem pintou a famosa obra 'Mona Lisa'?",
      options: ["Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Tarsila do Amaral"],
      correct: 1
    }
  ];

  // ---------- VARIÁVEIS DE ESTADO ----------
  let currentQuestionIndex = 0;
  let score = 0;
  let answered = false;
  const totalQuestions = QUESTIONS.length;
  const TOTAL_STEPS = 10;
  let stepElements = [];

  // Elementos DOM (serão preenchidos no init)
  let startScreen, gameArea, endScreen, startBtn, playAgainBtn;
  let roundInfo, scoreDisplay, questionText, optionsGrid;
  let feedbackMessage, nextBtn, ladderArea;
  let endBunny, endTitle, endScore;
  let bunnyWrapper, carrotThrow;

  // ---------- CRIAÇÃO DO COELHO (feita uma única vez) ----------
  function createBunny() {
    bunnyWrapper = document.createElement('div');
    bunnyWrapper.classList.add('bunny-wrapper');
    bunnyWrapper.id = 'bunnyWrapper';

    const bunnyEmoji = document.createElement('div');
    bunnyEmoji.classList.add('bunny-emoji');
    bunnyEmoji.textContent = '🐇';

    carrotThrow = document.createElement('div');
    carrotThrow.classList.add('carrot-throw');
    carrotThrow.textContent = '🥕';

    bunnyWrapper.appendChild(bunnyEmoji);
    bunnyWrapper.appendChild(carrotThrow);

    return bunnyWrapper;
  }

  // ---------- CRIAÇÃO DA ESCADA ----------
  function createLadder() {
    // Limpa a área
    ladderArea.innerHTML = '';
    stepElements = [];

    // Cria os 10 degraus
    for (let i = 0; i < TOTAL_STEPS; i++) {
      const step = document.createElement('div');
      step.classList.add('step');
      step.dataset.index = i;
      const stepHeight = 8 + (i * 6);
      step.style.marginBottom = stepHeight + 'px';
      ladderArea.appendChild(step);
      stepElements.push(step);
    }

    // Cria o coelho (novo, sempre)
    createBunny();
    ladderArea.appendChild(bunnyWrapper);

    // Posiciona no chão
    updateBunnyPosition(score);
  }

  // ---------- ATUALIZA POSIÇÃO DO COELHO ----------
  function updateBunnyPosition(scoreValue) {
    if (!bunnyWrapper) return;

    // Marca degraus preenchidos
    stepElements.forEach((step, idx) => {
      if (idx < scoreValue) {
        step.classList.add('filled');
      } else {
        step.classList.remove('filled');
      }
    });

    // Ajusta a altura do coelho
    if (scoreValue === 0) {
      bunnyWrapper.style.marginBottom = '10px';
    } else {
      const stepIndex = Math.min(scoreValue - 1, TOTAL_STEPS - 1);
      const stepHeight = 8 + (stepIndex * 6);
      bunnyWrapper.style.marginBottom = (stepHeight + 28) + 'px';
    }
  }

  // ---------- EFEITO DE ERRO ----------
  function bunnyThrowCarrotAndCry() {
    if (!bunnyWrapper || !carrotThrow) return;

    bunnyWrapper.classList.add('bunny-crying');
    carrotThrow.classList.add('throw');

    setTimeout(() => {
      bunnyWrapper.classList.remove('bunny-crying');
      carrotThrow.classList.remove('throw');
    }, 900);
  }

  // ---------- CARREGAR PERGUNTA ----------
  function loadQuestion() {
    answered = false;
    nextBtn.classList.remove('visible');
    feedbackMessage.textContent = '';

    const q = QUESTIONS[currentQuestionIndex];

    roundInfo.textContent = `Pergunta ${currentQuestionIndex + 1} / ${totalQuestions}`;
    scoreDisplay.textContent = score;
    questionText.textContent = q.question;

    optionsGrid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.classList.add('option-btn');
      btn.innerHTML = `<span class="letter">${letters[idx]}</span> ${opt}`;
      btn.dataset.index = idx;
      btn.addEventListener('click', () => handleAnswer(idx, btn));
      optionsGrid.appendChild(btn);
    });

    updateBunnyPosition(score);
  }

  // ---------- TRATAR RESPOSTA ----------
  function handleAnswer(selectedIndex, btnElement) {
    if (answered) return;
    answered = true;

    const q = QUESTIONS[currentQuestionIndex];
    const isCorrect = (selectedIndex === q.correct);
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(btn => (btn.disabled = true));

    if (isCorrect) {
      btnElement.classList.add('correct');
      score++;
      scoreDisplay.textContent = score;
      feedbackMessage.textContent = '✅ Acertou! Coelho subiu um degrau!';
      updateBunnyPosition(score);
    } else {
      btnElement.classList.add('wrong');
      if (allBtns[q.correct]) allBtns[q.correct].classList.add('correct');
      feedbackMessage.textContent = '❌ Errou! O coelho jogou a cenoura e chorou...';
      bunnyThrowCarrotAndCry();
    }

    nextBtn.classList.add('visible');
  }

  // ---------- PRÓXIMA PERGUNTA ----------
  function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      showEndScreen();
    }
  }

  // ---------- TELA FINAL ----------
  function showEndScreen() {
    gameArea.classList.remove('active');
    endScreen.classList.add('active');

    const acertos = score;
    endScore.textContent = `Você acertou ${acertos} de ${totalQuestions} perguntas!`;

    if (acertos === totalQuestions) {
      endTitle.textContent = '🌟 Perfeito! Coelho no topo! 🌟';
      endBunny.textContent = '🐇🏆';
    } else if (acertos >= 7) {
      endTitle.textContent = '😊 Muito bem! Coelho quase lá!';
      endBunny.textContent = '🐇✨';
    } else if (acertos >= 4) {
      endTitle.textContent = '🐰 Continue tentando! Você é capaz!';
      endBunny.textContent = '🐇🌱';
    } else {
      endTitle.textContent = '🥕 Não desista! Estude mais arte!';
      endBunny.textContent = '🐇💪';
    }
  }

  // ---------- INICIAR JOGO ----------
  function startGame() {
    startScreen.classList.add('hidden');
    endScreen.classList.remove('active');
    gameArea.classList.add('active');

    currentQuestionIndex = 0;
    score = 0;
    answered = false;

    createLadder();
    loadQuestion();
  }

  // ---------- REINICIAR ----------
  function resetGame() {
    endScreen.classList.remove('active');
    startGame();
  }

  // ---------- INICIALIZAÇÃO ----------
  function init() {
    // Pega todos os elementos do DOM
    startScreen     = document.getElementById('startScreen');
    gameArea        = document.getElementById('gameArea');
    endScreen       = document.getElementById('endScreen');
    startBtn        = document.getElementById('startBtn');
    playAgainBtn    = document.getElementById('playAgainBtn');
    roundInfo       = document.getElementById('roundInfo');
    scoreDisplay    = document.getElementById('scoreDisplay');
    questionText    = document.getElementById('questionText');
    optionsGrid     = document.getElementById('optionsGrid');
    feedbackMessage = document.getElementById('feedbackMessage');
    nextBtn         = document.getElementById('nextBtn');
    ladderArea      = document.getElementById('ladderArea');
    endBunny        = document.getElementById('endBunny');
    endTitle        = document.getElementById('endTitle');
    endScore        = document.getElementById('endScore');

    // Event listeners
    startBtn.addEventListener('click', startGame);
    nextBtn.addEventListener('click', nextQuestion);
    playAgainBtn.addEventListener('click', resetGame);

    // Cria a escada já escondida (gameArea está display:none)
    createLadder();
  }

  // Aguarda o DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
