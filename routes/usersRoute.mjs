import express from "express";
import User from "../modules/user.mjs";
import { HTTPCodes } from "../modules/httpConstants.mjs";
import SuperLogger from "../modules/SuperLogger.mjs";
//import createHmac from "../modules/crypto.mjs";



const USER_API = express.Router();
USER_API.use(express.json()); // This makes it so that express parses all incoming payloads as JSON for this route.

const users = [];

USER_API.get('/', (req, res, next) => {
    SuperLogger.log("Demo of logging tool");
    SuperLogger.log("A important msg", SuperLogger.LOGGING_LEVELS.CRTICAL);
})

USER_API.get('/:id', (req, res, next) => {

    // Tip: All the information you need to get the id part of the request can be found in the documentation 
    // https://expressjs.com/en/guide/routing.html (Route parameters)

    if (User) {
        res.status(HTTPCodes.SuccesfullResponse.Ok).json(User);
    } else {
        res.status(HTTPCodes.ClientSideError.NotFound).end();
    }

    /// TODO: 
    // Return user object
})

USER_API.post('/', async (req, res, next) => {

    // This is using javascript object destructuring.
    // Recomend reading up https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#syntax
    // https://www.freecodecamp.org/news/javascript-object-destructuring-spread-operator-rest-parameter/
    const { name, pswHash, email } = req.body;

    if (name != "" && pswHash != "" && email != "") {
        let user = new User();
        user.name = name;
        user.pswHash = pswHash; //TODO: Do not save passwords.
        user.email = email;

        ///TODO: Does the user exist?
        let exists = false;

        if (!exists) { // This needs to go into a database.

            // "const statment = ``"

            user = await user.save();
            res.status(HTTPCodes.SuccesfullResponse.Ok).json(JSON.stringify(user)).end();
        } else {
            res.status(HTTPCodes.ClientSideError.BadRequest).end();
        }

    } else {
        res.status(HTTPCodes.ClientSideError.BadRequest).send("Mangler data felt").end();
    }

});

USER_API.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    console.log("Received login request with username:", username, "and password:", password);

    // Find the user in your database or user list
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Authentication successful
        res.status(HTTPCodes.SuccesfullResponse.Ok).json({ message: 'Login successful', user });
    } else {
        // Authentication failed
        res.status(HTTPCodes.ClientSideError.Unauthorized).json({ message: 'Login failed: Invalid username or password' });
    }
});

USER_API.put('/:id', (req, res, next) => {
    /// TODO: Edit user

    const user = new User(); //TODO: The user info comes as part of the request 
    user.save();

    const userId = req.params.id;
    const updatedData = req.body;

    // Find the user with the specified id
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        // Update user data
        Object.assign(users[userIndex], updatedData);
        res.status(HTTPCodes.SuccesfullResponse.Ok).end();
    } else {
        res.status(HTTPCodes.ClientSideError.NotFound).end();
    }

})

USER_API.delete('/:id', (req, res) => {
    /// TODO: Delete user

    const user = new User(); //TODO: Actual user
    user.delete();

    const userId = req.params.id;

    // Find the user with the specified id
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        // Remove the user from the array
        users.splice(userIndex, 1);
        res.status(HTTPCodes.SuccesfullResponse.Ok).end();
    } else {
        res.status(HTTPCodes.ClientSideError.NotFound).end();
    }
})

export default USER_API
