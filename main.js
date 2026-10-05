// Banco de Perguntas sobre Artes (Música, Dança, Teatro, Artes Visuais)
const perguntas = [
    // Música
    {
        pergunta: "🎵 Qual instrumento tem teclas pretas e brancas?",
        alternativas: ["Violão", "Piano", "Flauta", "Bateria"],
        correta: 1 // Piano
    },
    {
        pergunta: "🎶 Quem é o autor da famosa 'Nona Sinfonia'?",
        alternativas: ["Mozart", "Bach", "Beethoven", "Chopin"],
        correta: 2 // Beethoven
    },
    // Dança
    {
        pergunta: "💃 Qual dança é típica do Brasil e tem passos rápidos com os pés?",
        alternativas: ["Balé", "Samba", "Tango", "Hip Hop"],
        correta: 1 // Samba
    },
    {
        pergunta: "🩰 Como se chama a dança clássica com sapatilhas de ponta?",
        alternativas: ["Jazz", "Balé", "Sapateado", "Forró"],
        correta: 1 // Balé
    },
    // Teatro
    {
        pergunta: "🎭 No teatro, como chamamos a pessoa que interpreta um personagem?",
        alternativas: ["Diretor", "Ator", "Cenógrafo", "Figurinista"],
        correta: 1 // Ator
    },
    {
        pergunta: "🎬 O que é o 'figurino' em uma peça de teatro?",
        alternativas: ["O cenário", "As roupas dos personagens", "As falas", "A iluminação"],
        correta: 1 // As roupas dos personagens
    },
    // Artes Visuais
    {
        pergunta: "🎨 Quem pintou a famosa obra 'Mona Lisa'?",
        alternativas: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Tarsila do Amaral"],
        correta: 2 // Leonardo da Vinci
    },
    {
        pergunta: "🖌️ Qual artista brasileira pintou o quadro 'Abaporu'?",
        alternativas: ["Tarsila do Amaral", "Anita Malfatti", "Beatriz Milhazes", "Adriana Varejão"],
        correta: 0 // Tarsila do Amaral
    },
    {
        pergunta: "🌈 Quais são as cores primárias?",
        alternativas: ["Verde, Laranja e Roxo", "Vermelho, Azul e Amarelo", "Rosa, Azul e Verde", "Preto, Branco e Cinza"],
        correta: 1 // Vermelho, Azul e Amarelo
    },
    {
        pergunta: "🗿 O que é uma escultura?",
        alternativas: ["Uma pintura em tela", "Uma obra de arte tridimensional", "Um desenho a lápis", "Uma colagem"],
        correta: 1 // Uma obra de arte tridimensional
    }
];

// Estado do Jogo
let rodadaAtual = 0;
let acertos = 0;
let erros = 0;
let respondeu = false;

// Elementos do DOM
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

// Função para iniciar o jogo
function iniciarJogo() {
    rodadaAtual = 0;
    acertos = 0;
    erros = 0;
    respondeu = false;
    
    // Resetar visual do boneco
    boneco.classList.remove('triste');
    
    // Embaralhar perguntas (opcional, mas mantém a diversão)
    // Para garantir que sejam sempre as mesmas 10, não embaralhamos o array principal,
    // mas podemos criar uma cópia embaralhada se quisermos. Vamos manter a ordem.
    
    startScreen.classList.remove('active');
    endScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    carregarPergunta();
}

// Função para carregar a pergunta atual
function carregarPergunta() {
    if (rodadaAtual >= 10) {
        finalizarJogo();
        return;
    }
    
    respondeu = false;
    feedback.textContent = '';
    feedback.style.color = '#64b5f6';
    
    // Atualizar placar
    currentRoundSpan.textContent = rodadaAtual + 1;
    scoreSpan.textContent = acertos;
    
    const perguntaAtual = perguntas[rodadaAtual];
    perguntaTexto.textContent = perguntaAtual.pergunta;
    
    // Limpar alternativas anteriores
    alternativasContainer.innerHTML = '';
    
    // Criar botões de alternativas
    perguntaAtual.alternativas.forEach((alternativa, index) => {
        const btn = document.createElement('button');
        btn.classList.add('alternativa-btn');
        btn.textContent = alternativa;
        btn.addEventListener('click', () => verificarResposta(index));
        alternativasContainer.appendChild(btn);
    });
    
    // Resetar visual do boneco (remove tristeza se estava)
    boneco.classList.remove('triste');
}

// Função para verificar a resposta
function verificarResposta(indexSelecionado) {
    if (respondeu) return; // Evita cliques múltiplos
    
    respondeu = true;
    const perguntaAtual = perguntas[rodadaAtual];
    const botoes = document.querySelectorAll('.alternativa-btn');
    
    // Desabilitar todos os botões
    botoes.forEach(btn => btn.disabled = true);
    
    // Verificar se acertou
    if (indexSelecionado === perguntaAtual.correta) {
        // Acertou
        acertos++;
        scoreSpan.textContent = acertos;
        botoes[indexSelecionado].classList.add('correta');
        feedback.textContent = '✅ Muito bem! Você acertou!';
        feedback.style.color = '#66bb6a';
        
        // Avançar para próxima pergunta após um tempo
        setTimeout(() => {
            rodadaAtual++;
            carregarPergunta();
        }, 1200);
        
    } else {
        // Errou
        erros++;
        botoes[indexSelecionado].classList.add('errada');
        // Mostrar a resposta correta
        botoes[perguntaAtual.correta].classList.add('correta');
        
        // Deixar o boneco triste
        boneco.classList.add('triste');
        
        feedback.textContent = '❌ Ops! Resposta errada. O bonequinho ficou triste...';
        feedback.style.color = '#ef5350';
        
        // Avançar para próxima pergunta após um tempo
        setTimeout(() => {
            rodadaAtual++;
            carregarPergunta();
        }, 1800);
    }
}

// Função para finalizar o jogo
function finalizarJogo() {
    gameScreen.classList.remove('active');
    endScreen.classList.add('active');
    
    finalScoreSpan.textContent = acertos;
    
    // Mensagem personalizada
    if (acertos === 10) {
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
    
    // Resetar boneco para não ficar triste na tela final
    boneco.classList.remove('triste');
}

// Event Listeners
btnIniciar.addEventListener('click', iniciarJogo);
btnReiniciar.addEventListener('click', () => {
    endScreen.classList.remove('active');
    startScreen.classList.add('active');
    // Resetar boneco
    boneco.classList.remove('triste');
});

// Inicializar (garantir que a tela de início está ativa)
startScreen.classList.add('active');
