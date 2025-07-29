// import cloudinary from '../config/cloudinary.js';
// import getDataUri from '../config/dataUri.js';
// import Vehicle from '../models/Vehicle.js';
// import Car from '../models/Car.js';
// import mongoose from 'mongoose';

// // Get all vehicles for a specific car model
// export const getVehiclesByCarId = async (req, res) => {
//   try {
//     const { carId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(carId)) {
//       return res.status(400).json({ message: "Invalid car ID" });
//     }

//     const vehicles = await Vehicle.find({ carId })
//       .populate('carId', 'name category')
//       .populate('assignedDriver', 'name phone')
//       .sort({ createdAt: -1 });

//     // Get car details
//     const car = await Car.findById(carId);
//     if (!car) {
//       return res.status(404).json({ message: "Car not found" });
//     }

//     // Get statistics
//     const stats = await Vehicle.getCarStatistics(carId);

//     res.status(200).json({
//       car,
//       vehicles,
//       stats,
//     });
//   } catch (error) {
//     console.error("Error fetching vehicles:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// // Add new vehicle
// export const addVehicle = async (req, res) => {
//   try {
//     const {
//       carId,
//       carNumber,
//       color,
//       buyingDate,
//       mileage,
//       lastServiceDate,
//       nextServiceDate,
//       insuranceExpiry,
//       pucExpiry,
//       fitnessExpiry,
//       notes,
//       assignedDriver,
//     } = req.body;

