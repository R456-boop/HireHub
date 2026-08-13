import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "user is not authenticated",
                success: false
            });
        }

        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.id = decode.userId;

        next();

    } catch (error) {

        console.log("Authentication error:", error);

        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};




//Why do we call next()?

// Think of middleware like a checkpoint.

// Client
//    │
//    ▼
// isAuthenticated
//    │
//    ▼
// Controller

// If the user is authenticated:

// next();

// tells Express:

// "Everything is okay. Continue to the next function."
