const toLitersConversion= 3.78541;
const toGallonsConversion = 0.264172;

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
const lapTimeElements = document.querySelector(".lap-time-container");

const table = document.querySelector('tbody');

let totalRaceLengthMins;
let totalRaceLengthLaps;

const floatingValueText = [
    { selector: '#race-length-hours-value', unit: 'hour' },
    { selector: '#race-length-minutes-value', unit: 'minute' },
    { selector: '#lap-time-minutes', unit: 'minute' },
    { selector: '#lap-time-seconds', unit: 'second' },
];

function initializeH1AuthorBlur() {
    const titleAuthor = ['h1', '.author'];
    titleAuthor.forEach(el => document.querySelector(el).classList.add('no-blur'));
    setTimeout(() => {
        titleAuthor.forEach(el => document.querySelector(el).classList.remove('no-blur'));
        titleAuthor.forEach(el => document.querySelector(el).classList.add('transition'));
    }, 2000);
}

function initializeToggleTexts() {
    raceLengthTimeText.classList.toggle("color-gray", fuelNeededType);
    raceLengthLapsText.classList.toggle("color-gray", !fuelNeededType);
    resultsGallonsText.classList.toggle("color-gray", fuelNeededType);
    resultsLitersText.classList.toggle("color-gray", !fuelNeededType);
}

function runAllCalcs() {
    raceLengthType = document.querySelector("#race-length-type").checked;
    fuelNeededType = document.querySelector("#fuel-needed-result-type").checked;
    lapTimeMins = +document.querySelector("#lap-time-minutes").value;
    lapTimeSecs = +document.querySelector("#lap-time-seconds").value
    fuelPerLapType = document.querySelector("#fuel-per-lap-type").checked;
    fuelValue = +document.querySelector("#fuel-per-lap-value").value;
    raceLengthHours = +document.querySelector("#race-length-hours-value").value;
    raceLengthMinutes = +document.querySelector("#race-length-minutes-value").value;
    totalRaceLengthLaps = document.querySelector("#race-length-laps-value").value;  
    rounding = document.querySelector("#rounding").checked
    
    calcLapTime();
    calcFuelPerLap();
    calcRaceLengthMins();
    raceLengthType ? calcRaceLengthLaps2Laps() : calcRaceLengthLaps();
    calcFuelFirstRow();
    
    resultsGallonsText.classList.toggle("color-gray", fuelNeededType);
    resultsLitersText.classList.toggle("color-gray", !fuelNeededType);
    fuelPerLapGallonsText.classList.toggle('color-gray',fuelPerLapType);
    fuelPerLapLitersText.classList.toggle('color-gray',!fuelPerLapType); 
    raceLengthTimeText.classList.toggle("color-gray", raceLengthType);
    raceLengthLapsText.classList.toggle("color-gray", !raceLengthType);
    
    lapTimeElements.style.display = raceLengthType ? "none" : "block";
    raceLengthTimeElements.style.display = raceLengthType ? "none" : "block";
    raceLengthLapsElements.style.display = raceLengthType ? "block" : "none";
    
    const localStorageMap = {
        "#race-length-type": raceLengthType,
        "#fuel-needed-result-type": fuelNeededType,
        "#lap-time-minutes": lapTimeMins,
        "#lap-time-seconds": lapTimeSecs,
        "#fuel-per-lap-type": fuelPerLapType,
        "#fuel-per-lap-value": fuelValue,
        "#race-length-hours-value": raceLengthHours,
        "#race-length-minutes-value": raceLengthMinutes,
        "#rounding": rounding        
    }
    for (const [key, value] of Object.entries(localStorageMap)) {
        localStorage.setItem(key, value);
    }
}

function calcLapTime () {
    totalLapTimeSecs = lapTimeMins * 60 + lapTimeSecs;
    lapTimeDisplay.innerText = `${lapTimeMins}:${lapTimeSecs.toString().padStart(2, '0')}`;
    return totalLapTimeSecs;
}

function calcFuelPerLap() {
    fuelPerLap = fuelPerLapType ? fuelValue: fuelValue * toLitersConversion;
    return fuelPerLap;
}

function calcRaceLengthMins () { 
    totalRaceLengthMins = raceLengthHours * 60 + raceLengthMinutes;
    raceLengthDisplay.innerText = `${raceLengthHours}:${raceLengthMinutes.toString().padStart(2, '0')}`;
    raceLengthTimeResult.innerText = `${totalRaceLengthMins} Minutes`;
    return totalRaceLengthMins;
}

function calcRaceLengthLaps() {
    totalRaceLengthLaps = Math.ceil((totalRaceLengthMins * 60) / totalLapTimeSecs);
    raceLengthLapsResult.innerText = `${totalRaceLengthLaps} Laps`;
    fuelNeeded = Math.ceil(totalRaceLengthMins * 60 / totalLapTimeSecs) * fuelPerLap
    return fuelNeeded;
}
    
