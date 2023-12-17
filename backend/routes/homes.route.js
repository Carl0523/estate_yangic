import express from 'express';
import { createHome } from '../controllers/homes.controller.js';

const router = express.Router();

router.post('/create', createHome);


export default router;