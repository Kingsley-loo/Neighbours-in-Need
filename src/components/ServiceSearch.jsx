import React, { useState } from 'react';
import { fetchServices, postService } from '../services/fetchServices';
import ServiceList from './ServiceList';

const ServiceSearch = () => {
  const [postalCode, setPostalCode] = useState('');
  const [category, setCategory] = useState('');
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: '',
    category: '',
    address: '',
    description: '',
    postalCode: '',
    locationCoordinates: { type: 'Point', coordinates: [] },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle Search
  const handleSearch = async () => {
    if (!postalCode || !category) {
      setError('Both postal code and category are required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const fetchedServices = await fetchServices(postalCode, category);
      setServices(fetchedServices);
    } catch (err) {
      setError('Failed to fetch services.');
    }
    setLoading(false);
  };

  // Handle Add Service
  const handleAddService = async () => {
    setLoading(true);
    setError(null);
    try {
      const addedService = await postService(newService);
      setServices([...services, addedService]);
    } catch (err) {
      setError('Failed to add service.');
    }
    setLoading(false);
  };

  return (
    <div className="service-search">
      <h2>Find Community Services</h2>

      {/* Search Form */}
      <div>
        <label>
          Postal Code:
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter postal code"
          />
        </label>
      </div>
      <div>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="Food Banks">Food Banks</option>
            <option value="Shelters">Shelters</option>
            <option value="Legal Aid">Legal Aid</option>
            {/* Add more categories as needed */}
          </select>
        </label>
      </div>
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Loading...' : 'Search'}
      </button>

      {/* Add New Service Form */}
      <h3>Add New Service</h3>
      <div>
        <input
          type="text"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          placeholder="Service Name"
        />
        <input
          type="text"
          value={newService.category}
          onChange={(e) => setNewService({ ...newService, category: e.target.value })}
          placeholder="Category"
        />
        <input
          type="text"
          value={newService.address}
          onChange={(e) => setNewService({ ...newService, address: e.target.value })}
          placeholder="Address"
        />
        <input
          type="text"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          placeholder="Description"
        />
        <input
          type="text"
          value={newService.postalCode}
          onChange={(e) => setNewService({ ...newService, postalCode: e.target.value })}
          placeholder="Postal Code"
        />
        <button onClick={handleAddService} disabled={loading}>
          {loading ? 'Adding...' : 'Add Service'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <ServiceList services={services} />
    </div>
  );
};

export default ServiceSearch;
