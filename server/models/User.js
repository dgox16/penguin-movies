import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
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
    },
});

userSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.password = undefined;
    },
});

export default model("User", userSchema);
