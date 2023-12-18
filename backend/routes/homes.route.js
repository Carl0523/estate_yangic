import express from 'express';
import { createHome } from '../controllers/homes.controller.js';
import { getHomeList} from '../controllers/homes.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/create', createHome);
router.get('/list/:id', verifyToken, getHomeList);


export default router;