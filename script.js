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

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").innerText = currentQuestion.question;

    const answersList = document.getElementById("answers");
    answersList.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
        const li = document.createElement("li");
        li.innerText = answer;
        li.onclick = () => checkAnswer(index);
        answersList.appendChild(li);
    });
}

function checkAnswer(index) {
    const currentQuestion = questions[currentQuestionIndex];
    const feedbackElement = document.getElementById("feedback");

    if (index === currentQuestion.correct) {
        score += 10;
        feedbackElement.innerText = "Correct!";
        feedbackElement.style.color = "green"; 
    } else {
        timer -= 10;
        feedbackElement.innerText = "Wrong!";
        feedbackElement.style.color = "red";
    }

    setTimeout(() => {
        feedbackElement.innerText = '';
    }, 1000);

    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length || timer <= 0) {
        endQuiz();
    } else {
        displayQuestion();
    }
}


function endQuiz() {
    clearInterval(interval);
    document.getElementById("final-score").innerText = score;
    showScreen("end-screen");
    score = timer;
}

function saveScore() {
    const initials = document.getElementById("initials").value;
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayHighScores();
}

function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const highScoresList = document.getElementById("high-scores");
    highScoresList.innerHTML = highScores.map(s => `<li>${s.initials} - ${s.score}</li>`).join("");
}

function showScreen(id) {
    document.getElementById("start-screen").style.display = id === "start-screen" ? "block" : "none";
    document.getElementById("quiz-screen").style.display = id === "quiz-screen" ? "block" : "none";
    document.getElementById("end-screen").style.display = id === "end-screen" ? "block" : "none";
}

displayHighScores();
