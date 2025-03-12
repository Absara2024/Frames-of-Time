require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectDB() {
    try {
        
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        
        console.log(error)
        await mongoose.disconnect();
    }
}

module.exports = connectDB