import mongoose from 'mongoose'
import 'dotenv/config'

try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongoDB connected");
} catch (error) {
    console.log("failed to connect mongoDB", error);
}
