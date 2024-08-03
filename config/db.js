const mongoose = require("mongoose")
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/Razorpayment`)
        console.log('Database Connected'.rainbow);

    } catch (error) {
        console.log('Database not Connected'.bgRed);
    }
}

module.exports = { connectDB }