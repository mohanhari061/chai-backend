// require('dotenv').config({path:'./env'});
import dotenv from "dotenv";


import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({path:"./.env"});

connectDB()
.then(()=>{
    console.log("MongoDB Connection  successful");
    app.on("error",(error)=>{
        console.log("Error in server setup : ", error);
        throw error;
    })
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
    
})
.catch((error)=>{
    console.error("MongoDB Connection  failed ::->",error);
    process.exit(1);
})



















/*
import express from "express";
const app = express();

;(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}` )
        app.on("error",(error)=>{
            console.log("Error in server setup : ", error);
            throw error;
        })
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error(error);
        throw error;        
    }
})()
*/