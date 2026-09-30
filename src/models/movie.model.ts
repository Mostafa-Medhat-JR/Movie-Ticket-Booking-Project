import mongoose, { Schema } from "mongoose"


export const movieSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true,
    }
    ,
    genre:
    {
        type: String,
        required: true,
    }
    ,
    duration:
    {
        type: String,
        required: true

    }
    ,
    description:
    {
        type: String,
        required: true,
    }
    ,
    posterUrl:
    {
        type: String,
        required: true,
    }
    ,

    Ratings:
    {
        type: String,
        required: true,
    }

    , status:
    {
        type: String,
        enum: ["Now Showing", "Coming Soon"],
        required: true,
    }








}, { strict: false })

export const Movie = mongoose.model("Movie", movieSchema)