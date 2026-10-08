import mongoose, { Schema } from "mongoose"
import { movieSchema } from "./movie.model"
import { seatsInCinema } from "../controllers/user.controller"



/**
 * @openapi
 * components:
 *   schemas:
 *     ShowTime:
 *       type: object
 *       required:
 *         - movie
 *         - hallNo
 *         - date
 *         - startTime
 *         - endTime
 *         - ticketPrice
 *         - totalCapcity
 *       properties:
 *         showTimeID:
 *           type: integer
 *           example: 101
 *         movie:
 *           $ref: '#/components/schemas/Movie'
 *         hallNo:
 *           type: integer
 *           example: 2
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-10-15T18:30:00.000Z"
 *         startTime:
 *           type: string
 *           example: "18:30"
 *         endTime:
 *           type: string
 *           example: "21:00"
 *         ticketPrice:
 *           type: number
 *           example: 15.00
 *         totalCapcity:
 *           type: integer
 *           example: 100
 *         seats:
 *           type: object
 *           additionalProperties:
 *             type: boolean
 *           example:
 *             A1: true
 *             A2: true
 *             A3: false
 *             B1: true
 */

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