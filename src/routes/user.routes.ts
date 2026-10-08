import { Router } from "express";
import { auth,authent } from "../middlewares/auth.middleware";
import { checkMovie,showTimeExpiration } from "../middlewares/expirationandstateChecker";
import { signIn,signiUp, getMovies, availableSeats, bookingTicket, getBookingHistory, getShowTimes  } from "../controllers/user.controller";


export const userRouter = Router()

userRouter.post("/signup",signiUp)
userRouter.post("/login",signIn)
userRouter.get("/movies",authent,getMovies)
userRouter.get("/movies/:movie/showtimes/:id",authent,checkMovie,showTimeExpiration,availableSeats)
userRouter.post("/movies/:movie/showtimes/:id/bookings",authent,checkMovie,showTimeExpiration,bookingTicket)
userRouter.get("/bookings",authent,getBookingHistory)
userRouter.get("/movies/:movie/showtimes",authent,checkMovie,getShowTimes)



