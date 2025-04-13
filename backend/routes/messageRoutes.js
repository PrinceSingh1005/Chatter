import express from 'express';
import { getMessages, sendMessage } from '../controllers/messageController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/:id",protectRoute, getMessages);
router.post("/send/:id",protectRoute, sendMessage);
// messagesRoutes.js
router.get('/media/:userId', protectRoute, async (req, res) => {
    try {
      const messages = await Message.find({
        $or: [
          { senderId: req.params.userId, receiverId: req.user._id },
          { senderId: req.user._id, receiverId: req.params.userId }
        ],
        $or: [
          { 'messageType': 'image' },
          { 'messageType': 'video' }
        ]
      }).sort({ createdAt: -1 });
  
      const media = messages.map(msg => ({
        url: msg.content, // Assuming content contains the media URL
        type: msg.messageType,
        date: msg.createdAt
      }));
  
      res.status(200).json(media);
    } catch (error) {
      res.status(500).json({ message: "Error fetching shared media" });
    }
  });

export default router;