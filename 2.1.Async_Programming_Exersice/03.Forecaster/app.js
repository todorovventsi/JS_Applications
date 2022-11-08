const conditions = {
    Sunny: "&#x2600",
    "Partly sunny": "&#x26C5",
    Overcast: "&#x2601",
    Rain: "&#x2614",
    Degrees: "&#176",
};

// Collecting referrences
const userLocationField = document.getElementById("location");
const submitBtnField = document.getElementById("submit");
const forecastDivField = document.getElementById("forecast");
const currentDivField = document.getElementById("current");
const upcomingDivField = document.getElementById("upcoming");

// Endpoints
const LOCATIONS_URL = `http://localhost:3030/jsonstore/forecaster/locations`;
const CURRENT_CONDITION_URL = `http://localhost:3030/jsonstore/forecaster/today/`;
const FORECAST_URL = `http://localhost:3030/jsonstore/forecaster/upcoming/`;

function attachEvents() {
    // Attach events
    submitBtnField.addEventListener("click", displayWeather);
}

async function displayWeather() {
    forecastDivField.style.display = "inline";
    try {
        // 1. Get location code fetching location_url
        let code = await getCode(); // location code string
        let currentCodtitionData = await getCurrentCondition(code); // condition data - object
        let forecastData = await getForecast(code); // forecast data - object

        // 2. Using current condition data display it in div
        currentDivField.innerHTML = "";
        let toAppendtoCurrent =
            generateCurrentConditionDiv(currentCodtitionData);
        currentDivField.appendChild(toAppendtoCurrent);

        // 3. Using forecast data display it in div
        upcomingDivField.innerHTML = "";
        let toAppendToUpcoming = generateForecastConditionDiv(forecastData);
        upcomingDivField.appendChild(toAppendToUpcoming);
    } catch (error) {
        forecastDivField.innerHTML = "Error";
    }
}

// DOM functions
function generateCurrentConditionDiv(data) {
    // Data cleaning
    let { condition, high, low } = data.forecast;
    let name = data.name;

    // Create elements
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("forecast");

    let conditionSymbolSpan = document.createElement("span");
    conditionSymbolSpan.classList.add("symbol"); // TO CHECK CLASS NAME
    conditionSymbolSpan.innerHTML = conditions[condition];
    mainDiv.appendChild(conditionSymbolSpan);

    let conditionSpan = document.createElement("span");
    conditionSpan.classList.add("condition");

    let nameSpan = document.createElement("span");
    nameSpan.classList.add("forecast-data");
    nameSpan.textContent = name;
    conditionSpan.appendChild(nameSpan);

    let tempSpan = document.createElement("span");
    tempSpan.classList.add("forecast-data");
    tempSpan.innerHTML = `${low}${conditions["Degrees"]}/${high}${conditions["Degrees"]}`;
    conditionSpan.appendChild(tempSpan);

    let condSpan = document.createElement("span");
    condSpan.classList.add("forecast-data");
    condSpan.textContent = condition;
    conditionSpan.appendChild(condSpan);

    mainDiv.appendChild(conditionSpan);

    return mainDiv;
}

function generateForecastConditionDiv(data) {
    let forecastData = data.forecast;

    let mainDiv = document.createElement("div");
    mainDiv.classList.add("forecast-info");

    forecastData.forEach(({ condition, high, low }) => {
        let spanContainer = document.createElement("span");
        spanContainer.classList.add("upcoming");

        let symbolSpan = document.createElement("span");
        symbolSpan.classList.add("symbol");
        symbolSpan.innerHTML = conditions[condition];

        let tempSpan = document.createElement("span");
        tempSpan.classList.add("forecast-data");
        tempSpan.innerHTML = `${low}${conditions["Degrees"]}/${high}${conditions["Degrees"]}`;

        let conditionSpan = document.createElement("span");
        conditionSpan.classList.add("forecast-data");
        conditionSpan.textContent = condition;

        spanContainer.appendChild(symbolSpan);
        spanContainer.appendChild(tempSpan);
        spanContainer.appendChild(conditionSpan);
        mainDiv.appendChild(spanContainer);
    });

    return mainDiv;
}

// Queries functions
async function getCode() {
    let locationCode = await fetch(LOCATIONS_URL)
        .then((response) => response.json())
        .then((data) => {
            for (let { code, name } of data) {
                if (name === userLocationField.value) {
                    return code;
                }
            }
        });
    return locationCode;
}

async function getCurrentCondition(code) {
    let endPoint = `${CURRENT_CONDITION_URL}${code}`;
    let response = await fetch(endPoint);
    let result = await response.json();
    return result;
}

async function getForecast(code) {
    let endPoint = `${FORECAST_URL}${code}`;
    let response = await fetch(endPoint);
    let result = await response.json();
    return result;
}

attachEvents();
