const mongoose = require("mongoose")
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database Connected'.rainbow);

    } catch (error) {
        console.log('Database not Connected'.bgRed);
    }
}

module.exports = { connectDB }