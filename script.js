const toLitersConversion= 3.78541;
const toGallonsConversion = 0.264172;

let totalLapTimeSecs = 90;
let fuelPerLap = 0.50
let totalRaceLengthMins = 30;
let totalRaceLengthLaps = 20;

const raceLengthTimeText = document.querySelector("#race-length-time-text");
const raceLengthLapsText = document.querySelector("#race-length-laps-text");
const fuelPerLapGallonsText = document.querySelector("#fuel-per-lap-gallons-text");
const fuelPerLapLitersText = document.querySelector("#fuel-per-lap-liters-text");
const resultsLitersText = document.querySelector("#results-liters-text");
const resultsGallonsText = document.querySelector("#results-gallons-text");
const lapTimeDisplay = document.querySelector("#lap-time-display");
const raceLengthDisplay = document.querySelector("#race-length-display");
const raceLengthTimeElements = document.querySelector(".race-length-time-elements");
const raceLengthLapsElements = document.querySelector(".race-length-laps-elements");
const raceLengthTimeResult = document.querySelector("#race-length-time-result");
const raceLengthLapsResult = document.querySelector("#race-length-laps-result");
const fuelNeededResult = document.querySelector("#fuel-needed-result");
const lapTimeElements = document.querySelector(".lap-time-container");
const allLastCells = document.getElementsByClassName("last-cell");

let fuelNeededType = document.querySelector("#fuel-needed-result-type").checked;
let raceLengthType = document.querySelector("#race-length-type").checked;

function calcRaceLengthMins () {
    let raceLengthHours = +document.querySelector("#race-length-hours-value").value;
    let raceLengthMinutes = +document.querySelector("#race-length-minutes-value").value;
    totalRaceLengthMins = raceLengthHours * 60 + raceLengthMinutes;
    raceLengthDisplay.innerText = `${raceLengthHours}:${raceLengthMinutes.toString().padStart(2, '0')}`;
    raceLengthTimeResult.innerText = `${totalRaceLengthMins} Minutes`;
    raceLengthTimeText.classList.toggle("color-gray", raceLengthType);
    raceLengthLapsText.classList.toggle("color-gray", !raceLengthType);
    return totalRaceLengthMins;
}

function calcRaceLengthLaps() {
    totalRaceLengthLaps = Math.ceil((totalRaceLengthMins * 60) / totalLapTimeSecs);
    raceLengthLapsResult.innerText = `${totalRaceLengthLaps} Laps`;
    return totalRaceLengthLaps; 
}
    
function calcRaceLengthLaps2Laps () {
    totalRaceLengthLaps = document.querySelector("#race-length-laps-value").value;
    raceLengthLapsResult.innerText = `${totalRaceLengthLaps} Laps`;
    return totalRaceLengthLaps; 
}

function calcLapTime () {
    let lapTimeMins = +document.querySelector("#lap-time-minutes").value;
    let lapTimeSecs = +document.querySelector("#lap-time-seconds").value;
    totalLapTimeSecs = lapTimeMins * 60 + lapTimeSecs;
    lapTimeDisplay.innerText = `${lapTimeMins}:${lapTimeSecs.toString().padStart(2, '0')}`;
    return totalLapTimeSecs;
}

function calcFuelPerLap() {
    const fuelPerLapType = document.querySelector("#fuel-per-lap-type").checked;
    const fuelValue = +document.querySelector("#fuel-per-lap-value").value;
    fuelPerLapGallonsText.classList.toggle('color-gray',fuelPerLapType);
    fuelPerLapLitersText.classList.toggle('color-gray',!fuelPerLapType);
    fuelPerLap = fuelPerLapType ? fuelValue * toGallonsConversion : fuelValue;
    return fuelPerLap;
}

function calcTotalFuelNeededTime(fuelNeededType) {
    const fuelNeeded = Math.ceil(totalRaceLengthMins * 60 / totalLapTimeSecs) * fuelPerLap;
    fuelNeededResult.innerText = `${(fuelNeeded * (fuelNeededType ? toLitersConversion : 1)).toFixed(2)} ${fuelNeededType ? 'Liters' : 'Gallons'}`;
}

function calcTotalFuelNeededLaps(fuelNeededType) {
    const fuelNeeded = fuelPerLap * totalRaceLengthLaps;
    fuelNeededResult.innerText = `${(fuelNeeded * (fuelNeededType ? toLitersConversion : 1)).toFixed(2)} ${fuelNeededType ? 'Liters' : 'Gallons'}`;
}

