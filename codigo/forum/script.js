
document.addEventListener("DOMContentLoaded", function() {
    loadQuestions();
});

function addQuestion() {
    var questionInput = document.getElementById("questionInput");
    var question = questionInput.value;
    if (question.trim() !== "") {
        var questions = JSON.parse(localStorage.getItem("questions")) || [];
        questions.push({text: question, answers: []});
        localStorage.setItem("questions", JSON.stringify(questions));
        questionInput.value = "";
        loadQuestions();
    } else {
        alert("Por favor, insira uma pergunta!");
    }
}

function addAnswer(questionIndex) {
    var answerInput = document.getElementById("answerInput_" + questionIndex);
    var answer = answerInput.value;
    if (answer.trim() !== "") {
        var questions = JSON.parse(localStorage.getItem("questions")) || [];
        questions[questionIndex].answers.push(answer);
        localStorage.setItem("questions", JSON.stringify(questions));
        answerInput.value = "";
        loadQuestions();
    } else {
        alert("Por favor, insira uma resposta!");
    }
}

function loadQuestions() {
    var questionsDiv = document.getElementById("questions");
    questionsDiv.innerHTML = "";
    var questions = JSON.parse(localStorage.getItem("questions")) || [];
    questions.forEach(function(question, index) {
        var questionElement = document.createElement("div");
        questionElement.innerHTML = "<strong>Pergunta " + (index + 1) + ":</strong> " + question.text;
        
        var answerInput = document.createElement("input");
        answerInput.type = "text";
        answerInput.id = "answerInput_" + index;
        answerInput.placeholder = "Digite sua resposta";
        questionElement.appendChild(answerInput);
        
        var answerButton = document.createElement("button");
        answerButton.textContent = "Responder";
        answerButton.onclick = function() { addAnswer(index); };
        questionElement.appendChild(answerButton);
        
        question.answers.forEach(function(answer, answerIndex) {
            var answerElement = document.createElement("div");
            answerElement.innerHTML = "<em>Resposta " + (answerIndex + 1) + ":</em> " + answer;
            questionElement.appendChild(answerElement);
        });
        
        questionsDiv.appendChild(questionElement);
    });
}
