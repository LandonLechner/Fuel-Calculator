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

// improve code effeciency
//create save in browser functionality

// const toLitersConversion = 3.78541;
// const toGallonsConversion = 0.264172;

// let totalLapTimeSecs = 90;
// let fuelPerLap = 0.50;
// let totalRaceLengthMins = 30;
// let totalRaceLengthLaps = 20;

// const raceLengthTimeText = document.querySelector("#race-length-time-text");
// const raceLengthLapsText = document.querySelector("#race-length-laps-text");
// const fuelPerLapGallonsText = document.querySelector("#fuel-per-lap-gallons-text");
// const fuelPerLapLitersText = document.querySelector("#fuel-per-lap-liters-text");
// const resultsLitersText = document.querySelector("#results-liters-text");
// const resultsGallonsText = document.querySelector("#results-gallons-text");
// const lapTimeDisplay = document.querySelector("#lap-time-display");
// const raceLengthDisplay = document.querySelector("#race-length-display");
// const raceLengthTimeElements = document.querySelector(".race-length-time-elements");
// const raceLengthLapsElements = document.querySelector(".race-length-laps-elements");
// const raceLengthTimeResult = document.querySelector("#race-length-time-result");
// const raceLengthLapsResult = document.querySelector("#race-length-laps-result");
// const fuelNeededResult = document.querySelector("#fuel-needed-result");
// const lapTimeElements = document.querySelector(".lap-time-container");
// const allLastCells = document.getElementsByClassName("last-cell");

// let fuelNeededType = document.querySelector("#fuel-needed-result-type").checked;
// let raceLengthType = document.querySelector("#race-length-type").checked;

// function updateTextAndToggle(element, text, condition) {
//     element.innerText = text;
//     element.classList.toggle("color-gray", condition);
// }

// function calcRaceLengthMins() {
//     const raceLengthHours = +document.querySelector("#race-length-hours-value").value;
//     const raceLengthMinutes = +document.querySelector("#race-length-minutes-value").value;
//     totalRaceLengthMins = raceLengthHours * 60 + raceLengthMinutes;
//     updateTextAndToggle(raceLengthDisplay, `${raceLengthHours}:${raceLengthMinutes.toString().padStart(2, '0')}`, raceLengthType);
//     updateTextAndToggle(raceLengthTimeResult, `${totalRaceLengthMins} Minutes`, raceLengthType);
//     updateTextAndToggle(raceLengthTimeText, "", raceLengthType);
//     updateTextAndToggle(raceLengthLapsText, "", !raceLengthType);
//     return totalRaceLengthMins;
// }

// function calcRaceLengthLaps() {
//     totalRaceLengthLaps = Math.ceil((totalRaceLengthMins * 60) / totalLapTimeSecs);
//     raceLengthLapsResult.innerText = `${totalRaceLengthLaps} Laps`;
//     return totalRaceLengthLaps;
// }

// function calcRaceLengthLaps2Laps() {
//     totalRaceLengthLaps = document.querySelector("#race-length-laps-value").value;
//     raceLengthLapsResult.innerText = `${totalRaceLengthLaps} Laps`;
//     return totalRaceLengthLaps;
// }

// function calcLapTime() {
//     const lapTimeMins = +document.querySelector("#lap-time-minutes").value;
//     const lapTimeSecs = +document.querySelector("#lap-time-seconds").value;
//     totalLapTimeSecs = lapTimeMins * 60 + lapTimeSecs;
//     lapTimeDisplay.innerText = `${lapTimeMins}:${lapTimeSecs.toString().padStart(2, '0')}`;
//     return totalLapTimeSecs;
// }

// function calcFuelPerLap() {
//     const fuelPerLapType = document.querySelector("#fuel-per-lap-type").checked;
//     const fuelValue = +document.querySelector("#fuel-per-lap-value").value;
//     fuelPerLapGallonsText.classList.toggle('color-gray', fuelPerLapType);
//     fuelPerLapLitersText.classList.toggle('color-gray', !fuelPerLapType);
//     fuelPerLap = fuelPerLapType ? fuelValue * toGallonsConversion : fuelValue;
//     return fuelPerLap;
// }

