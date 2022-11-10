const phonebookEP = `http://localhost:3030/jsonstore/phonebook`;

const phonebookUlRef = document.getElementById("phonebook");
const loadBtnRef = document.getElementById("btnLoad");
const createBtnRef = document.getElementById("btnCreate");

function attachEvents() {
    loadBtnRef.addEventListener("click", loadContacts);
    createBtnRef.addEventListener("click", addContact);
    phonebookUlRef.addEventListener("click", deleteContact);
}

// LOADING CONTACT LIST
function displayContactList(contactsServerResponse) {
    phonebookUlRef.innerHTML = "";
    contactsServerResponse.forEach((entry) => {
        let { person, phone } = entry;
        let id = entry._id;
        generateContactContent(person, phone, id).forEach((item) =>
            phonebookUlRef.appendChild(item)
        );
    });
}

function generateContactContent(person, phone, id) {
    let liItem = document.createElement("li");
    liItem.textContent = `${person}: ${phone}`;
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "DELETE";
    deleteBtn.name = id;
    return [liItem, deleteBtn];
}

async function loadContacts() {
    let response = await fetch(phonebookEP);
    let contactList = await response.json();
    let cleanedList = Object.values(contactList);
    displayContactList(cleanedList);
    return contactList;
}

// ADDING NEW CONTACTS
async function addContact() {
    let personRef = document.getElementById("person");
    let phoneRef = document.getElementById("phone");
    let person = personRef.value;
    let phone = phoneRef.value;
    personRef.value = "";
    phoneRef.value = "";
    await fetch(phonebookEP, {
        method: "POST",
        headers: {
            "Content-Type": "applications/json",
        },
        body: JSON.stringify({ person, phone }),
    });
    loadContacts();
}

// DELETE CONTACT
async function deleteContact(event) {
    let btnRef = event.target;
    if (!btnRef.tagName == "BUTTON") {
        return;
    }
    let id = btnRef.name;
    await fetch(`${phonebookEP}/${id}`, {
        method: "DELETE",
    });
    loadContacts();
}
attachEvents();
