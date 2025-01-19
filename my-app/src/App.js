import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ServiceSearch from './components/ServiceSearch';
import ServiceForm from './components/ServiceForm';
import ServiceMap from './components/ServiceMap';
import { auth } from './firebaseConfig';
import './App.css';

function App() {
  const [view, setView] = useState('search');
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5001/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
        console.log('Fetched services:', data); // Debug log
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-2 mb-8">
          <nav className="bg-white p-2 rounded-lg shadow-md flex space-x-2">
            <button
              onClick={() => setView('search')}
              className={`px-6 py-3 rounded-lg font-medium transition duration-200 ease-in-out ${
                view === 'search' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🔍 Search
            </button>
            {user && (
              <button
                onClick={() => setView('add')}
                className={`px-6 py-3 rounded-lg font-medium transition duration-200 ease-in-out ${
                  view === 'add' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                ➕ Add Service
              </button>
            )}
            <button
              onClick={() => setView('map')}
              className={`px-6 py-3 rounded-lg font-medium transition duration-200 ease-in-out ${
                view === 'map' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🗺️ Map View
            </button>
          </nav>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          {view === 'search' && <ServiceSearch services={services} />}
          {view === 'add' && user && <ServiceForm />}
          {view === 'map' && <ServiceMap services={services} />}
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-4 text-center">
        <p>&copy; 2024 Community Support Finder</p>
      </div>
    </footer>
    </div>
  );
}

export default App;