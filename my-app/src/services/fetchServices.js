export const fetchServices = async (postalCode, category) => {
  try {
    console.log('Fetching services with:', { postalCode, category });
    const response = await fetch(
      `http://localhost:5001/services?postalCode=${postalCode}&category=${category}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    console.log('Received data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};