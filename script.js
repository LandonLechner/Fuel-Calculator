const raceLengthTimeResult = document.querySelector("#race-length-time-result");
const raceLengthLapsResult = document.querySelector("#race-length-laps-result");
const raceLengthDisplay = document.querySelector("#race-length-display");
const lapTimeDisplay = document.querySelector("#lap-time-display");
const extraFuelText = document.querySelector("#extra-fuel-text");
const table = document.querySelector('tbody');
let extraFuel;

const floatingValueText = [
    { selector: '#race-length-hours-value', unit: 'hour' },
    { selector: '#race-length-minutes-value', unit: 'minute' },
    { selector: '#lap-time-minutes', unit: 'minute' },
    { selector: '#lap-time-seconds', unit: 'second' },
    { selector: '#extra-fuel', unit: '' },
];

function runAllCalcs() {
    let totalRaceLengthLaps = +document.querySelector("#race-length-laps-value").value;  
    extraFuel = +document.querySelector("#extra-fuel").value;
    const fuelPerLapType = document.querySelector("#fuel-per-lap-type").checked;
    raceLengthType = document.querySelector("#race-length-type").checked;
    fuelNeededType = document.querySelector("#fuel-needed-result-type").checked;
    lapTimeMins = +document.querySelector("#lap-time-minutes").value;
    lapTimeSecs = +document.querySelector("#lap-time-seconds").value
    fuelValue = +document.querySelector("#fuel-per-lap-value").value;
    raceLengthHours = +document.querySelector("#race-length-hours-value").value;
    raceLengthMinutes = +document.querySelector("#race-length-minutes-value").value;
    rounding = document.querySelector("#rounding").checked
    
    const totalLapTimeSecs = lapTimeMins * 60 + lapTimeSecs;
    const fuelPerLap = fuelPerLapType ? fuelValue: fuelValue * 3.78541;
    const totalRaceLengthMins = raceLengthHours * 60 + raceLengthMinutes;

    lapTimeDisplay.innerText = `${lapTimeMins}:${lapTimeSecs.toString().padStart(2, '0')}`
    raceLengthDisplay.innerText = `${raceLengthHours}:${raceLengthMinutes.toString().padStart(2, '0')}`;
    raceLengthTimeResult.innerText = `${totalRaceLengthMins} Minutes`;

    extraFuelText.innerHTML = `${extraFuel.toFixed(2)} ${fuelNeededType ? 'Liters' : 'Gallons'}`
     
    if (raceLengthType) {
        //Calculate fuel needed & set race length text laps to laps
        fuelNeeded = fuelPerLap * totalRaceLengthLaps;
        raceLengthLapsResult.innerText = `${totalRaceLengthLaps} Laps`;
        raceLengthTimeResult.innerText = `${totalRaceLengthLaps} Laps`;
    } else {
        //Calculate fuel needed & set race length text mins/sec to laps
        totalRaceLengthLaps = Math.ceil((totalRaceLengthMins * 60) / totalLapTimeSecs);
        fuelNeeded = Math.ceil(totalRaceLengthMins * 60 / totalLapTimeSecs) * fuelPerLap;
        raceLengthLapsResult.innerText = `${totalRaceLengthLaps} Laps`;
    }

    //Set data-fuel atttribute with fuel needed in liters
    table.rows[0].setAttribute('data-fuel', fuelNeeded)
    
    calcLastCell(0, extraFuel);

    const toggleGrayWhiteText = {
        "#results-gallons-text": fuelNeededType,
        "#results-liters-text": !fuelNeededType,
        "#race-length-time-text": raceLengthType,
        "#race-length-laps-text": !raceLengthType,
        "#fuel-per-lap-gallons-text": fuelPerLapType,
        "#fuel-per-lap-liters-text": !fuelPerLapType
    }
    for (const [key, value] of Object.entries(toggleGrayWhiteText)) 
        document.querySelector(key).classList.toggle("color-gray", value);
    //Race time or laps element visibility
    document.querySelector(".lap-time-container").style.display = raceLengthType ? "none" : "block";
    document.querySelector(".race-length-time-elements").style.display = raceLengthType ? "none" : "block";
    document.querySelector(".race-length-laps-elements").style.display = raceLengthType ? "block" : "none";
    
    const localStorageMap = {
        "#race-length-type": raceLengthType,
        "#fuel-needed-result-type": fuelNeededType,
        "#lap-time-minutes": lapTimeMins,
        "#lap-time-seconds": lapTimeSecs,
        "#fuel-per-lap-type": fuelPerLapType,
        "#fuel-per-lap-value": fuelValue,
        "#race-length-hours-value": raceLengthHours,
        "#race-length-minutes-value": raceLengthMinutes,
        "#race-length-laps-value": totalRaceLengthLaps,
        "#rounding": rounding,
        "#extra-fuel": extraFuel
    }
    for (const [key, value] of Object.entries(localStorageMap))
        localStorage.setItem(key, value);
    return extraFuel;
}

