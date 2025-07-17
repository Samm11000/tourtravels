// import cloudinary from '../config/cloudinary.js';
// import getDataUri from '../config/dataUri.js';
// import Driver from '../models/Driver.js';
// import mongoose from 'mongoose';

// export const addDriver = async (req, res) => {
//   try {
//     const {
//       name,
//       age,
//       phone,
//       email,
//       address,
//       joiningDate,
//       licenseNumber,
//       licenseExpiry,
//       experienceYears,
//       salary,
//       emergencyContactName,
//       emergencyContactPhone,
//       emergencyContactRelation,
//     } = req.body;

//     // Validate required fields
//     if (!name || !age || !phone || !address || !joiningDate || !licenseNumber || !licenseExpiry) {
//       return res.status(400).json({
//         message: "Please provide all required fields.",
//         requiredFields: [
//           "name",
//           "age", 
//           "phone",
//           "address",
//           "joiningDate",
//           "licenseNumber",
//           "licenseExpiry"
//         ],
//       });
//     }

//     // Check if driver with phone or license already exists
//     const existingDriver = await Driver.findOne({
//       $or: [{ phone }, { licenseNumber }]
//     });

//     if (existingDriver) {
//       return res.status(400).json({
//         message: "Driver with this phone number or license number already exists"
//       });
//     }

//     // Upload photos to Cloudinary
//     let photoUrl = '';
//     let aadharPhotoUrl = '';

//    if (req.files) {
//   if (req.files.photo?.[0]) {
//     const fileContent = getDataUri(req.files.photo[0]);
//     const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
//       folder: 'drivers/photos',
//     });
//     updateData.photo = uploadResult.secure_url;
//   }

//   if (req.files.aadharPhoto?.[0]) {
//     const fileContent = getDataUri(req.files.aadharPhoto[0]);
//     const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
//       folder: 'drivers/aadhar',
//     });
//     updateData.aadharPhoto = uploadResult.secure_url;
//   }
// }

//     // Create emergency contact object
//     const emergencyContact = {};
//     if (emergencyContactName) emergencyContact.name = emergencyContactName;
//     if (emergencyContactPhone) emergencyContact.phone = emergencyContactPhone;
//     if (emergencyContactRelation) emergencyContact.relation = emergencyContactRelation;

//     // Create new driver
//     const newDriver = new Driver({
//       name,
//       age: parseInt(age),
//       phone,
//       email,
//       address,
//       joiningDate,
//       licenseNumber,
//       licenseExpiry,
//       experienceYears: experienceYears ? parseInt(experienceYears) : 0,
//       salary: salary ? parseFloat(salary) : 0,
//       photo: photoUrl,
//       aadharPhoto: aadharPhotoUrl,
//       emergencyContact: Object.keys(emergencyContact).length > 0 ? emergencyContact : undefined,
//     });

//     const savedDriver = await newDriver.save();

//     res.status(201).json({
//       message: "Driver added successfully",
//       driver: savedDriver,
//     });
//   } catch (error) {
//     console.error("Error adding driver:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// export const getAllDrivers = async (req, res) => {
//   try {
//     const drivers = await Driver.find()
//       .populate('assignedVehicle', 'name category')
//       .sort({ createdAt: -1 });
    
//     res.status(200).json(drivers);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching drivers", error: error.message });
//   }
// };

// export const getDriverById = async (req, res) => {
//   try {
//     const driverId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(driverId)) {
//       return res.status(400).json({ message: "Invalid driver ID" });
//     }

//     const driver = await Driver.findById(driverId)
//       .populate('assignedVehicle', 'name category');

//     if (!driver) {
//       return res.status(404).json({ message: "Driver not found" });
//     }

//     res.status(200).json(driver);
//   } catch (error) {
//     console.error("Error fetching driver:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// export const updateDriver = async (req, res) => {
//   try {
//     const driverId = req.params.id;
//     const updateData = { ...req.body };

