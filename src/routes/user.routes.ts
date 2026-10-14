import { Router } from "express";
import { auth,authent } from "../middlewares/auth.middleware";
import { checkMovie,showTimeExpiration } from "../middlewares/expirationandstateChecker";
import { signIn,signiUp, getMovies, availableSeats, bookingTicket, getBookingHistory, getShowTimes, cancelBooking  } from "../controllers/user.controller";


export const userRouter = Router()


/**
 * @openapi
 * /user/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input or user already exists
 */

userRouter.post("/signup",signiUp)

/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: Log in an existing user
 *     tags:
 *       - User - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User successfully authenticated (Cookie set)
 *       401:
 *         description: Invalid credentials
 */

userRouter.post("/login",signIn)

/**
 * @openapi
 * /user/movies:
 *   get:
 *     summary: Get all available movies
 *     tags:
 *       - User - Movies
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       401:
 *         description: Unauthorized
 */

userRouter.get("/movies",authent,getMovies)

/**
 * @openapi
 * /user/movies/{movie}/showtimes/{id}:
 *   get:
 *     summary: View available seats for a specific showtime
 *     tags:
 *       - User - Bookings
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: movie
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID or Title
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Showtime ID
 *     responses:
 *       200:
 *         description: Available seat map for the showtime
 *       400:
 *         description: Showtime expired
 *       404:
 *         description: Movie or Showtime not found
 */

userRouter.get("/movies/:movie/showtimes/:id",authent,checkMovie,showTimeExpiration,availableSeats)

/**
 * @openapi
 * /user/movies/{movie}/showtimes/{id}/bookings:
 *   post:
 *     summary: Book seats for a movie showtime
 *     tags:
 *       - User - Bookings
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: movie
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID or Title
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Showtime ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - selectedSeats
 *             properties:
 *               selectedSeats:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["A1", "A2"]
 *     responses:
 *       201:
 *         description: Booking successful
 *       400:
 *         description: Seat unavailable or showtime expired
 *       404:
 *         description: Movie or Showtime not found
 */

userRouter.post("/movies/:movie/showtimes/:id/bookings",authent,checkMovie,showTimeExpiration,bookingTicket)

/**
 * @openapi
 * /user/bookings:
 *   get:
 *     summary: Get user's booking history
 *     tags:
 *       - User - Bookings
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: History of all bookings made by the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 */

userRouter.get("/bookings",authent,getBookingHistory)

/**
 * @openapi
 * /user/movies/{movie}/showtimes:
 *   get:
 *     summary: Get all showtimes for a specific movie
 *     tags:
 *       - User - Movies
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: movie
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID or Title
 *     responses:
 *       200:
 *         description: List of showtimes for the specified movie
 *       404:
 *         description: Movie not found
 */

userRouter.get("/movies/:movie/showtimes",authent,checkMovie,getShowTimes)

userRouter.post("/booking/bookinId",authent,cancelBooking)

