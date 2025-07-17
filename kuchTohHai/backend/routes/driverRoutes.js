import express from 'express';
import { 
  addDriver, 
  getAllDrivers, 
  getDriverById, 
  updateDriver, 
  deleteDriver,
  updateDriverStatus,
  incrementDriverTrips,
  getDriverStats
} from '../controllers/driverController.js';
import upload from "../middlewares/upload.js";

const router = express.Router();

// GET /api/drivers/stats - Get driver statistics
router.get('/stats', getDriverStats);

// GET /api/drivers - Get all drivers
router.get('/', getAllDrivers);

// GET /api/drivers/:id - Get single driver
router.get('/:id', getDriverById);

// POST /api/drivers - Add new driver
router.post('/', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'aadharPhoto', maxCount: 1 }
]), addDriver);

// PUT /api/drivers/:id - Update driver
router.put('/:id', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'aadharPhoto', maxCount: 1 }
]), updateDriver);

// DELETE /api/drivers/:id - Delete driver
router.delete('/:id', deleteDriver);

// PATCH /api/drivers/:id/status - Update driver status
router.patch('/:id/status', updateDriverStatus);

// PATCH /api/drivers/:id/increment-trips - Increment driver trip count
router.patch('/:id/increment-trips', incrementDriverTrips);

export default router;