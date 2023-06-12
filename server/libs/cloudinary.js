import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "dmxhsnbx6",
    api_key: "915331846591827",
    api_secret: "wmNZ89j46W8umzV2EDBviQASCpc",
});

export const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: "penguin_movies",
    });
};

export const deleteImage = async (id) => {
    return await cloudinary.uploader.destroy(id);
};