//     if (!mongoose.Types.ObjectId.isValid(driverId)) {
//       return res.status(400).json({ message: "Invalid driver ID" });
//     }

//     // Parse numeric fields
//     if (updateData.age) updateData.age = parseInt(updateData.age);
//     if (updateData.experienceYears) updateData.experienceYears = parseInt(updateData.experienceYears);
//     if (updateData.salary) updateData.salary = parseFloat(updateData.salary);

//     // Handle emergency contact
//     if (updateData.emergencyContactName || updateData.emergencyContactPhone || updateData.emergencyContactRelation) {
//       updateData.emergencyContact = {
//         name: updateData.emergencyContactName,
//         phone: updateData.emergencyContactPhone,
//         relation: updateData.emergencyContactRelation,
//       };
//       delete updateData.emergencyContactName;
//       delete updateData.emergencyContactPhone;
//       delete updateData.emergencyContactRelation;
//     }

//     // Handle file uploads
//     if (req.files && req.files.length > 0) {
//       for (const file of req.files) {
//         const fileContent = getDataUri(file);
//         const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
//           folder: file.fieldname === 'photo' ? 'drivers/photos' : 'drivers/aadhar',
//         });
        
//         if (file.fieldname === 'photo') {
//           updateData.photo = uploadResult.secure_url;
//         } else if (file.fieldname === 'aadharPhoto') {
//           updateData.aadharPhoto = uploadResult.secure_url;
//         }
//       }
//     }

//     const updatedDriver = await Driver.findByIdAndUpdate(driverId, updateData, {
//       new: true,
//       runValidators: true,
//     }).populate('assignedVehicle', 'name category');

//     if (!updatedDriver) {
//       return res.status(404).json({ message: "Driver not found" });
//     }

//     res.status(200).json({
//       message: "Driver updated successfully",
//       driver: updatedDriver,
//     });
//   } catch (error) {
//     console.error("Error updating driver:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// export const deleteDriver = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid driver ID" });
//     }

//     const driver = await Driver.findById(id);
//     if (!driver) {
//       return res.status(404).json({ message: "Driver not found" });
//     }

//     // Optional: Delete photos from Cloudinary
//     if (driver.photo) {
//       const photoPublicId = driver.photo.split('/').pop().split('.')[0];
//       await cloudinary.uploader.destroy(`drivers/photos/${photoPublicId}`);
//     }

//     if (driver.aadharPhoto) {
//       const aadharPublicId = driver.aadharPhoto.split('/').pop().split('.')[0];
//       await cloudinary.uploader.destroy(`drivers/aadhar/${aadharPublicId}`);
//     }

//     await driver.deleteOne();

//     res.status(200).json({ message: "Driver deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting driver:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// export const updateDriverStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid driver ID" });
//     }

//     if (!['Active', 'Inactive', 'On Leave'].includes(status)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     const driver = await Driver.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true, runValidators: true }
//     );

//     if (!driver) {
//       return res.status(404).json({ message: "Driver not found" });
//     }

//     res.status(200).json({
//       message: "Driver status updated successfully",
//       driver,
//     });
//   } catch (error) {
//     console.error("Error updating driver status:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// export const incrementDriverTrips = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid driver ID" });
//     }

//     const driver = await Driver.findById(id);
//     if (!driver) {
//       return res.status(404).json({ message: "Driver not found" });
//     }

//     await driver.incrementTrips();

//     res.status(200).json({
//       message: "Driver trip count updated successfully",
//       totalTrips: driver.totalTrips,
//     });
//   } catch (error) {
//     console.error("Error updating driver trips:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// export const getDriverStats = async (req, res) => {
//   try {
//     const stats = await Driver.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalDrivers: { $sum: 1 },
//           activeDrivers: {
//             $sum: { $cond: [{ $eq: ['$status', 'Active'] }, 1, 0] }
//           },
//           inactiveDrivers: {
//             $sum: { $cond: [{ $eq: ['$status', 'Inactive'] }, 1, 0] }
//           },
//           onLeaveDrivers: {
//             $sum: { $cond: [{ $eq: ['$status', 'On Leave'] }, 1, 0] }
//           },
//           totalTrips: { $sum: '$totalTrips' },
//           averageRating: { $avg: '$rating' },
//           averageExperience: { $avg: '$experienceYears' },
//         }
//       }
//     ]);

