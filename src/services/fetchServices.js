// Function to fetch services based on postal code and category (GET)
export const fetchServices = async (postalCode, category) => {
  const response = await fetch(`http://localhost:5001/services?postalCode=${postalCode}&category=${category}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to fetch services');
  }
};

// Function to post a new service (POST)
export const postService = async (serviceData) => {
  const response = await fetch('http://localhost:5001/services', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(serviceData),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to add service');
  }
};
