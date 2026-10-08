import mongoose, { Schema } from "mongoose"


/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           example: "Jane Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "jane@gmail.com"
 *         password:
 *           type: string
 *           example: "hashedpassword123"
 *         role:
 *           type: string
 *           enum:
 *             - Customer
 *             - Admin
 *           default: Customer
 *           example: Customer
 */
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