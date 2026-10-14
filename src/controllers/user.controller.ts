import { Request, Response } from "express";
import { Movie } from "../models/movie.model";
import { ShowTime, showtimeSchema } from "../models/showingtime.model";
import { User } from "../models/user.model";
import { Bookings } from "../models/booking.model";
import jwt from "jsonwebtoken"
import "dotenv/config"
import bcrypt from "bcrypt"
import { resolve } from "node:dns";

export const seatsInCinema: string[] = [
    "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12",
    "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12",
    "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12",
    "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12",
    "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12",
    "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
    "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "G12",
    "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "H11", "H12",
    "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10", "I11", "I12",
    "J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10", "J11", "J12"
]


const createToken = (email: string, role: string) => {
    return jwt.sign({
        email, role
    }, process.env.secret as string, { expiresIn: Number(process.env.expirationTime) })


}


const signiUp = async (req: Request, res: Response) => {

    const { name, email, password, role } = req.body

    if (!name || !email || !password)
        return res.status(400).json({ msg: "there is missing data in email or pass or name" })

    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: "email already exsit" })

        }
        const hashedPass = await bcrypt.hash(password, 10)
        const createdUser = await User.create({
            name, email, password: hashedPass, role
        })

        res.status(201).json({ msg: "user created sucessfully" })
    }
    catch (err) {
        console.log("the error in server from signup fn and the error is " + err)
        return res.status(500).json({ msg: "there is an error in the server " })

    }


}


const signIn = async (req: Request, res: Response) => {

    const { name, email, password } = req.body

    if (!email || !password)
        return res.status(400).json({ msg: "there is a missing data in email or password or name" })


    try {

        const user = await User.findOne({ email })


        if (!user)
            return res.status(400).json({ msg: "the user not exsited" })

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch)
            return res.status(400).json({ msg: "the password is wrong" })


        const token = createToken(user.email, user.role)
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: Number(process.env.expirationTime) * 1000,
        })

        res.status(200).json({ msg: "logged in sucessfully" })
    }
    catch (err) {
        console.log("there is an error in the server from the signin fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })
    }


}

