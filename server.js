const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./src/models/routes/authRoute');
const farmerRoute = require('./src/models/routes/farmerRoute'); // Import farmer route

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

//use route
app.use('/api', authRoute.router);

// Use farmer routess
app.use('/api/farmers', farmerRoute);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contract_farming')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

//auth route

// Test route
app.get('/', (req, res) => {
  res.send('API is working!');
});

app.listen(PORT, () => {
  console.log(`server running on the port ${PORT}`);
});
