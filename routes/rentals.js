// import express from 'express';
// import { protect, authorize } from '../middleware/auth.js';
// import { createRental, getRentals, getRental, updateRental, deleteRental, getUserRentals } from '../controllers/rentalController.js';
// import upload from "../middleware/multer.js"; // ✅ import multer middleware


// const router = express.Router();
// router.get('/', getRentals);
// router.get('/mine', protect, getUserRentals);
// router.post('/', protect, authorize('landlord'),upload.array('images',5), createRental);
// router.get('/:id', getRental);
// router.put('/:id', protect, authorize('landlord'), updateRental);
// router.delete('/:id', protect, authorize('landlord', 'admin'), deleteRental);

// export default router;

import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { createRental, getRentals, getRental, updateRental, deleteRental, getUserRentals } from '../controllers/rentalController.js';
import upload from "../middleware/multer.js";

const router = express.Router();
router.get('/', getRentals);
router.get('/mine', protect, getUserRentals);
router.post('/', protect, authorize('landlord'), upload.array('images', 5), createRental);
router.get('/:id', getRental);
router.put('/:id', protect, authorize('landlord'), upload.array('images', 5), updateRental);
router.delete('/:id', protect, authorize('landlord', 'admin'), deleteRental);

export default router;

/*
get by id
update , delete ->id 
post id
*/