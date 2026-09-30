import mongoose from "mongoose";
import "dotenv/config"

export const connectDB = async () => {



    try {
        const url = process.env.MogoDbUrl

        await mongoose.connect(url as string)
        console.log("sucessfully connected to the database")



    }
    catch (err) {
        console.log("failed to connect to the database and the error is " + err)


    }

}
