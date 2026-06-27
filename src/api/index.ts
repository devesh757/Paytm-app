import dotenv from 'dotenv'
dotenv.config();

import express from "express"
import auth from "../Routes/auth";
import transfer from "../Routes/transaction";
import balance from "../Routes/balance";
import Update from "../Routes/balanceInquiry";
import userRouter from "../Routes/userRouter"
import cors from "cors"
import mongoose  from "mongoose"
const mongo_url = process.env.DATABASE_URL as string;
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/user',auth);
app.use("/api/v1/user",transfer);
app.use("/api/v1/user",balance);
app.use("/api/v1/user",Update);
app.use("/api/v1/user",userRouter);


async function home(){
   await mongoose.connect(mongo_url as string,{})
   .then(() =>{
   app.listen(PORT,() => {
    console.log(`server listening on port $(PORT)` );
   });
})
}

home();