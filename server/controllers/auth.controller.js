import User from '../models/user.model.js'
import { generateToken } from '../configs/token.js'


export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ name, email });
        }
        let token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({ message: "User authenticated successfully", user});
    } catch (error) {
        console.error("Error in Google Auth:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        await res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Error in Logout:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
