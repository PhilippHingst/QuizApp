let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('sound/right.wav');
let AUDIO_FAIL = new Audio('sound/wrong.wav');
let AUDIO_ENDSCREEN = new Audio('sound/endscreen.wav');

function init() {
    document.getElementById('lastQuestion').innerHTML = questions.length;
    if (currentQuestion >= questions.length) {
        document.getElementById('currentQuestionEndscreen').innerHTML = currentQuestion;
        document.getElementById('rightAnswers').innerHTML = rightQuestions;
    } else {
        document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
        showQuestion();
    }
}

function showQuestion() {
    if (gameIsOver()) {// TODO: Show Endscreen   
        showEndScreen();
    } else { // show Questions
        updateProgressBar();
        let question = questions[currentQuestion];
        showQuestionAndAnswer(question);
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('endScreen').style = "";
    document.getElementById('trophy').style = "";
    document.getElementById('questionScreen').style = "display:none";
    AUDIO_ENDSCREEN.play();
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100); // Math.round rundet das Ergebnis
    document.getElementById('progress-bar').innerHTML = `${percent}%`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;

}

function showQuestionAndAnswer(question) {
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = `<div class="answer-letter"><span class="answer-letter-font">A</span></div><div class="answer">${question['answer_1']}</div>`;
    document.getElementById('answer_2').innerHTML = `<div class="answer-letter"><span class="answer-letter-font">B</span></div><div class="answer">${question['answer_2']}</div>`;
    document.getElementById('answer_3').innerHTML = `<div class="answer-letter"><span class="answer-letter-font">C</span></div><div class="answer">${question['answer_3']}</div>`;
    document.getElementById('answer_4').innerHTML = `<div class="answer-letter"><span class="answer-letter-font">D</span></div><div class="answer">${question['answer_4']}</div>`;
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) { // Right Answer
        showRightAnswer(selection);
    } else {// Wrong Answer
        showWrongAnswer(selection, idOfRightAnswer);

    }
    document.getElementById('next-button').disabled = false;

}

function showRightAnswer(selection) {
    document.getElementById(selection).classList.add('bg-success');
    AUDIO_SUCCESS.play();
    rightQuestions++;
}

function showWrongAnswer(selection, idOfRightAnswer) {
    document.getElementById(selection).classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).classList.add('bg-success');
    AUDIO_FAIL.play();
}

function nextQuestion() {
    currentQuestion++; // z.B von 0 auf 1
    resetAnswerButtons();
    showQuestion();
    init();
    document.getElementById('next-button').disabled = true;
}

function resetAnswerButtons() {
    document.getElementById('answer_1').classList.remove('bg-success', 'bg-danger');
    document.getElementById('answer_2').classList.remove('bg-success', 'bg-danger');
    document.getElementById('answer_3').classList.remove('bg-success', 'bg-danger');
    document.getElementById('answer_4').classList.remove('bg-success', 'bg-danger');
}

function restartGame() {
    document.getElementById('endScreen').style = "display:none";
    document.getElementById('trophy').style = "display:none";
    document.getElementById('questionScreen').style = "";
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}

function startGame() {
    document.getElementById('startScreen').style = "display:none";
    document.getElementById('questionScreen').style = "";
}
