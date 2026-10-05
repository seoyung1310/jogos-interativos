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

  // ---------- ELEMENTOS DOM ----------
  const startScreen      = document.getElementById('startScreen');
  const gameArea         = document.getElementById('gameArea');
  const endScreen        = document.getElementById('endScreen');
  const startBtn         = document.getElementById('startBtn');
  const playAgainBtn     = document.getElementById('playAgainBtn');
  const roundInfo        = document.getElementById('roundInfo');
  const scoreDisplay     = document.getElementById('scoreDisplay');
  const questionText     = document.getElementById('questionText');
  const optionsGrid      = document.getElementById('optionsGrid');
  const feedbackMessage  = document.getElementById('feedbackMessage');
  const nextBtn          = document.getElementById('nextBtn');
  const bunnyWrapper     = document.getElementById('bunnyWrapper');
  const carrotThrow      = document.getElementById('carrotThrow');
  const ladderArea       = document.getElementById('ladderArea');
  const endBunny         = document.getElementById('endBunny');
  const endTitle         = document.getElementById('endTitle');
  const endScore         = document.getElementById('endScore');

  // ---------- FUNÇÕES ----------

  // Cria os degraus da escada + reposiciona o coelho
  function createLadder() {
    ladderArea.innerHTML = '';
    stepElements = [];

    for (let i = 0; i < TOTAL_STEPS; i++) {
      const step = document.createElement('div');
      step.classList.add('step');
      step.dataset.index = i;
      const stepHeight = 8 + (i * 6);
      step.style.marginBottom = stepHeight + 'px';
      ladderArea.appendChild(step);
      stepElements.push(step);
    }

    ladderArea.appendChild(bunnyWrapper);
    updateBunnyPosition(0);
  }

  // Atualiza a posição do coelho conforme o número de acertos
  function updateBunnyPosition(scoreValue) {
    stepElements.forEach((step, idx) => {
      if (idx < scoreValue) {
        step.classList.add('filled');
      } else {
        step.classList.remove('filled');
      }
    });

    if (scoreValue === 0) {
      bunnyWrapper.style.marginBottom = '0px';
    } else {
      const stepIndex = scoreValue - 1;
      const stepHeight = 8 + (stepIndex * 6);
      bunnyWrapper.style.marginBottom = (stepHeight + 28) + 'px';
    }
  }

  // Efeito de erro: coelho joga cenoura e chora
  function bunnyThrowCarrotAndCry() {
    bunnyWrapper.classList.add('bunny-crying');
    carrotThrow.classList.add('throw');

    setTimeout(() => {
      bunnyWrapper.classList.remove('bunny-crying');
      carrotThrow.classList.remove('throw');
    }, 800);
  }

  // Carrega a pergunta atual
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

  // Trata a resposta do jogador
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
      allBtns[q.correct].classList.add('correct');
      feedbackMessage.textContent = '❌ Errou! O coelho jogou a cenoura e chorou...';
      bunnyThrowCarrotAndCry();
    }

    nextBtn.classList.add('visible');
  }

  // Avança para a próxima pergunta ou finaliza
  function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      showEndScreen();
    }
  }

  // Exibe a tela final
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

  // Reinicia completamente o jogo
  function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    answered = false;

    endScreen.classList.remove('active');
    startScreen.classList.add('hidden');
    gameArea.classList.add('active');

    scoreDisplay.textContent = '0';
    createLadder();
    loadQuestion();
  }

  // Inicia o jogo a partir da tela inicial
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

  // ---------- EVENT LISTENERS ----------
  startBtn.addEventListener('click', startGame);
  nextBtn.addEventListener('click', nextQuestion);
  playAgainBtn.addEventListener('click', resetGame);

  // Inicializa a escada quando a página carrega
  window.addEventListener('DOMContentLoaded', () => {
    createLadder();
    updateBunnyPosition(0);
  });
})();
