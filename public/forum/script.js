function perguntar() {
    const perguntaInput = document.querySelector("#pergunta");
    let pergunta = {
        id: obterID(),
        pergunta: perguntaInput.value.trim(),
        respostas: []
    };
    if (pergunta.pergunta === "") {
        alert("Por favor, insira uma pergunta.");
        return;
    }
    let perguntas = JSON.parse(localStorage.getItem("perguntas")) || [];
    perguntas.push(pergunta);
    localStorage.setItem("perguntas", JSON.stringify(perguntas));
    perguntaInput.value = '';
    mostrarPerguntas();
}

function mostrarPerguntas() {
    const perguntas = JSON.parse(localStorage.getItem("perguntas")) || [];
    const ul = document.querySelector(".postagens");
    ul.innerHTML = "";
    perguntas.forEach(pergunta => {
        const li = document.createElement("li");
        li.innerHTML = `
            <p>${pergunta.pergunta}</p>
            <p>
                <i onclick="editar(${pergunta.id})" class="fa-regular fa-pen-to-square"></i>
                <i onclick="remover(${pergunta.id})" class="fa-regular fa-trash-can"></i>
            </p>
            <p>
            <ul class="respostas">
                ${pergunta.respostas.map(resposta => `<li>${resposta}</li>`).join('')}
            </ul>
            <input type="text" id="resposta-${pergunta.id}" placeholder="Sua resposta">
            <button onclick="responder(${pergunta.id})">Responder</button>
             </p>
        `;
        ul.appendChild(li);
    });
}

function obterID() {
    let id = parseInt(localStorage.getItem("id")) || 0;
    id += 1;
    localStorage.setItem("id", id);
    return id;
}

function remover(id) {
    let perguntas = JSON.parse(localStorage.getItem("perguntas")) || [];
    perguntas = perguntas.filter(pergunta => pergunta.id !== id);
    localStorage.setItem("perguntas", JSON.stringify(perguntas));
    mostrarPerguntas();
}

function editar(id) {
    let perguntas = JSON.parse(localStorage.getItem("perguntas")) || [];
    const pergunta = perguntas.find(pergunta => pergunta.id === id);
    const novaPergunta = prompt("Edite a pergunta:", pergunta.pergunta);
    if (novaPergunta !== null && novaPergunta.trim() !== "") {
        pergunta.pergunta = novaPergunta.trim();
        localStorage.setItem("perguntas", JSON.stringify(perguntas));
        mostrarPerguntas();
    }
}

function responder(id) {
    const respostaInput = document.querySelector(`#resposta-${id}`);
    const resposta = respostaInput.value.trim();
    if (resposta === "") {
        alert("Por favor, insira uma resposta.");
        return;
    }
    let perguntas = JSON.parse(localStorage.getItem("perguntas")) || [];
    const pergunta = perguntas.find(pergunta => pergunta.id === id);
    pergunta.respostas.push(resposta);
    localStorage.setItem("perguntas", JSON.stringify(perguntas));
    respostaInput.value = '';
    mostrarPerguntas();
}

document.addEventListener("DOMContentLoaded", mostrarPerguntas);
