const profilesEP = `http://localhost:3030/jsonstore/advanced/profiles`;
const mainDivField = document.getElementById("main");

async function lockedProfile() {
    await loadProfiles();
    attachEvents();
}

async function loadProfiles() {
    // Fetch the server for data
    const profilesDataResponse = await fetch(profilesEP);
    const profilesData = await profilesDataResponse.json();

    Object.entries(profilesData).forEach((data) => {
        // Clean data
        let [profileId, profileObj] = data;
        let { age, email, username } = profileObj;

        // Generate card elements
        let profileDiv = document.createElement("div");
        profileDiv.classList.add("profile");
        profileDiv.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
        <label>Lock</label>
        <input
            type="radio"
            name="user1Locked"
            value="lock"
            checked
        />
        <label>Unlock</label>
        <input
            type="radio"
            name="user1Locked"
            value="unlock"
        /><br />
        <hr />
        <label>Username</label>`;

        let usernameInput = document.createElement("input"); // To attach to profileDiv 1
        usernameInput.type = "text";
        usernameInput.name = "user1Username";
        usernameInput.value = username;
        usernameInput.setAttribute("disabled", "");
        usernameInput.setAttribute("readonly", "");

        let hiddenDiv = document.createElement("div"); // To attach to profileDiv 2
        hiddenDiv.classList.add("hiddenInfo");

        let lineElement = document.createElement("hr"); // To attach to hiddenDiv 1
        let emailLabel = document.createElement("label"); // To attach to hiddenDiv 2
        emailLabel.textContent = "Email:";

        let emailInput = document.createElement("input"); // To attach to hiddenDiv 3
        emailInput.type = "email";
        emailInput.name = "user1Email";
        emailInput.value = email;
        emailInput.setAttribute("disabled", "");
        emailInput.setAttribute("readonly", "");

        let ageLabel = document.createElement("label"); // To attach to hiddenDiv 4
        ageLabel.textContent = "Age:";

        let ageInput = document.createElement("input"); // To attach to hiddenDiv 5
        ageInput.type = "email";
        ageInput.name = "user1Age";
        ageInput.value = age;
        ageInput.setAttribute("disabled", "");
        ageInput.setAttribute("readonly", "");

        let showMoreBtn = document.createElement("button");
        showMoreBtn.classList.add("show-more-btn");
        showMoreBtn.textContent = "Show more";

        hiddenDiv.appendChild(lineElement);
        hiddenDiv.appendChild(emailLabel);
        hiddenDiv.appendChild(emailInput);
        hiddenDiv.appendChild(ageLabel);
        hiddenDiv.appendChild(ageInput);

        profileDiv.appendChild(usernameInput);
        profileDiv.appendChild(hiddenDiv);
        profileDiv.appendChild(showMoreBtn);

        // Attach profile card to the main div
        mainDivField.appendChild(profileDiv);
    });
}

function attachEvents() {
    const showMoreButtonsRef = document.querySelectorAll(".show-more-btn");

    Array.from(showMoreButtonsRef).forEach((btn) =>
        btn.addEventListener("click", showHidden)
    );
}

function showHidden(event) {
    let profileDiv = event.currentTarget.parentElement;
    let button = event.currentTarget;
    let [lockfield, unlockField] =
        profileDiv.querySelectorAll("input[type=radio]");
    let hiddenDivElements = Array.from(
        profileDiv.querySelectorAll(".hiddenInfo > input, .hiddenInfo > label")
    );

    if (button.textContent == "Hide it") {
        if (lockfield.checked) {
            return;
        }
        hiddenDivElements.forEach(
            (element) => (element.style.display = "none")
        );
        button.textContent = "Show more";
        return;
    }

    if (lockfield.checked) {
        return;
    }

    hiddenDivElements.forEach((element) => (element.style.display = "block"));
    button.textContent = "Hide it";
}
