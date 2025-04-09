import express from 'express'
import dotenv from 'dotenv';

import connectToDb from './db/connectToDb.js';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authroutes.js'
import messageRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoutes.js'



const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config({path:'../.env'});

app.use(express.json()); // Middleware to parse JSON request bodies

// app.get("/",(req,res)=>{
//     res.send("Hello World!")
// })

app.use(cookieParser()); // Middleware to parse cookies
app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server is running on port ${PORT}`);
})