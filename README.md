# Phone Contact Manager: React, TypeScript & Python
A streamlined contact management solution developed with Pyhton FLask, React and TypeScript that enables users to create, view, modify, and remove contacts.

## Backend
This is a small web application in Flask that accepts contact details. 

### Windows

1. Change the directory to server.
```
$ cd api-server
```
2. Install Python dependencies using a virtual environment. 
```Virtual enviroment modules installation (Windows based systems)
$ virtualenv env
$ .\env\Scripts\activate
$ pip install -r requirements.txt
```
3. Setup the Flask environment
```
$ (Windows CMD) set FLASK_APP=run.py
$ (Windows CMD) set environment=development
```
12. Start the API server (development mode)
```
$ flask run
```
## Frontend
To use the product NodeJS 16.x is required and GIT to clone/download the project from the public repository.

**Step 1** - Clone the repository

```bash
$ cd client
```

**Step #2** - Install dependencies via NPM or yarn

```bash
$ npm i
// OR
$ yarn
```

**Step #3** - Start in development mode

```bash
$ npm run start 
// OR
$ yarn start
```

## Configure the backend server

The product is connected to the flask backend server for requests.

**API Server URL** - `src/config/constant.ts` 

```javascript
const config = {
    ...
    API_SERVER: 'http://localhost:5000'  
};
```
