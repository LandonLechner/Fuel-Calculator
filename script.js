const toLitersConversion= 3.78541;
const toGallonsConversion = 0.264172;

let totalLapTimeSecs;
let fuelPerLap;
let totalRaceLengthMins;
let totalRaceLengthLaps;

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

const floatingValueText = [
    { selector: '#race-length-hours-value', unit: 'hour' },
    { selector: '#race-length-minutes-value', unit: 'minute' },
    { selector: '#lap-time-minutes', unit: 'minute' },
    { selector: '#lap-time-seconds', unit: 'second' },
];




function initializeH1AuthorBlur () {
    document.querySelector('h1').classList.add('no-blur');
    document.querySelector('.author').classList.add('no-blur');
    setTimeout(() => {
        document.querySelector('h1').classList.remove('no-blur');
        document.querySelector('.author').classList.remove('no-blur');
        document.querySelector('h1').classList.add('transition')
        document.querySelector('.author').classList.add('transition');
    }, 2000);
}

function initializeToggleTexts () {
    raceLengthTimeText.classList.toggle("color-gray", fuelNeededType);
    raceLengthLapsText.classList.toggle("color-gray", !fuelNeededType);
    resultsGallonsText.classList.toggle("color-gray", fuelNeededType);
    resultsLitersText.classList.toggle("color-gray", !fuelNeededType);
}

function runAllCalcs() {
    raceLengthType = document.querySelector("#race-length-type").checked;
    fuelNeededType = document.querySelector("#fuel-needed-result-type").checked;
    calcLapTime();
    calcFuelPerLap();
    calcRaceLengthMins();
    if (raceLengthType) {
        calcRaceLengthLaps2Laps();
        calcFuelTotalFuelNeeded (fuelNeededType, false)
        raceLengthTimeResult.innerText = `${totalRaceLengthLaps} Laps`;
    } else {
        calcRaceLengthLaps();
        calcFuelTotalFuelNeeded (fuelNeededType, true)
    }
    lapTimeElements.style.display = raceLengthType ? "none" : "block";
    raceLengthTimeElements.style.display = raceLengthType ? "none" : "block";
    raceLengthLapsElements.style.display = raceLengthType ? "block" : "none";
    localStorage.setItem("#race-length-type", raceLengthType);
    localStorage.setItem("#fuel-needed-result-type", fuelNeededType);
}

function calcRaceLengthMins () {
    let raceLengthHours = +document.querySelector("#race-length-hours-value").value;
    let raceLengthMinutes = +document.querySelector("#race-length-minutes-value").value;
    totalRaceLengthMins = raceLengthHours * 60 + raceLengthMinutes;
    raceLengthDisplay.innerText = `${raceLengthHours}:${raceLengthMinutes.toString().padStart(2, '0')}`;
    raceLengthTimeResult.innerText = `${totalRaceLengthMins} Minutes`;
    localStorage.setItem("#race-length-hours-value", raceLengthHours);
    localStorage.setItem("#race-length-minutes-value", raceLengthMinutes);
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
    localStorage.setItem("#race-length-laps-value", totalRaceLengthLaps);
    raceLengthLapsResult.innerText = `${totalRaceLengthLaps} Laps`;
    return totalRaceLengthLaps; 
}

function calcLapTime () {
    let lapTimeMins = +document.querySelector("#lap-time-minutes").value;
    let lapTimeSecs = +document.querySelector("#lap-time-seconds").value;
    totalLapTimeSecs = lapTimeMins * 60 + lapTimeSecs;
    lapTimeDisplay.innerText = `${lapTimeMins}:${lapTimeSecs.toString().padStart(2, '0')}`;
    localStorage.setItem("#lap-time-minutes", lapTimeMins);
    localStorage.setItem("#lap-time-seconds", lapTimeSecs);
    return totalLapTimeSecs;
}

