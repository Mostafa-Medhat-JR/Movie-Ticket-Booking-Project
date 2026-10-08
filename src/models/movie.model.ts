import mongoose, { Schema } from "mongoose"



/**
 * @openapi
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - genre
 *         - duration
 *         - description
 *         - posterUrl
 *         - Ratings
 *         - status
 *       properties:
 *         title:
 *           type: string
 *           example: "The Odyssey"
 *         genre:
 *           type: string
 *           example: "Adventure"
 *         duration:
 *           type: string
 *           example: "180 min"
 *         description:
 *           type: string
 *           example: "An epic journey following Odysseus as he struggles to return home."
 *         posterUrl:
 *           type: string
 *           example: "https://example.com/posters/the-odyssey.jpg"
 *         Ratings:
 *           type: number
 *           example: 4.8
 *         status:
 *           type: string
 *           enum:
 *             - Now Showing
 *             - Coming Soon
 *           example: "Now Showing"
 */
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
        type: Number,
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