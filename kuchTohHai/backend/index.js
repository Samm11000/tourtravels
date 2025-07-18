
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import carRoutes from './routes/carRoutes.js';
import authRoutes from './routes/authRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js'; // New vehicle routes
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5175",
    "https://tourtravels-silk.vercel.app", // admin
    "https://tourtravels-3xq6.vercel.app",
    "https://www.mayatourandtravels.org" // frontend
  ],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/cars", carRoutes);
app.use("/api/admin", authRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/vehicles", vehicleRoutes); // New vehicle routes

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));