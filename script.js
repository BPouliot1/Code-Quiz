const questions = [
    { question: "What does 'var' stand for?", answers: ["Variable", "Variant", "Variety"], correct: 0 },
    { question: "Which symbol is used for comments in JavaScript?", answers: ["//", "#", "/* */"], correct: 0 },
    { question: "Commonly used data types DO NOT include:", answers: ["strings", 'booleans', 'alerts', 'numbers'], correct: 2 },
    { question: "The condition in an if/else statement is enclosed within ___", answers: ['quotes', 'parenthesis', 'curly brackets', 'square brackets'], correct: 1 },
];

let timer = 60;
let currentQuestionIndex = 0;
let score = 0;
let interval;

document.getElementById("start-button").onclick = startQuiz;
document.getElementById("save-score").onclick = saveScore;

function startQuiz() {
    interval = setInterval(() => {
        timer--;
        document.getElementById("timer").innerText = `Time: ${timer}`;
        if (timer <= 0) endQuiz();
    }, 1000);

    showScreen("quiz-screen");
    displayQuestion();
}

