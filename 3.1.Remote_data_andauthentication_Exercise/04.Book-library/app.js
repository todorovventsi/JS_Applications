const booksEP = `http://localhost:3030/jsonstore/collections/books`;

const createFormRef = document.getElementById("create-form");
const editFormRef = document.getElementById("edit-form");
const tableBodyRef = document.querySelector("tbody");

const loadBooksRef = document.getElementById("loadBooks");

const createBookFormRef = document.querySelector("#create-form");
const editBookFormRef = document.querySelector("#edit-form");

let editID = "";

function init() {
    loadBooksRef.addEventListener("click", loadBooks);
    createBookFormRef.addEventListener("submit", createBook);
    editBookFormRef.addEventListener("submit", editBook);
    tableBodyRef.addEventListener("click", deleteBook);
    tableBodyRef.addEventListener("click", loadEditForm);
}

// LOAD BOOKS VIA BUTTON
async function loadBooks(event) {
    let response = await fetch(booksEP);
    let data = await response.json();
    tableBodyRef.innerHTML = "";
    generateTableRow(data);
}

function generateTableRow(data) {
    cleanedData = [];
    for (let entry in data) {
        cleanedData.push({
            id: entry,
            author: data[entry].author,
            title: data[entry].title,
        });
    }
    cleanedData.forEach((bookEntry) => {
        let { id, title, author } = bookEntry;

        let row = document.createElement("tr");
        row.id = id;

        let authorField = document.createElement("td");
        authorField.textContent = author;

        let titleFiled = document.createElement("td");
        titleFiled.textContent = title;

        let controls = document.createElement("td");

        let editBtn = document.createElement("button");
        editBtn.id = "edit-btn";
        editBtn.textContent = "Edit";
        let deleteBtn = document.createElement("button");
        deleteBtn.id = "delete-btn";
        deleteBtn.textContent = "Delete";

        controls.replaceChildren(editBtn, deleteBtn);
        row.appendChild(titleFiled);
        row.appendChild(authorField);
        row.appendChild(controls);
        tableBodyRef.appendChild(row);
    });
}

// CREATE NEW BOOK AND SAVE IT TO DB
async function createBook(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let data = Object.fromEntries([...formData.entries()]);
    let { title, author } = data;

    if (title !== "" && author !== "") {
        fetch(booksEP, {
            method: "post",
            "Content-Type": "application/json",
            body: JSON.stringify({ author, title }),
        });
    }
    form.reset();
    loadBooks();
}

// DELETE BOOK FROM DB
async function deleteBook(event) {
    if (event.target.id !== "delete-btn") {
        return;
    }
    let id = event.target.parentElement.parentElement.id;
    await fetch(`${booksEP}/${id}`, {
        method: "delete",
    });
    loadBooks();
}

// EDIT BOOK
async function loadEditForm(event) {
    if (event.target.id !== "edit-btn") {
        return;
    }
    let id = event.target.parentElement.parentElement.id;
    let titleInputRef = document.querySelector("#edit-form input[name=title]");
    let authorInputRef = document.querySelector(
        "#edit-form input[name=author]"
    );
    if (createBookFormRef.classList.length == 0) {
        createBookFormRef.classList.toggle("hidden");
        editBookFormRef.classList.toggle("hidden");
    }

    let resposne = await fetch(`${booksEP}/${id}`);
    let book = await resposne.json();
    titleInputRef.value = book.title;
    authorInputRef.value = book.author;
    editID = id;
}

async function editBook(event) {
    event.preventDefault();
    let id = event.target.parentElement.parentElement.id;

    let form = event.target;
    let formData = new FormData(form);
    let data = Object.fromEntries([...formData.entries()]);
    let { title, author } = data;

    if (title !== "" && author !== "") {
        fetch(`${booksEP}/${editID}`, {
            method: "put",
            "Content-Type": "application/json",
            body: JSON.stringify({ author, title }),
        });
    }
    createBookFormRef.classList.toggle("hidden");
    editBookFormRef.classList.toggle("hidden");
    loadBooks();
}

init();
