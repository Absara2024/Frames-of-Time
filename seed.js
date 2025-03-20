const mongoose = require("mongoose");
const School = require("./Models/schoolModel");
const User = require("./Models/userModel");

// Save multiple schools efficiently
const saveSchools = async (schools) => {
  try {
    await School.insertMany(schools);
    console.log("Schools saved successfully");
  } catch (err) {
    console.error("Error saving schools:", err);
  }
};

// Save a user and associate them with a school
const saveUser = async (userData) => {
  try {
    // Find the school based on the schoolName provided by the user
    const school = await School.findOne({ name: userData.schoolName });
    if (!school) {
      console.log("School not found");
      return;
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log("User already exists with email:", userData.email);
      return;
    }

    // Create a new user and associate them with the school
    const newUser = new User({
      name: userData.name,
      email: userData.email,
      graduateYear: userData.graduateYear,
      comment: userData.comment,
      schools: [school._id], // Associate the school with the user
    });

    // Save the new user to the database
    await newUser.save();
    console.log("User registered successfully");
  } catch (err) {
    console.error("Error saving user:", err);
  }
};

// Find a user with populated school data
const findUserWithSchools = async (userName) => {
  try {
    // Find the user by name and populate the 'schools' field with associated school data
    const user = await User.findOne({ name: userName }).populate("schools");
    if (!user) {
      console.log(`User "${userName}" not found.`);
      return;
    }
    console.log(user);
  } catch (err) {
    console.error("Error finding user with schools:", err);
  }
};

// Example school data for testing
const newSchoolData = {
  name: "Keih Bahri Secondary High School",
  email: "contact@keihbahri.edu", // Added email field to the school model
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

// Save the new school (for testing)
const createNewSchool = async () => {
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

// Execute the seeding operation (Uncomment to use)
createNewSchool();

// Export functions for use in other files (optional)
module.exports = { saveSchools, saveUser, findUserWithSchools };
