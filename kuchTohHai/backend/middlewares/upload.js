import multer from 'multer';
// import { storage } from '../config/cloudinary.js';

const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
