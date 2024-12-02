// Get the objects we need to modify
let addForm = document.getElementById('add-form-ajax');

// Modify the objects we need
addForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get the table name and endpoint from data attributes on the form
    let tableName = addForm.getAttribute('data-table-name');
    let apiEndpoint = addForm.getAttribute('data-api-endpoint');

    // Collect all input fields dynamically
    let inputs = addForm.querySelectorAll('input');
    let data = {};

    inputs.forEach(input => {
        data[input.name] = input.value; // Use input 'name' attribute as key
    });

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", apiEndpoint, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response, tableName);

            // Clear the input fields for another transaction
            inputs.forEach(input => {
                input.value = '';
            });
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// Creates a single row from an object representing a single record from the table
addRowToTable = (data, tableName) => {

    // Get a reference to the current table on the page
    let currentTable = document.getElementById(`${tableName}-table`);

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    // Create a row and populate cells dynamically
    let row = document.createElement("TR");

    for (let key in newRow) {
        let cell = document.createElement("TD");
        cell.innerText = newRow[key];
        row.appendChild(cell);
    }

    // Create a delete button cell if needed
    let deleteCell = document.createElement("TD");
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function() {
        deleteEntry(tableName, newRow.id); // Adjust to match your primary key logic
    };
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Update dropdowns dynamically if needed
    let selectMenu = document.getElementById(`${tableName}-select`);
    if (selectMenu) {
        let option = document.createElement("option");
        option.text = newRow.name || newRow.id; // Adjust based on table structure
        option.value = newRow.id;
        selectMenu.add(option);
    }
};
