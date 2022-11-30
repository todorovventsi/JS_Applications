import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.getElementById("root");
const formRef = document.querySelector("form");
formRef.addEventListener("submit", onSubmit);

function onSubmit(event) {
    event.preventDefault();

    let data = Object.fromEntries(new FormData(formRef));
    let towns = data.towns.split(", ");

    displayTowns(towns);
}

function displayTowns(data) {
    const townList = html`
        <ul>
            ${data.map((town) => html`<li>${town}</li>`)}
        </ul>
    `;
    render(townList, root);
}
