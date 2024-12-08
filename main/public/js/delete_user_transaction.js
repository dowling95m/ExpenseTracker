// Citation for the following file as well as all handlebars and JS files used in the Node JS guide
// Date: 11/21/2024
// Adapted from the guide code, plugged in project specifics and will eventually keep expanding to make it look better
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js

function deleteUserTransaction(userTransactionID) {
    let link = '/delete-user-transaction-ajax/';
    let data = {
      userTransactionID: userTransactionID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(userTransactionID);
        window.location.reload();
      }
    });
}
  
function deleteRow(userTransactionID){
    let table = document.getElementById("user-transactions-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == userTransactionID) {
              table.deleteRow(i);
              break;
         }
    }
}
