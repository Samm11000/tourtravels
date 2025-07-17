import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
  carNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  buyingDate: {
    type: Date,
    required: true,
  },
  photo: {
    type: String, // Cloudinary URL (optional)
  },
  rcPhoto: {
    type: String, // RC document photo (optional)
  },
  status: {
    type: String,
    enum: ['Available', 'Booked', 'Maintenance', 'Out of Service'],
    default: 'Available',
  },
  mileage: {
    type: Number,
    default: 0, // Current mileage/odometer reading
  },
  lastServiceDate: {
    type: Date,
  },
  nextServiceDate: {
    type: Date,
  },
  insuranceExpiry: {
    type: Date,
  },
  pucExpiry: {
    type: Date, // Pollution Under Control certificate
  },
  fitnessExpiry: {
    type: Date,
  },
  notes: {
    type: String, // Any additional notes about the vehicle
  },
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
  },
  totalTrips: {
    type: Number,
    default: 0,
  },
  totalRevenue: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Index for faster queries
vehicleSchema.index({ carId: 1 });
vehicleSchema.index({ carNumber: 1 });
vehicleSchema.index({ status: 1 });
vehicleSchema.index({ assignedDriver: 1 });

// Virtual for calculating vehicle age
vehicleSchema.virtual('vehicleAge').get(function() {
  if (this.buyingDate) {
    const now = new Date();
    const buying = new Date(this.buyingDate);
    return Math.floor((now - buying) / (365.25 * 24 * 60 * 60 * 1000));
  }
  return 0;
});

// Method to check if vehicle needs service
vehicleSchema.methods.needsService = function() {
  if (this.nextServiceDate) {
    const now = new Date();
    const serviceDate = new Date(this.nextServiceDate);
    return serviceDate <= now;
  }
  return false;
};

// Method to check if documents are expiring soon (within 30 days)
vehicleSchema.methods.getExpiringDocuments = function() {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
  const expiring = [];

  if (this.insuranceExpiry && new Date(this.insuranceExpiry) <= thirtyDaysFromNow) {
    expiring.push({ document: 'Insurance', expiry: this.insuranceExpiry });
  }
  if (this.pucExpiry && new Date(this.pucExpiry) <= thirtyDaysFromNow) {
    expiring.push({ document: 'PUC', expiry: this.pucExpiry });
  }
  if (this.fitnessExpiry && new Date(this.fitnessExpiry) <= thirtyDaysFromNow) {
    expiring.push({ document: 'Fitness', expiry: this.fitnessExpiry });
  }

  return expiring;
};

// Method to increment trip count and revenue
vehicleSchema.methods.addTrip = function(revenue = 0, rating = 0) {
  this.totalTrips += 1;
  this.totalRevenue += revenue;
  
  // Update average rating
  if (rating > 0) {
    this.averageRating = ((this.averageRating * (this.totalTrips - 1)) + rating) / this.totalTrips;
  }
  
  return this.save();
};

// Static method to get vehicle statistics for a car model
// vehicleSchema.statics.getCarStatistics = async function(carId) {
//   const stats = await this.aggregate([
//     { $match: { carId: mongoose.Types.ObjectId(carId) } },
//     {
//       $group: {
//         _id: '$carId',
//         totalVehicles: { $sum: 1 },
//         availableVehicles: {
//           $sum: { $cond: [{ $eq: ['$status', 'Available'] }, 1, 0] }
//         },
//         bookedVehicles: {
//           $sum: { $cond: [{ $eq: ['$status', 'Booked'] }, 1, 0] }
//         },
//         maintenanceVehicles: {
//           $sum: { $cond: [{ $eq: ['$status', 'Maintenance'] }, 1, 0] }
//         },
//         outOfServiceVehicles: {
//           $sum: { $cond: [{ $eq: ['$status', 'Out of Service'] }, 1, 0] }
//         },
//         totalTrips: { $sum: '$totalTrips' },
//         totalRevenue: { $sum: '$totalRevenue' },
//         averageRating: { $avg: '$averageRating' },
//         averageAge: { $avg: '$vehicleAge' },
//       }
//     }
//   ]);

//   return stats[0] || {
//     totalVehicles: 0,
//     availableVehicles: 0,
//     bookedVehicles: 0,
//     maintenanceVehicles: 0,
//     outOfServiceVehicles: 0,
//     totalTrips: 0,
//     totalRevenue: 0,
//     averageRating: 0,
//     averageAge: 0,
//   };
// };

vehicleSchema.statics.getCarStatistics = async function(carId) {
  const stats = await this.aggregate([
    { $match: { carId: new mongoose.Types.ObjectId(carId) } },
    {
      $group: {
        _id: '$carId',
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
        averageAge: { $avg: '$vehicleAge' }, // Note: this might not work in aggregation, see note below
      }
    }
  ]);

  return stats[0] || {
    totalVehicles: 0,
    availableVehicles: 0,
    bookedVehicles: 0,
    maintenanceVehicles: 0,
    outOfServiceVehicles: 0,
    totalTrips: 0,
    totalRevenue: 0,
    averageRating: 0,
    averageAge: 0,
  };
};


const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;