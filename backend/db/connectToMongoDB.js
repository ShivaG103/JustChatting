import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        .then(() => {
            console.log("connected to mongodb")
        }
        )
    } catch (error) {
        console.log("Error to connecting mongodb", error.message)
    }
}

export default connectToMongoDB;