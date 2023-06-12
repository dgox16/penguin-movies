import { Schema, model } from "mongoose";

const moviesSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        url: String,
        public_id: String,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
});

export default model("Movie", moviesSchema);
