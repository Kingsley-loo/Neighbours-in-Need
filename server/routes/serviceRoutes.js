const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// GET services based on postal code and category
router.get('/', async (req, res) => {
  const { postalCode, category } = req.query;
  try {
    let query = {};
    if (postalCode) query.postalCode = postalCode;
    if (category) query.category = category;
    
    const services = await Service.find(query);
    res.json(services);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST a new service
router.post('/', async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;