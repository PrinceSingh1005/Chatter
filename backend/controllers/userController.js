import User from '../models/User.js';

export const getUserForSidebar = async (req, res) => {
    try {
        
        const loggedInUserId = req.user._id; // Assuming i have middleware to set req.user

        const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');

        res.status(200).json(filteredUser);
    } catch (error) {
        console.error("Error fetching user for sidebar:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}