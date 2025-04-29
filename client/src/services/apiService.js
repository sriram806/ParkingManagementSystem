import axios from 'axios';

// Create an axios instance with increased timeout duration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://parkingmanagementsystem-1.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This is critical if backend expects cookies!
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Request Config:', config); // Log the request config
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization token added to request headers');
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error); // Log error if request fails
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response); // Log the successful response
    return response;
  },
  (error) => {
    console.error('Response Error:', error); // Log error if response fails
    if (error.response && error.response.status === 401) {
      console.log('Token expired or unauthorized, redirecting to login...');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Real API Services

const login = async (email, password) => {
  console.log('Attempting to log in with email:', email); // Log the login attempt
  const response = await api.post('/auth/login', { email, password });
  console.log('Login response:', response.data); // Log the login response
  return response;
};

const getVehicles = async (filters = {}) => {
  console.log('Fetching vehicles with filters:', filters); // Log the filters used
  const response = await api.get('/vehicles', { params: filters });
  console.log('Vehicles fetched:', response.data); // Log the fetched vehicles
  return response;
};

const getActiveVehicles = async () => {
  console.log('Fetching active vehicles'); // Log the request for active vehicles
  const response = await api.get('/vehicles/active');
  console.log('Active vehicles:', response.data); // Log the active vehicles response
  return response;
};

const getVehicleByNumber = async (vehicleNumber) => {
  console.log('Fetching vehicle by number:', vehicleNumber); // Log the vehicle number being fetched
  const response = await api.get(`/vehicles/${vehicleNumber}`);
  console.log('Vehicle details:', response.data); // Log the vehicle details
  return response;
};

const createVehicleEntry = async (vehicleData) => {
  console.log('Creating vehicle entry with data:', vehicleData); // Log the vehicle data being sent
  const response = await api.post('/vehicles/', vehicleData);
  console.log('Vehicle entry created:', response.data); // Log the creation response
  return response;
};

const processVehicleExit = async (vehicleId) => {
  if (!vehicleId) {
    console.error('Vehicle ID is undefined'); // Log error if vehicle ID is not provided
    return;
  }

  try {
    console.log('Processing exit for vehicle ID:', vehicleId); // Log vehicle exit attempt
    const response = await api.put(`/vehicles/${vehicleId}/exit`);
    console.log('Exit processed successfully:', response.data); // Log exit response
    return response;
  } catch (error) {
    console.error('Error processing vehicle exit:', error.response?.data || error.message); // Log exit error
    throw error;
  }
};

const getGuards = async () => {
  console.log('Fetching guard details'); // Log the request for guards
  const response = await api.get('/guards/');
  console.log('Guards fetched:', response.data); // Log the fetched guards
  return response;
};

const createGuard = async (guardData) => {
  console.log('Creating guard with data:', guardData); // Log the guard data being sent
  const response = await api.post('/guards/', guardData);
  console.log('Guard created:', response.data); // Log the creation response
  return response;
};

const updateGuard = async (guardId, guardData) => {
  console.log('Updating guard with ID:', guardId, 'and data:', guardData); // Log the update attempt
  const response = await api.put(`/guards/${guardId}`, guardData);
  console.log('Guard updated:', response.data); // Log the update response
  return response;
};

const deleteGuard = async (guardId) => {
  if (!guardId) {
    alert('Guard ID is missing or invalid.');
    console.error('Guard ID is missing or invalid'); // Log missing guard ID
    return;
  }

  try {
    console.log('Deleting guard with ID:', guardId); // Log the guard deletion attempt
    const response = await api.delete(`/guards/${guardId}`);
    console.log('Guard deleted successfully:', response.data); // Log the deletion response
    return response.data;
  } catch (error) {
    console.error('Error deleting guard:', error.response?.data || error.message); // Log deletion error
    alert('Error: ' + error.response?.data.message || 'Failed to delete guard');
    throw error;
  }
};

const getPricingSettings = async () => {
  console.log('Fetching pricing settings'); // Log the request for pricing settings
  const response = await api.get('/pricing');
  console.log('Pricing settings fetched:', response.data); // Log the fetched pricing settings
  return response;
};

const updatePricingSettings = async (pricingData) => {
  console.log('Updating pricing settings with data:', pricingData); // Log the pricing data being sent
  const response = await api.put('/pricing', pricingData);
  console.log('Pricing settings updated:', response.data); // Log the updated pricing response
  return response;
};

const getDashboardStats = async () => {
  try {
    console.log('Fetching dashboard statistics'); // Log the request for dashboard stats
    const response = await api.get('/stats/dashboard');
    console.log('Dashboard stats:', response.data); // Log the fetched stats
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error); // Log error if fetching stats fails
    throw error;
  }
};

const apiService = {
  login,
  getVehicles,
  getActiveVehicles,
  getVehicleByNumber,
  createVehicleEntry,
  processVehicleExit,
  getGuards,
  createGuard,
  updateGuard,
  deleteGuard,
  getPricingSettings,
  updatePricingSettings,
  getDashboardStats,
};

export default apiService;
