import jwt from 'jsonwebtoken';

const generateTokenAndCookies = (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '15h'});

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        sameSite: 'strict', // Helps prevent CSRF attacks
        secure: process.env.NODE_ENV === 'development' // Set to true if using HTTPS
    });

}
export default generateTokenAndCookies;