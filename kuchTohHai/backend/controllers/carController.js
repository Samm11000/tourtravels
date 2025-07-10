import cloudinary from '../config/cloudinary.js';
import getDataUri from '../config/dataUri.js';
import Car from '../models/Car.js';
import mongoose from 'mongoose';


export const addCar = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      seatingCapacity,
      fuelType,
      transmission,
      mileage,
      rating,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !category ||
      !description ||
      !seatingCapacity ||
      !fuelType ||
      !transmission ||
      !mileage ||
      !req.body["pricing.localTrip.ratePerKm"]
    ) {
      return res.status(400).json({
        message: "Please provide all required fields.",
        requiredFields: [
          "name",
          "category",
          "description",
          "seatingCapacity",
          "fuelType",
          "transmission",
          "mileage",
          "pricing.localTrip.ratePerKm",
        ],
      });
    }

    // Parse rating as number
    const parsedRating = rating ? parseFloat(rating) : undefined;

    // Parse nested pricing
    const pricing = {
      localTrip: {
        ratePerKm: parseFloat(req.body["pricing.localTrip.ratePerKm"]) || 0,
        minKmPerDay:
          parseFloat(req.body["pricing.localTrip.minKmPerDay"]) || 0,
      },
      outstationTrip: {
        ratePerKm:
          parseFloat(req.body["pricing.outstationTrip.ratePerKm"]) || 0,
        driverAllowancePerDay:
          parseFloat(req.body["pricing.outstationTrip.driverAllowancePerDay"]) ||
          0,
      },
      airportTrip: {
        ratePerKm: parseFloat(req.body["pricing.airportTrip.ratePerKm"]) || 0,
        tripType: req.body["pricing.airportTrip.tripType"] || "One way",
      },
    };

    // Parse features (support both "features[]" and "features")
    let features = [];
    if (req.body["features[]"]) {
      features = Array.isArray(req.body["features[]"])
        ? req.body["features[]"]
        : [req.body["features[]"]];
    } else if (req.body.features) {
      features = Array.isArray(req.body.features)
        ? req.body.features
        : [req.body.features];
    }

    // Parse specifications
    const specifications = {
      seating: req.body["specifications.seating"] || "",
      luggage: req.body["specifications.luggage"] || "",
    };

    // Upload photos to Cloudinary
    const photos = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileContent = getDataUri(file);
        const uploadResult = await cloudinary.uploader.upload(
          fileContent.content,
          { folder: "cars" }
        );
        photos.push(uploadResult.secure_url);
      }
    }

    // Create new car
    const newCar = new Car({
      name,
      category,
      description,
      seatingCapacity,
      fuelType,
      transmission,
      mileage,
      rating: parsedRating,
      pricing,
      specifications,
      features,
      photos,
    });

    const savedCar = await newCar.save();

    res.status(201).json({
      message: "Car added successfully",
      car: savedCar,
    });
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};


export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cars", error });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid car ID" });
    }

    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Optional: If you store Cloudinary public IDs, delete them from Cloudinary here

    await car.deleteOne();

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const updateData = req.body;

    // Optional: handle new image uploads
    let uploadedPhotos = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileContent = getDataUri(file);
        const uploadResult = await cloudinary.uploader.upload(fileContent.content, {
          folder: "cars",
        });
        uploadedPhotos.push(uploadResult.secure_url);
      }
      updateData.photos = uploadedPhotos; // Replace old photos
    }

    const updatedCar = await Car.findByIdAndUpdate(carId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({
      message: "Car updated successfully",
      car: updatedCar,
    });
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};


export const getCarById = async (req, res) => {
  try {
    const carId = req.params.id;

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
