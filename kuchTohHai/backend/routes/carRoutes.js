import express from "express";
import {
  addCar,
  getAllCars,
  deleteCar,
  updateCar,
  getCarById,
} from "../controllers/carController.js";
import { verifyUser } from "../middlewares/authMiddleware.js"; // Optional if auth needed
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/add", upload.array('photos', 5), verifyUser, addCar); // protected
router.get("/getallcars", getAllCars);            // public or protected
router.delete("/:id", verifyUser, deleteCar); // protected
router.put("/update/:id", upload.array("photos", 5), verifyUser, updateCar);
router.get("/:id", getCarById);

export default router;
