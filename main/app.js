// Citation for the following file as well as all handlebars and JS files used in the Node JS guide
// Date: 11/21/2024
// Adapted from the guide code, plugged in project specifics and will eventually keep expanding to make it look better
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js

/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code

// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT        = 9294;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/

// Render index.hbs without any queries
app.get('/', function(req, res) {
    res.render('index');
});

// View Users
app.get('/view_users', function(req, res) {
    let query1;
    if (req.query.userName === undefined) {
        query1 = "SELECT userID, userName, monthlyBudget FROM Users;";
    } else {
        query1 = `SELECT * FROM Users WHERE userName LIKE "%${req.query.userName}%"`;
    }

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        } else {
            res.render('view_users', { data: rows });
        }
    });
});



// View Transactions
app.get('/view_transactions', function(req, res) {
    let query1;
    if (req.query.transactionID === undefined) {
        query1 = "SELECT transactionID, paymentMethodID, expenseCategoryID, dollarAmount, description, date FROM Transactions;";
    } else {
        query1 = `SELECT * FROM Transactions WHERE transactionID LIKE "%${req.query.transactionID}%"`;
    }

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        } else {
            res.render('view_transactions', { data: rows });
        }
    });
});


// View User Transactions
app.get('/user_transactions', function(req, res) {
    let query1;
    if (req.query.userTransactionID === undefined) {
        query1 = "SELECT userTransactionID, userID, transactionID, percentageShare FROM Users_transactions;";
    } else {
        query1 = `SELECT * FROM Users_transactions WHERE userTransactionID LIKE "%${req.query.userTransactionID}%"`;
    }

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        } else {
            res.render('user_transactions', { data: rows });
        }
    });
});

// Manage Expense Categories
app.get('/manage_expense_categories', function(req, res) {
    let query1 = "SELECT expenseCategoryID, categoryName FROM Expense_categories;";
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        } else {
            res.render('manage_expense_categories', { data: rows });
        }
    });
});

// Manage Payment Methods
app.get('/manage_payment_methods', function(req, res) {
    let query1 = "SELECT paymentMethodID, paymentName FROM Payment_methods;";
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        } else {
            res.render('manage_payment_methods', { data: rows });
        }
    });
});

app.post('/add-user-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
        let monthlyBudget = parseInt(data.monthlyBudget);
        if (isNaN(monthlyBudget))
        {
            monthlyBudget = 'NULL'
        }
    
        `INSERT INTO Users (userName, monthlyBudget) VALUES ('${data.userName}', ${data.monthlyBudget})`;
        // Create the query and run it on the database
        query1 = `INSERT INTO Users (userName, monthlyBudget) VALUES ('${data.userName}', ${data.monthlyBudget})`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on bsg_people
                query2 = `SELECT * FROM Users;`;
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });


app.post('/add-expense-category-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let categoryName = data.categoryName;

    let query1 = `INSERT INTO Expense_categories (categoryName) VALUES ('${categoryName}')`;

    // Run the query to add the expense category
    db.pool.query(query1, function(error, rows, fields) {
        // Check for any errors
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // If no error, perform a SELECT * query to fetch all expense categories
            let query2 = `SELECT * FROM Expense_categories`;
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);  // Send back all expense categories
                }
            });
        }
    });
});
    
   
app.post('/add-payment-method-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let paymentName = data.paymentName;

    let query1 = `INSERT INTO Payment_methods (paymentName) VALUES ('${paymentName}')`;

    // Run the query to add the payment method
    db.pool.query(query1, function(error, rows, fields) {
        // Check for any errors
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // If no error, perform a SELECT * query to fetch all payment methods
            let query2 = `SELECT * FROM Payment_methods`;
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);  // Send back all payment methods
                }
            });
        }
    });
});


