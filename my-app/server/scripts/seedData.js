const mongoose = require('mongoose');
const Service = require('../models/Service');
require('dotenv').config({ path: '../.env' });

const testServices = [
  {
    name: "UBC Food Bank",
    category: "Food Banks",
    address: "6138 Student Union Boulevard, Vancouver, BC",
    description: "AMS Food Bank provides food relief for students in need. Located in the UBC Nest building.",
    postalCode: "V6T 1Z1",
    locationCoordinates: {
      type: "Point",
      coordinates: [-123.2497, 49.2665] // UBC Nest
    }
  },
  {
    name: "West Point Grey Community Centre",
    category: "Community Services",
    address: "4397 W 2nd Ave, Vancouver, BC",
    description: "Community center offering various support services and programs for local residents",
    postalCode: "V6R 1K4",
    locationCoordinates: {
      type: "Point",
      coordinates: [-123.2054, 49.2713]
    }
  },
  {
    name: "UBC Student Legal Clinic",
    category: "Legal Aid",
    address: "6138 Student Union Blvd, Vancouver, BC",
    description: "Free legal advice and representation for UBC students",
    postalCode: "V6T 1Z1",
    locationCoordinates: {
      type: "Point",
      coordinates: [-123.2501, 49.2664]
    }
  },
  {
    name: "University Village Medical Clinic",
    category: "Healthcare",
    address: "5923 Berton Avenue, Vancouver, BC",
    description: "Walk-in clinic providing medical services to UBC and surrounding community",
    postalCode: "V6S 0B3",
    locationCoordinates: {
      type: "Point",
      coordinates: [-123.2359, 49.2559]
    }
  },
  {
    name: "AMS Student Nest Support Services",
    category: "Student Services",
    address: "6133 University Boulevard, Vancouver, BC",
    description: "Various student support services including advocacy, food bank, and wellness resources",
    postalCode: "V6T 1Z1",
    locationCoordinates: {
      type: "Point",
      coordinates: [-123.2495, 49.2663]
    }
  },
  {
    name: "Pacific Spirit Community Health Centre",
    category: "Healthcare",
    address: "2110 West 43rd Avenue, Vancouver, BC",
    description: "Community health center offering various health services and support programs",
    postalCode: "V6M 2E1",
    locationCoordinates: {
      type: "Point",
      coordinates: [-123.1557, 49.2333]
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