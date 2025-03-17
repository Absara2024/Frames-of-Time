const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, 
  graduates: [{ name: String, year: String }],
  comments: [{ text: String, timestamp: { type: Date, default: Date.now } }],
  images: [{ url: String, description: String }]
});

const School = mongoose.model('School', schoolSchema);

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

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  schools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'School' }],
  graduateYear: { type: String, required: true },
  comment: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

const saveSchools = async () => {
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


const saveUser = async () => {
  try {
    const schoolA = await School.findOne({ name: 'School A' });
    if (schoolA) {
      const newUser = new User({
        name: 'Absara',
        email: 'absara_2021@yahoo.com',
        graduateYear: '1996',
        comment: 'Hello friends',
        schools: [schoolA._id]
      });

      await newUser.save();
      console.log('User and associated schools saved successfully');
    } else {
      console.log('School A not found');
    }
  } catch (err) {
    console.error('Error saving user:', err);
  }
};


const findUserWithSchools = async () => {
  try {
    const user = await User.findOne({ name: 'Absara' }).populate('schools');
    console.log(user);
  } catch (err) {
    console.error('Error finding user with schools:', err);
  }
};

const schoolDetails = {
  names: schools.map(school => school.name),
  graduateYears: schools.flatMap(school => school.graduates.map(graduate => graduate.year)),
  emails: schools.map(school => school.email),
  images: schools.flatMap(school => school.images.map(image => image.url))
};

console.log(schoolDetails);

module.exports = { User, saveSchools, saveUser, findUserWithSchools };
