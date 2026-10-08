import { NextFunction, Request, Response } from "express";
import { ShowTime } from "../models/showingtime.model";
import "dotenv/config"
import { Movie } from "../models/movie.model";


const showTimeExpiration = async (req: Request, res: Response, next: NextFunction) => {

    const showTimeSelected = Number(req.params.id)
    try {
        const show = await ShowTime.findOne({ showTimeID: showTimeSelected })
        if (!show)
            return res.status(404).json({ msg: "there is no show time with this id" })


        if (!validShows(show))
            return res.status(404).json({ msg: "date of the showtime has expired" })

        next()
    } catch (err) {

        console.log("there is an error in the server from the showTimeExpiration fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })
    }



}


const checkMovie = async (req: Request, res: Response, next: NextFunction) => {


    try {
        const movieName = req.params.movie as string
        const selectedMovie = await Movie.findOne({ title: movieName })

        if (!selectedMovie)
            return res.status(404).json({ msg: "movie not found" })

        if (selectedMovie.status === "Coming Soon")
            return res.status(400).json({ msg: "the movie is Coming Soon not Avaliable yet" })

        next()

    } catch (err) {

        console.log("there is an error in the server from the checkMovie fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })
    }



}

const validShows = (show: any) => {
    const today = new Date();
    return show.date >= today

}


export { showTimeExpiration, checkMovie }