function solve() {
    let nextStop = "depot";
    let baseULR = `http://localhost:3030/jsonstore/bus/schedule/`;

    const infoTextField = document.querySelector("#info span");
    const departBtn = document.querySelector("#depart");
    const arriveBtn = document.querySelector("#arrive");

    async function depart() {
        try {
            let { name, next } = await (
                await getStopInfo(nextStop, baseULR)
            ).json();
            nextStop = next;
            infoTextField.textContent = `Next stop ${name}`;
            departBtn.setAttribute("disabled", "true");
            arriveBtn.removeAttribute("disabled");
        } catch (error) {
            infoTextField.textContent = "Error";
            departBtn.setAttribute("disabled", "");
            arriveBtn.setAttribute("disabled", "");
        }
    }

    function arrive() {
        arriveBtn.setAttribute("disabled", "true");
        departBtn.removeAttribute("disabled");
        infoTextField.textContent = `Arriving at ${nextStop}`;
    }

    async function getStopInfo(next, base) {
        let stopInfo = await fetch(`${base}${next}`);
        return stopInfo;
    }

    return {
        depart,
        arrive,
    };
}

let result = solve();
