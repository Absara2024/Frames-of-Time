const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, 
  graduates: [{ name: String, year: String }],
  comments: [{ text: String, timestamp: { type: Date, default: Date.now } }],
  images: [{ url: String, description: String }]
});

const School = mongoose.model('School', schoolSchema);


const schools = [
  {
    name: "School A",
    email: "contact@schoola.com",
    graduates: [
      { name: 'Zebib', year: '2020' },
      { name: 'Alex', year: '2021' }
    ],
    images: [
      { url: "https://example.com/school-a-image.jpg", description: "School A Image" }
    ],
    comments: [
      { text: 'Great school!' }
    ]
  },
  {
    name: "School B",
    email: "info@schoolb.com",
    graduates: [
      { name: 'Abdul', year: '2021' },
      { name: 'James', year: '2022' }
    ],
    images: [
      { url: "https://example.com/school-b-image.jpg", description: "School B Image" }
    ],
    comments: [
      { text: 'Nice atmosphere.' }
    ]
  },
  {
    name: "School C",
    email: "hello@schoolc.com",
    graduates: [
      { name: 'Absara', year: '2022' },
      { name: 'Filmon', year: '2023' }
    ],
    images: [
      { url: "https://example.com/school-c-image.jpg", description: "School C Image" }
    ],
    comments: [
      { text: 'Had a great time here!' }
    ]
  }
];

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
