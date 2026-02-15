

// // import express from "express";
// // import {
// //   createService,
// //   getAllServices,
// //   getMyServices,
// //   updateService,
// //   deleteService,
// // } from "../controllers/serviceController.js";
// // import { protect, authorize } from "../middleware/auth.js";

// // const router = express.Router();

// // // Public (all roles can view)
// // router.get("/", getAllServices);

// // // Service provider-only routes
// // router.post("/", protect, authorize("serviceprovider"), createService);
// // router.get("/my", protect, authorize("serviceprovider"), getMyServices);
// // router.put("/:id", protect, authorize("serviceprovider"), updateService);
// // router.delete("/:id", protect, authorize("serviceprovider"), deleteService);

// // export default router;

// // models/Service.js
// import mongoose from 'mongoose';

// const serviceSchema = new mongoose.Schema({
//   serviceName: { type: String, required: true },
//   date: { type: Date, required: true },               // chosen date
//   time: { type: String, required: true },            // chosen time (HH:MM)
//   availableDays: [{ type: String, enum: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] }],
//   address: { type: String, required: true },
//   phone: { type: String, required: true },
//   images: [String],
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// }, { timestamps: true });

// export default mongoose.model('Service', serviceSchema);


// routes/services.js

import express from 'express';
import multer from 'multer';
import { createService, getServices, updateService, deleteService, getProviderServices } from '../controllers/serviceController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Multer for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Public: view all services
router.get('/', getServices);

// Provider CRUD routes
router.get('/provider/my', protect, authorize('serviceprovider'), getProviderServices);
router.post('/', protect, authorize('serviceprovider'), upload.array('images'), createService);
router.put('/:id', protect, authorize('serviceprovider'), upload.array('images'), updateService);
router.delete('/:id', protect, authorize('serviceprovider'), deleteService);

export default router;
