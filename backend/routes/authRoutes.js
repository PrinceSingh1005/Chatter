import express from 'express';
import { checkAuth, login, logout, signup, update_profile } from '../controllers/authController.js';
import protectRoute from '../middleware/protectRoute.js';
import { uploadSingle } from '../middleware/UploadMiddleware.js';

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.put(
    "/update_profile",
    protectRoute,
    uploadSingle('profilePicture'),
    update_profile
);
router.get("/check", protectRoute, checkAuth);

export default router;