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

PORT        = 9164;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/

app.get('/', function(req, res)
    {  
        // let query1 = "SELECT userID, userName, monthlyBudget FROM Users;";    // Define our query

        let query1
        // If there is no query string, we just perform a basic SELECT
        if (req.query.userName === undefined)
            {
                query1 =  "SELECT userID, userName, monthlyBudget FROM Users;";
            }
        
        // If there is a query string, we assume this is a search, and return desired results
        else
        {
            query1 = `SELECT * FROM Users WHERE userName LIKE "%${req.query.userName}%"`;
        }

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    
    });                                                         // received back from the query


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


    /*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});