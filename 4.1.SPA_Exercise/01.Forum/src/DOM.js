import { showTopicView } from "./topic.js";

export function loadTopics(data, div, view) {
    // TODO Generate and load topic DIVs
    // const topicListDivRef = document.querySelector("#topic-list");
    const topicListFragment = document.createDocumentFragment();
    let generateFunc =
        view == "home" ? generateHomeViewTopicDiv : generateTopicViewDiv;
    data.forEach((e) => topicListFragment.appendChild(generateFunc(e)));

    div.innerHTML = "";
    div.appendChild(topicListFragment);
}

export function loadTopic(data) {
    console.log(data);
}

function generateHomeViewTopicDiv(topicObj) {
    let { topicName, username, postText, created } = topicObj;
    let id = topicObj._id;

    // To be done with creating DOM Elements indead of using innerHTML!!!
    let topicDiv = document.createElement("div");
    topicDiv.classList.add("topic-title");
    // topicDiv.setAttribute("topic_id", id);
    topicDiv.addEventListener("click", showTopicView);
    topicDiv.innerHTML = `<div class="topic-container">
    <!--TODO - to be generated-->
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <a href="#" class="normal">
                <h2 topic_id=${id}>${topicName}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>
                        Date:
                        <time
                            >${created}</time
                        >
                    </p>
                    <div class="nick-name">
                        <p>Username: <span>${username}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

    return topicDiv;
}

function generateTopicViewDiv(topicObj) {
    let { topicName, username, postText, created } = topicObj;
    let id = topicObj._id;
}
