const mongoose = require('mongoose');
const School = require("./SchoolModel");
const User = require("./User");

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

const findUserWithSchool = async () => {
  try {
    const user = await User.findOne({ name: 'Absara' }).populate('school');
    console.log('User:', user);
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
  await findUserWithSchool();
  await saveSchools();
};

executeOperations();

module.exports = { School, saveNewSchool, findUserWithSchool };