function calcRaceLengthLaps2Laps () {
    localStorage.setItem("#race-length-laps-value", totalRaceLengthLaps);
    raceLengthLapsResult.innerText = `${totalRaceLengthLaps} Laps`;
    raceLengthTimeResult.innerText = `${totalRaceLengthLaps} Laps`;
    fuelNeeded = fuelPerLap * totalRaceLengthLaps
    return fuelNeeded;
}

function calcLastCell(num) {
    lastCellText = table.rows[num].cells[2];
    fuelConverted = (fuelNeededType ? 1 : toGallonsConversion) * fuelNeeded;
    lastCellFuel = rounding ? Math.ceil(fuelConverted) : fuelConverted.toFixed(2);
    return lastCellText.innerText = `${lastCellFuel} ${fuelNeededType ? 'Liters' : 'Gallons'}`;
}

function calcFuelFirstRow() {
    table.rows[0].setAttribute('data-fuel', fuelNeeded)
    calcLastCell(0);
}

function calcFuelOtherRows() {
    runAllCalcs();
    //Loop to Calculate rows 2+
    for (let i = 1; i < table.rows.length; i++) {
        fuelNeeded = table.rows[i].getAttribute('data-fuel')
        calcLastCell(i);
        //Add Delete icon & functionality
        lastCellText.classList.add("last-cell");
        const deleteButton = document.createElement('div');
        deleteButton.innerHTML = `<img src="delete_icon.png" width="13" height="13">`;
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function() {
            deleteRow(this);
        };
        lastCellText.appendChild(deleteButton);
    }
    saveTableToLocalStorage();
}

function addRow() {
    const table = document.getElementsByTagName('tbody')[0];
    const initialRow = table.rows[0];
    const newRow = table.insertRow(1);
    // Copy first two cell's data from the initial row to the new row 
    for (let i = 0; i < 2; i++) { 
        newRow.insertCell(i).innerText = initialRow.cells[i].innerText;
    }
    newRow.insertCell(2);
    table.rows[1].setAttribute('data-fuel', +table.rows[0].getAttribute('data-fuel'));
    //Perform the actual Calculation & add text/delete icon to cell
    calcFuelOtherRows();
}

function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
    saveTableToLocalStorage();
}

function showFloatingValue(selector, type) {
    const inputElement = document.querySelector(selector);
    const floatingDiv = document.querySelector(`${selector} ~ div`);
    //Add text to and make div visible
    inputElement.addEventListener('input', (event) => {
        floatingDiv.textContent = `${event.target.value} ${type}${event.target.value == 1 ? "" : "s"}`;
        floatingDiv.style.display = 'block';
    });
    //Hide div function
    const hideFloatingValue = () => {
        floatingDiv.style.display = 'none';
    };
    //Perform function on touchend/mouseup
    ['touchend', 'mouseup'].forEach(el => inputElement.addEventListener(el, hideFloatingValue));
}


function saveTableToLocalStorage() {
    const table = document.querySelector('.data-table tbody');
   
    const rows = Array.from(table.rows).slice(1).map(row => {
        const rowData = Array.from(row.cells).map(cell => cell.innerText);
        const dataAttributeValue = row.getAttribute('data-fuel');
        rowData[3] = dataAttributeValue;
        return rowData;
    });
    localStorage.setItem('tableData', JSON.stringify(rows));
}


function loadLocalStorage() {
    const localStorageItems = [
        "#race-length-hours-value", 
        "#race-length-minutes-value", 
        "#race-length-laps-value", 
        "#fuel-per-lap-value",
        "#lap-time-minutes", 
        "#lap-time-seconds",
        "#race-length-type",
        "#fuel-per-lap-type",
        "#fuel-needed-result-type",
        "#rounding"
    ];
    localStorageItems.forEach(elementId => {
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
    //Load table
    const savedRows = JSON.parse(localStorage.getItem('tableData'));
    if (savedRows) {
        const table = document.querySelector('.data-table tbody');
        // Populate table with saved rows
        savedRows.forEach(rowData => {
            const newRow = table.insertRow();
            for (let i = 0; i < 4; i++) {
                if (i !== 3) {
                    const newCell = newRow.insertCell();
                    newCell.innerText = rowData[i];
                } else {
                    newRow.setAttribute('data-fuel', rowData[i])
                }
            }
            //Add Delete icon & functionality   
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

loadLocalStorage();
runAllCalcs();
initializeToggleTexts();
initializeH1AuthorBlur();

document.querySelector("body").oninput = runAllCalcs;

floatingValueText.forEach(el => showFloatingValue(el.selector, el.unit));

document.querySelector("#add-to-results-button").addEventListener('click', addRow);
document.querySelector("#fuel-needed-result-type").addEventListener('click', calcFuelOtherRows);
document.querySelector("#rounding").addEventListener('click', calcFuelOtherRows);