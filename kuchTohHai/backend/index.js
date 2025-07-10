import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import carRoutes from './routes/carRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';
import enquiryRoutes from './routes/enquiryRoutes.js'


dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://tourtravels-f58p8cikk-swyamyadav1407-gmailcoms-projects.vercel.app", //admin
    "https://your-frontend.vercel.app" //frontend
  ],
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());

app.use("/api/cars", carRoutes);
app.use("/api/admin", authRoutes);
app.use("/api/enquiry", enquiryRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
