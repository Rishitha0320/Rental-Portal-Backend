import Rental from '../models/Rental.js';
import path from 'path';
import fs from 'fs';

// ✅ CREATE RENTAL
export const createRental = async (req, res) => {
  try {
    const data = req.body;
    data.owner = req.user._id;

    if (req.files && req.files.length > 0) {
      data.images = req.files.map(file => file.filename);
    }

    const rental = await Rental.create(data);
    res.status(201).json(rental);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET ALL RENTALS
export const getRentals = async (req, res) => {
  const rentals = await Rental.find().populate('owner', 'name email phone');
  res.json(rentals);
};

// ✅ GET SINGLE RENTAL
export const getRental = async (req, res) => {
  const rental = await Rental.findById(req.params.id).populate('owner', 'name email phone');
  if (!rental) return res.status(404).json({ message: 'Not found' });
  res.json(rental);
};

// ✅ GET USER'S RENTALS
export const getUserRentals = async (req, res) => {
  const rentals = await Rental.find({ owner: req.user._id });
  res.json(rentals);
};

// ✅ UPDATE RENTAL
export const updateRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).json({ message: 'Not found' });

    if (!rental.owner.equals(req.user._id)) 
      return res.status(403).json({ message: 'Not authorized' });

    Object.assign(rental, req.body);

    if (req.files && req.files.length > 0) {
      rental.images?.forEach(img => {
        const filePath = path.join('uploads', img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
      rental.images = req.files.map(file => file.filename);
    }

    await rental.save();
    res.json({ message: 'Rental updated successfully', rental });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ DELETE RENTAL
export const deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).json({ message: 'Not found' });
    if (!rental.owner.equals(req.user._id) && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not owner' });

    rental.images?.forEach(img => {
      const filePath = path.join('uploads', img);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    await rental.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
