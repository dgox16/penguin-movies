import { Schema, model } from "mongoose";

const shoppingCartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movies: [
        {
            type: Schema.Types.ObjectId,
            ref: "MovieShoppingCart",
            required: true,
        },
    ],
});

export default model("ShoppingCart", shoppingCartSchema);
