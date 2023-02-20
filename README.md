# Instructions for Running JhaRule!

## 1. The python3 Virtual environment with venv
  
  - The project contains a python3 virtual environment for portability purposes.
  using a virtual environment allows users to run the server application without installing the python modules, packages, verisoning, etc. 

  - In order to run the project properly and have the django/python backend functional, 
  the virtual environment must first be activated.

### Activating the virtual environment 

  - Navigate to the project root folder in a terminal shell
  - On Mac/Linux OS run: `source .venv/bin/activate`
  - On WindowsOS run `.\venv\Scripts\activate`

### Starting the server

  - Navigate to /backend folder within the project root directory
  - on Mac/Linux/Windows OS run: `python3 manage.py makemigrations` 
  - on Mac/Linux/Windows OS run: `python3 manage.py migrate`
  - on Mac/Linux/Windows OS run: `python3 manage.py runserver`

## 2. The react front end

  - in a separate terminal window...
  - Navigate to /frontend folder within project root directory
  - on Mac/Linux/Windows OS run: `npm install`
  - on Mac/Linux/Windows OS run: `npm start`