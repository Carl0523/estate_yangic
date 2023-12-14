import express from 'express';
import { register, signIn, googleAuth } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/register", register);
router.post("/signin", signIn);
router.post("/google", googleAuth)


export default router;

