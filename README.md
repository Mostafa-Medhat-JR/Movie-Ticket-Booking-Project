# Movie Ticket Booking API

A production-ready RESTful API for a Movie Ticket Booking system built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**. The platform provides role-based access for customers to browse showtimes and book seats, while enabling cinema administrators to manage movies, schedules, and hall capacities.

## Key Features

* **Authentication & Authorization:** Secure registration and login using `bcrypt` password hashing and JWT-based Role-Based Access Control (RBAC).
* **Movie & Showtime Management:** Complete CRUD capabilities for admins to manage cinema schedules, prices, and status (`Now Showing` / `Coming Soon`).
* **Seat Reservation System:** Transactional booking logic ensuring seat uniqueness and strict hall capacity enforcement.
* **Search & Filtering:** Query movies and showtimes by title, genre, date, or status.
* **Input Validation & Security:** Request body sanitization, strong password validation, and future-dated showtime verification.

## Tech Stack

* **Language/Framework:** Node.js, TypeScript, Express.js
* **Database:** MongoDB via Mongoose ODM
* **Security:** JWT, bcrypt, dotenv
* **Documentation:** Swagger (OpenAPI 3.0)

## System Architecture & Data Models

* **User:** `fullName`, `email`, `password`, `role` (`Customer` | `Cinema Admin`)
* **Movie:** `title`, `genre`, `duration`, `description`, `posterUrl`, `rating`, `status`
* **Showtime:** `movie`, `hallNumber`, `date`, `startTime`, `endTime`, `ticketPrice`, `totalCapacity`
* **Booking:** `customer`, `showtime`, `selectedSeats`, `totalPrice`, `bookingStatus`

