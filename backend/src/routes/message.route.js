import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {
  getMessagesById,
  getUserContacts,
  hardDeleteMessagesById,
  softDeleteMessagesById,
  sendMessage,
} from '../controllers/message.controller.js';

const router = express.Router();

router.get('/user-contacts', protectRoute, getUserContacts);
router.get('/:id', protectRoute, getMessagesById);
router.post('/send/:id', protectRoute, sendMessage);
router.delete('/delete/', protectRoute, hardDeleteMessagesById);
router.patch('/delete/', protectRoute, softDeleteMessagesById);

export default router;
