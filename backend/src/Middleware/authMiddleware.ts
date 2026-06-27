import {Response,Request,NextFunction} from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET as string;
export default function authmiddleware(req:Request,res:Response,next:NextFunction){
    const authheader = req.headers.authorization;


    if(!authheader || !authheader.startsWith('Bearer ')){
        return res.status(400).json({
            message:"Invalid token"
        })
    }

    const token = authheader.split(' ')[1];

    try{
        const decoded = jwt.verify(token as string,JWT_SECRET as string ) as jwt.JwtPayload;
        (req as any).userId = decoded.userId;
        next();

    }catch(err){
   return res.status(400).json({
    message:"Token verification failed"
   });
    }
}