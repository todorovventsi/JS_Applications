import { createTopic } from "./data.js";
import { showHomeView } from "./home.js";

document
    .querySelector("#create-topic-form")
    .addEventListener("submit", createTopic);

showHomeView();
