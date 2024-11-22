function deleteUser(userID) {
    let link = '/delete-user-ajax/';
    let data = {
      userID: userID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(userID);
      }
    });
  }
  
  function deleteRow(userID){
      let table = document.getElementById("users-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == userID) {
              table.deleteRow(i);
              break;
         }
      }
  }
