import express from 'express'
import isAuthenticated from '../middleware/authMiddleware.js';
import { registerInterview,updateFeedbackAndRating,getUserInterviews } from '../controllers/interview.controller.js';


const router = express.Router();

router.route('/registerInterview').post(isAuthenticated, registerInterview);
router.route("/updateFeedbackAndRating").post(isAuthenticated,updateFeedbackAndRating );
router
  .route("/getUserInterviews")
  .get(isAuthenticated, getUserInterviews);

export default router;