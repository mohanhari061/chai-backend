import  {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js";
import User from "../models/user.model.js";
import cloudinary from "cloudinary";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";  


const registerUser=asyncHandler(async(req,res)=>{
   
   // get user details from frontend
   // validation - not empty
   // check if user already exits 
   // check fro images and avatar 
   // upload to cloudinary,  avatar and cover image
   // create user object - create entry in db
   // remove password and refresh token field from response
   // check user for user creation
   // return response to frontend

    const {fullname,email,username,password}=req.body
    // console.log(email);
    console.log(req.body);
    if([fullname,email,username,password].some((field)=>{
        return field?.trim()===""
    })){
        throw new ApiError(400,"Please fill in all fields")
    }


    const existedUser= await User.findOne({
        $or:[
            {email},
            {username}
        ]

    })

    if(existedUser){
        throw new ApiError(409,"User already exists")
    }
    // console.log(req.files);
    const avatarLocalPath=req.files?.avatar[0]?.path
    // const coverImageLocalPath=req.files?.coverImage[0]?.path
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath=req.files.coverImage[0].path
    }


    if(!avatarLocalPath){
        throw new ApiError("400", "Avatar files is required")
    }
        
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if(!avatar){
        throw new ApiError(400,"avatar file required")
    }


    const user=await User.create({
        fullname,
        email,
        username:username.toLowerCase(),
        password,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"something went wrong")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully")
    )
    
})

export {registerUser}