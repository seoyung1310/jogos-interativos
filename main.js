// ===== BANCO DE PERGUNTAS =====
const perguntas = [
    { pergunta: "🎵 Qual instrumento tem teclas pretas e brancas?", alternativas: ["Violão", "Piano", "Flauta", "Bateria"], correta: 1 },
    { pergunta: "🎶 Quem compôs a famosa 'Nona Sinfonia'?", alternativas: ["Mozart", "Bach", "Beethoven", "Chopin"], correta: 2 },
    { pergunta: "💃 Qual dança é típica do Brasil e tem passos rápidos com os pés?", alternativas: ["Balé", "Samba", "Tango", "Hip Hop"], correta: 1 },
    { pergunta: "🩰 Como se chama a dança clássica com sapatilhas de ponta?", alternativas: ["Jazz", "Balé", "Sapateado", "Forró"], correta: 1 },
    { pergunta: "🎭 No teatro, como chamamos quem interpreta um personagem?", alternativas: ["Diretor", "Ator", "Cenógrafo", "Figurinista"], correta: 1 },
    { pergunta: "🎬 O que é o 'figurino' em uma peça de teatro?", alternativas: ["O cenário", "As roupas dos personagens", "As falas", "A iluminação"], correta: 1 },
    { pergunta: "🎨 Quem pintou a famosa obra 'Mona Lisa'?", alternativas: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Tarsila do Amaral"], correta: 2 },
    { pergunta: "🖌️ Qual artista brasileira pintou o quadro 'Abaporu'?", alternativas: ["Tarsila do Amaral", "Anita Malfatti", "Beatriz Milhazes", "Adriana Varejão"], correta: 0 },
    { pergunta: "🌈 Quais são as cores primárias?", alternativas: ["Verde, Laranja e Roxo", "Vermelho, Azul e Amarelo", "Rosa, Azul e Verde", "Preto, Branco e Cinza"], correta: 1 },
    { pergunta: "🗿 O que é uma escultura?", alternativas: ["Uma pintura em tela", "Uma obra de arte tridimensional", "Um desenho a lápis", "Uma colagem"], correta: 1 }
];

// ===== ESTADO DO JOGO =====
let rodadaAtual = 0;
let acertos = 0;
let respondeu = false;

// ===== ELEMENTOS DO DOM =====
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const btnIniciar = document.getElementById('btn-iniciar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const perguntaTexto = document.getElementById('pergunta-texto');
const alternativasContainer = document.getElementById('alternativas-container');
const feedback = document.getElementById('feedback');
const currentRoundSpan = document.getElementById('current-round');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const finalMessage = document.getElementById('final-message');
const endTitle = document.getElementById('end-title');
const personagem = document.getElementById('personagem');
const bandeira = document.getElementById('bandeira');
const trofeu = document.getElementById('trofeu');
const degraus = document.querySelectorAll('.degrau-jogo');

// ===== ALTURA DE CADA DEGRAU =====
// A escada tem 10 degraus empilhados de baixo para cima.
// Cada degrau tem 12px de altura + 8px de gap = 20px.
// O personagem começa no chão (bottom: 30px) e sobe conforme os acertos.
const ALTURA_DEGRAU = 20; // px (12px altura + 8px gap)
const BOTTOM_INICIAL = 30; // px

// ===== INICIAR JOGO =====
function iniciarJogo() {
    rodadaAtual = 0;
    acertos = 0;
    respondeu = false;

    // Resetar personagem
    personagem.classList.remove('triste');
    personagem.style.bottom = BOTTOM_INICIAL + 'px';

    // Resetar degraus
    degraus.forEach(d => d.classList.remove('ativo'));

    // Resetar bandeira
    bandeira.classList.remove('alcancada');

    // Resetar placar
    currentRoundSpan.textContent = '1';
    scoreSpan.textContent = '0';

    // Trocar telas
    startScreen.classList.remove('active');
    endScreen.classList.remove('active');
    gameScreen.classList.add('active');

    carregarPergunta();
}

// ===== CARREGAR PERGUNTA =====
function carregarPergunta() {
    if (rodadaAtual >= 10) {
        finalizarJogo();
        return;
    }

    respondeu = false;
    feedback.textContent = '';
    feedback.style.color = '#64b5f6';

    currentRoundSpan.textContent = rodadaAtual + 1;
    scoreSpan.textContent = acertos;

    const perguntaAtual = perguntas[rodadaAtual];
    perguntaTexto.textContent = perguntaAtual.pergunta;

    alternativasContainer.innerHTML = '';

    perguntaAtual.alternativas.forEach((alternativa, index) => {
        const btn = document.createElement('button');
        btn.classList.add('alternativa-btn');
        btn.textContent = alternativa;
        btn.addEventListener('click', () => verificarResposta(index));
        alternativasContainer.appendChild(btn);
    });
}

// ===== VERIFICAR RESPOSTA =====
function verificarResposta(indexSelecionado) {
    if (respondeu) return;
    respondeu = true;

    const perguntaAtual = perguntas[rodadaAtual];
    const botoes = document.querySelectorAll('.alternativa-btn');
    botoes.forEach(btn => btn.disabled = true);

    if (indexSelecionado === perguntaAtual.correta) {
        // ===== ACERTOU =====
        acertos++;
        scoreSpan.textContent = acertos;
        botoes[indexSelecionado].classList.add('correta');
        feedback.textContent = '✅ Muito bem! Subiu mais um degrau!';
        feedback.style.color = '#66bb6a';

        // Ativar o degrau correspondente (do 1 ao 10)
        const degrauIndex = acertos - 1;
        if (degraus[degrauIndex]) {
            degraus[degrauIndex].classList.add('ativo');
        }

        // Subir o personagem
        const novoBottom = BOTTOM_INICIAL + (acertos * ALTURA_DEGRAU);
        personagem.style.bottom = novoBottom + 'px';

        // Se acertou tudo, comemorar
        if (acertos === 10) {
            bandeira.classList.add('alcancada');
            feedback.textContent = '🏆 Você chegou ao topo! Parabéns!';
            feedback.style.color = '#ffb300';
        }

        setTimeout(() => {
            rodadaAtual++;
            carregarPergunta();
        }, 1300);

    } else {
        // ===== ERROU =====
        botoes[indexSelecionado].classList.add('errada');
        botoes[perguntaAtual.correta].classList.add('correta');

        // Personagem fica triste
        personagem.classList.add('triste');

        feedback.textContent = '❌ Ops! Resposta errada. O bonequinho ficou triste...';
        feedback.style.color = '#ef5350';

        setTimeout(() => {
            personagem.classList.remove('triste');
            rodadaAtual++;
            carregarPergunta();
        }, 1800);
    }
}

// ===== FINALIZAR JOGO =====
function finalizarJogo() {
    gameScreen.classList.remove('active');
    endScreen.classList.add('active');

    finalScoreSpan.textContent = acertos;

    if (acertos === 10) {
        endTitle.textContent = '🏆 Perfeito! Você chegou ao topo!';
        finalMessage.textContent = 'Uau! Acertou tudo e alcançou a bandeira! Você é um verdadeiro artista! 🎉';
        finalMessage.style.color = '#66bb6a';
        trofeu.classList.remove('escondido');
    } else if (acertos >= 7) {
        endTitle.textContent = '🌟 Muito bem!';
        finalMessage.textContent = 'Você conhece muito sobre arte! Continue subindo essa escada! 😊';
        finalMessage.style.color = '#81c784';
        trofeu.classList.remove('escondido');
    } else if (acertos >= 4) {
        endTitle.textContent = '🎨 Bom trabalho!';
        finalMessage.textContent = 'Você está no caminho certo! Que tal estudar um pouquinho mais? 📚';
        finalMessage.style.color = '#64b5f6';
        trofeu.classList.add('escondido');
    } else {
        endTitle.textContent = '💪 Continue tentando!';
        finalMessage.textContent = 'Não desanime! A arte é um mundo maravilhoso. Tente de novo! 🌈';
        finalMessage.style.color = '#f48fb1';
        trofeu.classList.add('escondido');
    }
}

// ===== EVENT LISTENERS =====
btnIniciar.addEventListener('click', iniciarJogo);
btnReiniciar.addEventListener('click', () => {
    endScreen.classList.remove('active');
    startScreen.classList.add('active');
    personagem.classList.remove('triste');
    personagem.style.bottom = BOTTOM_INICIAL + 'px';
    bandeira.classList.remove('alcancada');
    degraus.forEach(d => d.classList.remove('ativo'));
});
