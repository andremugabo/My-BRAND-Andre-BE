"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
//FORMAT OF TOKEN
// authorization: Bearer <access_token>
const verifyToken = (req, res, next) => {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token 
        req.myAppToken = bearerToken;
        next();
    }
    else {
        //not authorized 
        res.status(401).json({
            message: "YOUR ARE NOT AUTHORIZED"
        });
    }
};
exports.verifyToken = verifyToken;
