import express from 'express';
import { createHome } from '../controllers/homes.controller.js';
import { getUserHomeList} from '../controllers/homes.controller.js';
import { deleteHomeItem } from '../controllers/homes.controller.js'; 
import { updateHomeItem} from '../controllers/homes.controller.js';
import { getHomeItem} from '../controllers/homes.controller.js';
import { getHomeList} from '../controllers/homes.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/create', createHome);
router.get('/list/:id', verifyToken, getUserHomeList);
router.delete('/delete/:id', verifyToken, deleteHomeItem);
router.post('/update/:id', verifyToken, updateHomeItem);
router.get('/home/:id', getHomeItem);
router.get('/list', getHomeList);


export default router;