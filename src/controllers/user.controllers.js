import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


// ================= REGISTER =================

export const register = async (req, res) => {
    try {

        const { fullname, email, password, role, contact } = req.body;

        const contactRegex = /^[0-9]{10}$/;

        if (!contactRegex.test(contact)) {
            return res.status(400).json({
                message: "Contact number must contain exactly 10 digits",
                success: false
            });
        }

        const passwordRegex = /^(?=.*[@#&])(?=.*[0-9]).+$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least one @,#,or & and one number",
                success: false
            });
        }

        if (!fullname || !email || !password || !role || !contact) {
            return res.status(400).json({
                message: "something is missing in the user inputs",
                success: false
            });
        }


        // check the user if previously registered
        const existinguser = await User.findOne({ email });

        if (existinguser) {
            return res.status(400).json({
                message: "user already registered previoulsy",
                success: false
            });
        }


        const hashedpassword = await bcrypt.hash(password, 10);


        // save user in mongodb
        const user = await User.create({
            fullname,
            email,
            contact,
            password: hashedpassword,
            role
        });


        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "3d"
            }
        );


        return res
            .status(201)
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 72 * 60 * 60 * 1000
            })
            .json({
                message: "user registered successfully",
                success: true,

                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role,
                    contact: user.contact
                }
            });


    } catch (error) {

        console.log("error came in register api :", error);

        return res.status(500).json({
            message: "internal server error",
            success: false
        });
    }
};



// ================= LOGIN =================

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "something is missing",
                success: false
            });
        }


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "incorrect email entered",
                success: false
            });
        }


        const ispasswordcorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!ispasswordcorrect) {
            return res.status(400).json({
                message: "incorrect email or password",
                success: false
            });
        }


        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "3d"
            }
        );


        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 72 * 60 * 60 * 1000
            })
            .json({
                message: `welcome ${user.fullname}`,
                success: true,

                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role,
                    contact: user.contact
                }
            });


    } catch (error) {

        console.log("erro while login or receiving dataa: ", error);

        return res.status(500).json({
            message: "internal server error",
            success: false
        });
    }
};



// ================= LOGOUT =================

export const logout = async (req, res) => {

    return res
        .status(200)
        .cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 0
        })
        .json({
            message: "logged out successfully",
            success: true
        });
};



// ================= UPDATE PROFILE =================

export const updateProfile = async (req, res) => {

    try {

        // req.id comes from authentication middleware
        const userId = req.id;

        const { fullname, email, contact } = req.body;


        // check if fields are empty
        if (!fullname || !email || !contact) {

            return res.status(400).json({
                message: "All fields are required",
                success: false
            });

        }


        // check contact number
        const contactRegex = /^[0-9]{10}$/;

        if (!contactRegex.test(contact)) {

            return res.status(400).json({
                message: "Contact number must contain exactly 10 digits",
                success: false
            });

        }


        // update user in MongoDB
        const user = await User.findByIdAndUpdate(
            userId,
            {
                fullname: fullname,
                email: email,
                contact: contact
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");


        // user not found
        if (!user) {

            return res.status(404).json({
                message: "User not found",
                success: false
            });

        }


        // send updated user
        return res.status(200).json({

            message: "Profile updated successfully",

            success: true,

            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                contact: user.contact
            }

        });


    } catch (error) {

        console.log("Error while updating profile:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};