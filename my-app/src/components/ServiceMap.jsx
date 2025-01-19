import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ServiceMap = ({ services }) => {
  // Default center (Toronto)
  const defaultCenter = [43.6532, -79.3832];

  return (
    <div className="h-[500px] w-full">
      <MapContainer
        center={defaultCenter}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {services.map((service) => (
          <Marker
            key={service._id}
            position={[
              service.locationCoordinates.coordinates[1],
              service.locationCoordinates.coordinates[0]
            ]}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{service.name}</h3>
                <p className="text-sm">{service.category}</p>
                <p className="text-sm mt-1">{service.address}</p>
                <p className="text-sm mt-1">{service.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ServiceMap;