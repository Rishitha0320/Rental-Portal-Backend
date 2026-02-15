
// controllers/serviceController.js
import Service from '../models/Service.js';
import fs from 'fs';

// Create Service
export const createService = async (req, res) => {
  try {
    const { serviceName, date, time, availableDays, address, phone } = req.body;
    const images = req.files?.map(file => file.filename) || [];

    const service = await Service.create({
      serviceName,
      date,
      time,
      availableDays: availableDays ? JSON.parse(availableDays) : [],
      address,
      phone,
      images,
      createdBy: req.user._id
    });

    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().populate('createdBy', 'name email role');
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// // Get All Services
// export const getServices = async (req, res) => {
//   try {
//     // populate createdBy so frontend knows who created the service
//     const services = await Service.find().populate('createdBy', 'name email role');
//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };





// Get Services by Provider
export const getProviderServices = async (req, res) => {
  try {
    const services = await Service.find({ createdBy: req.user._id });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Service
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    // Only creator can update
    if (service.createdBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Forbidden' });

    const { serviceName, date, time, availableDays, address, phone } = req.body;
    const images = req.files?.map(file => file.filename) || service.images;

    service.serviceName = serviceName || service.serviceName;
    service.date = date || service.date;
    service.time = time || service.time;
    service.availableDays = availableDays ? JSON.parse(availableDays) : service.availableDays;
    service.address = address || service.address;
    service.phone = phone || service.phone;
    service.images = images;

    await service.save();
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (service.createdBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Forbidden' });

    // Remove images from server
    service.images.forEach(img => fs.unlink(`uploads/${img}`, () => {}));
    await service.deleteOne();
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
