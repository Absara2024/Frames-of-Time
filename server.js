const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require("./db");
const User = require("./User");
const School = require("./SchoolModel");  
const {saveSchools, saveNewSchool, findUserWithSchool } = require("./seed");

const app = express();
const PORT = process.env.PORT || 3025;

connectDB();

app.use(express.json());
app.use(cors());

app.post('/user', async (req, res) => {
  try {
    const { name, email, schoolName, graduateYear, comment } = req.body;
    if (!name || !email || !schoolName || !graduateYear || !comment) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    await saveUser({ name, email, schoolName, graduateYear, comment });
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({ message: 'Error registering user', error: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('schools');
    res.status(200).send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ message: 'Error fetching users', error: error.message });
  }
});

app.post('/save-schools', async (req, res) => {
  const schools = req.body.schools;
  try {
    await saveSchools(schools);
    res.status(201).send({ message: 'Schools saved successfully' });
  } catch (error) {
    console.error('Error saving schools:', error);
    res.status(500).send({ message: 'Error saving schools', error: error.message });
  }
});

app.get('/find-user/:name', async (req, res) => {
  try {
    const userName = req.params.name;
    const user = await findUserWithSchools(userName);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).send({ message: 'Error finding user', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