//     res.status(200).json(stats[0] || {
//       totalDrivers: 0,
//       activeDrivers: 0,
//       inactiveDrivers: 0,
//       onLeaveDrivers: 0,
//       totalTrips: 0,
//       averageRating: 0,
//       averageExperience: 0,
//     });
//   } catch (error) {
//     console.error("Error fetching driver stats:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };



import cloudinary from '../config/cloudinary.js';
import getDataUri from '../config/dataUri.js';
import Driver from '../models/Driver.js';
import mongoose from 'mongoose';

export const addDriver = async (req, res) => {
  try {
    const {
      name,
      age,
      phone,
      email,
      address,
      joiningDate,
      licenseNumber,
      licenseExpiry,
      experienceYears,
      salary,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation,
    } = req.body;

    // Validate required fields
    if (!name || !age || !phone || !address || !joiningDate || !licenseNumber || !licenseExpiry) {
      return res.status(400).json({
        message: "Please provide all required fields.",
        requiredFields: [
          "name",
          "age", 
          "phone",
          "address",
          "joiningDate",
          "licenseNumber",
          "licenseExpiry"
        ],
      });
    }

    // Check if driver with phone or license already exists
    const existingDriver = await Driver.findOne({
      $or: [{ phone }, { licenseNumber }]
    });

    if (existingDriver) {
      return res.status(400).json({
        message: "Driver with this phone number or license number already exists"
      });
    }

    // Upload photos to Cloudinary
    let photoUrl = '';
    let aadharPhotoUrl = '';

    if (req.files) {
      if (req.files.photo?.[0]) {
        const fileContent = getDataUri(req.files.photo[0]);
        const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
          folder: 'drivers/photos',
        });
        photoUrl = uploadResult.secure_url;
      }

      if (req.files.aadharPhoto?.[0]) {
        const fileContent = getDataUri(req.files.aadharPhoto[0]);
        const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
          folder: 'drivers/aadhar',
        });
        aadharPhotoUrl = uploadResult.secure_url;
      }
    }

    // Create emergency contact object
    const emergencyContact = {};
    if (emergencyContactName) emergencyContact.name = emergencyContactName;
    if (emergencyContactPhone) emergencyContact.phone = emergencyContactPhone;
    if (emergencyContactRelation) emergencyContact.relation = emergencyContactRelation;

    // Create new driver
    const newDriver = new Driver({
      name,
      age: parseInt(age),
      phone,
      email,
      address,
      joiningDate,
      licenseNumber,
      licenseExpiry,
      experienceYears: experienceYears ? parseInt(experienceYears) : 0,
      salary: salary ? parseFloat(salary) : 0,
      photo: photoUrl,
      aadharPhoto: aadharPhotoUrl,
      emergencyContact: Object.keys(emergencyContact).length > 0 ? emergencyContact : undefined,
    });

    const savedDriver = await newDriver.save();

    res.status(201).json({
      message: "Driver added successfully",
      driver: savedDriver,
    });
  } catch (error) {
    console.error("Error adding driver:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find()
      .populate('assignedVehicle', 'name category')
      .sort({ createdAt: -1 });
    
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drivers", error: error.message });
  }
};

