// ===== Banco de Perguntas (6º ano) =====
const perguntas = [
    {
        pergunta: "Quanto é 15 × 4?",
        opcoes: ["45", "60", "55", "65"],
        correta: 1
    },
    {
        pergunta: "Qual é o resultado de 144 ÷ 12?",
        opcoes: ["10", "11", "12", "14"],
        correta: 2
    },
    {
        pergunta: "Qual é a fração equivalente a 1/2?",
        opcoes: ["2/4", "1/3", "3/5", "2/5"],
        correta: 0
    },
    {
        pergunta: "Quantos lados tem um hexágono?",
        opcoes: ["5", "6", "7", "8"],
        correta: 1
    },
    {
        pergunta: "Qual é o valor de 7² (sete ao quadrado)?",
        opcoes: ["14", "21", "49", "77"],
        correta: 2
    },
    {
        pergunta: "Quanto é 25% de 200?",
        opcoes: ["25", "40", "50", "75"],
        correta: 2
    },
    {
        pergunta: "Qual é o MMC de 4 e 6?",
        opcoes: ["10", "12", "18", "24"],
        correta: 1
    },
    {
        pergunta: "Um triângulo com todos os lados iguais é chamado de:",
        opcoes: ["Escaleno", "Isósceles", "Equilátero", "Retângulo"],
        correta: 2
    },
    {
        pergunta: "Quanto é 3/4 + 1/4?",
        opcoes: ["4/8", "1/2", "1", "4/4 + 1/4"],
        correta: 2
    },
    {
        pergunta: "Qual é o perímetro de um quadrado com lado 5 cm?",
        opcoes: ["10 cm", "15 cm", "20 cm", "25 cm"],
        correta: 2
    }
];

// ===== Estado do Jogo =====
let perguntaAtual = 0;
let pontos = 0;
let vidas = 3;
let respondida = false;

// ===== Elementos do DOM =====
const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaFinal = document.getElementById("tela-final");

const btnIniciar = document.getElementById("btn-iniciar");
const btnReiniciar = document.getElementById("btn-reiniciar");

const numPerguntaEl = document.getElementById("num-pergunta");
const pontosEl = document.getElementById("pontos");
const vidasEl = document.getElementById("vidas");
const progressoEl = document.getElementById("progresso");
const textoPerguntaEl = document.getElementById("texto-pergunta");
const opcoesEl = document.getElementById("opcoes");
const feedbackEl = document.getElementById("feedback");

const tituloFinalEl = document.getElementById("titulo-final");
const emojiFinalEl = document.getElementById("emoji-final");
const mensagemFinalEl = document.getElementById("mensagem-final");
const pontosFinaisEl = document.getElementById("pontos-finais");

// ===== Funções de Navegação =====
function mostrarTela(tela) {
    document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
    tela.classList.add("ativa");
}

function iniciarJogo() {
    perguntaAtual = 0;
    pontos = 0;
    vidas = 3;
    atualizarPainel();
    mostrarTela(telaJogo);
    carregarPergunta();
}

function atualizarPainel() {
    numPerguntaEl.textContent = `${perguntaAtual + 1}/${perguntas.length}`;
    pontosEl.textContent = pontos;
    vidasEl.textContent = "❤️".repeat(vidas) + "🖤".repeat(3 - vidas);
    progressoEl.style.width = `${(perguntaAtual / perguntas.length) * 100}%`;
}

// ===== Carregar Pergunta =====
function carregarPergunta() {
    respondida = false;
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
    atualizarPainel();

    const q = perguntas[perguntaAtual];
    textoPerguntaEl.textContent = q.pergunta;
    opcoesEl.innerHTML = "";

    q.opcoes.forEach((opcao, index) => {
        const botao = document.createElement("button");
        botao.className = "opcao";
        botao.textContent = `${String.fromCharCode(65 + index)}) ${opcao}`;
        botao.addEventListener("click", () => verificarResposta(index, botao));
        opcoesEl.appendChild(botao);
    });
}

// ===== Verificar Resposta =====
function verificarResposta(index, botao) {
    if (respondida) return;
    respondida = true;

    const q = perguntas[perguntaAtual];
    const todosBotoes = document.querySelectorAll(".opcao");
    todosBotoes.forEach(b => b.classList.add("desabilitada"));

    if (index === q.correta) {
        botao.classList.add("correta");
        pontos += 10;
        feedbackEl.textContent = "🎉 Acertou! +10 pontos";
        feedbackEl.className = "feedback acerto";
        pontosEl.textContent = pontos;
    } else {
        botao.classList.add("errada");
        todosBotoes[q.correta].classList.add("correta");
        vidas--;
        feedbackEl.textContent = "❌ Ops! Resposta correta destacada em verde.";
        feedbackEl.className = "feedback erro";
        vidasEl.textContent = "❤️".repeat(vidas) + "🖤".repeat(3 - vidas);
    }

    // Aguarda e vai para próxima
    setTimeout(() => {
        if (vidas <= 0) {
            finalizarJogo(false);
        } else {
            perguntaAtual++;
            if (perguntaAtual >= perguntas.length) {
                finalizarJogo(true);
            } else {
                carregarPergunta();
            }
        }
    }, 1800);
}

// ===== Finalizar Jogo =====
function finalizarJogo(venceu) {
    mostrarTela(telaFinal);
    pontosFinaisEl.textContent = pontos;

    if (venceu && pontos === 100) {
        tituloFinalEl.textContent = "🏆 PERFEITO! Você é um Gênio!";
        emojiFinalEl.textContent = "🏆";
        mensagemFinalEl.textContent = "Você acertou TODAS as perguntas! Parabéns!";
    } else if (venceu) {
        tituloFinalEl.textContent = "🎉 Parabéns! Você completou o desafio!";
        emojiFinalEl.textContent = "🎉";
        mensagemFinalEl.textContent = "Muito bem! Continue praticando matemática!";
    } else {
        tituloFinalEl.textContent = "💔 Suas vidas acabaram!";
        emojiFinalEl.textContent = "😢";
        mensagemFinalEl.textContent = "Não desanime! Tente novamente e melhore sua pontuação!";
    }
}

// ===== Eventos =====
btnIniciar.addEventListener("click", iniciarJogo);
btnReiniciar.addEventListener("click", iniciarJogo);