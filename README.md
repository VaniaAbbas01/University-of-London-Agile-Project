# University-of-London-Agile-Project

#### Directory Structure ####

University-of-London-Agile-Project/
├── node_modules (removed, can be added via installation)
├── public/
|   ├── assets
|   |    ├── calculator.jpeg
|   |    ├── calculator.jpg   
|   |    ├── calculator(1).jpg
|   |    ├── equations.jpg
|   |    ├── equations.png
|   |    ├── graphs.png
|   |    └── scien-calc.jpeg
│   ├── script.js
│   └── style.css
├── routes/
│   ├── notes.js
│   ├── users.js
│   └── wolfram.js
├── views/
│   ├── createNote.ejs
│   ├── editNote.ejs
│   ├── homepage.ejs
│   ├── index.ejs
│   ├── login.ejs
│   └── register.ejs
├── .env
├── database.db (removed, can be added via creating a new database)
├── db_schema.sql
├── index.js
├── package-lock.json
├── package.json
├── README.md (This file)
└── secretkey.js

#### Versions used in this template ####

* NodeJS Version: 22.1.0
* npm Version: 10.7.0
* Sqlite3 Version: 3.41.2
Further information can be found in the `package.json` and `package-lock.json` file.

I suggest using the same versions of Node.js and npm as mentioned above to prevent any compatibility issues. 
Or atleast, ensure you're running Node.js version 16.x and npm version 8.x or higher to avoid potential problems.

## Installation

To get started with the Mathote the note-taking app, follow the steps below:

**Note:** After unzipping, the folder named `University-of-London-Agile-Project` becomes a sub-folder. So, you have two options:

   - Run the parent folder and first type `cd University-of-London-Agile-Project`
   - Or, run just the sub-folder directly

### 1. Install Dependencies

Run the following command to install all necessary dependencies:

```npm install```

### 2. Building the Database

To initialize & create the database, use one of the following commands based on your system:

- For macOS/Linux:

```npm run build-db```

- For Windows:

```npm run build-db-win```

You can also run: 
```npm run clean-db``` to delete the database on Mac or Linux before rebuilding it for a fresh start
```npm run clean-db-win``` to delete the database on Windows before rebuilding it for a fresh start

### 3. Starting the Application

Run ```npm run start``` to start serving the web app (Access via http://localhost:3000)

## Creating an Account

To able to save your notes, you'll need to create an account. There's some authentication process implemented, you can use dummy email and dummy password to set up an account.

## Dependencies

A breakdown of the npm dependencies we have used and their uses in code:

-Project
├── axios@1.7.4 ```HTTP client for making requests.```
├── bcryptjs@2.4.3 ```Hashes passwords securely.```
├── dotenv@16.4.5 ```Loads environment variables.```
├── ejs@3.1.10 ```Templating engine for HTML.```
├── express-session@1.18.0 ```Manages user sessions.```
├── express@4.19.2 ```Web framework for Node.js.```
└── sqlite3@5.1.7 ```SQLite database bindings for Node.js.```

## Additional Libraries

There are no other libraries used beyond what is mentioned in the `package.json` file.

## Running the App

After the initial setup, you should be able to access the application without further need for compilation or additional installations. If you face any problems, make sure that the version requirements for Node.js and npm are met and that all commands are executed in the sub folder that the zip format ends up creating it or just Run the parent folder and first type `cd University-of-London-Agile-Project`.

You should be able to ONLY run ```npm install```, ```npm run build-db```, and ```npm run start``` 

## User Guide

- **Create Note page**: No login is required. Users can type their notes, use equation solver, scientific and graphic calculators.

- **Save, edit or delete notes**: Requires account creation. Users can save multiple notes, edit or delete them.

## Note on the exposed API keys

I understand that the API keys are visible. However, the person reviewing the assignment will need the .env file to run the app on their own computer. The key comes from a client that was made just for this app, so it’s okay and nothing to worry about.