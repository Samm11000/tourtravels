import express from 'express';
import { getAllEnquiries, getEnquiryById, deleteEnquiry, postEnquiry } from '../controllers/enquiryController.js';
import { verifyUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/all', verifyUser, getAllEnquiries);
router.get('/:id', verifyUser, getEnquiryById);
router.delete('/:id', verifyUser, deleteEnquiry);
router.post('/', postEnquiry);

export default router;
