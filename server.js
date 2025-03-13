const express = require("express");
const connectDB = require("./db");
const User = require("./userModel"); 
const PORT = 3012;
const app = express();
app.use(express.json());

const searchUsers = async (criteria) => {
  try {
    let query = {};

    if (criteria.name) query.name = new RegExp(criteria.name, 'i');
    if (criteria.email) query.email = new RegExp(criteria.email, 'i');
    if (criteria.school) query['schools.name'] = new RegExp(criteria.school, 'i');
    if (criteria.graduateYear) query.graduateYear = criteria.graduateYear;

    const users = await User.find(query);
    return users;
  } catch (err) {
    console.error('Error searching users:', err);
    throw err;
  }
};

app.post("/user", async (req, res) => {
    try {
        const { name, email, school, graduateYear, comment } = req.body;

        const existingUser = await User.findOne({ name });
        const existingUserByEmail = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ message: "Username already exists" });
        }
        if (existingUserByEmail) {
            return res.status(400).send({ message: "Email already exists" });
        }

        const newUser = new User({ name, email, school, graduateYear, comment });
        await newUser.save();
        
        res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get("/users", async (req, res) => {
    try {
        const { name, email, school, graduateYear } = req.query;

        let query = {};
        
        if (name) query.name = new RegExp(name, 'i');
        if (email) query.email = new RegExp(email, 'i');
        if (school) query['schools.name'] = new RegExp(school, 'i');
        if (graduateYear) query.graduateYear = graduateYear;

        const users = await User.find(query);  
        res.status(200).send(users);  
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.put("/user/:id", async (req, res) => {
    try {
      const { username, password } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { username, password },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

async function startAPI() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Express server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startAPI();
