const mongoose = require('mongoose');
const Service = require('../models/Service');
require('dotenv').config({ path: '../.env' });

const testServices = [
  {
    name: "Downtown Food Bank",
    category: "Food Banks",
    address: "123 Main St, Toronto, ON",
    description: "Provides fresh and non-perishable food items to those in need",
    postalCode: "M5V 1A1",
    locationCoordinates: {
      type: "Point",
      coordinates: [-79.3832, 43.6532] // Toronto downtown
    }
  },
  {
    name: "East End Shelter",
    category: "Shelters",
    address: "456 Queen St E, Toronto, ON",
    description: "24/7 emergency shelter with support services",
    postalCode: "M5A 1T1",
    locationCoordinates: {
      type: "Point",
      coordinates: [-79.3600, 43.6547]
    }
  },
  {
    name: "West End Legal Clinic",
    category: "Legal Aid",
    address: "789 Dundas St W, Toronto, ON",
    description: "Free legal services for low-income residents",
    postalCode: "M6J 1T9",
    locationCoordinates: {
      type: "Point",
      coordinates: [-79.4100, 43.6500]
    }
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Service.deleteMany({});
    console.log('Cleared existing services');

    // Insert new data
    const result = await Service.insertMany(testServices);
    console.log('Inserted services:', result);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase();