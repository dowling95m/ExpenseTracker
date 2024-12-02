// Citation for the following file as well as all handlebars and JS files used in the Node JS guide
// Date: 11/21/2024
// Adapted from the guide code, plugged in project specifics and will eventually keep expanding to make it look better
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js

// Get the objects we need to modify
let addTransactionForm = document.getElementById('add-transaction-form-ajax');

// Modify the objects we need
addTransactionForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTransactionAmount = document.getElementById("input-transactionAmount");
    let inputPaymentMethodID = document.getElementById("input-paymentMethodID");
    let inputExpenseCategoryID = document.getElementById("input-expenseCategoryID");

    // Get the values from the form fields
    let transactionAmountValue = inputTransactionAmount.value;
    let paymentMethodIDValue = inputPaymentMethodID.value;
    let expenseCategoryIDValue = inputExpenseCategoryID.value;

    // Put our data we want to send in a javascript object
    let data = {
        transactionAmount: transactionAmountValue,
        paymentMethodID: paymentMethodIDValue,
        expenseCategoryID: expenseCategoryIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-transaction-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input field for another transaction
            inputTransactionAmount.value = '';
            inputPaymentMethodID.value = '';
            inputExpenseCategoryID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// Creates a single row from an Object representing a single record from Transactions
addRowToTable = (data) => {

    // Get a reference to the current table on the page
    let currentTable = document.getElementById("transactions-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let transactionAmountCell = document.createElement("TD");
    let paymentMethodIDCell = document.createElement("TD");
    let expenseCategoryIDCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    transactionAmountCell.innerText = newRow.transactionAmount;
    paymentMethodIDCell.innerText = newRow.paymentMethodID;
    expenseCategoryIDCell.innerText = newRow.expenseCategoryID;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteTransaction(newRow.transactionID);
    };

    // Add the cells to the row 
    row.appendChild(transactionAmountCell);
    row.appendChild(paymentMethodIDCell);
    row.appendChild(expenseCategoryIDCell);
    row.appendChild(deleteCell);

    // Add the row to the table
    currentTable.appendChild(row);
}