//     // Validate required fields
//     if (!carId || !carNumber || !color || !buyingDate) {
//       return res.status(400).json({
//         message: "Please provide all required fields.",
//         requiredFields: ["carId", "carNumber", "color", "buyingDate"],
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(carId)) {
//       return res.status(400).json({ message: "Invalid car ID" });
//     }

//     // Check if car exists
//     const car = await Car.findById(carId);
//     if (!car) {
//       return res.status(404).json({ message: "Car not found" });
//     }

//     // Check if vehicle with same car number already exists
//     const existingVehicle = await Vehicle.findOne({ carNumber: carNumber.toUpperCase() });
//     if (existingVehicle) {
//       return res.status(400).json({
//         message: "Vehicle with this car number already exists"
//       });
//     }

//     // Upload photos to Cloudinary
//     let photoUrl = '';
//     let rcPhotoUrl = '';

//     if (req.files) {
//       if (req.files.photo?.[0]) {
//         const fileContent = getDataUri(req.files.photo[0]);
//         const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
//           folder: 'vehicles/photos',
//         });
//         photoUrl = uploadResult.secure_url;
//       }

//       if (req.files.rcPhoto?.[0]) {
//         const fileContent = getDataUri(req.files.rcPhoto[0]);
//         const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
//           folder: 'vehicles/documents',
//         });
//         rcPhotoUrl = uploadResult.secure_url;
//       }
//     }

//     // Create new vehicle
//     const newVehicle = new Vehicle({
//       carId,
//       carNumber: carNumber.toUpperCase(),
//       color,
//       buyingDate,
//       mileage: mileage ? parseInt(mileage) : 0,
//       lastServiceDate,
//       nextServiceDate,
//       insuranceExpiry,
//       pucExpiry,
//       fitnessExpiry,
//       notes,
//       assignedDriver: assignedDriver || null,
//       photo: photoUrl,
//       rcPhoto: rcPhotoUrl,
//     });

//     const savedVehicle = await newVehicle.save();
    
//     // Populate the response
//     const populatedVehicle = await Vehicle.findById(savedVehicle._id)
//       .populate('carId', 'name category')
//       .populate('assignedDriver', 'name phone');

//     res.status(201).json({
//       message: "Vehicle added successfully",
//       vehicle: populatedVehicle,
//     });
//   } catch (error) {
//     console.error("Error adding vehicle:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// // Update vehicle
// export const updateVehicle = async (req, res) => {
//   try {
//     const vehicleId = req.params.id;
//     const updateData = { ...req.body };

//     if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
//       return res.status(400).json({ message: "Invalid vehicle ID" });
//     }

//     // Parse numeric fields
//     if (updateData.mileage) updateData.mileage = parseInt(updateData.mileage);
//     if (updateData.totalTrips) updateData.totalTrips = parseInt(updateData.totalTrips);
//     if (updateData.totalRevenue) updateData.totalRevenue = parseFloat(updateData.totalRevenue);
//     if (updateData.averageRating) updateData.averageRating = parseFloat(updateData.averageRating);

//     // Convert car number to uppercase
//     if (updateData.carNumber) {
//       updateData.carNumber = updateData.carNumber.toUpperCase();
//     }

//     // Handle file uploads
//     if (req.files) {
//       if (req.files.photo?.[0]) {
//         const fileContent = getDataUri(req.files.photo[0]);
//         const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
//           folder: 'vehicles/photos',
//         });
//         updateData.photo = uploadResult.secure_url;
//       }

//       if (req.files.rcPhoto?.[0]) {
//         const fileContent = getDataUri(req.files.rcPhoto[0]);
//         const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
//           folder: 'vehicles/documents',
//         });
//         updateData.rcPhoto = uploadResult.secure_url;
//       }
//     }

//     const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, updateData, {
//       new: true,
//       runValidators: true,
//     })
//       .populate('carId', 'name category')
//       .populate('assignedDriver', 'name phone');

//     if (!updatedVehicle) {
//       return res.status(404).json({ message: "Vehicle not found" });
//     }

//     res.status(200).json({
//       message: "Vehicle updated successfully",
//       vehicle: updatedVehicle,
//     });
//   } catch (error) {
//     console.error("Error updating vehicle:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// // Delete vehicle
// export const deleteVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid vehicle ID" });
//     }

//     const vehicle = await Vehicle.findById(id);
//     if (!vehicle) {
//       return res.status(404).json({ message: "Vehicle not found" });
//     }

//     // Delete photos from Cloudinary
//     if (vehicle.photo) {
//       const photoPublicId = vehicle.photo.split('/').pop().split('.')[0];
//       await cloudinary.uploader.destroy(`vehicles/photos/${photoPublicId}`);
//     }

//     if (vehicle.rcPhoto) {
//       const rcPublicId = vehicle.rcPhoto.split('/').pop().split('.')[0];
//       await cloudinary.uploader.destroy(`vehicles/documents/${rcPublicId}`);
//     }

//     await vehicle.deleteOne();

//     res.status(200).json({ message: "Vehicle deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting vehicle:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// // Update vehicle status
// export const updateVehicleStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid vehicle ID" });
//     }

//     if (!['Available', 'Booked', 'Maintenance', 'Out of Service'].includes(status)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     const vehicle = await Vehicle.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true, runValidators: true }
//     ).populate('carId', 'name category');

//     if (!vehicle) {
//       return res.status(404).json({ message: "Vehicle not found" });
//     }

//     res.status(200).json({
//       message: "Vehicle status updated successfully",
//       vehicle,
//     });
//   } catch (error) {
//     console.error("Error updating vehicle status:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// // Get vehicle by ID
// export const getVehicleById = async (req, res) => {
//   try {
//     const vehicleId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
//       return res.status(400).json({ message: "Invalid vehicle ID" });
//     }

//     const vehicle = await Vehicle.findById(vehicleId)
//       .populate('carId', 'name category features specifications')
//       .populate('assignedDriver', 'name phone email');

//     if (!vehicle) {
//       return res.status(404).json({ message: "Vehicle not found" });
//     }

//     // Get expiring documents
//     const expiringDocuments = vehicle.getExpiringDocuments();
//     const needsService = vehicle.needsService();

//     res.status(200).json({
//       vehicle,
//       expiringDocuments,
//       needsService,
//     });
//   } catch (error) {
//     console.error("Error fetching vehicle:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// // Get all vehicles (for admin dashboard)
// export const getAllVehicles = async (req, res) => {
//   try {
//     const vehicles = await Vehicle.find()
//       .populate('carId', 'name category')
//       .populate('assignedDriver', 'name phone')
//       .sort({ createdAt: -1 });

//     res.status(200).json(vehicles);
//   } catch (error) {
//     console.error("Error fetching all vehicles:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// // Get vehicle statistics
// export const getVehicleStats = async (req, res) => {
//   try {
//     const totalStats = await Vehicle.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalVehicles: { $sum: 1 },
//           availableVehicles: {
//             $sum: { $cond: [{ $eq: ['$status', 'Available'] }, 1, 0] }
//           },
//           bookedVehicles: {
//             $sum: { $cond: [{ $eq: ['$status', 'Booked'] }, 1, 0] }
//           },
//           maintenanceVehicles: {
//             $sum: { $cond: [{ $eq: ['$status', 'Maintenance'] }, 1, 0] }
//           },
//           outOfServiceVehicles: {
//             $sum: { $cond: [{ $eq: ['$status', 'Out of Service'] }, 1, 0] }
//           },
//           totalTrips: { $sum: '$totalTrips' },
//           totalRevenue: { $sum: '$totalRevenue' },
//           averageRating: { $avg: '$averageRating' },
//         }
//       }
//     ]);

//     res.status(200).json(totalStats[0] || {
//       totalVehicles: 0,
//       availableVehicles: 0,
//       bookedVehicles: 0,
//       maintenanceVehicles: 0,
//       outOfServiceVehicles: 0,
//       totalTrips: 0,
//       totalRevenue: 0,
//       averageRating: 0,
//     });
//   } catch (error) {
//     console.error("Error fetching vehicle stats:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// // Add trip to vehicle
// export const addTripToVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { revenue, rating } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid vehicle ID" });
//     }

//     const vehicle = await Vehicle.findById(id);
//     if (!vehicle) {
//       return res.status(404).json({ message: "Vehicle not found" });
//     }

//     await vehicle.addTrip(revenue || 0, rating || 0);

//     res.status(200).json({
//       message: "Trip added to vehicle successfully",
//       totalTrips: vehicle.totalTrips,
//       totalRevenue: vehicle.totalRevenue,
//       averageRating: vehicle.averageRating,
//     });
//   } catch (error) {
//     console.error("Error adding trip to vehicle:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };
import cloudinary from '../config/cloudinary.js';
import getDataUri from '../config/dataUri.js';
import Vehicle from '../models/Vehicle.js';
import Car from '../models/Car.js';
import mongoose from 'mongoose';

// Get all vehicles for a specific car model
export const getVehiclesByCarId = async (req, res) => {
  try {
    const { carId } = req.params;

    console.log('🚗 Getting vehicles for car ID:', carId);

    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: "Invalid car ID" });
    }

    // Get vehicles for this car
    const vehicles = await Vehicle.find({ carId })
      .populate('carId', 'name category')
      .populate('assignedDriver', 'name phone')
      .sort({ createdAt: -1 });

    console.log('📊 Found vehicles:', vehicles.length);

    // Get car details
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    console.log('🚙 Car details:', car.name);

    // Calculate statistics manually (instead of using getCarStatistics)
    const stats = {
      totalVehicles: vehicles.length,
      availableVehicles: vehicles.filter(v => v.status === 'Available').length,
      bookedVehicles: vehicles.filter(v => v.status === 'Booked').length,
      maintenanceVehicles: vehicles.filter(v => v.status === 'Maintenance').length,
      outOfServiceVehicles: vehicles.filter(v => v.status === 'Out of Service').length,
      totalTrips: vehicles.reduce((sum, v) => sum + (v.totalTrips || 0), 0),
      totalRevenue: vehicles.reduce((sum, v) => sum + (v.totalRevenue || 0), 0),
      averageRating: vehicles.length > 0 
        ? vehicles.reduce((sum, v) => sum + (v.averageRating || 0), 0) / vehicles.length 
        : 0
    };

    console.log('📈 Calculated stats:', stats);

    res.status(200).json({
      success: true,
      car,
      vehicles,
      stats,
    });

  } catch (error) {
    console.error("❌ Error fetching vehicles:", error);
    res.status(500).json({ 
      message: "Internal server error", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
};

// Add new vehicle
export const addVehicle = async (req, res) => {
  try {
    console.log('➕ Adding new vehicle...');
    console.log('📝 Request body:', req.body);
    console.log('📎 Files:', req.files ? Object.keys(req.files) : 'No files');

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
        received: { carId: !!carId, carNumber: !!carNumber, color: !!color, buyingDate: !!buyingDate }
      });
    }

    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: "Invalid car ID format" });
    }

    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car model not found" });
    }

    console.log('🚙 Car found:', car.name);

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

    try {
      if (req.files) {
        if (req.files.photo?.[0]) {
          console.log('📸 Uploading vehicle photo...');
          const fileContent = getDataUri(req.files.photo[0]);
          const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
            folder: 'vehicles/photos',
          });
          photoUrl = uploadResult.secure_url;
          console.log('✅ Photo uploaded');
        }

        if (req.files.rcPhoto?.[0]) {
          console.log('📄 Uploading RC photo...');
          const fileContent = getDataUri(req.files.rcPhoto[0]);
          const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
            folder: 'vehicles/documents',
          });
          rcPhotoUrl = uploadResult.secure_url;
          console.log('✅ RC photo uploaded');
        }
      }
    } catch (uploadError) {
      console.error('❌ File upload error:', uploadError);
      // Continue without photos if upload fails
    }

    // Create new vehicle
    const newVehicle = new Vehicle({
      carId,
      carNumber: carNumber.toUpperCase(),
      color,
      buyingDate,
      mileage: mileage ? parseInt(mileage) : 0,
      lastServiceDate: lastServiceDate || null,
      nextServiceDate: nextServiceDate || null,
      insuranceExpiry: insuranceExpiry || null,
      pucExpiry: pucExpiry || null,
      fitnessExpiry: fitnessExpiry || null,
      notes: notes || '',
      assignedDriver: assignedDriver || null,
      photo: photoUrl,
      rcPhoto: rcPhotoUrl,
      status: 'Available',
      totalTrips: 0,
      totalRevenue: 0,
      averageRating: 0
    });

    const savedVehicle = await newVehicle.save();
    console.log('✅ Vehicle saved with ID:', savedVehicle._id);
    
    // Populate the response
    const populatedVehicle = await Vehicle.findById(savedVehicle._id)
      .populate('carId', 'name category')
      .populate('assignedDriver', 'name phone');

    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      vehicle: populatedVehicle,
    });

  } catch (error) {
    console.error("❌ Error adding vehicle:", error);
    res.status(500).json({ 
      message: "Failed to add vehicle", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
};

// Update vehicle
export const updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const updateData = { ...req.body };

    console.log('🔄 Updating vehicle:', vehicleId);
    console.log('📝 Update data:', updateData);

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
    try {
      if (req.files) {
        if (req.files.photo?.[0]) {
          console.log('📸 Updating vehicle photo...');
          const fileContent = getDataUri(req.files.photo[0]);
          const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
            folder: 'vehicles/photos',
          });
          updateData.photo = uploadResult.secure_url;
        }

        if (req.files.rcPhoto?.[0]) {
          console.log('📄 Updating RC photo...');
          const fileContent = getDataUri(req.files.rcPhoto[0]);
          const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
            folder: 'vehicles/documents',
          });
          updateData.rcPhoto = uploadResult.secure_url;
        }
      }
    } catch (uploadError) {
      console.error('❌ File upload error during update:', uploadError);
      // Continue with update even if file upload fails
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

    console.log('✅ Vehicle updated successfully');

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });

  } catch (error) {
    console.error("❌ Error updating vehicle:", error);
    res.status(500).json({ 
      message: "Failed to update vehicle", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
};

// Delete vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    console.log('🗑️ Deleting vehicle:', id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Delete photos from Cloudinary (but don't fail if it errors)
    try {
      if (vehicle.photo) {
        const photoPublicId = vehicle.photo.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`vehicles/photos/${photoPublicId}`);
        console.log('🗑️ Vehicle photo deleted from cloudinary');
      }

      if (vehicle.rcPhoto) {
        const rcPublicId = vehicle.rcPhoto.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`vehicles/documents/${rcPublicId}`);
        console.log('🗑️ RC photo deleted from cloudinary');
      }
    } catch (cloudinaryError) {
      console.warn('⚠️ Failed to delete photos from cloudinary:', cloudinaryError.message);
      // Continue with vehicle deletion even if cloudinary deletion fails
    }

    await Vehicle.findByIdAndDelete(id);
    console.log('✅ Vehicle deleted successfully');

    res.status(200).json({ 
      success: true,
      message: "Vehicle deleted successfully" 
    });

  } catch (error) {
    console.error("❌ Error deleting vehicle:", error);
    res.status(500).json({ 
      message: "Failed to delete vehicle", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
};

// Update vehicle status
export const updateVehicleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log('🔄 Updating vehicle status:', id, 'to', status);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }

    const validStatuses = ['Available', 'Booked', 'Maintenance', 'Out of Service'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: "Invalid status value",
        validStatuses
      });
    }

    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('carId', 'name category');

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    console.log('✅ Vehicle status updated successfully');

    res.status(200).json({
      success: true,
      message: "Vehicle status updated successfully",
      vehicle,
    });

  } catch (error) {
    console.error("❌ Error updating vehicle status:", error);
    res.status(500).json({ 
      message: "Failed to update vehicle status", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
};

// Get vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicleId = req.params.id;

    console.log('🔍 Getting vehicle by ID:', vehicleId);

    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }

    const vehicle = await Vehicle.findById(vehicleId)
      .populate('carId', 'name category features specifications')
      .populate('assignedDriver', 'name phone email');

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Get expiring documents (implement manually if method doesn't exist)
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
    
    const expiringDocuments = [];
    if (vehicle.insuranceExpiry && new Date(vehicle.insuranceExpiry) <= thirtyDaysFromNow) {
      expiringDocuments.push({ type: 'Insurance', date: vehicle.insuranceExpiry });
    }
    if (vehicle.pucExpiry && new Date(vehicle.pucExpiry) <= thirtyDaysFromNow) {
      expiringDocuments.push({ type: 'PUC', date: vehicle.pucExpiry });
    }
    if (vehicle.fitnessExpiry && new Date(vehicle.fitnessExpiry) <= thirtyDaysFromNow) {
      expiringDocuments.push({ type: 'Fitness', date: vehicle.fitnessExpiry });
    }

    const sixMonthsAgo = new Date(now.getTime() - (6 * 30 * 24 * 60 * 60 * 1000));
    const needsService = vehicle.lastServiceDate ? new Date(vehicle.lastServiceDate) <= sixMonthsAgo : true;

    console.log('✅ Vehicle found with', expiringDocuments.length, 'expiring documents');

    res.status(200).json({
      success: true,
      vehicle,
      expiringDocuments,
      needsService,
    });

  } catch (error) {
    console.error("❌ Error fetching vehicle:", error);
    res.status(500).json({ 
      message: "Failed to fetch vehicle", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
};

// Get all vehicles (for admin dashboard)
export const getAllVehicles = async (req, res) => {
  try {
    console.log('📋 Getting all vehicles...');

    const vehicles = await Vehicle.find()
      .populate('carId', 'name category')
      .populate('assignedDriver', 'name phone')
      .sort({ createdAt: -1 });

    console.log('✅ Found', vehicles.length, 'vehicles');

    res.status(200).json({
      success: true,
      count: vehicles.length,
      vehicles
    });

  } catch (error) {
    console.error("❌ Error fetching all vehicles:", error);
    res.status(500).json({ 
      message: "Failed to fetch vehicles", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
};

// Get vehicle statistics
export const getVehicleStats = async (req, res) => {
  try {
    console.log('📊 Calculating vehicle statistics...');

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

    const stats = totalStats[0] || {
      totalVehicles: 0,
      availableVehicles: 0,
      bookedVehicles: 0,  
      maintenanceVehicles: 0,
      outOfServiceVehicles: 0,
      totalTrips: 0,
      totalRevenue: 0,
      averageRating: 0,
    };

    console.log('✅ Stats calculated:', stats);

    res.status(200).json({
      success: true,
      stats
    });

  } catch (error) {
    console.error("❌ Error fetching vehicle stats:", error);
    res.status(500).json({ 
      message: "Failed to fetch statistics", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
};

// Add trip to vehicle
export const addTripToVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { revenue, rating } = req.body;

    console.log('🛣️ Adding trip to vehicle:', id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vehicle ID" });
    }

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Manual trip addition (if addTrip method doesn't exist)
    const tripRevenue = parseFloat(revenue) || 0;
    const tripRating = parseFloat(rating) || 0;

    vehicle.totalTrips = (vehicle.totalTrips || 0) + 1;
    vehicle.totalRevenue = (vehicle.totalRevenue || 0) + tripRevenue;
    
    // Calculate new average rating
    if (tripRating > 0) {
      const currentTotal = (vehicle.averageRating || 0) * ((vehicle.totalTrips || 1) - 1);
      vehicle.averageRating = (currentTotal + tripRating) / vehicle.totalTrips;
    }

    await vehicle.save();

    console.log('✅ Trip added successfully');

    res.status(200).json({
      success: true,
      message: "Trip added to vehicle successfully",
      totalTrips: vehicle.totalTrips,
      totalRevenue: vehicle.totalRevenue,
      averageRating: vehicle.averageRating,
    });

  } catch (error) {
    console.error("❌ Error adding trip to vehicle:", error);
    res.status(500).json({ 
      message: "Failed to add trip", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
};