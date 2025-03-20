const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require("./db");

const { saveSchools, saveUser, findUserWithSchools } = require('./utils');
const User = require('./Models/userModel');
const School = require("./Models/schoolModel")


const app = express();
const PORT = 3025;

connectDB(); // This connects to MongoDB


app.use(express.json());
app.use(cors());

// Route to register a new user


    // Save user data using the method from seed.js
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
    const users = await User.find()
    if (users.length === 0) {
      return res.status(404).send({ message: 'No users found' });
    }

    // Log the users to check the data structure
    console.log(users);

    res.status(200).send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ message: 'Error fetching users', error: error.message });
  }
});


// other routes
// add a comment to a user
 
=======
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
