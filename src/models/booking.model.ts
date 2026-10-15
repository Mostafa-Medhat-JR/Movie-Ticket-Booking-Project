import mongoose, { Schema } from "mongoose"
import { userSchema } from "./user.model"
import { showtimeSchema } from "./showingtime.model"


/**
 * @openapi
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - selectedSeats
 *       properties:
 *         customer:
 *           $ref: '#/components/schemas/User'
 *         showtimeId:
 *           type: integer
 *           example: 101
 *         selectedSeats:
 *           type: array
 *           items:
 *             type: string
 *           example: ["A1", "A2", "B1"]
 *         totalPrice:
 *           type: number
 *           example: 45
 *         bookingStatus:
 *           type: string
 *           enum:
 *             - Pending
 *             - Confirmed
 *             - Cancelled
 *           default: Pending
 *           example: Pending
 */

export const bookingSchema = new mongoose.Schema({

    bookingId: { type:Number }
    ,
    customer:
    {
        type: userSchema,

    }
    ,
    showtimeId:
    {
        type: Number,

    }
    ,
    selectedSeats:
    {
        type: [String],
        required: true

    }
    ,
    totalPrice:
    {
        type: Number,

    }
    ,
    bookingStatus:
    {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        default: "Pending"
    }

}, { strict: false })

export const Bookings = mongoose.model("Bookings", bookingSchema)