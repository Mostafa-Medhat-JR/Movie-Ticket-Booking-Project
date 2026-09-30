import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import "dotenv/config"




const authent = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token

    if (!token)
        return res.status(401).json({ msg: "unauthorized" })

    try {
        const verfiy = await jwt.verify(token, process.env.secret as string)

        if (!verfiy)
            return res.status(401).json({ msg: "unauthorized" })

        next()


    } catch (err) {


        console.log("there is an error in the server from the authent fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })


    }


}

const auth = async(req: Request, res: Response, next: NextFunction)=>{
        const token = req.cookies?.token

    if (!token)
        return res.status(401).json({ msg: "no token provided" })

    try {
        const verfiy = await jwt.verify(token, process.env.secret as string) as {email:string,role:string}

        if (!verfiy)
            return res.status(401).json({ msg: "not valid token" })

        if(verfiy.role!=="Admin")
            return res.status(403).json({msg:"you arenot allowed to access this"})

        next()


    } catch (err) {


        console.log("there is an error in the server from the auth fn and th error is " + err)
        res.status(500).json({ msg: "sorryy errrorr from the server :(" })


    }

}


export {auth,authent}