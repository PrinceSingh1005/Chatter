import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Database and config imports
import './config/config.js';
import connectToDb from './db/connectToDb.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Get the current directory path (backend directory)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the frontend dist directory
// const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    connectToDb();
    console.log(`Server running on port ${PORT}`);
    // console.log(`Serving frontend from: ${frontendDistPath}`);
});
