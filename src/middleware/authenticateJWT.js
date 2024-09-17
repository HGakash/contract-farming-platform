const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, farmer) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }

            req.farmerId = farmer.id; // Extract farmerId from token payload
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
}

module.exports = authenticateJWT;
