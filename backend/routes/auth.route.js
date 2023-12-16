import express from 'express';
import { register, signIn, googleAuth, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/register", register);
router.post("/signin", signIn);
router.post("/google", googleAuth)
router.post("/logout", logout)


export default router;

