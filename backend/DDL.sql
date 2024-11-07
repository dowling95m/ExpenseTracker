SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Clears tables from the database
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Workouts;
DROP TABLE IF EXISTS Exercises;
DROP TABLE IF EXISTS WorkoutsExercises;
DROP TABLE IF EXISTS Meals;
DROP TABLE IF EXISTS Progress;


-- Table Structure for 'Users'

CREATE TABLE Users (
    userID INT AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    age INT,
    gender VARCHAR(10) NOT NULL,
    heightFeet FLOAT,
    weightPounds FLOAT,
    activityLevel VARCHAR(20),
    PRIMARY KEY (userID)
);

-- Table Structure for 'Workouts'

CREATE TABLE Workouts (
    workoutID INT AUTO_INCREMENT,
    userID INT NOT NULL,
    workoutStart DATETIME,
    workoutEnd DATETIME,
    workoutType VARCHAR(50) NOT NULL,
    PRIMARY KEY (workoutID),
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

-- Table Structure for 'Exercises'

CREATE TABLE Exercises (
    exerciseID INT AUTO_INCREMENT,
    workoutID INT NOT NULL,
    exerciseType VARCHAR(50),
    exerciseSets INT,
    exerciseStart DATETIME,
    exerciseEnd DATETIME,
    PRIMARY KEY (exerciseID),
    FOREIGN KEY (workoutID) REFERENCES Workouts(workoutID)
);

-- Table Structure for 'WorkoutsExercises'

CREATE TABLE WorkoutsExercises (
    workoutID INT NOT NULL,
    exerciseID INT NOT NULL,
    PRIMARY KEY (workoutID, exerciseID),
    FOREIGN KEY (workoutID) REFERENCES Workouts(workoutID),
    FOREIGN KEY (exerciseID) REFERENCES Exercises(exerciseID)
);

-- Table Structure for 'Meals'
CREATE TABLE Meals (
    mealID INT AUTO_INCREMENT,
    userID INT NOT NULL,
    mealDate DATE,
    mealTime TIME,
    mealType VARCHAR(50),
    calories INT,
    carbsGrams FLOAT,
    fatsGrams FLOAT,
    proteinGrams FLOAT,
    PRIMARY KEY (mealID),
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

-- Table Structure for 'Progress'
CREATE TABLE Progress (
    progressID INT AUTO_INCREMENT,
    userID INT NOT NULL,
    progressDate DATE,
    weightPounds FLOAT,
    consistencyLevel INT,
    PRIMARY KEY (progressID),
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

-- Add the sample data to the database

INSERT INTO Users (userID, firstName, lastName, age, gender, heightFeet, weightPounds, activityLevel)
VALUES
    (1, 'Jerry', 'Jones', 34, 'M', 5.5, 156, 'Active'),
    (2, 'David', 'Brown', 27, 'M', 6.1, 167, 'Somewhat active'),
    (3, 'Jenna', 'Smith', 22, 'F', 4.9, 140, 'Highly active'),
    (4, 'Ana', 'Doe', 31, 'F', 5.8, 124, 'Lightly active');

INSERT INTO Workouts (workoutID, userID, workoutStart, workoutEnd, workoutType)
VALUES
    (1, 1, '2024-10-25 07:00:00', '2024-10-25 08:00:00', 'Cardio'),
    (2, 2, '2024-10-26 18:00:00', '2024-10-26 19:00:00', 'Aerobic'),
    (3, 3, '2024-10-27 07:30:00', '2024-10-27 08:15:00', 'Strength'),
    (4, 4, '2024-10-28 06:00:00', '2024-10-28 06:30:00', 'Flexibility');

INSERT INTO Exercises (exerciseID, workoutID, exerciseType, exerciseSets, exerciseStart, exerciseEnd)
VALUES
    (21, 1, 'Jogging', 2, '2024-10-25 07:00:00', '2024-10-25 07:15:00'),
    (22, 1, 'Running', 3, '2024-10-25 07:20:00', '2024-10-25 08:00:00'),
    (23, 2, 'Jump Rope', 4, '2024-10-26 18:00:00', '2024-10-26 18:30:00'),
    (24, 2, 'Lunges', 3, '2024-10-26 18:35:00', '2024-10-26 19:00:00'),
    (25, 3, 'Push ups', 4, '2024-10-27 07:30:00', '2024-10-27 07:45:00'),
    (26, 3, 'Planks', 4, '2024-10-27 07:50:00', '2024-10-27 08:15:00'),
    (27, 4, 'Leg Stretches', 3, '2024-10-28 06:00:00', '2024-10-28 06:15:00'),
    (28, 4, 'Butterfly pose', 2, '2024-10-28 06:20:00', '2024-10-28 06:30:00');   

INSERT INTO WorkoutsExercises (workoutID, exerciseID)
VALUES 
	(1, 21),
    (1, 22),
    (2, 23),
    (2, 24),
    (3, 25),
    (3, 26),
    (4, 27),
    (4, 28);
    
INSERT INTO Meals (mealID, userID, mealDate, mealTime, mealType, calories, carbsGrams, fatsGrams, proteinGrams)
VALUES
	(1, 2, '2024-10-26', '08:00:00', 'Breakfast', 350, 32, 15, 9),
    (2, 2, '2024-10-26', '02:00:00', 'Lunch', 580, 70, 20, 30),
    (3, 3, '2024-10-27', '08:00:00', 'Breakfast', 400, 55, 23, 15),
    (4, 3, '2024-10-27', '18:30:00', 'Dinner', 750, 90, 30, 40);
    
INSERT INTO Progress (progressID, userID, progressDate, weightPounds, consistencyLevel)
VALUES
	(1, 1, '2024-10-25', 156, 8),
    (2, 3, '2024-10-27', 140, 7),
    (3, 1, '2024-10-30', 154, 8),
    (4, 3, '2024-10-30', 139, 7);



SET FOREIGN_KEY_CHECKS=1;
COMMIT;

