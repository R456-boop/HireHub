import express from "express";

import { isAuthenticated } from "../middleware/isauthenticated.js";

import User from "../models/user.models.js";

import {
    register,
    login,
    logout,
    updateProfile
} from "../controllers/user.controllers.js";


const router = express.Router();


// ================= REGISTER =================

router.route("/register").post(register);


// ================= LOGIN =================

router.route("/login").post(login);


// ================= GET PROFILE =================

router.route("/profile").get(
    isAuthenticated,
    async (req, res) => {

        try {

            const user = await User
                .findById(req.id)
                .select("-password");


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
    }
);


// ================= UPDATE PROFILE =================

router.route("/profile").put(
    isAuthenticated,
    updateProfile
);


// ================= LOGOUT =================

router.route("/logout").get(logout);


export default router;