// function calcTotalFuelNeeded(fuelNeededType, laps) {
//     const fuelNeeded = laps * fuelPerLap;
//     fuelNeededResult.innerText = `${(fuelNeeded * (fuelNeededType ? toLitersConversion : 1)).toFixed(2)} ${fuelNeededType ? 'Liters' : 'Gallons'}`;
// }

// function runAllCalcs() {
//     raceLengthType = document.querySelector("#race-length-type").checked;
//     fuelNeededType = document.querySelector("#fuel-needed-result-type").checked;
//     calcLapTime();
//     calcFuelPerLap();
//     calcRaceLengthMins();
    
//     if (raceLengthType) {
//         calcRaceLengthLaps2Laps();
//         calcTotalFuelNeeded(fuelNeededType, totalRaceLengthLaps);
//         raceLengthTimeResult.innerText = `${totalRaceLengthLaps} Laps`;
//     } else {
//         calcRaceLengthLaps();
//         calcTotalFuelNeeded(fuelNeededType, Math.ceil(totalRaceLengthMins * 60 / totalLapTimeSecs));
//     }
    
//     lapTimeElements.style.display = raceLengthType ? "none" : "block";
//     raceLengthTimeElements.style.display = raceLengthType ? "none" : "block";
//     raceLengthLapsElements.style.display = raceLengthType ? "block" : "none";
// }

// function convertLastCells() {
//     const fuelNeededType = document.querySelector("#fuel-needed-result-type").checked;
//     resultsGallonsText.classList.toggle("color-gray", fuelNeededType);
//     resultsLitersText.classList.toggle("color-gray", !fuelNeededType);

//     const conversionFactor = fuelNeededType ? toLitersConversion : toGallonsConversion;
//     const unit = fuelNeededType ? 'Liters' : 'Gallons';

//     Array.from(allLastCells).forEach(cell => {
//         const justNumber = +cell.innerText.split(" ")[0];
//         cell.innerText = `${(justNumber * conversionFactor).toFixed(2)} ${unit}`;
//         const deleteButton = createDeleteButton();
//         cell.appendChild(deleteButton);
//     });
// }

// function createDeleteButton() {
//     const deleteButton = document.createElement('div');
//     deleteButton.innerHTML = `<img src="delete_icon.png" width="13" height="13">`;
//     deleteButton.classList.add('delete-button');
//     deleteButton.onclick = function() {
//         deleteRow(this);
//     };
//     return deleteButton;
// }

// function addRow() {
//     const table = document.querySelector('.data-table').getElementsByTagName('tbody')[0];
//     const initialRow = table.rows[0];
//     const newRow = table.insertRow(1);

//     Array.from(initialRow.cells).forEach(cell => {
//         const newCell = newRow.insertCell();
//         newCell.innerText = cell.innerText;
//     });

//     const lastCell = newRow.cells[newRow.cells.length - 1];
//     lastCell.classList.add("last-cell");
//     lastCell.appendChild(createDeleteButton());
// }

// function deleteRow(button) {
//     const row = button.closest('tr');
//     row.remove();
// }

// function initializeToggleTexts() {
//     updateTextAndToggle(raceLengthTimeText, "", fuelNeededType);
//     updateTextAndToggle(raceLengthLapsText, "", !fuelNeededType);
//     updateTextAndToggle(resultsGallonsText, "", fuelNeededType);
//     updateTextAndToggle(resultsLitersText, "", !fuelNeededType);
// }

// runAllCalcs();
// initializeToggleTexts();

// document.querySelector("body").oninput = runAllCalcs;
// document.querySelector("#fuel-needed-result-type").addEventListener('click', convertLastCells);
