import mongoose, { Schema } from "mongoose"
import { movieSchema } from "./movie.model"
import { seatsInCinema } from "../controllers/user.controller"

const showtimeSchema = new mongoose.Schema({

    showTimeID:{
        type:Number
    }


    ,
    movie:
    {
        type: movieSchema,
        required: true,
    }
    ,
    hallNo:
    {
        type: Number,
        required: true,
    }
    ,
    date:
    {
        type: Date,
        required: true

    }
    ,
    startTime:
    {
        type: String,
        required: true,
    }
    ,
    endTime:
    {
        type: String,
        required: true,
    }
    ,

    ticketPrice:
    {
        type: Number,
        required: true,
    }

    , totalCapcity:
    {
        type: Number,
        required: true,
    },
    seats:
    {
        type:Map,
        of:Boolean,default: () => new Map(
        seatsInCinema.map(seat => [seat, true])
    )
    }



}, { strict: false })

const ShowTime = mongoose.model("ShowTime", showtimeSchema)

export {ShowTime,showtimeSchema}