export const getDriverById = async (req, res) => {
  try {
    const driverId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(driverId)) {
      return res.status(400).json({ message: "Invalid driver ID" });
    }

    const driver = await Driver.findById(driverId)
      .populate('assignedVehicle', 'name category');

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json(driver);
  } catch (error) {
    console.error("Error fetching driver:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const updateDriver = async (req, res) => {
  try {
    const driverId = req.params.id;
    const updateData = { ...req.body };

    if (!mongoose.Types.ObjectId.isValid(driverId)) {
      return res.status(400).json({ message: "Invalid driver ID" });
    }

    // Parse numeric fields
    if (updateData.age) updateData.age = parseInt(updateData.age);
    if (updateData.experienceYears) updateData.experienceYears = parseInt(updateData.experienceYears);
    if (updateData.salary) updateData.salary = parseFloat(updateData.salary);

    // Handle emergency contact
    if (updateData.emergencyContactName || updateData.emergencyContactPhone || updateData.emergencyContactRelation) {
      updateData.emergencyContact = {
        name: updateData.emergencyContactName,
        phone: updateData.emergencyContactPhone,
        relation: updateData.emergencyContactRelation,
      };
      delete updateData.emergencyContactName;
      delete updateData.emergencyContactPhone;
      delete updateData.emergencyContactRelation;
    }

    // Handle file uploads
    if (req.files) {
      if (req.files.photo?.[0]) {
        const fileContent = getDataUri(req.files.photo[0]);
        const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
          folder: 'drivers/photos',
        });
        updateData.photo = uploadResult.secure_url;
      }

      if (req.files.aadharPhoto?.[0]) {
        const fileContent = getDataUri(req.files.aadharPhoto[0]);
        const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
          folder: 'drivers/aadhar',
        });
        updateData.aadharPhoto = uploadResult.secure_url;
      }
    }

    const updatedDriver = await Driver.findByIdAndUpdate(driverId, updateData, {
      new: true,
      runValidators: true,
    }).populate('assignedVehicle', 'name category');

    if (!updatedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({
      message: "Driver updated successfully",
      driver: updatedDriver,
    });
  } catch (error) {
    console.error("Error updating driver:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid driver ID" });
    }

    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // Optional: Delete photos from Cloudinary
    if (driver.photo) {
      const photoPublicId = driver.photo.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`drivers/photos/${photoPublicId}`);
    }

    if (driver.aadharPhoto) {
      const aadharPublicId = driver.aadharPhoto.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`drivers/aadhar/${aadharPublicId}`);
    }

    await driver.deleteOne();

    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    console.error("Error deleting driver:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const updateDriverStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid driver ID" });
    }

    if (!['Active', 'Inactive', 'On Leave'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const driver = await Driver.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({
      message: "Driver status updated successfully",
      driver,
    });
  } catch (error) {
    console.error("Error updating driver status:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const incrementDriverTrips = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid driver ID" });
    }

    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    await driver.incrementTrips();

    res.status(200).json({
      message: "Driver trip count updated successfully",
      totalTrips: driver.totalTrips,
    });
  } catch (error) {
    console.error("Error updating driver trips:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getDriverStats = async (req, res) => {
  try {
    const stats = await Driver.aggregate([
      {
        $group: {
          _id: null,
          totalDrivers: { $sum: 1 },
          activeDrivers: {
            $sum: { $cond: [{ $eq: ['$status', 'Active'] }, 1, 0] }
          },
          inactiveDrivers: {
            $sum: { $cond: [{ $eq: ['$status', 'Inactive'] }, 1, 0] }
          },
          onLeaveDrivers: {
            $sum: { $cond: [{ $eq: ['$status', 'On Leave'] }, 1, 0] }
          },
          totalTrips: { $sum: '$totalTrips' },
          averageRating: { $avg: '$rating' },
          averageExperience: { $avg: '$experienceYears' },
        }
      }
    ]);

    res.status(200).json(stats[0] || {
      totalDrivers: 0,
      activeDrivers: 0,
      inactiveDrivers: 0,
      onLeaveDrivers: 0,
      totalTrips: 0,
      averageRating: 0,
      averageExperience: 0,
    });
  } catch (error) {
    console.error("Error fetching driver stats:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};