import {Request,Response,Router} from "express";
import User from "../db/userSchema";
import zod from "zod"
import authmiddleware from "../Middleware/authMiddleware"
import bcrypt from "bcrypt"

const Update = Router();

  Update.put("/update",authmiddleware,async(req:Request,res:Response) => {
    const body = req.body;
     const user = zod.object({
        firstname:zod.string().optional(),
        lastname:zod.string().optional(),
        password:zod.string().optional()
     })


    const updateuser = user.safeParse(body);

     if(!updateuser.success){
        return res.status(400).json({
            message:"Error while updating information",
            success:false
        })
     }
     try{
         
    const userId = (req as any).userId;

    const updateData: any = { ...updateuser.data};
    if (updateData.password){
        updateData.password = await bcrypt.hash(updateData.password,10);
    }
     
    const result = await User.updateOne(
        {_id:userId},{
            $set: updateData
        }
    );

    if(result.matchedCount === 0){
        return res.status(404).json({
            message:"User not found",
            success:false
        })
    }

     res.json({
        message:"Updated successfully",
        success:true
     })

     }catch(error){
res.status(500).json({
    message:"Internal server error during update",
    success:false
})
     }
})
export default Update;