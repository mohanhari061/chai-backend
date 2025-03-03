import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import fs from "fs";

const connectDB = async () => {
    try {
        const connectionInstance=await mongoose.connect("mongodb://localhost:27017/videotube");
        // console.log(connectionInstance.connection.collections);
        // fs.writeFileSync("connectionInstance.txt",JSON.stringify(connectionInstance));
        console.log(`\n MongoDB connected !! DB HOST:${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection Error: ", error);
        process.exit(1);
    }
}

export default connectDB