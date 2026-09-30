import { Router } from "express";
import { auth,authent } from "../middlewares/auth.middleware";
import { checkMovie,showTimeExpiration } from "../middlewares/expirationandstateChecker";
import { signIn,signiUp, getMovies, availableSeats, bookingTicket, getBookingHistory, getShowTimes  } from "../controllers/user.controller";
import { addShowTime,addMovie,editMovie,removeMovie,manageShowTime,deleteShowTime } from "../controllers/admin.controller";


export const adminRouter = Router()


adminRouter.post("/showtimes",authent,auth,addShowTime)
adminRouter.post("/movies",authent,auth,addMovie)
adminRouter.patch("/movies/:movie",authent,auth,editMovie)
adminRouter.delete("/movies/:movie",authent,auth,removeMovie)
adminRouter.patch("/showtimes/:id",authent,auth,manageShowTime)
adminRouter.delete("/showtimes/:id",authent,auth,deleteShowTime)