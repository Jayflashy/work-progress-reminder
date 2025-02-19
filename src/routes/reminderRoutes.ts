import { Router } from 'express';
import  ReminderController  from '../controllers/reminderController';

const router = Router();

router.get('/send-reminder', ReminderController.sendReminder);

export default router;

