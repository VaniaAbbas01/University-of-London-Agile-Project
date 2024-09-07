-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Create your tables with SQL commands here (watch out for slight syntactical differences with SQLite vs MySQL)

-- Create the users table if it doesn't already exist
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier for each user
    username TEXT NOT NULL UNIQUE, -- Username must be unique and not null
    pass_word TEXT NOT NULL -- Password must not be null
);

-- Create the emails table if it doesn't already exist
CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier for each email
    email_address TEXT NOT NULL UNIQUE, -- Email address must be unique and not null
    user_id  INTEGER, -- The user that the email account belongs to
    FOREIGN KEY (user_id) REFERENCES users(user_id) -- Foreign key constraint linking to the users table
);

-- Create the content table if it doesn't already exist
CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier for each content entry
    body TEXT NOT NULL, -- Content body must not be null
    user_id  INTEGER, -- The user that the content belongs to
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the content was created, defaults to current time
    FOREIGN KEY (user_id) REFERENCES users(user_id) -- Foreign key constraint linking to the users table
);

COMMIT;