-- Query to get all users with their details
SELECT userID, userName, monthlyBudget
FROM Users;

-- Query to get all expense categories
SELECT expenseCategoryID, categoryName
FROM Expense_categories;

-- Query to get all payment methods
SELECT paymentMethodID, paymentName
FROM Payment_methods;

-- Query to get all transactions with transactionID, dollarAmount, date, and associated userID
SELECT t.transactionID, t.dollarAmount, t.date, ut.userID
FROM Transactions t
INNER JOIN Users_transactions ut ON t.transactionID = ut.transactionID;

-- Query to get transactions that match a user input from the search bar
SELECT t.transactionID, t.dollarAmount, t.date, ut.userID
FROM Transactions t
INNER JOIN Users_transaction ut ON t.transactionID = ut.transactionID
WHERE ut.userID = :userIDInput:;

-- Query to get all UserTransaction data
SELECT userTransactionID, userID, transactionID, percentageShare
FROM Users_transactions;

-- Query to add a new user
INSERT INTO Users (userName, monthlyBudget)
VALUES (:userNameInput, :monthlyBudgetInput);

-- Query to add a new expense category
INSERT INTO Expense_categories (categoryName)
VALUES (:categoryNameInput);

-- Query to add a new payment method
INSERT INTO Payment_methods (paymentName)
VALUES (:paymentNameInput);

-- Query to add a new transaction
INSERT INTO Transactions (paymentMethodID, expenseCategoryID, dollarAmount, 
                          description, date)
VALUES (:paymentMethodIDInput, :expenseCategoryIDInput, :dollarAmountInput, 
        :descriptionInput, :dateInput);

-- Query to associate a user with a transaction in the Users_transactions table
INSERT INTO Users_transactions (userID, transactionID, percentageShare)
VALUES (:userIDInput, :transactionIDInput, :percentageShareInput);

-- Query to update a users details (e.g., name and budget)
UPDATE Users
SET userName = :newUserNameInput, 
    monthlyBudget = :newMonthlyBudgetInput
WHERE userID = :userIDInput;

-- Query to update an expense category name
UPDATE Expense_categories
SET categoryName = :newCategoryNameInput
WHERE expenseCategoryID = :expenseCategoryIDInput;

-- Query to update a payment method name
UPDATE Payment_methods
SET paymentName = :newPaymentNameInput
WHERE paymentMethodID = :paymentMethodIDInput;

-- Query to update a transactions details
UPDATE Transactions
SET paymentMethodID = :newPaymentMethodIDInput, 
    expenseCategoryID = :newExpenseCategoryIDInput, 
    dollarAmount = :newDollarAmountInput, 
    description = :newDescriptionInput, 
    date = :newDateInput
WHERE transactionID = :transactionIDInput;

-- Query to update a users transaction association in Users_transactions
UPDATE Users_transactions
SET percentageShare = :newPercentageShareInput
WHERE userID = :userIDInput AND transactionID = :transactionIDInput;

-- Query to delete a user (and remove their associations in Users_transactions)
DELETE FROM Users_transactions
WHERE userID = :userIDInput;

DELETE FROM Users
WHERE userID = :userIDInput;

-- Query to delete an expense category (and set category to NULL in Transactions)
UPDATE Transactions
SET expenseCategoryID = NULL
WHERE expenseCategoryID = :expenseCategoryIDInput;

DELETE FROM Expense_categories
WHERE expenseCategoryID = :expenseCategoryIDInput;

-- Query to delete a payment method (and set payment method to NULL in Transactions)
UPDATE Transactions
SET paymentMethodID = NULL
WHERE paymentMethodID = :paymentMethodIDInput;

DELETE FROM Payment_methods
WHERE paymentMethodID = :paymentMethodIDInput;

-- Query to delete a transaction (and remove associations from Users_transactions)
DELETE FROM Users_transactions
WHERE transactionID = :transactionIDInput;

DELETE FROM Transactions
WHERE transactionID = :transactionIDInput;