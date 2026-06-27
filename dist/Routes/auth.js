import { Router } from "express";
import jwt from "jsonwebtoken";
import zod from "zod";
import Account from "../db/accountSchema";
import bcrypt from "bcrypt";
import JWT_SECRET from "../config";
import User from "../db/userSchema";
const auth = Router();
auth.post("/signup", async (req, res) => {
    const body = req.body;
    const user = zod.object({
        firstname: zod.string(),
        lastname: zod.string(),
        username: zod.string().email(),
        password: zod.string()
    });
    const userData = user.safeParse(body);
    if (!userData.success) {
        return res.status(400).json({
            message: "Invalid data",
            success: false
        });
    }
    try {
        const existingUser = await User.findOne({ email: userData.data.username });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already taken",
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(userData.data.password, 10);
        const newUser = new User({
            firstname: userData.data.firstname,
            lastname: userData.data.lastname,
            username: userData.data.username,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({
            message: "User created succesfully",
            success: true
        });
    }
    catch (error) {
        res.status(400).json({
            message: "server error during signup",
            success: false
        });
    }
});
auth.post("/signin", async (req, res) => {
    const body = req.body;
    const usersignin = zod.object({
        username: zod.string().email(),
        password: zod.string()
    });
    const userData = usersignin.safeParse(body);
    if (!userData.success) {
        return res.status(400).json({
            message: "Invalid input data",
            success: false
        });
    }
    try {
        const user = await User.findOne({ email: userData.data.username });
        if (!user) {
            return res.status(400).json({
                message: "Invalid username and password",
                success: false
            });
        }
        const isPasswordinvalid = await bcrypt.compare(userData.data.password, user.password);
        if (!isPasswordinvalid) {
            return res.status(400).json({
                message: "Inavlid username and password",
                success: false
            });
        }
        const userId = user?._id;
        await Account.create({
            //@ts-ignore
            userId,
            balance: 1 + Math.random() * 1000
        });
        const token = jwt.sign({
            userId: user._id,
        }, JWT_SECRET);
        res.status(201).json({
            success: true,
            message: "user signin successfully",
            token: token
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Inernal server error",
            success: false
        });
    }
});
export default auth;
//# sourceMappingURL=auth.js.map