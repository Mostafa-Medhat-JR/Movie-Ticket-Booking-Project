import { Router } from "express";
import { auth,authent } from "../middlewares/auth.middleware";
import { checkMovie,showTimeExpiration } from "../middlewares/expirationandstateChecker";
import { signIn,signiUp, getMovies, availableSeats, bookingTicket, getBookingHistory, getShowTimes  } from "../controllers/user.controller";
import { addShowTime,addMovie,editMovie,removeMovie,manageShowTime,deleteShowTime } from "../controllers/admin.controller";


export const adminRouter = Router()

/**
 * @openapi
 * /showtimes:
 *   post:
 *     summary: Add a new showtime
 *     tags:
 *       - Showtimes
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShowTime'
 *     responses:
 *       201:
 *         description: Showtime created successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 */

adminRouter.post("/showtimes",authent,auth,addShowTime)

/**
 * @openapi
 * /movies:
 *   post:
 *     summary: Add a new movie
 *     tags:
 *       - Movies
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie added successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
adminRouter.post("/movies",authent,auth,addMovie)

/**
 * @openapi
 * /movies/{movie}:
 *   patch:
 *     summary: Update an existing movie
 *     tags:
 *       - Movies
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: movie
 *         required: true
 *         schema:
 *           type: string
 *         description: The Movie ID or Title identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: string
 *               duration:
 *                 type: string
 *               description:
 *                 type: string
 *               posterUrl:
 *                 type: string
 *               Ratings:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: ["Now Showing", "Coming Soon"]
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       404:
 *         description: Movie not found
 */
adminRouter.patch("/movies/:movie",authent,auth,editMovie)

/**
 * @openapi
 * /movies/{movie}:
 *   delete:
 *     summary: Delete a movie
 *     tags:
 *       - Movies
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: movie
 *         required: true
 *         schema:
 *           type: string
 *         description: The Movie ID or Title identifier
 *     responses:
 *       200:
 *         description: Movie removed successfully
 *       404:
 *         description: Movie not found
 */
adminRouter.delete("/movies/:movie",authent,auth,removeMovie)

/**
 * @openapi
 * /showtimes/{id}:
 *   patch:
 *     summary: Update showtime details
 *     tags:
 *        - Showtimes
 *     security:
 *       - cookieAuth: []
 *     parameters:
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
 *             properties:
 *               hallNo:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date-time
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *               ticketPrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Showtime updated successfully
 *       404:
 *         description: Showtime not found
 */
adminRouter.patch("/showtimes/:id",authent,auth,manageShowTime)

/**
 * @openapi
 * /showtimes/{id}:
 *   delete:
 *     summary: Delete a showtime
 *     tags:
 *        - Showtimes
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Showtime ID
 *     responses:
 *       200:
 *         description: Showtime deleted successfully
 *       404:
 *         description: Showtime not found
 */
adminRouter.delete("/showtimes/:id",authent,auth,deleteShowTime)