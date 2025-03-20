const School = require("./Models/schoolModel");

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
createNewSchool();
