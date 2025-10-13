import { v2 as cloudinary } from "cloudinary";
import { CN_NAME, CN_KEY, CN_SECRET } from "../envConfig.js";

cloudinary.config({
    cloud_name: CN_NAME,
    api_key: CN_KEY,
    api_secret: CN_SECRET,
});

export const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: "penguin_movies",
    });
};

export const deleteImage = async (id) => {
    return await cloudinary.uploader.destroy(id);
};
