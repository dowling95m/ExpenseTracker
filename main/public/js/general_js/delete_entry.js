// Function to delete a specific entry from the database
function deleteEntry(entryID, tableName) {
    let link = `/delete-${tableName}-ajax/`;  // Generalize API endpoint
    let data = {
        id: entryID
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            deleteRow(entryID, tableName);
        },
        error: function() {
            console.log("Error deleting entry.");
        }
    });
}

// Function to remove the row from the table dynamically
function deleteRow(entryID, tableName) {
    let table = document.getElementById(`${tableName}-table`);  // Generalize table name

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == entryID) {
            table.deleteRow(i);
            break;
        }
    }

    // Also remove the entry from any associated dropdown (if it exists)
    let selectMenu = document.getElementById(`${tableName}-select`);
    if (selectMenu) {
        for (let i = 0; i < selectMenu.options.length; i++) {
            if (selectMenu.options[i].value == entryID) {
                selectMenu.remove(i);
                break;
            }
        }
    }
}
