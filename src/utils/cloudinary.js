import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
    
});

const uploadOnCloudinary= async (path) => {
    try {
        if(!path)return null;
        const response = await cloudinary.uploader
        .upload(
            path, {
                resource_type: 'auto',
            }
        )
    
        // console.log(response);
        // console.log("File uploaded successfully : ",response.url);
        fs.unlinkSync(path);
        return response;
    } catch (error) {
        fs.unlinkSync(path);
        console.error(error);
        return null;
    }
}


export default uploadOnCloudinary;  