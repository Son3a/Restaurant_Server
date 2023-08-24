const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
require('dotenv').config();

const authMiddleWare = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer '))
        throw new UnauthenticatedError('Invalid credential!');


    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId, role: payload.role };
        next();
    } catch (error) {
        console.log(error);
        throw new UnauthenticatedError('Invalid credential!');
    }
}

module.exports = authMiddleWare;