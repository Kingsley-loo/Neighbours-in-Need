export const fetchServices = async (postalCode, category) => {
    try {
      console.log('Fetching services with:', { postalCode, category });
      
      let url = 'http://localhost:5001/services';
      
      // Add query parameters if they exist
      const params = new URLSearchParams();
      if (postalCode) params.append('postalCode', postalCode);
      if (category) params.append('category', category);
      
      // If there are any parameters, add them to the URL
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      console.log('Fetching from URL:', url);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  };