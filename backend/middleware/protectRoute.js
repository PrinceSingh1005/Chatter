import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt; // Access the JWT from cookies
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        
        const user = await User.findById(decoded.userId).select('-password'); // Exclude password field
        if (!user) {
            return res.status(404).json({ message: "Unauthorized access" });
        }
        req.user = user; // Attach user to request object       
        next();

    } catch (error) {
        console.log('Error in protectRoute middleware:', error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default protectRoute;