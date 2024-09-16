const express = require('express');
const Farmer = require('../farmer'); // Import Farmer model
const router = express.Router();
// const { verifyToken } = require('./authRoute'); // Import verifyToken middleware

// Register Farmer Route
router.post('/', async (req, res, next) => {
      // Apply the middleware here
    console.log('farmer route is hitting');
    const { name, email, location, produce, experience, contact } = req.body;
    try {
        const newFarmer = new Farmer({ name, email, location, produce, experience, contact });
        await newFarmer.save();
        res.status(201).json({ message: 'Farmer registered successfully' });
    } catch (error) {
        console.error('Error registering farmer:', error);
        res.status(500).json({ message: 'Error registering farmer' });
    }
});

router.get('/', async (req, res) => {
    try {
        const farmers = await Farmer.find({});
        res.status(200).json(farmers);
    } catch (error) {
        console.error('Error fetching farmers:', error);
        res.status(500).json({ message: 'Error fetching farmers' });
    }
});


module.exports = router;