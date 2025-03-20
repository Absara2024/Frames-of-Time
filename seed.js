const mongoose = require('mongoose');
const School = require("./SchoolModel");
const User = require("./User");
const Comment = require("./Comment")

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
    // Check if the school already exists before trying to create it
    const existingSchool = await School.findOne({ email: newSchoolData.email });
    if (existingSchool) {
      console.log(`School with email ${newSchoolData.email} already exists.`);
      return;
    }

    const school = new School(newSchoolData);
    await school.save();
    console.log("New school saved!");
  } catch (err) {
    console.error("Error saving new school:", err);
  }
};
createNewSchool();