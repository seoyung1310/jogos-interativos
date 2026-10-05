// ============================================
//  🎨 JOGO DAS ARTES - ENFORCADO FOFO
// ============================================

// ---------- BANCO DE PERGUNTAS ----------
const perguntas = [
    // Música
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
    // Dança
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
    // Teatro
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
    // Artes Visuais
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

// ---------- ESTADO ----------
let rodadaAtual = 0;
let acertos = 0;
let respondeu = false;
let temporizador = null;

// ---------- INICIALIZAÇÃO ----------
document.addEventListener('DOMContentLoaded', function () {

    // Elementos do DOM (pegos DEPOIS do DOM carregar)
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
    const boneco = document.getElementById('boneco');

    // Garante que só a tela inicial está ativa
    startScreen.classList.add('active');
    gameScreen.classList.remove('active');
    endScreen.classList.remove('active');

    // ---------- FUNÇÕES ----------

    function iniciarJogo() {
        // Cancela qualquer timeout pendente
        if (temporizador) {
            clearTimeout(temporizador);
            temporizador = null;
        }

        // Reseta estado
        rodadaAtual = 0;
        acertos = 0;
        respondeu = false;

        // Reseta visual do boneco
        boneco.classList.remove('triste');

        // Troca de tela
        startScreen.classList.remove('active');
        endScreen.classList.remove('active');
        gameScreen.classList.add('active');

        // Carrega primeira pergunta
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

        // Atualiza placar
        currentRoundSpan.textContent = rodadaAtual + 1;
        scoreSpan.textContent = acertos;

        const perguntaAtual = perguntas[rodadaAtual];
        perguntaTexto.textContent = perguntaAtual.pergunta;

        // Limpa alternativas anteriores
        alternativasContainer.innerHTML = '';

        // Cria os botões
        perguntaAtual.alternativas.forEach(function (alternativa, index) {
            const btn = document.createElement('button');
            btn.classList.add('alternativa-btn');
            btn.textContent = alternativa;
            btn.addEventListener('click', function () {
                verificarResposta(index);
            });
            alternativasContainer.appendChild(btn);
        });

        // Garante que o boneco não está triste ao carregar nova pergunta
        boneco.classList.remove('triste');
    }

    function verificarResposta(indexSelecionado) {
        if (respondeu) return;
        respondeu = true;

        const perguntaAtual = perguntas[rodadaAtual];
        const botoes = alternativasContainer.querySelectorAll('.alternativa-btn');

        // Desabilita todos os botões
        botoes.forEach(function (btn) {
            btn.disabled = true;
        });

        if (indexSelecionado === perguntaAtual.correta) {
            // ACERTO
            acertos++;
            scoreSpan.textContent = acertos;
            botoes[indexSelecionado].classList.add('correta');
            feedback.textContent = '✅ Muito bem! Você acertou!';
            feedback.style.color = '#66bb6a';

            temporizador = setTimeout(function () {
                rodadaAtual++;
                carregarPergunta();
            }, 1200);

        } else {
            // ERRO
            botoes[indexSelecionado].classList.add('errada');
            botoes[perguntaAtual.correta].classList.add('correta');

            boneco.classList.add('triste');
            feedback.textContent = '❌ Ops! Resposta errada. O bonequinho ficou triste...';
            feedback.style.color = '#ef5350';

            temporizador = setTimeout(function () {
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
            finalMessage.textContent = 'Você está no caminho certo! Que tal estudar um pouquinho mais? 📚';
            finalMessage.style.color = '#64b5f6';
        } else {
            endTitle.textContent = '💪 Continue tentando!';
            finalMessage.textContent = 'Não desanime! A arte é um mundo maravilhoso para explorar. Tente de novo! 🌈';
            finalMessage.style.color = '#f48fb1';
        }

        boneco.classList.remove('triste');
    }

    // ---------- EVENTOS ----------
    btnIniciar.addEventListener('click', iniciarJogo);

    btnReiniciar.addEventListener('click', function () {
        // Cancela timeout pendente
        if (temporizador) {
            clearTimeout(temporizador);
            temporizador = null;
        }
        endScreen.classList.remove('active');
        startScreen.classList.add('active');
        boneco.classList.remove('triste');
    });
});
