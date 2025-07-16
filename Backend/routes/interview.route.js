import express from 'express'
import isAuthenticated from '../middleware/authMiddleware.js';
import { registerInterview } from '../controllers/interview.controller.js';


const router = express.Router();

router.route('/registerInterview').post(isAuthenticated, registerInterview);

export default router;