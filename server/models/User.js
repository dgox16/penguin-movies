import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    shoppingCart: {
        type: Schema.Types.ObjectId,
        ref: "ShoppingCart",
        required: true,
    },
});

userSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.password = undefined;
    },
});

export default model("User", userSchema);