function calcLastCell(num, extraFuel) {
    lastCellText = table.rows[num].cells[2];
    fuelConverted = (fuelNeededType ? 1 : 0.264172) * fuelNeeded;
    lastCellFuel = rounding ? Math.ceil(fuelConverted + extraFuel) : (fuelConverted + extraFuel).toFixed(2);
    return lastCellText.innerText = `${lastCellFuel} ${fuelNeededType ? 'Liters' : 'Gallons'}`;
}

function calcFuelOtherRows() {
    runAllCalcs();
    //Loop to Calculate rows 2+
    for (let i = 1; i < table.rows.length; i++) {
        fuelNeeded = +table.rows[i].getAttribute('data-fuel');
        calcLastCell(i, extraFuel);
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
    // const initialRow = table.rows[0];
    const newRow = table.insertRow(1);
    // Copy first two cell's data from the initial row to the new row & add an empty 3rd cell
    for (let i = 0; i < 3; i++) {
        if (i !== 2) newRow.insertCell(i).innerText = table.rows[0].cells[i].innerText;
        if (i === 2) newRow.insertCell(2);
    }
    table.rows[1].setAttribute('data-fuel', +table.rows[0].getAttribute('data-fuel'));
    calcFuelOtherRows();
}

function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
    saveTableToLocalStorage();
}

function initializeH1AuthorBlur() {
    const titleAuthor = ['h1', '.author'];
    titleAuthor.forEach(el => document.querySelector(el).classList.add('no-blur'));
    setTimeout(() => {
        titleAuthor.forEach(el => {
            document.querySelector(el).classList.remove('no-blur');
            document.querySelector(el).classList.add('transition');
        }
    )}, 2000);
}

function showFloatingValue(selector, type) {
    const inputElement = document.querySelector(selector);
    const floatingDiv = document.querySelector(`${selector} ~ div`);
    //Add text to and make div visible
    inputElement.addEventListener('input', (e) => {
        if (e.currentTarget.id !== '#extra-fuel') {
            floatingDiv.textContent = `${Number(e.target.value).toFixed(2)} ${fuelNeededType ? 'Liters' : 'Gallons'}`;
            floatingDiv.style.display = 'block';
        } else {
            floatingDiv.textContent = `${e.target.value} ${type}${e.target.value == 1 ? "" : "s"}`;
            floatingDiv.style.display = 'block';
        }
    });
    //Hide div function
    const hideFloatingValue = () => {
        floatingDiv.style.display = 'none';
    };
    //Perform function on touchend/mouseup
    ['touchend', 'mouseup'].forEach(e => inputElement.addEventListener(e, hideFloatingValue));
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
        "#rounding",
        "#extra-fuel"
    ];
    localStorageItems.forEach(elementId => {
        const savedValue = localStorage.getItem(elementId);
        const element = document.querySelector(elementId);
        if (savedValue !== null && element) {
            if (element.type === 'checkbox') element.checked = (savedValue === 'true');
            if (element.type !== 'checkbox') element.value = savedValue;
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
initializeH1AuthorBlur();

document.querySelector("body").oninput = runAllCalcs;

floatingValueText.forEach(el => showFloatingValue(el.selector, el.unit));

document.querySelector("#add-to-results-button").addEventListener('click', addRow);
document.querySelector("#fuel-needed-result-type").addEventListener('click', calcFuelOtherRows);
document.querySelector("#rounding").addEventListener('click', calcFuelOtherRows);



