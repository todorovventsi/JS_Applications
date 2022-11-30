import { html, render } from "./node_modules/lit-html/lit-html.js";

import { cats } from "./catSeeder.js";

const root = document.getElementById("allCats");

root.addEventListener("click", toggleInfo);

const content = html`
    <ul>
        ${cats.map(
            (cat) => html`
                <li>
                    <img
                        src="./images/${cat.imageLocation}.jpg"
                        width="250"
                        height="250"
                        alt="Card image cap"
                    />
                    <div class="info">
                        <button class="showBtn">Show status code</button>
                        <div class="status hidden" id="${cat.id}">
                            <h4>Status Code: ${cat.statusCode}</h4>
                            <p>${cat.statusMessage}</p>
                        </div>
                    </div>
                </li>
            `
        )}
    </ul>
`;

loadPage();

function loadPage() {
    render(content, root);
}

function toggleInfo(event) {
    const currentDiv = event.target.parentElement;
    let btn = currentDiv.querySelector("button");
    let toShow = currentDiv.querySelector("div");

    if (event.target.tagName !== "BUTTON") {
        return;
    }

    let btnMsg = toShow.classList.contains("hidden")
        ? "Hide status code"
        : "Show status code";

    btn.textContent = btnMsg;

    toShow.classList.toggle("hidden");
}
