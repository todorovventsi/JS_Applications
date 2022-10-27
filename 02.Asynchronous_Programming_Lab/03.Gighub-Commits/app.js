async function loadCommits() {
    const username = document.getElementById("username").value;
    const repo = document.getElementById("repo").value;
    const commitsField = document.getElementById("commits");

    const queryURL = `https://api.github.com/repos/${username}/${repo}/commits`;

    commitsField.innerHTML = "";

    try {
        let response = await fetch(queryURL);

        if (response.ok == false) {
            throw new Error("Not Found");
        }

        let commits = await response.json();

        for (let entry of commits) {
            let { commit } = entry;
            let authorName = commit.author.name;
            let message = commit.message;
            let liItem = document.createElement("li");
            liItem.textContent = `${authorName}: ${message}`;

            commitsField.appendChild(liItem);
        }
    } catch (error) {
        let liItem = document.createElement("li");
        liItem.textContent = error.message;
        commitsField.appendChild(liItem);
    }
}
