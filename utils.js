const School = require('./Models/schoolModel');
const User = require('./Models/userModel');

// Save multiple schools to the database
const saveSchools = async (schools) => {
  try {
    await School.insertMany(schools);
    console.log("Schools saved successfully");
  } catch (err) {
    console.error("Error saving schools:", err);
  }
};

// Save a new user and associate them with a school
const saveUser = async (userData) => {
  try {
    // Ensure the email is provided
    if (!userData.email) {
      console.log("Error: Email is required");
      return; // Exit if email is missing
    }

    // Check if the school name is provided
    if (!userData.schoolName) {
      console.log("Error: School name is required");
      return; // Exit if school name is missing
    }

    // Find the school based on the schoolName provided by the user
    let school = await School.findOne({ schoolName: userData.schoolName });

    // If the school doesn't exist, create a new one and save it
    if (!school) {
      console.log("School not found, creating new school...");
      school = new School({
        schoolName: userData.schoolName,  // Ensure schoolName is passed
        graduates: [],
        comments: [],
        images: [],
      });
      await school.save();  // Save the new school
      console.log("New school added:", school.schoolName);
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log("User already exists with email:", userData.email);
      return; // Exit if user with this email already exists
    }

    // Create a new user and associate them with the school
    const newUser = new User({
      name: userData.name,
      schoolName: userData.schoolName,
      email: userData.email,  // Include email here
      graduateYear: userData.graduateYear,
      comment: userData.comment,
      schools: [school._id],  // Use the school's _id to associate it with the user
    });

    // Save the new user to the database
    await newUser.save();
    console.log("User registered successfully");
  } catch (err) {
    console.error("Error saving user:", err);
  }
};

// Find a user by name and populate the 'schools' field with associated school data
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

module.exports = { saveSchools, saveUser, findUserWithSchools };
