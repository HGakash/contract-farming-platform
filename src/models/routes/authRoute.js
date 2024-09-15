const express = require('express');
const router = express.Router();
const User = require('../User');
const bcrypt = require('bcrypt');

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password,role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Ensure password and salt rounds are provided
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const saltRounds = 10; // Define salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Pass both password and salt rounds

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    console.log('user Created:',newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//login
router.post('/login', async (req, res) => {
    console.log('Login Request Body:', req.body); // Log the incoming request
  
    const { email, password, role } = req.body;
  
    try {
      const user = await User.findOne({ email, role }); // Check both email and role
      if (!user) {
        return res.status(400).json({ message: 'User not found or role mismatch' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      console.log('User Logged In:', user); // Log user details upon successful login
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Login Error:', error); // Log any errors
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
