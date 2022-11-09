const allArticlesEP = `http://localhost:3030/jsonstore/advanced/articles/list`;
const singleArticleEP = `http://localhost:3030/jsonstore/advanced/articles/details/`;

const mainSectionField = document.getElementById("main");

async function solution() {
    await loadArticles();
    attachEvents();
}

async function loadArticles() {
    const response = await fetch(allArticlesEP);
    const articles = await response.json();

    articles.forEach((article) =>
        mainSectionField.appendChild(generateContent(article))
    );
}

function generateContent(article) {
    const id = article._id;
    const title = article.title;

    fetch(singleArticleEP + id)
        .then((response) => response.json())
        .then((data) => {
            let text = data.content;
            let paragraph = document.createElement("p");
            paragraph.textContent = text;
            extraDiv.appendChild(paragraph);
        });

    let accordionDiv = document.createElement("div");
    accordionDiv.classList.add("accordion");

    // HEAD DIV START
    let headDiv = document.createElement("div"); // to att to accordionDiv 1
    headDiv.classList.add("head");

    // --HEAD DIV CONTENT
    let titleSpan = document.createElement("span");
    titleSpan.textContent = title;

    let btnSpan = document.createElement("button");
    btnSpan.classList.add("button");
    btnSpan.id = id;
    btnSpan.textContent = "More";

    // --HEAD DIV ASSEMBLY
    headDiv.appendChild(titleSpan);
    headDiv.appendChild(btnSpan);

    // EXTRA DIV START
    let extraDiv = document.createElement("div"); // to att to accordionDiv 2
    extraDiv.classList.add("extra");

    // --EXTRA DIV CONTENT - Fullfilled on fetching server 26-29

    // ACCORDION DIV ASSEMBLY
    accordionDiv.appendChild(headDiv);
    accordionDiv.appendChild(extraDiv);

    return accordionDiv;
}

function attachEvents() {
    Array.from(document.querySelectorAll("button")).forEach((button) =>
        button.addEventListener("click", toggle)
    );
}

function toggle(event) {
    debugger;
    let parent = event.currentTarget.parentElement.parentElement;
    let btn = event.currentTarget;
    let togglebleDiv = parent.querySelector(".extra");

    if (togglebleDiv.style.display == "none") {
        btn.textContent = "Less";
        togglebleDiv.style.display = "block";
        return;
    }

    btn.textContent = "More";
    togglebleDiv.style.display = "none";
}

solution();
