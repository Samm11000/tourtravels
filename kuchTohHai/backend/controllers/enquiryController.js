// import Enquiry from '../models/Enquiry.js';

// // @desc    Get all enquiries
// // @route   GET /api/enquiries
// export const getAllEnquiries = async (req, res) => {
//   try {
//     const enquiries = await Enquiry.find().sort({ createdAt: -1 });
//     res.json(enquiries);
//   } catch (err) {
//     res.status(500).json({ message: "Server error while fetching enquiries" });
//   }
// };

// // @desc    Get single enquiry by ID
// // @route   GET /api/enquiries/:id
// export const getEnquiryById = async (req, res) => {
//   try {
//     const enquiry = await Enquiry.findById(req.params.id);
//     if (!enquiry) {
//       return res.status(404).json({ message: "Enquiry not found" });
//     }
//     res.json(enquiry);
//   } catch (err) {
//     res.status(500).json({ message: "Server error while fetching enquiry" });
//   }
// };

// // @desc    Delete enquiry by ID
// // @route   DELETE /api/enquiries/:id
// export const deleteEnquiry = async (req, res) => {
//   try {
//     const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
//     if (!enquiry) {
//       return res.status(404).json({ message: "Enquiry not found" });
//     }
//     res.json({ message: "Enquiry deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error while deleting enquiry" });
//   }
// };

// export const postEnquiry = async (req, res) => {
//   try {
//     const {
//       fullName,
//       phoneNumber,
//       from,
//       to,
//       date,
//       time,
//       serviceType,
//     } = req.body;

//     // Manual field validation
//     if (!fullName?.trim()) return res.status(400).json({ message: "Full name is required" });
//     if (!phoneNumber?.trim()) return res.status(400).json({ message: "Phone number is required" });
//     if (!from?.trim()) return res.status(400).json({ message: "Pickup location (from) is required" });
//     if (!to?.trim()) return res.status(400).json({ message: "Drop location (to) is required" });
//     if (!date) return res.status(400).json({ message: "Date is required" });
//     if (!time?.trim()) return res.status(400).json({ message: "Time is required" });
//     if (!serviceType?.trim()) return res.status(400).json({ message: "Service type is required" });

    

//     // Create and save enquiry
//     const enquiry = new Enquiry({
//       fullName: fullName.trim(),
//       phoneNumber: phoneNumber.trim(),
//       from: from.trim(),
//       to: to.trim(),
//       date,
//       time: time.trim(),
//       serviceType: serviceType.trim(),
//     });

//     const saved = await enquiry.save();
//     res.status(201).json({ message: "Enquiry submitted successfully", enquiry: saved });

//   } catch (error) {
//     console.error("Enquiry creation error:", error);
//     res.status(500).json({ message: "Server error while creating enquiry" });
//   }
// };


import Enquiry from '../models/Enquiry.js';
import Driver from '../models/Driver.js';
import Car from '../models/Car.js';
import Vehicle from '../models/Vehicle.js';
import mongoose from 'mongoose';

// @desc    Get all enquiries with populated data
// @route   GET /api/enquiries/all
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate('allocatedDriver', 'name phone')
      .populate('allocatedCar', 'name category')
      .populate('allocatedVehicle', 'carNumber color status')
      .sort({ createdAt: -1 });
    
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching enquiries" });
  }
};

// @desc    Get single enquiry by ID with full details
// @route   GET /api/enquiries/:id
export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id)
      .populate('allocatedDriver', 'name phone email')
      .populate('allocatedCar', 'name category features pricing')
      .populate('allocatedVehicle', 'carNumber color status mileage');
    
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching enquiry" });
  }
};

// @desc    Delete enquiry by ID
// @route   DELETE /api/enquiries/:id
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.json({ message: "Enquiry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error while deleting enquiry" });
  }
};

// @desc    Create new enquiry
// @route   POST /api/enquiries
export const postEnquiry = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      from,
      to,
      date,
      time,
      serviceType,
      tripDetails,
    } = req.body;

    // Manual field validation
    if (!fullName?.trim()) return res.status(400).json({ message: "Full name is required" });
    if (!phoneNumber?.trim()) return res.status(400).json({ message: "Phone number is required" });
    if (!from?.trim()) return res.status(400).json({ message: "Pickup location (from) is required" });
    if (!to?.trim()) return res.status(400).json({ message: "Drop location (to) is required" });
    if (!date) return res.status(400).json({ message: "Date is required" });
    if (!time?.trim()) return res.status(400).json({ message: "Time is required" });
    if (!serviceType?.trim()) return res.status(400).json({ message: "Service type is required" });

    // Create and save enquiry
    const enquiry = new Enquiry({
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      from: from.trim(),
      to: to.trim(),
      date,
      time: time.trim(),
      serviceType: serviceType.trim(),
      tripDetails: tripDetails || {},
    });

    const saved = await enquiry.save();
    res.status(201).json({ message: "Enquiry submitted successfully", enquiry: saved });
  } catch (error) {
    console.error("Enquiry creation error:", error);
    res.status(500).json({ message: "Server error while creating enquiry" });
  }
};

