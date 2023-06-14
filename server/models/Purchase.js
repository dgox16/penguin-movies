import { Schema, model } from "mongoose";

const purchaseSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        movies: [
            {
                movie: {
                    type: Schema.Types.ObjectId,
                    ref: "Movie",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true },
);

export default model("Purchase", purchaseSchema);
