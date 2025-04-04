import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateTokenAndCookies from "../utils/generateTokens.js";

export const signup = async (req, res) => {
    try {
        const {fullName, username, password,confirmPassword,gender} = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const user = await User.findOne({username});
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }

        //Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePicture: gender==='male'? boyProfilePic : girlProfilePic,
        })

        if (newUser){
            generateTokenAndCookies(newUser, res);
            await newUser.save();
            console.log("User signed up successfully:", newUser);
            res.status(201).json({
                _id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePicture: newUser.profilePicture,
             });
        }else {
            res.status(400).json({error:"Invalid user data"});
        }

    } catch (error) {
        console.log('Error signing up user:', error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // 1. Input validation
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // 2. Find user WITH password field (critical fix)
        const user = await User.findOne({ username }).select('+password');
        
        if (!user) {
            console.log('No user found with username:', username);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 4. Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log('Comparison result:', isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 5. Generate token and respond
        generateTokenAndCookies(user._id, res);

        res.status(200).json({
            _id: user._id, // Changed from .id to ._id for consistency
            fullName: user.fullName,
            username: user.username,
            profilePicture: user.profilePicture,
        });

    } catch (error) {
        console.error('Login error:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            message: "Internal server error",
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
}
export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge:0}); // Clear the cookie by setting its maxAge to 0
        res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}