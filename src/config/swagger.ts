import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movie Ticket Booking api",
            version: "1.0.0",
            description: "a server for movie booking sys that help customers to see what avaliable movies showtimes adn to book tickets"
        },
        servers : [{
           url: "/"} // or "/" (for the current API)
        ]
    },
    apis: ["/home/mostafa-medhat-jr/Movie-Ticket-Project/src/**/*.ts"]
}

export const specs = swaggerJSDoc(options)