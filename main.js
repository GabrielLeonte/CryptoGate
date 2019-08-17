const Express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const helmet = require('helmet');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/db.sqlite3');
const config = require('./config.json');
const utils = require('./utils');


// Initializate Express.JS HTTP Server.
const app = Express();


// Setup Body Parse.
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


// Setup CORS.
app.use(cors());


// Setup Helmet.
app.use(helmet());


// Import HTTP routes.
require('./reqHandle').handle(app);


// Create Default Tables if they not exists.
require('./database/setup').handle(db);


// Listen on configured port the Express.JS HTTP Server.
app.listen(config.servers.http.port, () => {
    utils.print('HTTP Server: Starting HTTP Server...');
    utils.print(`HTTP Server: Successfully started on port ${config.servers.http.port}`);
});