const getMovies = async (req: Request, res: Response) => {


    try {
        const movies = await Movie.find()
        res.status(200).json({ msg: "got all movies sucessfully", movies })

    } catch (err) {

        console.log("there is an error in the server from the getmovies fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })
    }



}

const getShowTimes = async (req: Request, res: Response) => {

    const showTimeForMovies = req.params.movie as string
    try {

        //console.log("the movie we got is "+movieFound.title)


        const showTimes = await ShowTime.find({ 'movie.title': showTimeForMovies })
        if (!showTimes)
            return res.status(200).json({ msg: "there is no showtime yet" })

        //console.log("the lenght of the showtime at fn get show times "+showTimes.length)

        const validShowsWeHave = validShows(showTimes)

        if (validShowsWeHave.length === 0)
            return res.status(404).json({ "msg": "no avaliable showtimes for this movie" })

        res.status(200).json({ msg: "got all showTimes sucessfully", validShowsWeHave })

    } catch (err) {

        console.log("there is an error in the server from the getShowTimes fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })
    }

}

const availableSeats = async (req: Request, res: Response) => {

    const showTimeId = Number(req.params.id)

    try {
        const showTimeSelected = await ShowTime.findOne({ showTimeID: showTimeId })

        if (!showTimeSelected)
            return res.status(400).json({ msg: "couldnot showtime pla enter a right hall number" })


        const availableSeats = [...showTimeSelected.seats.entries()]
            .filter(([seat, available]) => available === true)
            .map(([seat]) => seat);


        if (availableSeats.length === 0)
            return res.status(404).json({ msg: "there is no avaliable seats" })


        res.status(200).json({ msg: "got all the availibale seats", availableSeats })

    } catch (err) {


        console.log("there is an error in the server from the avaliableseats fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })
    }





}

const bookingTicket = async (req: Request, res: Response) => {


    const showTimeId = Number(req.params.id)

    try {

        const showTimeSelected = await ShowTime.findOne({ showTimeID: showTimeId })

        if (!showTimeSelected)
            return res.status(400).json({ msg: "couldnot showtime pla enter a right hall number" })


        const token = req.cookies?.token
        if(!token)
            return res.status(404).json({msg:"token not found"})

        const tokenCanBeAcessed = jwt.verify(token, process.env.secret as string) as { email: string, role: string }

        if(!tokenCanBeAcessed)
            return res.status(400).json({msg:"inavlid token"})

        const customerData = await User.findOne({ email: tokenCanBeAcessed.email })
                        

        const selectedSeats = req.body.selectedSeats
        const bookId:number = await ShowTime.countDocuments() + 1

        for (const seat of selectedSeats) {
            if ((!showTimeSelected.seats.get(seat)) || (!seatsInCinema.includes(seat)))
                return res.status(400).json({ msg: "the seats not all are avaliable" })
        }

        for (const seat of selectedSeats) {
            showTimeSelected.seats.set(seat, false)
        }

        let totalPrice: number = selectedSeats.length * showTimeSelected.ticketPrice


        const bookedMovie = await Bookings.create({
            bookingId:bookId,
            customer: customerData
            , showtimeId: Number(showTimeSelected.showTimeID),
            selectedSeats: selectedSeats
            , totalPrice: totalPrice,
            bookingStatus: "Confirmed"
        })
        await showTimeSelected.save();
        res.status(201).json({ msg: "the booking has been sucessfully booked" })

    } catch (err) {

        console.log("there is an error in the server from the bookingTickets fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })
    }




}

const getBookingHistory = async (req: Request, res: Response) => {

    const token = req.cookies?.token as { email: string, role: string }

    if (!token) {
        return res.status(401).json({ msg: "No token found in cookies" });
    }
    try {


        const tokenCanBeAcessed = jwt.verify(req.cookies?.token, process.env.secret as string) as { email: string, role: string }

        const customer = await User.findOne({ email: tokenCanBeAcessed.email })

        if (!customer)
            return res.status(404).json({ msg: "can't find user with this " })

        const bookedShowtimes = await Bookings.find({ 'customer.email': customer.email })

        if (bookedShowtimes.length === 0)
            return res.status(404).json({ msg: "there is no booking for this customer" })

        const secureBooked = bookedShowtimes.map((booking) => ({

            customer: {
                name: booking.customer?.name
            },
            showtimeId: booking.showtimeId,
            selectedSeats: booking.selectedSeats,
            totalPrice: booking.totalPrice,
            bookingStatus: booking.bookingStatus
        }));
        res.status(200).json({ msg: "all the booking u have is ", secureBooked })

    } catch (err) {


        console.log("there is an error in the server from the getBookingHistory fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })
    }



}

const cancelBooking = async(req:Request,res:Response)=>{
    const bookingId = Number(req.params.bookingId)

    try{
        const bookedShow = await Bookings.findOne({bookingId});
        
        if(!bookedShow)
            return res.status(404).json({msg:"booking NOT FOUND :( 404"})

        unbookSeats(res,bookedShow)

        bookedShow.bookingStatus = "Cancelled"
       const updatedBooking =  await bookedShow.save()
       res.status(200).json({msg:"the booking Cancelled Successfully",updatedBooking})

    }
    catch(err){
        console.log("there is an error in the server from the cancelBooking fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })
    }


}

const validShows = (shows: any[]) => {
    const today = new Date();

    const validShowTimes = shows.filter(
        (showTime) => {
            return showTime.date >= today
        }
    );
    return validShowTimes
}

const unbookSeats = async(res:Response,booked:any)=>{

    const showId = booked.showtimeId
    const showTimeBooked = await ShowTime.findOne({showId})

    if(!showTimeBooked)
        return res.status(404).json({msg:"the showtime not found from this booking"})

    for(const seat of booked.selectedSeats){
        showTimeBooked.seats.set(seat,true)
    }



}

export { signIn, signiUp, getMovies, availableSeats, bookingTicket, getBookingHistory, getShowTimes,cancelBooking }


