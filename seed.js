const mongoose = require('mongoose');
const School = require("./Models/schoolModel");


const newSchoolData = {
  schoolName: "Keih Bahri Secondary High School",
  graduates: [
    { name: "Absara", year: "1996" },
    { name: "Zebib", year: "1997" },
  ],
  comments: [
    { text: "Great memories!", timestamp: new Date("1996-06-01") },
    { text: "Amazing teachers!", timestamp: new Date("1997-06-01") },
  ],
  images: [
    { url: "http://example.com/image1.jpg", description: "Main building of Keih Bahri" },
    { url: "http://example.com/image2.jpg", description: "Graduation ceremony photo" },
  ],
};

const createNewSchool = async () => {
  try {
    // Check if the school already exists based on schoolName (not email)
    const existingSchool = await School.findOne({ schoolName: newSchoolData.schoolName });
    
    if (existingSchool) {
      console.log(`School with name ${newSchoolData.schoolName} already exists.`);
      return;
    }

    // If the school doesn't exist, create a new school
    const school = new School(newSchoolData);
    await school.save();
    console.log("New school saved!");
  } catch (err) {
    console.error("Error saving new school:", err);
  }
};

createNewSchool();
