const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:3025/schoolsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  graduates: [{ name: String, year: String }],
  comments: [{ text: String, timestamp: { type: Date, default: Date.now } }],
  images: [{ url: String, description: String }]
});

const School = mongoose.model('School', schoolSchema);

// User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  graduateYear: { type: String, required: true },
  comment: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

const saveNewSchool = async () => {
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

  try {
    await newSchool.save();
    console.log('School saved successfully');
  } catch (err) {
    console.error('Error saving school:', err);
  }
};

const saveUser = async () => {
  try {
    const school = await School.findOne({ name: 'Keih Bahri Secondary High School' });

    if (school) {
      const newUser = new User({
        name: 'Absara',
        email: 'absara_2021@yahoo.com',
        school: school._id,
        graduateYear: '1996',
        comment: 'Hello friends'
      });

      await newUser.save();
      console.log('User and associated school saved successfully');
    } else {
      console.log('School not found!');
    }
  } catch (err) {
    console.error('Error saving user:', err);
  }
};

const findUserWithSchool = async () => {
  try {
    const user = await User.findOne({ name: 'Absara' }).populate('school');
    console.log(user);
  } catch (err) {
    console.error('Error finding user with school:', err);
  }
};

const saveSchools = async () => {
  const schoolsData = [
    {
      name: "Walute School",
      graduates: [{ name: "Zebib", year: "1996" }, { name: "Absara", year: "1997" }],
      images: [{ url: "http://example.com/image1.jpg", description: "Building A" }]
    },
    {
      name: "Reynoldsburg School",
      graduates: [{ name: "John", year: "1995" }, { name: "Sam", year: "1998" }],
      images: [{ url: "http://example.com/image2.jpg", description: "Classroom" }]
    },
    {
      name: "Pickerington School",
      graduates: [{ name: "Tom", year: "1994" }, { name: "Jill", year: "1996" }],
      images: [{ url: "http://example.com/image3.jpg", description: "Graduation" }]
    }
  ];

  try {
    const savePromises = schoolsData.map(schoolData => {
      const school = new School(schoolData);
      return school.save();
    });

    await Promise.all(savePromises);
    console.log('Schools saved successfully');
  } catch (err) {
    console.error('Error saving schools:', err);
  }
};

const executeOperations = async () => {
  await saveNewSchool();
  await saveUser();
  await findUserWithSchool();
  await saveSchools();
};

executeOperations();

module.exports = { School, User };
