async function loadRepos() {
    const username = document.getElementById("username").value;
    const ulField = document.getElementById("repos");
    const queryURL = `https://api.github.com/users/${username}/repos`;

    ulField.innerHTML = "";
    try {
        const response = await fetch(queryURL);

        if (response.ok == false) {
            throw new Error("Error occured");
        }

        const repos = await response.json();

        for (let repo of repos) {
            let { full_name, html_url } = repo;

            let li = document.createElement("li");

            let a = document.createElement("a");
            a.textContent = full_name;
            a.setAttribute("href", html_url);
            a.setAttribute("target", "_blank");

            li.appendChild(a);

            ulField.appendChild(li);
        }
    } catch (err) {
        let li = document.createElement("li");
        li.textContent = err.message;
        ulField.appendChild(li);
    }
}
