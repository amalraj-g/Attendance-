import express from 'express';
import {createAttendance, checkoutAttendance} from '../controllers/AttendanceController.js';

const router = express.Router();
router.post('/remark',createAttendance);
router.put('/remark/:id', checkoutAttendance);
// router.get('/remark/',getAttendance)

export default router;