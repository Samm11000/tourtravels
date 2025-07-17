import express from 'express';
import { 
  getVehiclesByCarId,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  updateVehicleStatus,
  getVehicleById,
  getAllVehicles,
  getVehicleStats,
  addTripToVehicle
} from '../controllers/vehicleController.js';
import upload from "../middlewares/upload.js";

const router = express.Router();

// GET /api/vehicles/stats - Get vehicle statistics
router.get('/stats', getVehicleStats);

// GET /api/vehicles - Get all vehicles
router.get('/', getAllVehicles);

// GET /api/vehicles/car/:carId - Get vehicles by car ID
router.get('/car/:carId', getVehiclesByCarId);

// GET /api/vehicles/:id - Get single vehicle
router.get('/:id', getVehicleById);

// POST /api/vehicles - Add new vehicle
router.post('/', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'rcPhoto', maxCount: 1 }
]), addVehicle);

// PUT /api/vehicles/:id - Update vehicle
router.put('/:id', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'rcPhoto', maxCount: 1 }
]), updateVehicle);

// DELETE /api/vehicles/:id - Delete vehicle
router.delete('/:id', deleteVehicle);

// PATCH /api/vehicles/:id/status - Update vehicle status
router.patch('/:id/status', updateVehicleStatus);

// PATCH /api/vehicles/:id/add-trip - Add trip to vehicle
router.patch('/:id/add-trip', addTripToVehicle);

export default router;