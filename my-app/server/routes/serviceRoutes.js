const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Get all services
router.get('/all', async (req, res) => {
  try {
    const services = await Service.find({});
    console.log('Fetching all services:', services);
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search services
router.get('/', async (req, res) => {
  const { postalCode, category } = req.query;
  console.log('Search params:', { postalCode, category });

  try {
    let query = {};
    
    // Make the search more flexible
    if (postalCode) {
      query.postalCode = { $regex: new RegExp(postalCode, 'i') };
    }
    if (category) {
      query.category = { $regex: new RegExp(category, 'i') };
    }

    console.log('MongoDB query:', query);
    const services = await Service.find(query);
    console.log('Search results:', services);
    res.json(services);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;