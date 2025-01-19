import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const ServiceMap = ({ services = [] }) => {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIcon2x,
      shadowUrl: markerShadow,
    });
  }, []);

  const defaultCenter = [49.2606, -123.2460];
  console.log('Services data:', services);

  return (
    <div className="h-[500px] w-full">
      <MapContainer
        center={defaultCenter}
        zoom={14}
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
              service.locationCoordinates?.coordinates[1] || defaultCenter[0],
              service.locationCoordinates?.coordinates[0] || defaultCenter[1]
            ]}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{service.name}</h3>
                <p className="text-gray-600">{service.category}</p>
                <p className="text-sm">{service.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ServiceMap;