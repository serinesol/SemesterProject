import express, { response } from "express"; // Importing exspress framework for building web applications
import User from "../modules/user.mjs";
import HttpCodes from "../modules/httpCodes.mjs";


const USER_API = express.Router(); // Initializing an instance of the express router

const users = []; // User data storage: empty array

// Function to find a user by ID in your users array or database
function findUserById(userId) {
    return users.find(user => user.id === userId);
}

// TODO: Return user object - https://expressjs.com/en/guide/routing.html
USER_API.get('/:id', (req, res) => { // Fetching users by ID

    const userId = req.params.id; // Extracting the 'id' parameter from the request URL

    const user = findUserById(userId); // Find the user by ID

    if (user) {
        res.json(user); // If user is found, send the user object as the response
    } else {
        res.status(HttpCodes.ClientSideError.NotFound).end(); // If user is not found, send a 404 Not Found status
    }
});

USER_API.post('/', (req, res, next) => { // Creating a new user

    // This is using javascript object destructuring.
    // Recomend reading up https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#syntax
    // https://www.freecodecamp.org/news/javascript-object-destructuring-spread-operator-rest-parameter/
    const { name, email, password } = req.body;

    if (name != "" && email != "" && password != "") { // Checks if the required fields are not empty
        const user = new User();
        user.name = name;
        user.email = email;

        ///TODO: Do not save passwords.
        user.pswHash = password;

        ///TODO: Does the user exist?
        let exists = false;

        if (!exists) {
            users.push(user);
            res.status(HttpCodes.SuccesfullResponse.Ok).end();
        } else {
            res.status(HttpCodes.ClientSideError.BadRequest).end();
        }

    } else {
        res.status(HttpCodes.ClientSideError.BadRequest).send("Mangler data felt").end();
    }

});

USER_API.put('/:id', (req, res) => { // Updating a user
    /// TODO: Edit user
})

USER_API.delete('/:id', (req, res) => { // Deleting ausersRoute user
    /// TODO: Delete user.
})

export default USER_API // Exporting the USER_API, making it available in other parts of the application
