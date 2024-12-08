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
    let inputDate = document.getElementById("input-date");
    let inputDollarAmount = document.getElementById("input-dollaramount");
    let inputDescription = document.getElementById("input-description");
    let inputPaymentMethod = document.getElementById("input-paymentMethod");
    let inputExpenseCategory = document.getElementById("input-expenseCategory");

    // Get the values from the form fields
    let dateValue = inputDate.value;
    let dollarAmountValue = inputDollarAmount.value;
    let descriptionValue = inputDescription.value;
    let paymentMethodValue = inputPaymentMethod.value;
    let expenseCategoryValue = inputExpenseCategory.value;

    // Validate required fields
    if (!dateValue || !dollarAmountValue || !descriptionValue || !paymentMethodValue || !expenseCategoryValue) {
        alert("Please fill out all fields before submitting.");
        return;
    }

    // Put our data we want to send in a JavaScript object
    let data = {
        date: dateValue,
        dollarAmount: dollarAmountValue,
        description: descriptionValue,
        paymentMethodID: paymentMethodValue,
        expenseCategoryID: expenseCategoryValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-transaction-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            // inputDate.value = '';
            // inputDollarAmount.value = '';
            // inputDescription.value = '';
            // inputPaymentMethod.value = '';
            // inputExpenseCategory.value = '';
            window.location.reload();

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from Transactions
addRowToTable = (data) => {
    // Get a reference to the current table on the page
    let currentTable = document.getElementById("transactions-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Parse the data
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    // Create a row and cells
    let row = document.createElement("TR");
    let dateCell = document.createElement("TD");
    let amountCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");
    let paymentMethodCell = document.createElement("TD");
    let expenseCategoryCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    dateCell.innerText = newRow.date;
    amountCell.innerText = newRow.dollarAmount;
    descriptionCell.innerText = newRow.description;
    paymentMethodCell.innerText = newRow.paymentMethodName; // Assuming API returns the name
    expenseCategoryCell.innerText = newRow.expenseCategoryName; // Assuming API returns the name

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function () {
        deleteTransaction(newRow.transactionID);
    };
    deleteCell.appendChild(deleteButton);

    // Add the cells to the row
    // row.appendChild(dateCell);
    // row.appendChild(amountCell);
    // row.appendChild(descriptionCell);
    // row.appendChild(paymentMethodCell);
    // row.appendChild(expenseCategoryCell);
    // row.appendChild(deleteCell);

    // Add the row to the table
    currentTable.appendChild(row);
};
