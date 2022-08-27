import mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter username."]
    },
    email: {
        type: String,
        required: [true, "Please enter email address."],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter password."]
    },
    role: {
        type: String,
        required: [true, "Please assign role."]
    },
}, {
    timestamps: true
});

export const User = mongoose.model("User", userSchema);