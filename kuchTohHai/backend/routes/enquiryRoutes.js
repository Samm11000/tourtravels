// import express from 'express';
// import { getAllEnquiries, getEnquiryById, deleteEnquiry, postEnquiry } from '../controllers/enquiryController.js';
// import { verifyUser } from '../middlewares/authMiddleware.js';

// const router = express.Router();

// router.get('/all', verifyUser, getAllEnquiries);

// router.delete('/:id', verifyUser, deleteEnquiry);
// router.post('/', postEnquiry);

// export default router;



// import express from 'express';
// import { 
//   getAllEnquiries, 
//   getEnquiryById, 
//   deleteEnquiry, 
//   postEnquiry,
//   updateEnquiryStatus,
//   allocateDriver,
//   allocateVehicle,
//   sendMessage,
//   updateEnquiry,
//   getEnquiryStats,
//   getAvailableDrivers,
//   getAvailableCars,
//   getAvailableVehicles,
//   markMessagesAsRead
// } from '../controllers/enquiryController.js';
// import { verifyUser } from '../middlewares/authMiddleware.js';

// const router = express.Router();

// // Public routes
// router.post('/', postEnquiry);

// // Protected routes (require authentication)
// router.get('/stats', verifyUser, getEnquiryStats);
// router.get('/all', verifyUser, getAllEnquiries);
// router.get('/available-drivers', verifyUser, getAvailableDrivers);
// router.get('/available-cars', verifyUser, getAvailableCars);
// router.get('/available-vehicles/:carId', verifyUser, getAvailableVehicles);

// // Enquiry-specific routes
// router.get('/:id', verifyUser, getEnquiryById);
// router.put('/:id', verifyUser, updateEnquiry);
// router.delete('/:id', verifyUser, deleteEnquiry);

// // Status and allocation routes
// router.patch('/:id/status', verifyUser, updateEnquiryStatus);
// router.patch('/:id/allocate-driver', verifyUser, allocateDriver);
// router.patch('/:id/allocate-vehicle', verifyUser, allocateVehicle);
// router.post('/:id/message', verifyUser, sendMessage);
// router.patch('/:id/mark-read', verifyUser, markMessagesAsRead);

// export default router;





















import express from 'express';
import {
  getAllEnquiries,
  getEnquiryById,
  deleteEnquiry,
  postEnquiry,
  updateEnquiryStatus,
  allocateDriver,
  allocateVehicle,
  sendMessage,
  updateEnquiry,
  getEnquiryStats,
  getAvailableDrivers,
  getAvailableCars,
  getAvailableVehicles,
  markMessagesAsRead,
  revertDriver,
  revertVehicle,
  sendWhatsAppNotification,
  allocateDriverWithNotification,
  allocateVehicleWithNotification
} from '../controllers/enquiryController.js';
import { verifyUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', postEnquiry);

// Protected routes (require authentication)
router.get('/stats', verifyUser, getEnquiryStats);
router.get('/all', verifyUser, getAllEnquiries);
router.get('/available-drivers', verifyUser, getAvailableDrivers);
router.get('/available-cars', verifyUser, getAvailableCars);
router.get('/available-vehicles/:carId', verifyUser, getAvailableVehicles);

// Enquiry-specific routes
router.get('/:id', verifyUser, getEnquiryById);
// router.get('/:id', verifyUser, getEnquiryById);
router.put('/:id', verifyUser, updateEnquiry);
router.delete('/:id', verifyUser, deleteEnquiry);

// Status and allocation routes
router.patch('/:id/status', verifyUser, updateEnquiryStatus);
router.patch('/:id/allocate-driver', verifyUser, allocateDriverWithNotification);
router.patch('/:id/allocate-vehicle', verifyUser, allocateVehicleWithNotification);
router.patch('/:id/revert-driver', verifyUser, revertDriver);
router.patch('/:id/revert-vehicle', verifyUser, revertVehicle);
router.post('/:id/message', verifyUser, sendMessage);
router.patch('/:id/mark-read', verifyUser, markMessagesAsRead);

// WhatsApp notification route
router.post('/send-whatsapp', verifyUser, sendWhatsAppNotification);

export default router;