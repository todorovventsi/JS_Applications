import { getAllTopics } from "./data.js";
import { loadTopics } from "./DOM.js";

export async function showHomeView() {
    let topicListDivRef = document.querySelector("#home-topic-list");
    let topicData = Object.values(await getAllTopics());

    loadTopics(topicData, topicListDivRef, "home"); // TODO - Error handling

    document.querySelector("#topic-comments-view").style.display = "none";
    document.querySelector("#home-view").style.display = "block";
}
