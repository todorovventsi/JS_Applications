const studentsEP = `http://localhost:3030/jsonstore/collections/students`;
const tableBodyRef = document.querySelector("tbody");

init();
// INITIALIZATION
function init() {
    // 1. Attach event on submit button
    document.getElementById("form").addEventListener("submit", onSumbit);

    // 2. Load existing students
    loadStudents();
}

// FETCHING DB AND DISPLAY STUDENTS
async function getStudents() {
    let response = await fetch(studentsEP);
    let students = await response.json();
    return students;
}

async function loadStudents() {
    let studentsData = Object.values(await getStudents());
    let rows = studentsData.map((entry) => generateTableRow(entry));
    tableBodyRef.replaceChildren(...rows);
}

function generateTableRow(data) {
    let { firstName, lastName, facultyNumber, grade } = data;
    let row = document.createElement("tr");

    let firstNameCell = document.createElement("td");
    firstNameCell.textContent = firstName;

    let lastNameCell = document.createElement("td");
    lastNameCell.textContent = lastName;

    let facultyCell = document.createElement("td");
    facultyCell.textContent = facultyNumber;

    let gradeCell = document.createElement("td");
    gradeCell.textContent = grade;

    row.replaceChildren(firstNameCell, lastNameCell, facultyCell, gradeCell);

    return row;
}

// CREATING STUDENTS
async function onSumbit(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let data = Object.fromEntries([...formData.entries()]);
    let { firstName, lastName, facultyNumber, grade } = data;
    await fetch(studentsEP, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, facultyNumber, grade }),
    });

    form.reset();
    loadStudents();
}
