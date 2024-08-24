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

runAllCalcs();

function calcRaceLengthMins () {
    let raceLengthHours = +document.querySelector("#race-length-hours-value").value;
    let raceLengthMinutes = +document.querySelector("#race-length-minutes-value").value;
    raceLengthDisplay.innerText = `${raceLengthHours}:${raceLengthMinutes.toString().padStart(2, '0')}`;
    raceLengthTimeResult.innerText = `${totalRaceLengthMins} Minutes`;
    totalRaceLengthMins = raceLengthHours * 60 + raceLengthMinutes;
    raceLengthTimeResult.innerText = `${totalRaceLengthMins} Minutes`;
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
    lapTimeDisplay.innerText = `${lapTimeMins}:${lapTimeSecs.toString().padStart(2, '0')}`;
    totalLapTimeSecs = lapTimeMins * 60 + lapTimeSecs;
    return totalLapTimeSecs;
}

function calcFuelPerLap() {
    const fuelPerLapType = document.querySelector("#fuel-per-lap-type").checked;
    if (fuelPerLapType) {
        fuelPerLapGallonsText.classList.add("color-gray");
        fuelPerLapLitersText.classList.remove("color-gray");
    } else {
        fuelPerLapLitersText.classList.add("color-gray");
        fuelPerLapGallonsText.classList.remove("color-gray");
    }
    const fuelValue = +document.querySelector("#fuel-per-lap-value").value;
    fuelPerLap = fuelPerLapType ? fuelValue * 0.264172 : fuelValue;
    return fuelPerLap;
}

function calcTotalFuelNeededTime(fuelNeededType) {
    const laps = Math.ceil(totalRaceLengthMins * 60 / totalLapTimeSecs);
    const fuelNeeded = laps * fuelPerLap;
    fuelNeededResult.innerText = `${(fuelNeeded * (fuelNeededType ? 3.78541 : 1)).toFixed(2)} ${fuelNeededType ? 'Liters' : 'Gallons'}`;
}

function calcTotalFuelNeededLaps(fuelNeededType) {
    const fuelNeeded = fuelPerLap * totalRaceLengthLaps;
    fuelNeededResult.innerText = `${(fuelNeeded * (fuelNeededType ? 3.78541 : 1)).toFixed(2)} ${fuelNeededType ? 'Liters' : 'Gallons'}`;
}

function runAllCalcs() {
    raceLengthType = document.querySelector("#race-length-type").checked;
    fuelNeededType = document.querySelector("#fuel-needed-result-type").checked;
    calcLapTime();
    calcFuelPerLap();
    calcRaceLengthMins();
    if (raceLengthType) {
        lapTimeElements.style.display = "none";
        raceLengthTimeElements.style.display = "none";
        raceLengthLapsElements.style.display = "block";
        calcRaceLengthLaps2Laps();
        raceLengthTimeResult.innerText = `${totalRaceLengthLaps} Laps`;
        calcTotalFuelNeededLaps(fuelNeededType);
        raceLengthTimeText.classList.add("color-gray");
        raceLengthLapsText.classList.remove("color-gray");
        } else {
        lapTimeElements.style.display = "block";
        raceLengthLapsElements.style.display = "none";
        raceLengthTimeElements.style.display = "block";
        calcRaceLengthLaps();
        calcTotalFuelNeededTime(fuelNeededType);
        raceLengthTimeText.classList.remove("color-gray");
        raceLengthLapsText.classList.add("color-gray");
    }
}

