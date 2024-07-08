import express from 'express'
const router = express.Router();

import { getUserForSidebar } from '../controllers/user.controller.js';
import protectRoute from '../middlerware/protectRoute.js';

router.get('/',protectRoute, getUserForSidebar )

export default router