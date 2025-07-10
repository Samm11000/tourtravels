import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String, // e.g., Premium, Economy, SUV
    required: true,
  },
  rating: {
    type: Number, // e.g., 4.7
    min: 0,
    max: 5,
  },
  description: {
    type: String,
    required: true,
  },
  photos: [
    {
      type: String, // store image URLs or filenames
    }
  ],
  seatingCapacity: {
    type: String, // e.g., "4 Seater"
    required: true,
  },
  fuelType: {
    type: String, // Petrol, Diesel, EV
    required: true,
  },
  transmission: {
    type: String, // Manual, Automatic
    required: true,
  },
  mileage: {
    type: String, // e.g., "18 km/l"
    required: true,
  },
  features: [
    {
      type: String, // e.g., AC, GPS Navigation, etc.
    }
  ],
  specifications: {
    seating: String, // e.g., "4 + 1 Driver"
    luggage: String, // e.g., "3 Large Bags"
  },
  pricing: {
    localTrip: {
      ratePerKm: Number, // ₹12
      minKmPerDay: Number, // 250
    },
    outstationTrip: {
      ratePerKm: Number,
      driverAllowancePerDay: Number,
    },
    airportTrip: {
      ratePerKm: Number,
      tripType: {
        type: String,
        default: "One way",
      },
    },
  }
}, {
  timestamps: true
});

const Car = mongoose.model('Car', carSchema);
export default Car;
