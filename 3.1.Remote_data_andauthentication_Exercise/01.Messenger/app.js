const messangerEP = `http://localhost:3030/jsonstore/messenger`;

const sendBtnRef = document.getElementById("submit");
const refreshBtnRef = document.getElementById("refresh");

function attachEvents() {
    sendBtnRef.addEventListener("click", collectForm);
    refreshBtnRef.addEventListener("click", refresh);
}

function refresh() {
    getMessages().then((data) => {
        let chatFieldRef = document.getElementById("messages");
        Object.values(data)
            .map((msg) => `${msg.author}: ${msg.content}\n`)
            .forEach((msg) => (chatFieldRef.textContent += msg));
    });
}

function collectForm() {
    let nameFieldRef = document.querySelector("input[name=author]");
    let messageFieldRef = document.querySelector("input[name=content]");
    let author = nameFieldRef.value;
    let message = messageFieldRef.value;
    nameFieldRef.value = "";
    messageFieldRef.value = "";
    sendMsg(author, message);
}

async function sendMsg(author, content) {
    await fetch(messangerEP, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ author, content }),
    });
}

async function getMessages() {
    let response = await fetch(messangerEP);
    let result = await response.json();
    return result;
}

attachEvents();