app.post('/add-transaction-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let paymentMethodID = parseInt(data.paymentMethodID);
    let expenseCategoryID = parseInt(data.expenseCategoryID);
    let dollarAmount = parseFloat(data.dollarAmount);
    let description = data.description;
    let date = data.date;

    let query1 = `INSERT INTO Transactions (paymentMethodID, expenseCategoryID, dollarAmount, description, date) 
                  VALUES (${paymentMethodID}, ${expenseCategoryID}, ${dollarAmount}, '${description}', '${date}')`;

    // Run the query to add the transaction
    db.pool.query(query1, function(error, rows, fields) {
        // Check for any errors
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // If no error, perform a SELECT * query to fetch all transactions
            let query2 = `SELECT * FROM Transactions`;
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);  // Send back all transactions
                }
            });
        }
    });
});


app.post('/add-user-transaction-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let userID = parseInt(data.userID);
    let transactionID = parseInt(data.transactionID);
    let percentageShare = parseFloat(data.percentageShare);

    let query1 = `INSERT INTO Users_transactions (userID, transactionID, percentageShare) 
                  VALUES (${userID}, ${transactionID}, ${percentageShare})`;

    // Run the query to add the user transaction association
    db.pool.query(query1, function(error, rows, fields) {
        // Check for any errors
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // If no error, perform a SELECT * query to fetch all user transactions
            let query2 = `SELECT * FROM Users_transactions`;
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);  // Send back all user transactions
                }
            });
        }
    });
});



app.delete('/delete-user-ajax/', function(req,res,next){
    let data = req.body;
    let userID = parseInt(data.userID);
    let deleteBsg_Cert_People = `DELETE FROM Users_transactions WHERE userID = ?`;
    let deleteBsg_People= `DELETE FROM Users WHERE userID = ?`;
    
    
        // Run the 1st query
        db.pool.query(deleteBsg_Cert_People, [userID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteBsg_People, [userID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }

    })});


app.delete('/delete-expense-category-ajax', function(req, res, next) {
    let data = req.body;
    let expenseCategoryID = parseInt(data.expenseCategoryID);

    // Delete related transactions
    let deleteTransactions = `DELETE FROM Transactions WHERE expenseCategoryID = ?`;
    let deleteExpenseCategory = `DELETE FROM Expense_categories WHERE expenseCategoryID = ?`;

    db.pool.query(deleteTransactions, [expenseCategoryID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Delete the expense category
            db.pool.query(deleteExpenseCategory, [expenseCategoryID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(204); // Successfully deleted
                }
            });
        }
    });
});


    
app.delete('/delete-payment-method-ajax', function(req, res, next) {
    let data = req.body;
    let paymentMethodID = parseInt(data.paymentMethodID);

    // First update transactions to set paymentMethodID to NULL
    let updateTransactions = `UPDATE Transactions SET paymentMethodID = NULL WHERE paymentMethodID = ?`;
    let deletePaymentMethod = `DELETE FROM Payment_methods WHERE paymentMethodID = ?`;

    // Run the first query to update transactions
    db.pool.query(updateTransactions, [paymentMethodID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Run the second query to delete the payment method
            db.pool.query(deletePaymentMethod, [paymentMethodID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(204); // Successfully deleted
                }
            });
        }
    });
});


app.delete('/delete-user-transaction-ajax/', function(req, res, next) {
    let data = req.body;
    let userTransactionID = parseInt(data.userTransactionID);

    if (isNaN(userTransactionID)) {
        console.log("Invalid userTransactionID:", data.userTransactionID);
        res.status(400).send("Invalid userTransactionID");
        return;
    }

    // Delete the specific user-transaction pair
    let deleteUserTransaction = `DELETE FROM Users_transactions WHERE userTransactionID = ?`;

    db.pool.query(deleteUserTransaction, [userTransactionID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); // Bad Request
        } else {
            res.sendStatus(204); // No Content
        }
    });
});


app.delete('/delete-transaction-ajax', function(req, res, next) {
    let data = req.body;
    let transactionID = parseInt(data.transactionID);

    // First delete the user transaction associations in Users_transactions
    let deleteUserTransactionAssoc = `DELETE FROM Users_transactions WHERE transactionID = ?`;
    let deleteTransaction = `DELETE FROM Transactions WHERE transactionID = ?`;

    // Run the first query to delete user transaction associations
    db.pool.query(deleteUserTransactionAssoc, [transactionID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Run the second query to delete the transaction
            db.pool.query(deleteTransaction, [transactionID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(204); // Successfully deleted
                }
            });
        }
    });
});


