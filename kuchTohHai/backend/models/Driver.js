import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  photo: {
    type: String, // Cloudinary URL
  },
  aadharPhoto: {
    type: String, // Cloudinary URL (optional)
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  licenseExpiry: {
    type: Date,
    required: true,
  },
  totalTrips: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'On Leave'],
    default: 'Active',
  },
  experienceYears: {
    type: Number,
    min: 0,
  },
  salary: {
    type: Number,
    min: 0,
  },
  emergencyContact: {
    name: String,
    phone: String,
    relation: String,
  },
  documents: {
    licenseVerified: {
      type: Boolean,
      default: false,
    },
    aadharVerified: {
      type: Boolean,
      default: false,
    },
    policeVerification: {
      type: Boolean,
      default: false,
    },
  },
  assignedVehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
  },
  lastTripDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Index for faster queries
driverSchema.index({ phone: 1 });
driverSchema.index({ licenseNumber: 1 });
driverSchema.index({ status: 1 });

// Virtual for calculating years of service
driverSchema.virtual('yearsOfService').get(function() {
  if (this.joiningDate) {
    const now = new Date();
    const joining = new Date(this.joiningDate);
    return Math.floor((now - joining) / (365.25 * 24 * 60 * 60 * 1000));
  }
  return 0;
});

// Method to increment trip count
driverSchema.methods.incrementTrips = function() {
  this.totalTrips += 1;
  this.lastTripDate = new Date();
  return this.save();
};

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;