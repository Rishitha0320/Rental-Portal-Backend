// import mongoose from 'mongoose';

// const rentalSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   address: String,
//   price: Number,
//   images: [String],
//   gps: { lat: Number, lng: Number },
//   owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model('Rental', rentalSchema);

import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  address: String,
  phone: String, // ✅ added
  price: Number,
  images: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Rental', rentalSchema);
