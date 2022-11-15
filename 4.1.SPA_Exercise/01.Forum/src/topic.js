import { getTopic } from "./data.js";
import { loadTopic } from "./DOM.js";

export async function showTopicView(event) {
    if (event.target.tagName != "H2") {
        return;
    }
    event.preventDefault();

    [...document.querySelectorAll("section")].forEach(
        (e) => (e.style.display = "none")
    );

    let id = event.target.getAttribute("topic_id");
    let topic = await getTopic(id);

    loadTopic(topic);

    document.getElementById("topic-comments-view").style.display = "block";
}
