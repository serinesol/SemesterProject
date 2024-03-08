import 'dotenv/config'
import express from 'express' // Express is installed using npm
import USER_API from './routes/usersRoute.mjs'; // This is where we have defined the API for working with users
import SuperLogger from './modules/SuperLogger.mjs';
import printDeveloperStartupInportantInformationMSG from "./modules/developerHelper.mjs";

printDeveloperStartupInportantInformationMSG();

// Creating an instance of the server
const server = express();
// Selecting a port for the server to use.
const port = (process.env.PORT || 8080); //"process.env.PORT": 
server.set('port', port);

// Enable logging for server
const logger = new SuperLogger();
server.use(logger.createAutoHTTPRequestLogger()); // Will logg all http method requests

// Defining a folder that will contain static files.
server.use(express.static('public'));

// Apply authMiddleware to specific routes
//server.use(authenticateUser); // Apply the authMiddleware to all routes


//Fra workshop AT: her ble det laget en liten middleware, hvordan lytte på endepunktene, her kan det brukes en template
/*
server.get("/login", getLoginRequest());

server.get("req, res, next") => {
    res.status(401).send("<div>Her skulle nå login form ha kommet frem</div>");
});
*/

//Her adder han sitt middleware:
//server.post("/login", login);


// Telling the server to use the USER_API (all urls that uses this code will have to have the /user after the base address)
server.use("/user", USER_API);

// A get request handler example)
server.get("/", (req, res, next) => {
    
    res.status(200).send(JSON.stringify({ msg: "These are not the droids...." })).end();

});

// Start the server 
server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});
