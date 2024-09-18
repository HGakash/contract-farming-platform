const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./src/models/routes/authRoute');
const farmerRoute = require('./src/models/routes/farmerRoute'); // Import farmer route
const contractRoutes = require('./src/models/routes/contractRoute');
//cross origin
const cors = require('cors');
const path = require('path');

const app = express();

//use cors to allow request from the frontend
app.use(cors());

const PORT = 3000;

// Middleware
app.use(express.json());

//serve static files from public directory
app.use(express.static(path.join(__dirname,'Public')));

//use route for authRoute
app.use('/api', authRoute.router);

// Use farmer routess
app.use('/api/farmers', farmerRoute);

//creating contracts
app.use('/contracts', contractRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contract_farming')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));



// Test route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/Public/index.html'));
});



app.listen(PORT, () => {
  console.log(`server running on the port ${PORT}`);
});
