import { createTopic } from "./data.js";
import { showHomeView, redirectHome } from "./home.js";

document
    .querySelector("#create-topic-form")
    .addEventListener("submit", createTopic);

document.getElementById("home-link").addEventListener("click", redirectHome);

showHomeView();
