import express from "express";
import auth from "./Routes/auth";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/user', auth);
async function home() {
    await mongoose.connect("mongodb+srv://yashsingh151105_db_user:VkkpBxxBHOsimwGh@cluster0.cjvwdm8.mongodb.net/paytm-app"),
        app.listen(3000, () => {
            console.log("server listening on port 3000");
        });
}
home();
//# sourceMappingURL=index.js.map