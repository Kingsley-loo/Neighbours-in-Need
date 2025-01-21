import React, { useState, useEffect } from 'react';
import { fetchServices } from '../services/fetchServices';
import ServiceList from './ServiceList';
import ServiceMap from './ServiceMap';

const ServiceSearch = ({ services }) => {
  const [postalCode, setPostalCode] = useState('');
  const [category, setCategory] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('list');

  // Fetch all services on component mount
  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const response = await fetch('http://localhost:5001/services/all');
        const data = await response.json();
        console.log('Initial services:', data);
        setFilteredServices(data);
      } catch (err) {
        console.error('Error fetching initial services:', err);
        setError('Failed to load services');
      }
    };
    fetchAllServices();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('Searching with:', { postalCode, category });
      const data = await fetchServices(postalCode, category);
      console.log('Search results:', data);
      setFilteredServices(data);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Community Support Finder</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Postal Code</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter postal code (e.g., M5V 1A1)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">All Categories</option>
              <option value="Food Banks">Food Banks</option>
              <option value="Shelters">Shelters</option>
              <option value="Legal Aid">Legal Aid</option>
            </select>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search Services'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded ${
              view === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setView('map')}
            className={`px-4 py-2 rounded ${
              view === 'map' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200'
            }`}
          >
            Map View
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {view === 'list' ? (
          <ServiceList services={filteredServices} />
        ) : (
          <ServiceMap services={filteredServices} />
        )}
      </div>
    </div>
  );
};

export default ServiceSearch;