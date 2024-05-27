require('dotenv').config();
const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("db connected");
    } catch (err) {
        console.error("Failed to connect to the database", err);
    }
}

module.exports = main;
