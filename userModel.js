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
  email: 'contact@keihbahri.edu',
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

const saveNewSchool = async () => {
  try {
    await newSchool.save();
    console.log('New school saved successfully');
  } catch (err) {
    console.error('Error saving new school:', err);
  }
};

const saveSchools = async (schools) => {
  try {
    const savePromises = schools.map(schoolData => {
      const school = new School(schoolData);
      return school.save();
    });
    await Promise.all(savePromises);
    console.log('Schools saved successfully');
  } catch (err) {
    console.error('Error saving schools:', err);
  }
};

const saveUser = async () => {
  try {
    const schoolA = await School.findOne({ name: 'Keih Bahri Secondary High School' });
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
      console.log('Keih Bahri Secondary High School not found');
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

const schools = [
  { name: "Walute School", email: "contact@walute.edu" },
  { name: "Reynoldsburg School", email: "contact@reynoldsburg.edu" },
  { name: "Pickerington School", email: "contact@pickerington.edu" },
  { name: "Eastmoore School", email: "contact@eastmoore.edu" },
  { name: "West School", email: "contact@west.edu" },
  { name: "Jackington School", email: "contact@jackington.edu" }
];

saveSchools(schools);

const schoolDetails = {
  names: schools.map(school => school.name),
  emails: schools.map(school => school.email)
};

console.log(schoolDetails);

const postUserData = async () => {
  try {
    const response = await fetch('http://localhost:3025/your-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Absara',
        email: 'absara_2021@yahoo.com',
        school: 'Keih Bahri Secondary High School',
        graduateYear: '1996',
        comment: 'Hello friends'
      }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

postUserData();

module.exports = { User, School, saveSchools, saveUser, findUserWithSchools, saveNewSchool };
