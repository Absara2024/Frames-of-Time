const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3012;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/user-registration', {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB', err));

const schoolSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const School = mongoose.model('School', schoolSchema);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  graduateYear: String,
  comment: String,
  schools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'School' }],
});

const User = mongoose.model('User', userSchema);

app.post('/user', async (req, res) => {
  try {
    const { name, email, schoolName, graduateYear, comment } = req.body;

    
    const school = await School.findOne({ name: schoolName });

    if (!school) {
      return res.status(404).send({ message: 'School not found' });
    }


    const newUser = new User({
      name,
      email,
      graduateYear,
      comment,
      schools: [school._id],
    });

    await newUser.save();

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
