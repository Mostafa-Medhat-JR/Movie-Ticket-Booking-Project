import mongoose, { Schema } from "mongoose"

export const userSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
    }
    ,
    email:
    {
        type: String,
        required: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address"

    }
    ,
    password:
    {
        type: String,
        required: true

    }
    ,
    role:
    {
        type: String,
        enum: ["Customer", "Admin"],
        required: true,
        default: "Customer"
    }





}, { strict: false })

export const User = mongoose.model("User", userSchema)