// @desc    Update enquiry status
// @route   PATCH /api/enquiries/:id/status
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid enquiry ID" });
    }

    const validStatuses = ['Not Confirmed', 'Confirmed', 'Ongoing', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    await enquiry.updateStatus(status);
    
    // Add notification for customer
    let notificationMessage = '';
    switch(status) {
      case 'Confirmed':
        notificationMessage = 'Your booking has been confirmed! We will contact you soon.';
        break;
      case 'Ongoing':
        notificationMessage = 'Your trip has started. Have a safe journey!';
        break;
      case 'Completed':
        notificationMessage = 'Your trip has been completed. Thank you for choosing us!';
        break;
      case 'Cancelled':
        notificationMessage = 'Your booking has been cancelled. Please contact us for more details.';
        break;
    }
    
    if (notificationMessage) {
      await enquiry.addNotification('Booking Confirmed', notificationMessage);
    }

    const updatedEnquiry = await Enquiry.findById(id)
      .populate('allocatedDriver', 'name phone')
      .populate('allocatedCar', 'name category')
      .populate('allocatedVehicle', 'carNumber color status');

    res.json({
      message: "Enquiry status updated successfully",
      enquiry: updatedEnquiry,
    });
  } catch (error) {
    console.error("Error updating enquiry status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Allocate driver to enquiry
// @route   PATCH /api/enquiries/:id/allocate-driver
export const allocateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { driverId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(driverId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const enquiry = await Enquiry.findById(id);
    const driver = await Driver.findById(driverId);

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    await enquiry.allocateDriver(driverId);
    await enquiry.addNotification('Driver Assigned', `Driver ${driver.name} has been assigned to your trip. Contact: ${driver.phone}`);

    const updatedEnquiry = await Enquiry.findById(id)
      .populate('allocatedDriver', 'name phone')
      .populate('allocatedCar', 'name category')
      .populate('allocatedVehicle', 'carNumber color status');

    res.json({
      message: "Driver allocated successfully",
      enquiry: updatedEnquiry,
    });
  } catch (error) {
    console.error("Error allocating driver:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Allocate vehicle to enquiry
// @route   PATCH /api/enquiries/:id/allocate-vehicle
export const allocateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { carId, vehicleId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(carId) || !mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const enquiry = await Enquiry.findById(id);
    const car = await Car.findById(carId);
    const vehicle = await Vehicle.findById(vehicleId);

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    await enquiry.allocateVehicle(carId, vehicleId);
    await enquiry.addNotification('Vehicle Assigned', `Vehicle ${car.name} (${vehicle.carNumber}) has been assigned to your trip.`);

    const updatedEnquiry = await Enquiry.findById(id)
      .populate('allocatedDriver', 'name phone')
      .populate('allocatedCar', 'name category')
      .populate('allocatedVehicle', 'carNumber color status');

    res.json({
      message: "Vehicle allocated successfully",
      enquiry: updatedEnquiry,
    });
  } catch (error) {
    console.error("Error allocating vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Send message to customer
// @route   POST /api/enquiries/:id/message
export const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, type = 'Custom Message' } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid enquiry ID" });
    }

    if (!message?.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    await enquiry.addMessage('Admin', message.trim());
    await enquiry.addNotification(type, message.trim());

    const updatedEnquiry = await Enquiry.findById(id)
      .populate('allocatedDriver', 'name phone')
      .populate('allocatedCar', 'name category')
      .populate('allocatedVehicle', 'carNumber color status');

    res.json({
      message: "Message sent successfully",
      enquiry: updatedEnquiry,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Update enquiry details
// @route   PUT /api/enquiries/:id
export const updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid enquiry ID" });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate('allocatedDriver', 'name phone')
      .populate('allocatedCar', 'name category')
      .populate('allocatedVehicle', 'carNumber color status');

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.json({
      message: "Enquiry updated successfully",
      enquiry,
    });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Get enquiry statistics
// @route   GET /api/enquiries/stats
export const getEnquiryStats = async (req, res) => {
  try {
    const stats = await Enquiry.getEnquiryStats();
    res.json(stats);
  } catch (error) {
    console.error("Error fetching enquiry stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Get available drivers
// @route   GET /api/enquiries/available-drivers
export const getAvailableDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({ status: 'Active' }).select('name phone experienceYears rating');
    res.json(drivers);
  } catch (error) {
    console.error("Error fetching available drivers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Get available cars
// @route   GET /api/enquiries/available-cars
export const getAvailableCars = async (req, res) => {
  try {
    const cars = await Car.find().select('name category seatingCapacity photos pricing');
    res.json(cars);
  } catch (error) {
    console.error("Error fetching available cars:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Get available vehicles for a specific car
// @route   GET /api/enquiries/available-vehicles/:carId
export const getAvailableVehicles = async (req, res) => {
  try {
    const { carId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: "Invalid car ID" });
    }

    const vehicles = await Vehicle.find({ 
      carId, 
      status: 'Available' 
    }).select('carNumber color mileage totalTrips');
    
    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching available vehicles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Mark messages as read
// @route   PATCH /api/enquiries/:id/mark-read
export const markMessagesAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid enquiry ID" });
    }

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    enquiry.messages.forEach(msg => {
      msg.isRead = true;
    });
    enquiry.hasUnreadMessages = false;
    await enquiry.save();

    res.json({ message: "Messages marked as read" });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};









// Add these functions to your enquiryController.js

// @desc    Revert driver allocation
// @route   PATCH /api/enquiries/:id/revert-driver
export const revertDriver = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid enquiry ID" });
    }

    const enquiry = await Enquiry.findById(id).populate('allocatedDriver', 'name phone');
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    // Store previous driver info for notification
    const previousDriver = enquiry.allocatedDriver;

    // Revert driver allocation
    enquiry.allocatedDriver = null;
    enquiry.assignedAt = null;
    await enquiry.save();

    // Add notification
    await enquiry.addNotification('Driver Changed', 'Driver assignment has been reverted. We will assign a new driver soon.');

    const updatedEnquiry = await Enquiry.findById(id)
      .populate('allocatedDriver', 'name phone')
      .populate('allocatedCar', 'name category')
      .populate('allocatedVehicle', 'carNumber color status');

    res.json({
      message: "Driver allocation reverted successfully",
      enquiry: updatedEnquiry,
      previousDriver: previousDriver
    });
  } catch (error) {
    console.error("Error reverting driver allocation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Revert vehicle allocation
// @route   PATCH /api/enquiries/:id/revert-vehicle
export const revertVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid enquiry ID" });
    }

    const enquiry = await Enquiry.findById(id)
      .populate('allocatedCar', 'name category')
      .populate('allocatedVehicle', 'carNumber color');
    
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    // Store previous vehicle info for notification
    const previousCar = enquiry.allocatedCar;
    const previousVehicle = enquiry.allocatedVehicle;

    // Revert vehicle allocation
    enquiry.allocatedCar = null;
    enquiry.allocatedVehicle = null;
    enquiry.assignedAt = null;
    await enquiry.save();

    // Add notification
    await enquiry.addNotification('Vehicle Changed', 'Vehicle assignment has been reverted. We will assign a new vehicle soon.');

    const updatedEnquiry = await Enquiry.findById(id)
      .populate('allocatedDriver', 'name phone')
      .populate('allocatedCar', 'name category')
      .populate('allocatedVehicle', 'carNumber color status');

    res.json({
      message: "Vehicle allocation reverted successfully",
      enquiry: updatedEnquiry,
      previousCar: previousCar,
      previousVehicle: previousVehicle
    });
  } catch (error) {
    console.error("Error reverting vehicle allocation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Send WhatsApp notification via N8N webhook
// @route   POST /api/enquiries/send-whatsapp
export const sendWhatsAppNotification = async (req, res) => {
  try {
    const { phoneNumber, message, enquiryId } = req.body;

    // Validate inputs
    if (!phoneNumber || !message) {
      return res.status(400).json({ message: "Phone number and message are required" });
    }

    // N8N webhook URL (replace with your actual webhook URL)
    const webhookUrl = process.env.N8N_WHATSAPP_WEBHOOK_URL || 'https://your-n8n-webhook-url.com/webhook/whatsapp';

    // Send to N8N webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: phoneNumber,
        message: message,
        enquiryId: enquiryId,
        timestamp: new Date().toISOString()
      }),
    });

    if (response.ok) {
      res.json({ message: "WhatsApp notification sent successfully" });
    } else {
      res.status(500).json({ message: "Failed to send WhatsApp notification" });
    }
  } catch (error) {
    console.error("Error sending WhatsApp notification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Enhanced allocate driver function with WhatsApp integration
export const allocateDriverWithNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { driverId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(driverId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const enquiry = await Enquiry.findById(id);
    const driver = await Driver.findById(driverId);

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    await enquiry.allocateDriver(driverId);
    await enquiry.addNotification('Driver Assigned', `Driver ${driver.name} has been assigned to your trip. Contact: ${driver.phone}`);

    const updatedEnquiry = await Enquiry.findById(id)
      .populate('allocatedDriver', 'name phone')
      .populate('allocatedCar', 'name category')
      .populate('allocatedVehicle', 'carNumber color status');

    // Send WhatsApp to driver
    const driverMessage = `New Trip Assignment:
Customer: ${enquiry.fullName}
Phone: ${enquiry.phoneNumber}
From: ${enquiry.from}
To: ${enquiry.to}
Date: ${new Date(enquiry.date).toLocaleDateString('en-IN')}
Time: ${enquiry.time}
Service: ${enquiry.serviceType}
Enquiry ID: ENQ-${enquiry._id.toString().slice(-6).toUpperCase()}

Please contact the customer and confirm the trip details.`;

    // Send WhatsApp to customer
    const customerMessage = `Driver assigned to your trip!

Driver Details:
Name: ${driver.name}
Phone: ${driver.phone}
Experience: ${driver.experienceYears} years
Rating: ${driver.rating?.toFixed(1) || 'N/A'}/5

Your driver will contact you soon to confirm the trip details.
Enquiry ID: ENQ-${enquiry._id.toString().slice(-6).toUpperCase()}`;

    // Send notifications (async, don't wait for response)
    Promise.all([
      sendWhatsAppViaWebhook(driver.phone, driverMessage, enquiry._id),
      sendWhatsAppViaWebhook(enquiry.phoneNumber, customerMessage, enquiry._id)
    ]).catch(error => {
      console.error("WhatsApp notification failed:", error);
    });

    res.json({
      message: "Driver allocated successfully",
      enquiry: updatedEnquiry,
    });
  } catch (error) {
    console.error("Error allocating driver:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Enhanced allocate vehicle function with WhatsApp integration
export const allocateVehicleWithNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { carId, vehicleId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(carId) || !mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const enquiry = await Enquiry.findById(id);
    const car = await Car.findById(carId);
    const vehicle = await Vehicle.findById(vehicleId);

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    await enquiry.allocateVehicle(carId, vehicleId);
    await enquiry.addNotification('Vehicle Assigned', `Vehicle ${car.name} (${vehicle.carNumber}) has been assigned to your trip.`);

    const updatedEnquiry = await Enquiry.findById(id)
      .populate('allocatedDriver', 'name phone')
      .populate('allocatedCar', 'name category')
      .populate('allocatedVehicle', 'carNumber color status');

    // Send WhatsApp to customer
    const customerMessage = `Vehicle assigned to your trip!

Vehicle Details:
Car: ${car.name} (${car.category})
Vehicle Number: ${vehicle.carNumber}
Color: ${vehicle.color}
Seating Capacity: ${car.seatingCapacity} people

Your vehicle is ready for the trip.
Enquiry ID: ENQ-${enquiry._id.toString().slice(-6).toUpperCase()}`;

    // Send notification (async, don't wait for response)
    sendWhatsAppViaWebhook(enquiry.phoneNumber, customerMessage, enquiry._id)
      .catch(error => {
        console.error("WhatsApp notification failed:", error);
      });

    res.json({
      message: "Vehicle allocated successfully",
      enquiry: updatedEnquiry,
    });
  } catch (error) {
    console.error("Error allocating vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Helper function to send WhatsApp via webhook
const sendWhatsAppViaWebhook = async (phoneNumber, message, enquiryId) => {
  const webhookUrl = process.env.N8N_WHATSAPP_WEBHOOK_URL || 'https://your-n8n-webhook-url.com/webhook/whatsapp';
  
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: phoneNumber,
      message: message,
      enquiryId: enquiryId,
      timestamp: new Date().toISOString()
    }),
  });

  if (!response.ok) {
    throw new Error(`WhatsApp webhook failed with status: ${response.status}`);
  }

  return response.json();
};