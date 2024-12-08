// Citation for the following file as well as all handlebars and JS files used in the Node JS guide
// Date: 11/21/2024
// Adapted from the guide code, plugged in project specifics and will eventually keep expanding to make it look better
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js

// Get the objects we need to modify
let updateUserTransactionForm = document.getElementById('update-user-transaction-form-ajax');

// Modify the objects we need
updateUserTransactionForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUserTransactionID = document.getElementById("mySelectUserTransactionID");
    let inputPercentageShareAmount = document.getElementById("input-percentageShare-update");

    // Get the values from the form fields
    let userTransactionIDValue = inputUserTransactionID.value;
    let percentageShareValue = inputPercentageShareAmount.value;

    // Validate the data
    if (isNaN(userTransactionIDValue) || isNaN(percentageShareValue)) {
        console.log('Invalid input data');
        return;
    }

    // Put our data we want to send in a JavaScript object
    let data = {
        newPercentageShare: percentageShareValue,
        userTransactionID: userTransactionIDValue
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-user-transaction-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // No content means update successful, so reload or modify row
            updateRow(xhttp.response, userTransactionIDValue);
            window.location.reload();
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

function updateRow(data, userTransactionID) {
    let table = document.getElementById("user-transactions-table");

    // Loop through the table rows to find the matching userTransactionID
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == userTransactionID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let td = updateRowIndex.getElementsByTagName("td")[3]; // Assuming percentageShare is in the 4th column (index 3)
            td.innerHTML = data.newPercentageShare;
        }
    }
}
