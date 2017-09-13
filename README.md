# Median Income Heatmap

This project allows a user to look at heatmaps of median incomes in areas defined by the user using polygon coordinates.  

Currently the project allows a user to set center coordinates and to show a heatmap; though the heatmap is not are accurate at the moment.  The user is able to then save the center coordinates given and load them again at a later point.

The MEAN stack is used in this project along with gulp and browserify helping the build process.

### Set up


 1.  ```git clone https://github.com/tquinlan1992/medianIncomeHeatmap.git```
 2.  Install [NVM](https://github.com/creationix/nvm)
	 1. Within the cloned repository, run ```nvm install```
		 - This will install (or retrieve a local copy) the current node and npm version from the .nvmrc file in the repository
	 2. Within the cloned repository, run ```nvm install```
          - This will install the current node and npm version from the .nvmrc file in the repository
     3. run ```npm install```
           - This will install all the npm packages from the the dependencies found in the package.json in the repository
 3. NPM run scripts
	  - NPM allows you to save scripts in the package.json in the repository within the scripts property
	1. ```npm run build-client```
               - This will build the client public code into ```build/client/public/```
               - ```src/client/public/app/index.html``` is copied into ```build/client/public/app/index.html```
               - The ```src/client/public/app/app.js``` is browserified into ```build/client/public/app/app.js```
               - The ```src/client/public/app/sass/custom/index.scss``` is compiled and minified into ```build/client/public/app/css/custom/index.min.css```
               - ```angular-material.css```, ```animate.css```, and ```font-awesome.css``` are compiled and minified into ```build/client/public/app/css/dependencies/```
               - ```font-awesome``` fonts are compiled and minified into ```build/client/public/app/css/dependencies/```
               - ```src/client/public/app/resourceLanguages``` is copied into ```build/client/public/app/resourceLanguages```

        2. ```npm run watch-build-client```
               - This will build the client and watch for any changes and run necessary build processes to update the build code
        3. ```npm nodemon-client-server```
               - This will run the client server from ```build/client/server.js``` that will server up the client public code to ```http://localhost:3000```.  It gives a environment variable of ```API_SERVER_URL=http://localhost:3000``` that the client app.js can use
        4. ```npm nodemon-client-server-and-watch-build-client```
               - This will run both the ```npm run watch-build-client``` command and the ```nodemon-client-server``` command
        5.  ```nodemon-api-server```
               - This will run the api/mock server defaulting to ```http://localhost:3000```
        6. ```watch-development-environment```
               - This will run both the ```npm run nodemon-client-server-and-watch-build-client``` command and the ```npm run nodemon-api-server``` command
	2. Developers who want to make edits on both the back end and front end are recommended to run    ```npm run watch-development-environment```
    3. To run a sample production environment with a node client server and the node API server, run the command ```npm run production-environment```
               - This will run the client server on port 3001 and the API server on port 3000 ```build/client/public/```
               - Visiting http://localhost:3001 in your browser will bring you to the home page
