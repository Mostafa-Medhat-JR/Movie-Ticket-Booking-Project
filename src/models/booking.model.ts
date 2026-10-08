import mongoose, { Schema } from "mongoose"
import { userSchema } from "./user.model"
import { showtimeSchema } from "./showingtime.model"


export const bookingSchema = new mongoose.Schema({
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
        enum:["Pending","Confirmed","Cancelled"],
        default:"Pending"
    }

}, { strict: false })

export const Bookings = mongoose.model("Bookings", bookingSchema)