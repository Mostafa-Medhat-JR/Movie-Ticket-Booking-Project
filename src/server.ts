import express from "express"; 
import "dotenv/config"
import swaggerUi from "swagger-ui-express"
import { adminRouter } from "./routes/admin.routes";
import { specs } from "./config/swagger";
import { connectDB } from "./config/db";
import { userRouter } from "./routes/user.routes";
import cookieParser from "cookie-parser"



const server = express()
server.use(express.json())
server.use(cookieParser())
connectDB()

server.use("/",adminRouter)
server.use("/",userRouter)

server.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs))

server.listen(process.env.PORT,()=>{console.log(`the server is alright`)})
