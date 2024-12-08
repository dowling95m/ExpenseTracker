// Citation for the following file as well as all handlebars and JS files used in the Node JS guide
// Date: 11/21/2024
// Adapted from the guide code, plugged in project specifics and will eventually keep expanding to make it look better
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js

// Get the objects we need to modify
let updateTransactionForm = document.getElementById('update-transaction-form-ajax');

// Modify the objects we need
updateTransactionForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTransactionDate = document.getElementById("input-transaction-date-update");

    // let inputPaymemtMethod = document.getElementById("input-paymentMethod");
    // let inputExpenseCategory = document.getElementById("input-expenseCategory");

    // Get the values from the form fields
    let transactionDateValue = inputTransactionDate.value;
    // let paymentMethodValue = inputPaymemtMethod.value;
    // let expenseCategoryValue = inputExpenseCategory.value

    // Put our data we want to send in a javascript object
    let data = {
        transactionDate: transactionDateValue,
        // paymentMethodID: paymentMethodValue,
        // expenseCategoryID: expenseCategoryValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-transaction-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(xhttp.response, transactionDateValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

function updateRow(data, transactionID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("transactions-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == transactionID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let td = updateRowIndex.getElementsByTagName("td")[3];
            td.innerHTML = parsedData[0].transactionDate; 
       }
    }
}
