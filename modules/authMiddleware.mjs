const jwt = require('jsonwebtoken');
const { HTTPMethods } = require('./httpConstants.mjs');

const authenticateUser = (req, res, next) => {
    // Authentication logic

    const token = req.headers.authorization;

    if (!token) {
        return res.status(ClientSideError.Unauthorized).json({ message: 'Unauthorized: Missing token' });
    }

    try {
        const decoded = jwt.verify(token, 'yourSecretKey');
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(ClientSideError.Unauthorized).json({ message: 'Unauthorized: Invalid token' });
    }
};

export default authenticateUser;
