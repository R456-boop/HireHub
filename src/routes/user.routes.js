import express from "express"
import { isAuthenticated } from "../middleware/isauthenticated.js";

import User from "../models/user.models.js";
import {register,login,logout }from "../controllers/user.controllers.js"


 const router=express.Router();
 router.route("/register").post(register);//If a POST request comes to /register, call the register function.
 router.route("/login").post(login);//If a POST request comes to /login, call the /loginfunction.
  
router.route("/profile").get(isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password");

        return res.status(200).json({
            message: "profile fetched successfully",
            success: true,
            user
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
});

router.route("/logout").get(logout);

 export default router;