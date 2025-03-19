const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require("./db");
const {User, saveSchools, saveUser, findUserWithSchools } = require('./userModel'); // Import methods from usermodel.js

const app = express();
const PORT = 3025;

connectDB(); // This connects to MongoDB

app.use(express.json());
app.use(cors());

// Route to register a new user
app.post('/user', async (req, res) => {
  try {
    const { name, email, schoolName, graduateYear, comment } = req.body;

    if (!name || !email || !schoolName || !graduateYear || !comment) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    // Save user data using the method from usermodel.js
    await saveUser({ name, email, schoolName, graduateYear, comment });

    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({ message: 'Error registering user', error: error.message });
  }
});

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('schools');
    res.status(200).send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ message: 'Error fetching users', error: error.message });
  }
});

// Example usage of the saveSchools function to add schools (can be triggered via some other method)
app.post('/save-schools', async (req, res) => {
  const schools = req.body.schools; // You would send an array of school objects in the request body
  try {
    await saveSchools(schools);
    res.status(201).send({ message: 'Schools saved successfully' });
  } catch (error) {
    console.error('Error saving schools:', error);
    res.status(500).send({ message: 'Error saving schools', error: error.message });
  }
});

// Example endpoint to find a user with schools
app.get('/find-user/:name', async (req, res) => {
  try {
    const userName = req.params.name;
    await findUserWithSchools(userName);
    res.status(200).send({ message: 'User found and populated with schools' });
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).send({ message: 'Error finding user', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
