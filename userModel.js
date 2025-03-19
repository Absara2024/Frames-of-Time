const mongoose = require('mongoose');

// Define the School schema
const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  graduates: [{ name: String, year: String }],
  comments: [{ text: String, timestamp: { type: Date, default: Date.now } }],
  images: [{ url: String, description: String }]
});

// Create the School model
const School = mongoose.model('School', schoolSchema);

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  schools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'School' }],
  graduateYear: { type: String, required: true },
  comment: { type: String, required: true }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Save multiple schools to the database
const saveSchools = async (schools) => {
  try {
    for (let schoolData of schools) {
      const school = new School(schoolData);
      await school.save();
    }
    console.log('Schools saved successfully');
  } catch (err) {
    console.error('Error saving schools:', err);
  }
};

// Save a user and associate them with schools
const saveUser = async (userData) => {
  try {
    const school = await School.findOne({ name: userData.schoolName });
    if (!school) {
      console.log('School not found');
      return;
    }

    const newUser = new User({
      name: userData.name,
      email: userData.email,
      graduateYear: userData.graduateYear,
      comment: userData.comment,
      schools: [school._id],
    });

    await newUser.save();
    console.log('User registered successfully');
  } catch (err) {
    console.error('Error saving user:', err);
  }
};

// Find a user with populated school data
const findUserWithSchools = async (userName) => {
  try {
    const user = await User.findOne({ name: userName }).populate('schools');
    console.log(user);
  } catch (err) {
    console.error('Error finding user with schools:', err);
  }
};

// Example data for a new school (for testing purposes)
const newSchool = new School({
  name: 'Keih Bahri Secondary High School',
  graduates: [
    { name: 'Absara', year: '1996' },
    { name: 'Zebib', year: '1997' }
  ],
  comments: [
    { text: 'Great memories!', timestamp: new Date('1996-06-01') },
    { text: 'Amazing teachers!', timestamp: new Date('1997-06-01') }
  ],
  images: [
    { url: 'http://example.com/image1.jpg', description: 'Main building of Keih Bahri' },
    { url: 'http://example.com/image2.jpg', description: 'Graduation ceremony photo' }
  ]
});

// Export models and methods
module.exports = { School, User, saveSchools, saveUser, findUserWithSchools };
