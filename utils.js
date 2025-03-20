const saveSchools = async (schools) => {
  try {
    await School.insertMany(schools);
    console.log("Schools saved successfully");
  } catch (err) {
    console.error("Error saving schools:", err);
  }
};

const saveUser = async (userData) => {
  try {
    // Find the school based on the schoolName provided by the user
    const school = await School.findOne({ name: userData.schoolName }); //FIX: .schoolName is not a field of schoolModel
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

module.exports = {saveSchools, saveUser, findUserWithSchools}