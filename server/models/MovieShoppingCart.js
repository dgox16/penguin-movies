import { Schema, model } from "mongoose";

const movieSCSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

export default model("MovieShoppingCart", movieSCSchema);
