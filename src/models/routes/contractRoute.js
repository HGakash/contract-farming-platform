const express = require('express');
const router = express.Router();
const Contract = require('../Contract');

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
router.get('/farmer/contracts', async (req, res) => {
    const arr =  ['675c8ca60e5eaa456329848b','675cc40c8afc51b4158b35ec'];
    
    for(let i = 0;i<arr.length;i++){
        
        let farmerId = arr[i];
             
    try {
        const pendingContracts = await Contract.find({ farmerId, status: 'pending' });
        res.json(pendingContracts);
        if(pendingContracts){
            break;
        }
    } catch (error) {
        console.error('Error fetching contracts:', error);
        res.status(500).json({ error: 'Failed to fetch contracts' });
    }
    
}
});

// Route to accept a contract
router.post('/accept/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedContract = await Contract.findByIdAndUpdate(
            id,
            { status: 'accepted' },
            { new: true }
        );

        if (!updatedContract) {
            return res.status(404).json({ error: 'Contract not found' });
        }

        res.json({ message: 'Contract accepted', contract: updatedContract });
    } catch (error) {
        console.error('Error accepting contract:', error);
        res.status(500).json({ error: 'Failed to accept contract' });
    }
});

// Route to reject a contract
router.post('/reject/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedContract = await Contract.findByIdAndDelete(id);

        if (!deletedContract) {
            return res.status(404).json({ error: 'Contract not found' });
        }

        res.json({ message: 'Contract rejected and deleted', contract: deletedContract });
    } catch (error) {
        console.error('Error rejecting contract:', error);
        res.status(500).json({ error: 'Failed to reject contract' });
    }
});

router.get('/accepted', async (req, res) => {
    try 
      {
        console.log('hitt me');
        const acceptedContracts = await Contract.find({ status: 'accepted' });
        res.json(acceptedContracts);
    } catch (error) {
        console.error('Error fetching accepted contracts:', error);
        res.status(500).json({ error: 'Failed to fetch accepted contracts' });
    }
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Contract = require('../Contract'); // MongoDB model
// const authenticateJWT = require('../../middleware/authenticateJWT');

// // Route to create a new contract
// router.post('/create', async (req, res) => {
//     try {
//         const { farmerId, companyName, contractDetails, startDate, endDate, duration, pricePerUnit } = req.body;

//         const newContract = new Contract({
//             farmerId,
//             companyName,
//             contractDetails,
//             startDate,
//             endDate,
//             duration,
//             pricePerUnit,
//             status: 'pending' // Status set to 'pending' initially
//         });

//         await newContract.save();
//         res.status(201).json({ message: 'Contract created successfully' });
//     } catch (error) {
//         console.error('Error creating contract:', error);
//         res.status(500).json({ error: 'Failed to create contract' });
//     }
// });

// // Fetch all pending contracts for a specific farmer

// router.get('/farmer/contracts', authenticateJWT, async (req, res) => {
//     console.log('pending hitted');
//     const farmerId = '66e7ee8ffd3a73548f47f2b7';  // Retrieved from JWT middleware
//     console.log(farmerId);
//     try {
//         const pendingContracts = await Contract.find({ farmerId, status: 'pending' });
//         res.json(pendingContracts);
//     } catch (error) {
//         console.error('Error fetching contracts:', error);
//         res.status(500).json({ error: 'Failed to fetch contracts' });
//     }
// });

// module.exports = router;


