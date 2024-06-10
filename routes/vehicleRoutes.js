const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const db = require('../models');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Get all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await db.Vehicle.findAll();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single vehicle by ID
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await db.Vehicle.findByPk(req.params.id);
    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new vehicle with image upload
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { make, model, type, transmission, price_per_day, description, motor_power_hp, fuel_type, engine_capacity_cc, traction } = req.body;
    const image_urls = req.files.map(file => `/uploads/${file.filename}`);

    const vehicle = await db.Vehicle.create({
      make,
      model,
      type,
      transmission,
      price_per_day,
      description,
      motor_power_hp,
      fuel_type,
      engine_capacity_cc,
      traction,
      image_urls: JSON.stringify(image_urls),
    });

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
