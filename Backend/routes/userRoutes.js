import express from 'express';
import {authUser} from '../controllers/userController.js';

const router = express.Router();

router.post('/logIn', authUser);


export default router;