function convertLastCells () {
    const fuelNeededType = document.querySelector("#fuel-needed-result-type").checked;
    if (fuelNeededType) {
        resultsGallonsText.classList.add("color-gray");
        resultsLitersText.classList.remove("color-gray");
    } else {
        resultsGallonsText.classList.remove("color-gray");
        resultsLitersText.classList.add("color-gray");
    }
    for (let i = 0; i < allLastCells.length; i++) {
        if (fuelNeededType) {
            let myArray = allLastCells[i].innerText.split(" ");
            let justNumber = +myArray[0];
            allLastCells[i].innerText = `${(justNumber * 3.78541).toFixed(2)} liters`;
        } else {
            let myArray = allLastCells[i].innerText.split(" ");
            let justNumber = +myArray[0];
            allLastCells[i].innerText = `${(justNumber * 0.264172).toFixed(2)} gallons`;
        }
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
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

document.querySelector("body").oninput = runAllCalcs;

document.querySelector("#fuel-needed-result-type").addEventListener('click', () => convertLastCells());

// improve code effeciency
//create save in browser functionality



// let totalLapTimeSecs = 90;
// let fuelPerLap = 0.50;
// let totalRaceLengthMins = 30;
// let totalRaceLengthLaps = 20;

// // Cache DOM elements for efficiency
// const raceLengthTimeText = document.querySelector("#race-length-time-text");
// const raceLengthLapsText = document.querySelector("#race-length-laps-text");
// const fuelPerLapGallonsText = document.querySelector("#fuel-per-lap-gallons-text");
// const fuelPerLapLitersText = document.querySelector("#fuel-per-lap-liters-text");
// const resultsLitersText = document.querySelector("#results-liters-text");
// const resultsGallonsText = document.querySelector("#results-gallons-text");
// const lapTimeDisplay = document.querySelector("#lap-time-display");
// const raceLengthDisplay = document.querySelector("#race-length-display");
// const raceLengthTimeResult = document.querySelector("#race-length-time-result");
// const raceLengthLapsResult = document.querySelector("#race-length-laps-result");
// const fuelNeededResult = document.querySelector("#fuel-needed-result");
// const lapTimeElements = document.querySelector(".lap-time-container");
// const raceLengthTimeElements = document.querySelector(".race-length-time-elements");
// const raceLengthLapsElements = document.querySelector(".race-length-laps-elements");
// const allLastCells = document.getElementsByClassName("last-cell");
// const fuelNeededResultType = document.querySelector("#fuel-needed-result-type");
// const raceLengthTypeElement = document.querySelector("#race-length-type");

// function runAllCalcs() {
//     const raceLengthType = raceLengthTypeElement.checked;
//     const fuelNeededType = fuelNeededResultType.checked;

//     calcLapTime();
//     calcFuelPerLap();
//     calcRaceLength();

//     if (raceLengthType) {
//         displayRaceLengthAsLaps();
//         calcTotalFuelNeededLaps(fuelNeededType);
//     } else {
//         displayRaceLengthAsTime();
//         calcTotalFuelNeededTime(fuelNeededType);
//     }

//     updateFuelNeededDisplay(fuelNeededType);
// }

// function calcRaceLength() {
//     const raceLengthType = raceLengthTypeElement.checked;
//     if (raceLengthType) {
//         totalRaceLengthLaps = +document.querySelector("#race-length-laps-value").value;
//         raceLengthLapsResult.innerText = `${totalRaceLengthLaps} Laps`;
//     } else {
//         let raceLengthHours = +document.querySelector("#race-length-hours-value").value;
//         let raceLengthMinutes = +document.querySelector("#race-length-minutes-value").value;
//         totalRaceLengthMins = raceLengthHours * 60 + raceLengthMinutes;
//         raceLengthTimeResult.innerText = `${totalRaceLengthMins} Minutes`;
//     }
//     // Update laps result at the bottom of the page
//     updateLapsResult();
// }

// function calcLapTime() {
//     let lapTimeMins = +document.querySelector("#lap-time-minutes").value;
//     let lapTimeSecs = +document.querySelector("#lap-time-seconds").value;
//     lapTimeDisplay.innerText = `${lapTimeMins}:${lapTimeSecs.toString().padStart(2, '0')}`;
//     totalLapTimeSecs = lapTimeMins * 60 + lapTimeSecs;
// }

// function calcFuelPerLap() {
//     const fuelPerLapType = document.querySelector("#fuel-per-lap-type").checked;
//     toggleClass(fuelPerLapType, fuelPerLapGallonsText, fuelPerLapLitersText, "color-gray");
    
//     const fuelValue = +document.querySelector("#fuel-per-lap-value").value;
//     fuelPerLap = fuelPerLapType ? fuelValue * 0.264172 : fuelValue;
// }

// function calcTotalFuelNeededTime(fuelNeededType) {
//     const laps = Math.ceil((totalRaceLengthMins * 60) / totalLapTimeSecs);
//     const fuelNeeded = laps * fuelPerLap;
//     fuelNeededResult.innerText = formatFuelResult(fuelNeeded, fuelNeededType);
// }

// function calcTotalFuelNeededLaps(fuelNeededType) {
//     const fuelNeeded = fuelPerLap * totalRaceLengthLaps;
//     fuelNeededResult.innerText = formatFuelResult(fuelNeeded, fuelNeededType);
// }

// function formatFuelResult(fuel, fuelNeededType) {
//     const conversionFactor = fuelNeededType ? 3.78541 : 1;
//     const unit = fuelNeededType ? 'Liters' : 'Gallons';
//     return `${(fuel * conversionFactor).toFixed(2)} ${unit}`;
// }

// function displayRaceLengthAsLaps() {
//     lapTimeElements.style.display = "none";
//     raceLengthTimeElements.style.display = "none";
//     raceLengthLapsElements.style.display = "block";
//     raceLengthTimeText.classList.add("color-gray");
//     raceLengthLapsText.classList.remove("color-gray");
// }

// function displayRaceLengthAsTime() {
//     lapTimeElements.style.display = "block";
//     raceLengthLapsElements.style.display = "none";
//     raceLengthTimeElements.style.display = "block";
//     raceLengthTimeText.classList.remove("color-gray");
//     raceLengthLapsText.classList.add("color-gray");
// }

// function updateFuelNeededDisplay(fuelNeededType) {
//     toggleClass(fuelNeededType, resultsGallonsText, resultsLitersText, "color-gray");
//     convertLastCells(fuelNeededType);
// }

// function toggleClass(condition, elementToAdd, elementToRemove, className) {
//     if (condition) {
//         elementToAdd.classList.add(className);
//         elementToRemove.classList.remove(className);
//     } else {
//         elementToAdd.classList.remove(className);
//         elementToRemove.classList.add(className);
//     }
// }

// function convertLastCells(fuelNeededType) {
//     for (let cell of allLastCells) {
//         const [value, unit] = cell.innerText.split(" ");
//         const newValue = fuelNeededType ? (value * 0.264172).toFixed(2) : (value * 3.78541).toFixed(2);
//         const newUnit = fuelNeededType ? 'gallons' : 'liters';
//         cell.innerText = `${newValue} ${newUnit}`;
//         appendDeleteButton(cell);
//     }
// }

// function appendDeleteButton(cell) {
//     const deleteButton = document.createElement('div');
//     deleteButton.innerHTML = `<img src="delete_icon.png" width="13" height="13">`;
//     deleteButton.classList.add('delete-button');
//     deleteButton.onclick = function() {
//         deleteRow(this);
//     };
//     cell.appendChild(deleteButton);
// }

// function addRow() {
//     const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
//     const initialRow = table.rows[0];
//     const newRow = table.insertRow(1); // Insert the new row right after the initial row
    
//     for (let i = 0; i < initialRow.cells.length; i++) {
//         const newCell = newRow.insertCell(i);
//         newCell.innerText = initialRow.cells[i].innerText;
//     }
    
//     const lastCell = newRow.cells[newRow.cells.length - 1];
//     lastCell.classList.add("last-cell");
//     appendDeleteButton(lastCell);
// }

// function deleteRow(button) {
//     const row = button.parentNode.parentNode;
//     row.parentNode.removeChild(row);
// }

// function updateLapsResult() {
//     raceLengthLapsResult.innerText = `${totalRaceLengthLaps} Laps`;
// }

// document.body.oninput = runAllCalcs;
// fuelNeededResultType.addEventListener('click', () => updateFuelNeededDisplay(fuelNeededResultType.checked));

// // Initial call to run all calculations
// runAllCalcs();


