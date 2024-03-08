const jwt = require('jsonwebtoken');
const { HTTPCodes } = require('../modules/httpConstants.mjs');

const authenticateUser = (req, res, next) => {

    const token = req.headers.authorization; // Does the request contain a token?

    if (!token) {
        return res.status(HTTPCodes.ClientSideError.Unauthorized).json({ message: 'Unauthorized: Missing token' });
    }

    try {
        const decoded = jwt.verify(token, 'yourSecretKey');
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(HTTPCodes.ClientSideError.Unauthorized).json({ message: 'Unauthorized: Invalid token' });
    }
    
};

//export default authenticateUser;




//Middlewaret til AT <3
function login(req, res, next) {
    res.status(200).send();
}

export default login;