// const express = require('express');
// const router = express.Router();
// const protect = require('../middleware/authMiddleware');

// // Farmer Dashboard (Protected Route)
// router.get('/dashboard/farmer', protect, (req, res) => {
//     if (req.user.role === 'farmer') {
//         res.send('Welcome to the Farmer Dashboard');
//     } else {
//         res.status(403).send('Access denied');
//     }
// });

// // Dealer Dashboard (Protected Route)
// router.get('/dashboard/dealer', protect, (req, res) => {
//     if (req.user.role === 'dealer') {
//         res.send('Welcome to the Dealer Dashboard');
//     } else {
//         res.status(403).send('Access denied');
//     }
// });

// module.exports = router;