import React from 'react';

const ServiceList = ({ services }) => {
  if (!Array.isArray(services) || services.length === 0) {
    return <p>No services found</p>;
  }

  return (
    <div>
      <h3>Services List</h3>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            <strong>{service.name}</strong> - {service.category}
            <p>{service.description}</p>
            <p>{service.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
