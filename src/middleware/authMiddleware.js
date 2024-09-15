// require('dotenv').config(); // Add this line at the top of your file

// const jwt = require('jsonwebtoken');

// const protect = (req, res, next) => {
//     const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ success: false, message: 'Not authorized' });
//     }

//     try {
//         // Verify token using the secret from the environment variable
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({ success: false, message: 'Invalid token' });
//     }
// };

// module.exports = protect;