function calcFuelPerLap() {
    const fuelPerLapType = document.querySelector("#fuel-per-lap-type").checked;
    const fuelValue = +document.querySelector("#fuel-per-lap-value").value;
    fuelPerLapGallonsText.classList.toggle('color-gray',fuelPerLapType);
    fuelPerLapLitersText.classList.toggle('color-gray',!fuelPerLapType);
    fuelPerLap = fuelPerLapType ? fuelValue * toGallonsConversion : fuelValue;
    localStorage.setItem("#fuel-per-lap-type", fuelPerLapType);
    localStorage.setItem("#fuel-per-lap-value", fuelValue);
    return fuelPerLap;
}

function calcFuelTotalFuelNeeded (fuelNeededType, boolean) {
    const fuelNeeded = boolean ? 
    Math.ceil(totalRaceLengthMins * 60 / totalLapTimeSecs) * fuelPerLap :
    fuelPerLap * totalRaceLengthLaps;

    fuelNeededResult.innerText = `${(fuelNeeded * (fuelNeededType ? toLitersConversion : 1)).toFixed(2)} ${fuelNeededType ? 'Liters' : 'Gallons'}`;
}




function showFloatingValue(selector, type) {
    const inputElement = document.querySelector(selector);
    const floatingDiv = document.querySelector(`${selector} ~ div`);

    inputElement.addEventListener('input', (event) => {
        floatingDiv.textContent = `${event.target.value} ${type}${event.target.value == 1 ? "" : "s"}`;
        floatingDiv.style.display = 'block';
    });

    const hideFloatingValue = () => {
        floatingDiv.style.display = 'none';
    };

    inputElement.addEventListener('touchend', hideFloatingValue);
    inputElement.addEventListener('mouseup', hideFloatingValue);
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
    saveTableToLocalStorage();
}

function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
    saveTableToLocalStorage();
}




function loadPrevValues () {
      loadSavedElementValues([
        "#race-length-hours-value", 
        "#race-length-minutes-value", 
        "#race-length-laps-value", 
        "#fuel-per-lap-value",
        "#lap-time-minutes", 
        "#lap-time-seconds",
        "#race-length-type",
        "#fuel-per-lap-type",
        "#fuel-needed-result-type"
    ]);
};

function loadSavedElementValues(elementIds) {
    elementIds.forEach(elementId => {
        const savedValue = localStorage.getItem(elementId);
        const element = document.querySelector(elementId);
        if (savedValue !== null && element) {
            if (element.type === 'checkbox') {
                element.checked = (savedValue === 'true');
            } else {
                element.value = savedValue;
            }
        }
    });
}

function saveTableToLocalStorage() {
    const table = document.querySelector('.data-table tbody');
    const rows = Array.from(table.rows).slice(1).map(row => { // Exclude the first row
        return Array.from(row.cells).map(cell => cell.innerText);
    });

    // Save table rows to local storage
    localStorage.setItem('tableData', JSON.stringify(rows));
}

function loadTableFromLocalStorage() {
    const savedRows = JSON.parse(localStorage.getItem('tableData'));
    if (savedRows) {
        const table = document.querySelector('.data-table tbody');
        
        // Clear all rows except the first row
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        // Populate table with saved rows
        savedRows.forEach(rowData => {
            const newRow = table.insertRow(); // Insert at the end
            rowData.forEach(cellData => {
                const newCell = newRow.insertCell();
                newCell.innerText = cellData;
            });

            // Add the delete button to the last cell
            const lastCell = newRow.cells[newRow.cells.length - 1];
            lastCell.classList.add("last-cell");
            const deleteButton = document.createElement('div');
            deleteButton.innerHTML = `<img src="delete_icon.png" width="13" height="13">`;
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = function() {
                deleteRow(this);
            };
            lastCell.appendChild(deleteButton);
        });
    }
}




loadPrevValues();
loadTableFromLocalStorage();
runAllCalcs();
initializeToggleTexts();
initializeH1AuthorBlur();

document.querySelector("body").oninput = runAllCalcs;

floatingValueText.forEach(el => showFloatingValue(el.selector, el.unit));

document.querySelector("#fuel-needed-result-type").addEventListener('click', convertLastCells);