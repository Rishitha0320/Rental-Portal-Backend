// import mongoose from 'mongoose';

// const serviceSchema = new mongoose.Schema({
//   provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   address: { type: String, required: true },
//   price: { type: Number, required: true },
//   images: [String],
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model('Service', serviceSchema);

// import mongoose from "mongoose";

// const serviceSchema = new mongoose.Schema({
//   serviceName: { type: String, required: true },
//   description: { type: String },
//   image: { type: String }, // URL or file path
//     date: { type: Date, required: true },        // store as Date
//   time: { type: String, required: true },      // store as string (HH:MM)
//   address: { type: String, required: true },
//   phone: { type: String, required: true },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
// }, { timestamps: true });

// export default mongoose.model("Service", serviceSchema);

// import mongoose from "mongoose";

// const serviceSchema = new mongoose.Schema({
//   serviceName: { type: String, required: true },
//   description: { type: String },
//   images: [{ type: String }], // ✅ array of image filenames
//   availableDays: [{ type: String }], // ✅ array of days
//   date: { type: Date, required: true },
//   time: { type: String, required: true },
//   address: { type: String, required: true },
//   phone: { type: String, required: true },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// }, { timestamps: true });



import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],       // allow multiple images
  date: { type: Date, required: true },
  time: { type: String, required: true },
  availableDays: [{ type: String }], // store days array
  address: { type: String, required: true },
  phone: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
