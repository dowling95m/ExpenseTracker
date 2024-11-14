-- Group 77 - Team Cool Guys
-- Matthew Dowling & Carter Nelson

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS users_transactions;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS payment_methods;
DROP TABLE IF EXISTS expense_categories;
DROP TABLE IF EXISTS users;

-- Creating users, expense_categories, payment_methods, transactions, and users_transactions tables:
CREATE TABLE Users (
    userID int AUTO_INCREMENT PRIMARY KEY,
    userName varchar(100) NOT NULL,
    monthlyBudget decimal(10,2) NOT NULL
);

CREATE TABLE Expense_categories (
    expenseCategoryID int AUTO_INCREMENT PRIMARY KEY,
    categoryName varchar(100) NOT NULL
);

CREATE TABLE Payment_methods (
    paymentMethodID int AUTO_INCREMENT PRIMARY KEY,
    paymentName varchar(100) NOT NULL
);

CREATE TABLE Transactions (
    transactionID int AUTO_INCREMENT PRIMARY KEY,
    paymentMethodID int,
    expenseCategoryID int NOT NULL,
    dollarAmount decimal(10,2) NOT NULL,
    description varchar(255),
    date datetime NOT NULL,
    FOREIGN KEY (paymentMethodID) REFERENCES payment_methods(paymentMethodID) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (expenseCategoryID) REFERENCES expense_categories(expenseCategoryID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Users_transactions (
    userTransactionID int AUTO_INCREMENT PRIMARY KEY,
    userID int NOT NULL,
    transactionID int NOT NULL,
    percentageShare decimal(10,2),
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (transactionID) REFERENCES transactions(transactionID) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Inserting sample data into all tables
INSERT INTO Users (userName, monthlyBudget) VALUES 
('Alice Johnson', 4500.00),
('Bob Smith', 3000.00),
('Carol White', 5000.00);

INSERT INTO Expense_categories (categoryName) VALUES 
('Rent'),
('Food'),
('Transportation'),
('Utilities'),
('Entertainment');

INSERT INTO Payment_methods (paymentName) VALUES 
('Credit Card'),
('Debit Card'),
('Cash'),
('Bank Transfer');

INSERT INTO Transactions (paymentMethodID, expenseCategoryID, dollarAmount, description, date) VALUES 
(1, 1, 1200.00, 'Monthly rent payment', '2024-10-01 08:00:00'),
(2, 2, 200.00, 'Groceries at supermarket', '2024-10-05 13:30:00'),
(3, 3, 50.00, 'Gasoline refill', '2024-10-10 17:45:00'),
(1, 4, 150.00, 'Electricity bill', '2024-10-12 09:00:00'),
(4, 5, 100.00, 'Movie tickets', '2024-10-15 20:00:00');

INSERT INTO Users_transactions (userID, transactionID, percentageShare) VALUES 
(1, 1, 100.00),
(1, 2, 50.00),
(2, 3, 100.00),
(3, 4, 100.00),
(2, 5, 100.00);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;