function runAllCalcs() {
    raceLengthType = document.querySelector("#race-length-type").checked;
    fuelNeededType = document.querySelector("#fuel-needed-result-type").checked;
    calcLapTime();
    calcFuelPerLap();
    calcRaceLengthMins();
    if (raceLengthType) {
        calcRaceLengthLaps2Laps();
        calcTotalFuelNeededLaps(fuelNeededType);
        raceLengthTimeResult.innerText = `${totalRaceLengthLaps} Laps`;
    } else {
        calcRaceLengthLaps();
        calcTotalFuelNeededTime(fuelNeededType);
    }
    lapTimeElements.style.display = raceLengthType ? "none" : "block";
    raceLengthTimeElements.style.display = raceLengthType ? "none" : "block";
    raceLengthLapsElements.style.display = raceLengthType ? "block" : "none";
}

function convertLastCells () {
    fuelNeededType = document.querySelector("#fuel-needed-result-type").checked;
    resultsGallonsText.classList.toggle("color-gray", fuelNeededType);
    resultsLitersText.classList.toggle("color-gray", !fuelNeededType);
    for (let i = 0; i < allLastCells.length; i++) {
        let myArray = allLastCells[i].innerText.split(" ");
        let justNumber = +myArray[0];
        fuelNeededType ? 
        allLastCells[i].innerText = `${(justNumber * toLitersConversion).toFixed(2)} Liters` :
        allLastCells[i].innerText = `${(justNumber * toGallonsConversion).toFixed(2)} Gallons`;
        const deleteButton = document.createElement('div');
        deleteButton.innerHTML = `<img src="delete_icon.png" width="13" height="13">`;
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function() {
            deleteRow(this);
        };
        allLastCells[i].appendChild(deleteButton);
    }
}

function addRow() {
    const table = document.querySelector('.data-table').getElementsByTagName('tbody')[0];
    const initialRow = table.rows[0];
    const newRow = table.insertRow(1); // Insert the new row right after the initial row
    
    // Copy each cell's data from the initial row to the new row
    for (let i = 0; i < initialRow.cells.length; i++) {
        const newCell = newRow.insertCell(i);
        newCell.innerText = initialRow.cells[i].innerText;
    }
    
    // Create a cell with a "Delete Row" button
    const lastCell = newRow.cells[newRow.cells.length - 1];
    lastCell.classList.add("last-cell");
    const deleteButton = document.createElement('div');
    deleteButton.innerHTML = `<img src="delete_icon.png" width="13" height="13">`;
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() {
        deleteRow(this);
    };
    lastCell.appendChild(deleteButton);
    
}

function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
}

 function initializeToggleTexts () {
    raceLengthTimeText.classList.toggle("color-gray", fuelNeededType);
    raceLengthLapsText.classList.toggle("color-gray", !fuelNeededType);
    resultsGallonsText.classList.toggle("color-gray", fuelNeededType);
    resultsLitersText.classList.toggle("color-gray", !fuelNeededType);
}

runAllCalcs();
initializeToggleTexts();

document.querySelector("body").oninput = runAllCalcs;
document.querySelector("#fuel-needed-result-type").addEventListener('click', convertLastCells);


document.querySelector('#race-length-hours-value').addEventListener('input', (event) => {
    document.querySelector('#race-length-hours-value ~ div').textContent = event.target.value;
    document.querySelector('#race-length-hours-value ~ div').style.display = 'block';
});

document.querySelector('#race-length-hours-value').addEventListener('touchend', () => {
    document.querySelector('#race-length-hours-value ~ div').style.display = 'none';
});

document.querySelector('#race-length-minutes-value').addEventListener('input', (event) => {
    document.querySelector('#race-length-minutes-value ~ div').textContent = event.target.value;
    document.querySelector('#race-length-minutes-value ~ div').style.display = 'block';
});

document.querySelector('#race-length-minutes-value').addEventListener('touchend', () => {
    document.querySelector('#race-length-minutes-value ~ div').style.display = 'none';
});

document.querySelector('#lap-time-minutes').addEventListener('input', (event) => {
    document.querySelector('#lap-time-minutes ~ div').textContent = event.target.value;
    document.querySelector('#lap-time-minutes ~ div').style.display = 'block';
});

document.querySelector('#lap-time-minutes').addEventListener('touchend', () => {
    document.querySelector('#lap-time-minutes ~ div').style.display = 'none';
});

document.querySelector('#lap-time-seconds').addEventListener('input', (event) => {
    document.querySelector('#lap-time-seconds ~ div').textContent = event.target.value;
    document.querySelector('#lap-time-seconds ~ div').style.display = 'block';
});

document.querySelector('#lap-time-seconds').addEventListener('touchend', () => {
    document.querySelector('#lap-time-seconds ~ div').style.display = 'none';
});

// improve code effeciency
//create save in browser functionality
