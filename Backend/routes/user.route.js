import express from 'express'
import isAuthenticated from '../middleware/authMiddleware.js';
import { register,login,logout,updateProfile } from '../controllers/user.controller.js';
import { singleUpload } from '../middleware/multer.js';

// import single

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/profile/update")
  .post(isAuthenticated, updateProfile);

export default router;