app.put('/put-user-ajax', function(req,res,next){
    let data = req.body;
    
    let monthlyBudget = parseInt(data.monthlyBudget);
    let user = parseInt(data.userName);
    
    let queryUpdateBudget = `UPDATE Users SET monthlyBudget = ? WHERE Users.userID = ?`;
    // let selectWorld = `SELECT * FROM monthly WHERE id = ?`
    
            // Run the 1st query
            db.pool.query(queryUpdateBudget, [monthlyBudget, user], function(error, rows, fields){
                if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
    
                // If there was no error, we run our second query and return that data so we can use it to update the people's
                // table on the front-end
                // else
                // {
                //     // Run the second query
                //     db.pool.query(selectWorld, [monthlyBudget], function(error, rows, fields) {
    
                //         if (error) {
                //             console.log(error);
                //             res.sendStatus(400);
                //         } else {
                //             res.send(rows);
                //         }
                //     })
                // }
    })});





app.put('/put-expense-category-ajax', function(req, res, next) {
    let data = req.body;

    let expenseCategoryID = parseInt(data.expenseCategoryID);
    let newCategoryName = data.newCategoryName;

    let queryUpdateCategory = `UPDATE Expense_categories SET categoryName = ? WHERE expenseCategoryID = ?`;

    // Run the query to update the expense category name
    db.pool.query(queryUpdateCategory, [newCategoryName, expenseCategoryID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(rows);  // Send back the updated data
        }
    });
});
    


app.put('/put-payment-method-ajax', function(req, res, next) {
    let data = req.body;

    let paymentMethodID = parseInt(data.paymentMethodID);
    let newPaymentName = data.newPaymentName;

    let queryUpdatePaymentMethod = `UPDATE Payment_methods SET paymentName = ? WHERE paymentMethodID = ?`;

    // Run the query to update the payment method name
    db.pool.query(queryUpdatePaymentMethod, [newPaymentName, paymentMethodID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(rows);  // Send back the updated data
        }
    });
});


app.put('/put-transaction-ajax', function(req, res, next) {
    let data = req.body;

    let transactionID = parseInt(data.transactionID);
    let newPaymentMethodID = parseInt(data.newPaymentMethodID);
    let newExpenseCategoryID = parseInt(data.newExpenseCategoryID);
    let newDollarAmount = parseFloat(data.newDollarAmount);
    let newDescription = data.newDescription;
    let newDate = data.newDate;

    let queryUpdateTransaction = `UPDATE Transactions SET paymentMethodID = ?, expenseCategoryID = ?, dollarAmount = ?, description = ?, date = ? WHERE transactionID = ?`;

    // Run the query to update the transaction details
    db.pool.query(queryUpdateTransaction, [newPaymentMethodID, newExpenseCategoryID, newDollarAmount, newDescription, newDate, transactionID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(rows);  // Send back the updated data
        }
    });
});

app.put('/put-user-transaction-ajax', function(req, res, next) {
    let data = req.body;

    // Parse input data
    let newPercentageShare = parseFloat(data.newPercentageShare); // Expecting percentageShare
    let userTransactionID = parseInt(data.userTransactionID); // Expecting userTransactionID

    // Validate the inputs
    if (isNaN(newPercentageShare) || isNaN(userTransactionID)) {
        console.log('Invalid input data:', { newPercentageShare, userTransactionID });
        return res.status(400).send('Invalid input data');
    }

    let queryUpdateUserTransaction = `
        UPDATE Users_transactions
        SET percentageShare = ?
        WHERE userTransactionID = ?
    `;

    // Run the query to update the user transaction
    db.pool.query(queryUpdateUserTransaction, [newPercentageShare, userTransactionID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            return res.status(400).send('Error updating transaction');
        } else {
            res.sendStatus(204);  // No content, successful update
        }
    });
});

    /*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});