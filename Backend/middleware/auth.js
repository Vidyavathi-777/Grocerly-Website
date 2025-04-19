import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        // Get token from cookie or Authorization header
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

        if (!token) {
            console.log("No token found"); 
            return res.status(401).json({
                message: "Access token missing. Please login.",
                error: true,
                success: false
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

        if (!decoded) {
            console.log("Token verification failed"); 
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false
            });
        }

        // Attach user ID to request
        req.userId = decoded.id;
        console.log("User ID attached to request:", req.userId);
        next();

    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(500).json({
            message: "Authentication failed: " + (error.message || error),
            error: true,
            success: false
        });
    }
};

export default auth;
