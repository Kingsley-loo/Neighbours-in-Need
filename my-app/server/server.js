const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serviceRoutes = require('./routes/serviceRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  console.log('Test route hit');
  res.json({ message: 'Server is running!' });
});

// Routes
app.use('/services', serviceRoutes);

// MongoDB connection
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    console.log('MongoDB URI:', process.env.DB_URI);
    startServer();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

function startServer() {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}