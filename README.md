# Getting Start

IS5452, Group6, Emotional 3D avatar visualization using sentiment analysis model 

This project was bootstrapped with [IS5452 project](https://github.com/yanbin1992/IS5452_project).

Web: http://www.affective3d.top

## Frontend

In the project directory, you can run:
### `yarn install`

To install the node_modules.

### `cp .env.example .env`

If no .env file, "cp .env.example .env" to add the .env file.
And also need to check and modify [REACT_APP_BASE_URL] as the [http://api.affective3d.top:8080] or [your_backend_url]

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `./script/update.sh` or `./script/newRelease.sh` 

Two scripts in /script folder to help update the web server.

## Backend folder
Please notice that the backend code is in folder /Backend.  
You can download the code and deploy the backend service separately following README.md in the folder.  

## Analysis_model folder
Please notice that the sentiment analysis modeling code is in folder /Analysis_model.  
You can download the code and run the sentiment analysis codes following README.md in the folder.  