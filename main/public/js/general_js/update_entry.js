// Get the objects we need to modify
let updateEntryForm = document.getElementById('update-entry-form-ajax');

// Modify the objects we need
updateEntryForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSelect = document.getElementById("mySelect"); // Assuming a select menu for choosing entry
    let inputMonthlyBudget = document.getElementById("input-monthlyBudget-update");

    // Get the values from the form fields
    let entryID = inputSelect.value;
    let valueToUpdate = inputMonthlyBudget.value;

    // Abort if the value is not valid (e.g., not a number)
    if (isNaN(valueToUpdate)) {
        return;
    }

    // Put our data we want to send in a JavaScript object
    let data = {
        id: entryID,
        value: valueToUpdate
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `/put-${tableName}-ajax`, true);  // Generalize API endpoint
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update the row in the table
            updateRow(xhttp.response, entryID, tableName);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// Function to update the row in the table after an entry is updated
function updateRow(data, entryID, tableName) {
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById(`${tableName}-table`);  // Generalize table name

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == entryID) {
            // Get the location of the row where we found the matching entry ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get the td (cell) to update (this can be adjusted based on the data structure)
            let td = updateRowIndex.getElementsByTagName("td")[3]; // Assuming value is in the 4th column

            // Update the cell with the new value
            td.innerHTML = parsedData[0].value;  // Adjust based on response data structure
        }
    }
}
