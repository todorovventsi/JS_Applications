function getInfo() {
    // Get element referrences
    // fetch db
    // using promise chain create li tags
    // append li tags to ul
    // handle errors

    const inputField = document.getElementById("stopId");
    const stopNameDiv = document.getElementById("stopName");
    const busesUl = document.getElementById("buses");
    const baseURL = `http://localhost:3030/jsonstore/bus/businfo`;

    fetch(`${baseURL}/${inputField.value}`)
        .then((response) => response.json())
        .then((data) => {
            stopNameDiv.textContent = data.name;
            busesUl.innerHTML = "";
            Object.keys(data.buses).forEach((busNumber) => {
                let liItem = document.createElement("li");
                liItem.textContent = `Bus ${busNumber} arrives in ${data.buses[busNumber]} minutes`;
                busesUl.appendChild(liItem);
            });
        })
        .catch((err) => {
            stopNameDiv.textContent = "Error";
            busesUl.innerHTML = "";
        });
}
