import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {
  getMessagesById,
  getUserContacts,
  sendMessage,
} from '../controllers/message.controller.js';

const router = express.Router();

router.get('/user-contacts', protectRoute, getUserContacts);
router.get('/:id', protectRoute, getMessagesById);
router.post('/send/:id', protectRoute, sendMessage);

export default router;
