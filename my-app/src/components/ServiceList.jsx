import React from 'react';

const ServiceList = ({ services }) => {
  return (
    <div className="divide-y divide-gray-200">
      {services.map((service) => (
        <div key={service._id} className="p-6 hover:bg-gray-50 transition duration-150">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {service.name}
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                {service.category}
              </span>
            </div>
            <span className="text-sm text-gray-500">{service.postalCode}</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">{service.description}</p>
          <p className="mt-2 text-sm text-gray-500">{service.address}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;