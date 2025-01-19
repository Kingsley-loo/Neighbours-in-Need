const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serviceRoutes = require('./routes/serviceRoutes');
require('dotenv').config();

const app = express();
let port = process.env.PORT || 5001;  // Changed from const to let

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    startServer();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Server start function
function startServer() {
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy. Trying ${port + 1}`);
      port += 1;
      server.close();
      startServer();
    } else {
      console.error('Server error:', err);
    }
  });
}

// Routes
app.use('/services', serviceRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});