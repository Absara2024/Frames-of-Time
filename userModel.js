const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  graduates: [{ name: String, year: String }], 
  comments: [{ text: String, timestamp: { type: Date, default: Date.now } }], 
  images: [{ url: String, description: String }] 
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true }, 
  schools: {type: String, required:true},
  graduateYear: { type: String, required: true },
  comment: { type: String, required: true },

});

const User = mongoose.model('User', userSchema);

const school = allSchools => ({
  allSchools1: [
    { name: "walnut school" },
    { name: "Reynoldsburg school" },
    { name: "preckerington school" },
    { name: "eastmoore school" },
    { name: "west school" },
    { name: "jacksington school" },
  ]
});

const graduates = allgraduates => ({
  allgraduates
})
const result = school();
console.log(result.allschools1);


const newUser = new User({
  name: 'isu',
  email: 'absara_2021@yahoo.com',
  graduateYear: '1996',
  comment: 'Hello friends',
  schools: [
    {
      name: 'Keih Bahri Secondary High School',
      graduates: [{ name: 'Absara', year: '1996' }],
      comments: [{ text: 'Great memories!', timestamp: new Date() }],
      images: [
        { url: 'http://example.com/image1.jpg', description: 'Main building of Keih Bahri' },
        { url: 'http://example.com/image2.jpg', description: 'Graduation ceremony photo' }
      ]
    }
  ]
});

newUser.save()
  .then(() => console.log('User and associated schools saved successfully'))
  .catch(err => console.error('Error saving user:', err));

// fetch('http://localhost:3009/your-endpoint', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     name: 'Absara',
//     email: 'absara_2021@yahoo.com',
//     school: 'Keih Bahri Secondary High School',
//     graduateYear: '1996',
//     comment: 'Hello friends',
//   }),
// })
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));

// newUser.save()
//   .then(() => console.log('User saved successfully'))
//   .catch(err => console.error('Error saving user:', err));

module.exports = User;
