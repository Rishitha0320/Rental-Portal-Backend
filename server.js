import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/services.js';
import RentalRoutes from './routes/rentals.js';
import postRoutes from './routes/posts.js'
import path from 'path';

dotenv.config();
const app = express();

// app.use(cors());


app.use(cors({
  origin: 'https://rental-frontend.vercel.app', // your deployed frontend URL
  credentials: true, // if you send cookies or auth headers
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));


// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ Mongo Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/rentals',RentalRoutes );
app.use('/api/services', serviceRoutes);

app.use("/api/posts", postRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
