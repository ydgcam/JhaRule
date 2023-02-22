# How To: JhaRuler!

## 1. Django Backend Information & Setup
##### (?). Install python3 (Non-Unix or Inexperienced Mac/Windows Users!!)
  - If you are on MacOS or Windows and do not already have python3 installed do so here: https://www.python.org/downloads/
  - Choose any active release for your OS (>= 3.7.x)
  - Click the link for the 64-bit installer of your OS
  - Verify the installation in a new terminal window using `python --version` something like 3.x.x should appear
#### a. Virtual environments
  - This project was created in a virtual environment for portability purposes through the python package 'pipenv.'
  - pipenv creates the files 'Pipfile' and 'Pipfile.lock' much like how 'package.json' and 'package-lock.json' files operate in npm, both allowing users to fetch all required resources for the application with one command.
  - It is imperative for backend functionality to configure and activate the virtual environment.
  - To install pipenv on your machine: from a new terminal window run `pip3 install pipenv` (or `pip install pipenv` on Windows)
#### b. Activating and using the virtual environment 
  - Open a new terminal window if you haven't already.
  - Ensure you have pipenv installed globally on your machine. `pipenv --version`
  - cd into the root level project directory: `yourfilesystempathto/JhaRule/`
  - Once within the `/JhaRule/` directory run the command `pipenv install`
  - After this completes, run `pipenv shell` which will activate the virtual environment!
  - `pipenv shell` must ALWAYS be executed prior to running the project!!!
#### c. Creating the Database
  - Navigate to the `/JhaRule/db/` subfolder.
  - A caveat for the next steps... Mac/Linux users must enter `python3` whereas Windows users just enter `python`
  - Run the commands: `python(3) manage.py migrate`, `python(3) manage.py makemigrations`, and `python(3) manage.py migrate` again.
  - This initializes an SQLite3 database in the project, stages the changes to apply the application's schema, and applies those changes.
  - The server may now be ran and support the application!
#### d. Starting the server
  - To start the server simply run the command `python(3) manage.py runserver` it will be hosted at http://localhost:8000/
  - (Optional) Navigating to the above URL provides a GUI for visualization of and interactivity with the API and it's data.  

## 2. React.js Frontend Information & Setup
#### (?). Install Node.js (Any Inexperienced Users)
  - If you do not have node.js installed do so here: https://nodejs.org/en/download/
  - Find the latest stable release for your OS and click the 64-bit installer link.
  - On any OS, verify the installation in a new terminal window by using `node -v`
#### a. Running the React app
  - Follow step 1. and keep that terminal session running
  - Open a new terminal session in the `JhaRule/frontend` directory
  - On any OS run: `npm install` which will install all dependencies required by the React.js application
  - Next run: `npm start` this starts the React.js app and hosts it at http://localhost:3000/