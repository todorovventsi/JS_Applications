import { showHomeView } from "./home.js";

const postsEP = `http://localhost:3030/jsonstore/collections/myboard/posts`;
const commentsEP = `http://localhost:3030/jsonstore/collections/myboard/comments`;

export async function getAllTopics() {
    const response = await fetch(postsEP);
    const result = await response.json();

    return result;
}

export async function getTopic(id) {
    const response = await fetch(`${postsEP}/${id}`);
    const result = await response.json();

    return result;
}

export async function createTopic(e) {
    // TODO - validate input
    e.preventDefault();
    let submitter = e.submitter;
    let form = e.target;

    if (submitter.classList.contains("cancel")) {
        form.reset();
        return;
    }

    const { topicName, username, postText } = Object.fromEntries(
        new FormData(form)
    );
    const created = new Date();
    form.reset();

    await fetch(postsEP, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicName, username, postText, created }),
    });

    showHomeView();
}
