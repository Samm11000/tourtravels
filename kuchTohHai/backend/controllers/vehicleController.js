import cloudinary from '../config/cloudinary.js';
import getDataUri from '../config/dataUri.js';
import Vehicle from '../models/Vehicle.js';
import Car from '../models/Car.js';
import mongoose from 'mongoose';

// Get all vehicles for a specific car model
export const getVehiclesByCarId = async (req, res) => {
  try {
    const { carId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: "Invalid car ID" });
    }

    const vehicles = await Vehicle.find({ carId })
      .populate('carId', 'name category')
      .populate('assignedDriver', 'name phone')
      .sort({ createdAt: -1 });

    // Get car details
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Get statistics
    const stats = await Vehicle.getCarStatistics(carId);

    res.status(200).json({
      car,
      vehicles,
      stats,
    });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Add new vehicle
export const addVehicle = async (req, res) => {
  try {
    const {
      carId,
      carNumber,
      color,
      buyingDate,
      mileage,
      lastServiceDate,
      nextServiceDate,
      insuranceExpiry,
      pucExpiry,
      fitnessExpiry,
      notes,
      assignedDriver,
    } = req.body;

    // Validate required fields
    if (!carId || !carNumber || !color || !buyingDate) {
      return res.status(400).json({
        message: "Please provide all required fields.",
        requiredFields: ["carId", "carNumber", "color", "buyingDate"],
      });
    }

    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: "Invalid car ID" });
    }

    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Check if vehicle with same car number already exists
    const existingVehicle = await Vehicle.findOne({ carNumber: carNumber.toUpperCase() });
    if (existingVehicle) {
      return res.status(400).json({
        message: "Vehicle with this car number already exists"
      });
    }

    // Upload photos to Cloudinary
    let photoUrl = '';
    let rcPhotoUrl = '';

    if (req.files) {
      if (req.files.photo?.[0]) {
        const fileContent = getDataUri(req.files.photo[0]);
        const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
          folder: 'vehicles/photos',
        });
        photoUrl = uploadResult.secure_url;
      }

      if (req.files.rcPhoto?.[0]) {
        const fileContent = getDataUri(req.files.rcPhoto[0]);
        const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
          folder: 'vehicles/documents',
        });
        rcPhotoUrl = uploadResult.secure_url;
      }
    }

    // Create new vehicle
    const newVehicle = new Vehicle({
      carId,
      carNumber: carNumber.toUpperCase(),
      color,
      buyingDate,
      mileage: mileage ? parseInt(mileage) : 0,
      lastServiceDate,
      nextServiceDate,
      insuranceExpiry,
      pucExpiry,
      fitnessExpiry,
      notes,
      assignedDriver: assignedDriver || null,
      photo: photoUrl,
      rcPhoto: rcPhotoUrl,
    });

    const savedVehicle = await newVehicle.save();
    
    // Populate the response
    const populatedVehicle = await Vehicle.findById(savedVehicle._id)
      .populate('carId', 'name category')
      .populate('assignedDriver', 'name phone');

    res.status(201).json({
      message: "Vehicle added successfully",
      vehicle: populatedVehicle,
    });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update vehicle
export const updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const updateData = { ...req.body };

    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }

    // Parse numeric fields
    if (updateData.mileage) updateData.mileage = parseInt(updateData.mileage);
    if (updateData.totalTrips) updateData.totalTrips = parseInt(updateData.totalTrips);
    if (updateData.totalRevenue) updateData.totalRevenue = parseFloat(updateData.totalRevenue);
    if (updateData.averageRating) updateData.averageRating = parseFloat(updateData.averageRating);

    // Convert car number to uppercase
    if (updateData.carNumber) {
      updateData.carNumber = updateData.carNumber.toUpperCase();
    }

    // Handle file uploads
    if (req.files) {
      if (req.files.photo?.[0]) {
        const fileContent = getDataUri(req.files.photo[0]);
        const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
          folder: 'vehicles/photos',
        });
        updateData.photo = uploadResult.secure_url;
      }

      if (req.files.rcPhoto?.[0]) {
        const fileContent = getDataUri(req.files.rcPhoto[0]);
        const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
          folder: 'vehicles/documents',
        });
        updateData.rcPhoto = uploadResult.secure_url;
      }
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, updateData, {
      new: true,
      runValidators: true,
    })
      .populate('carId', 'name category')
      .populate('assignedDriver', 'name phone');

    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Delete photos from Cloudinary
    if (vehicle.photo) {
      const photoPublicId = vehicle.photo.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`vehicles/photos/${photoPublicId}`);
    }

    if (vehicle.rcPhoto) {
      const rcPublicId = vehicle.rcPhoto.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`vehicles/documents/${rcPublicId}`);
    }

    await vehicle.deleteOne();

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update vehicle status
export const updateVehicleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }

    if (!['Available', 'Booked', 'Maintenance', 'Out of Service'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('carId', 'name category');

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({
      message: "Vehicle status updated successfully",
      vehicle,
    });
  } catch (error) {
    console.error("Error updating vehicle status:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicleId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }

    const vehicle = await Vehicle.findById(vehicleId)
      .populate('carId', 'name category features specifications')
      .populate('assignedDriver', 'name phone email');

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Get expiring documents
    const expiringDocuments = vehicle.getExpiringDocuments();
    const needsService = vehicle.needsService();

    res.status(200).json({
      vehicle,
      expiringDocuments,
      needsService,
    });
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all vehicles (for admin dashboard)
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .populate('carId', 'name category')
      .populate('assignedDriver', 'name phone')
      .sort({ createdAt: -1 });

    res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching all vehicles:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get vehicle statistics
export const getVehicleStats = async (req, res) => {
  try {
    const totalStats = await Vehicle.aggregate([
      {
        $group: {
          _id: null,
          totalVehicles: { $sum: 1 },
          availableVehicles: {
            $sum: { $cond: [{ $eq: ['$status', 'Available'] }, 1, 0] }
          },
          bookedVehicles: {
            $sum: { $cond: [{ $eq: ['$status', 'Booked'] }, 1, 0] }
          },
          maintenanceVehicles: {
            $sum: { $cond: [{ $eq: ['$status', 'Maintenance'] }, 1, 0] }
          },
          outOfServiceVehicles: {
            $sum: { $cond: [{ $eq: ['$status', 'Out of Service'] }, 1, 0] }
          },
          totalTrips: { $sum: '$totalTrips' },
          totalRevenue: { $sum: '$totalRevenue' },
          averageRating: { $avg: '$averageRating' },
        }
      }
    ]);

    res.status(200).json(totalStats[0] || {
      totalVehicles: 0,
      availableVehicles: 0,
      bookedVehicles: 0,
      maintenanceVehicles: 0,
      outOfServiceVehicles: 0,
      totalTrips: 0,
      totalRevenue: 0,
      averageRating: 0,
    });
  } catch (error) {
    console.error("Error fetching vehicle stats:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Add trip to vehicle
export const addTripToVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { revenue, rating } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    await vehicle.addTrip(revenue || 0, rating || 0);

    res.status(200).json({
      message: "Trip added to vehicle successfully",
      totalTrips: vehicle.totalTrips,
      totalRevenue: vehicle.totalRevenue,
      averageRating: vehicle.averageRating,
    });
  } catch (error) {
    console.error("Error adding trip to vehicle:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};