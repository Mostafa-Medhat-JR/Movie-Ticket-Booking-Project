import { Request, Response } from "express"
import { Movie } from "../models/movie.model";
import { ShowTime, showtimeSchema } from "../models/showingtime.model";
import { User } from "../models/user.model";
import { Bookings } from "../models/booking.model";
import jwt from "jsonwebtoken"
import "dotenv/config"
import bcrypt from "bcrypt"


const addMovie = async (req: Request, res: Response) => {
    const movieContent = req.body
    try {
        const movieCreated = await Movie.create(movieContent)
        res.status(201).json({ msg: "the movie has been created sucessfully", movieCreated })
    } catch (err) {
        console.log("there is an error in the server from the addMovie fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })
    }
}

const editMovie = async (req: Request, res: Response) => {

    const movieTitle = req.params.movie as string
    try {
        const chosenMovie = await Movie.findOneAndUpdate({ title: movieTitle }, { $set: req.body }, { new: true, runValidators: true })
        if (!chosenMovie)
            return res.status(404).json({ msg: "we couldnot fount a movie with that title plz enter a valid one" })

        res.status(200).json({ msg: "the moivie has been edited sucessfully ", chosenMovie })
    } catch (err) {
        console.log("there is an error in the server from the editMovie fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })


    }



}

const removeMovie = async (req: Request, res: Response) => {
    try {
        const movieTitle = req.params.movie as string
        const movieToDelete = await Movie.findOneAndDelete({ title: movieTitle })
        if (!movieToDelete)
            return res.status(404).json({ msg: "we couldnot found the movie to delete" })

        res.status(200).json({ msg: "the movie has been deleted sucessfully" })
    } catch (err) {
        console.log("there is an error in the server from the removeMovie in the admin controller fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })



    }
}

const addShowTime = async (req: Request, res: Response) => {

    const showtimeBody = req.body


    try {
         const showtimeId: number = await ShowTime.countDocuments() + 1
        const showTimeCreated = await ShowTime.create({ showTimeID: showtimeId, ...showtimeBody})
        res.status(201).json({ msg: "the show time has been created sucessfully ", showTimeCreated })
    } catch (err) {
        console.log("there is an error in the server from the addShowTime in the admin controller fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })


    }
}

const manageShowTime = async (req: Request, res: Response) => {

    const showTimeId = Number(req.params.id)
    const showTimeBody = req.body

    try {
        const showTimeFound = await ShowTime.findOneAndUpdate({ showTimeID: showTimeId }, { $set: showTimeBody }, {returnDocument: "after" , runValidators: true })

        if (!showTimeFound)
            return res.status(404).json({ msg: "cannot find showTime that no of hallno" })

        res.status(200).json({ msg: "showTime update sucessfully", showTimeFound })
    } catch (err) {

        console.log("there is an error in the server from the manageShowTime in the admin controller fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })


    }

}

const deleteShowTime = async (req: Request, res: Response) => {
    const showTimeId = Number(req.params.id)

    try {
        const showTimeToDelete = await ShowTime.findOneAndDelete({ showTimeID: showTimeId })

        if (!showTimeToDelete)
            res.status(404).json({ msg: "we couldmnot find a showtime with that id :(" })

        res.status(200).json({ msg: "the show time has been deleted sucessfully" })
    } catch (err) {


        console.log("there is an error in the server from the manageShowTime in the admin controller fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })
    }



}

export {addMovie,editMovie,removeMovie,manageShowTime,deleteShowTime,addShowTime}