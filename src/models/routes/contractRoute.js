const express = require('express');
const router = express.Router();
const Contract = require('../Contract'); // MongoDB model
const authenticateJWT = require('../../middleware/authenticateJWT');

// Route to create a new contract
router.post('/create', async (req, res) => {
    try {
        const { farmerId, companyName, contractDetails, startDate, endDate, duration, pricePerUnit } = req.body;

        const newContract = new Contract({
            farmerId,
            companyName,
            contractDetails,
            startDate,
            endDate,
            duration,
            pricePerUnit,
            status: 'pending' // Status set to 'pending' initially
        });

        await newContract.save();
        res.status(201).json({ message: 'Contract created successfully' });
    } catch (error) {
        console.error('Error creating contract:', error);
        res.status(500).json({ error: 'Failed to create contract' });
    }
});

// Fetch all pending contracts for a specific farmer

router.get('/farmer/contracts', authenticateJWT, async (req, res) => {
    console.log('pending hitted');
    const farmerId = '66e7ee8ffd3a73548f47f2b7';  // Retrieved from JWT middleware
    console.log(farmerId);
    try {
        const pendingContracts = await Contract.find({ farmerId, status: 'pending' });
        res.json(pendingContracts);
    } catch (error) {
        console.error('Error fetching contracts:', error);
        res.status(500).json({ error: 'Failed to fetch contracts' });
    }
});

module.exports = router;


