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
    const farmerId = req.farmerId;  // Retrieved from JWT middleware

    try {
        const pendingContracts = await Contract.find({ farmerId, status: 'pending' });
        res.json(pendingContracts);
    } catch (error) {
        console.error('Error fetching contracts:', error);
        res.status(500).json({ error: 'Failed to fetch contracts' });
    }
});

// Accept a contract
router.patch('/contracts/:contractId/accept', authenticateJWT, async (req, res) => {
    const contractId = req.params.contractId;
    const farmerId = req.farmerId;

    try {
        const contract = await Contract.findById(contractId);
        if (!contract) {
            return res.status(404).json({ error: 'Contract not found' });
        }

        if (contract.farmerId.toString() !== farmerId) {
            return res.status(403).json({ error: 'Unauthorized to accept this contract' });
        }

        contract.status = 'accepted';
        await contract.save();

        res.json({ message: 'Contract accepted successfully' });
    } catch (error) {
        console.error('Error accepting contract:', error);
        res.status(500).json({ error: 'Failed to accept contract' });
    }
});

// Reject a contract
router.patch('/contracts/:contractId/reject', authenticateJWT, async (req, res) => {
    const contractId = req.params.contractId;
    const farmerId = req.farmerId;

    try {
        const contract = await Contract.findById(contractId);
        if (!contract) {
            return res.status(404).json({ error: 'Contract not found' });
        }

        if (contract.farmerId.toString() !== farmerId) {
            return res.status(403).json({ error: 'Unauthorized to reject this contract' });
        }

        contract.status = 'rejected';
        await contract.save();

        res.json({ message: 'Contract rejected successfully' });
    } catch (error) {
        console.error('Error rejecting contract:', error);
        res.status(500).json({ error: 'Failed to reject contract' });
    }
});

module.exports = router;


