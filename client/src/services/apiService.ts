import axios, { AxiosResponse } from 'axios';

// Define types for responses and data structures
interface Vehicle {
  id: string;
  number: string;
  status: string;
  // Add other properties of vehicle as needed
}

interface Guard {
  id: string;
  name: string;
  // Add other properties of guard as needed
}

interface PricingSettings {
  id: string;
  rate: number;
  // Add other properties of pricing settings as needed
}

interface DashboardStats {
  totalVehicles: number;
  activeVehicles: number;
  // Add other properties of dashboard stats as needed
}

// Create an axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://parking-management-system-chi.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Request sent to:', config.url); // Log the API endpoint
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization token added'); // Log when the token is added
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error); // Log request error
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    console.log('Response received from:', response.config.url); // Log successful response
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized access, redirecting to login...'); // Log token expiration
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else {
      console.error('Response Error:', error); // Log response error
    }
    return Promise.reject(error);
  }
);

// Real API Services

const login = async (email: string, password: string): Promise<AxiosResponse> => {
  console.log(`Attempting login for email: ${email}`); // Log the login attempt
  try {
    const response = await api.post('/auth/login', { email, password });
    console.log('Login successful:', response.data); // Log successful login
    return response;
  } catch (error) {
    console.error('Login error:', error); // Log login error
    throw error;
  }
};

const getVehicles = async (filters: Record<string, any> = {}): Promise<AxiosResponse<Vehicle[]>> => {
  console.log('Fetching vehicles with filters:', filters); // Log the filters being used
  const response = await api.get('/vehicles', { params: filters });
  console.log('Vehicles fetched:', response.data); // Log the fetched vehicles data
  return response;
};

const getActiveVehicles = async (): Promise<AxiosResponse<Vehicle[]>> => {
  console.log('Fetching active vehicles'); // Log the request for active vehicles
  const response = await api.get('/vehicles/active');
  console.log('Active vehicles:', response.data); // Log the active vehicles data
  return response;
};

const getVehicleByNumber = async (vehicleNumber: string): Promise<AxiosResponse<Vehicle>> => {
  console.log('Fetching vehicle details for number:', vehicleNumber); // Log the vehicle number being fetched
  const response = await api.get(`/vehicles/${vehicleNumber}`);
  console.log('Vehicle details fetched:', response.data); // Log the vehicle details data
  return response;
};

const createVehicleEntry = async (vehicleData: any): Promise<AxiosResponse<Vehicle>> => {
  console.log('Creating vehicle entry with data:', vehicleData); // Log the vehicle data being sent
  const response = await api.post('/vehicles/', vehicleData);
  console.log('Vehicle entry created:', response.data); // Log the creation response
  return response;
};

const processVehicleExit = async (vehicleId: string): Promise<AxiosResponse> => {
  console.log(`Processing exit for vehicle ID: ${vehicleId}`); // Log vehicle exit processing
  try {
    const response = await api.put(`/vehicles/${vehicleId}/exit`);
    console.log('Vehicle exit processed:', response.data); // Log exit processing result
    return response;
  } catch (error) {
    console.error('Error processing vehicle exit:', error); // Log error during exit
    throw error;
  }
};

const getGuards = async (): Promise<AxiosResponse<Guard[]>> => {
  console.log('Fetching guard details'); // Log the request for guard data
  const response = await api.get('/guards/');
  console.log('Guards fetched:', response.data); // Log the guards data
  return response;
};

const createGuard = async (guardData: any): Promise<AxiosResponse<Guard>> => {
  console.log('Creating guard with data:', guardData); // Log the guard data being sent
  const response = await api.post('/guards/', guardData);
  console.log('Guard created:', response.data); // Log the creation response
  return response;
};

const updateGuard = async (guardId: string, guardData: any): Promise<AxiosResponse<Guard>> => {
  console.log(`Updating guard with ID: ${guardId} and data:`, guardData); // Log the update request
  const response = await api.put(`/guards/${guardId}`, guardData);
  console.log('Guard updated:', response.data); // Log the update response
  return response;
};

const deleteGuard = async (guardId: string): Promise<void> => {
  console.log(`Attempting to delete guard with ID: ${guardId}`); // Log the deletion attempt
  try {
    const response = await api.delete(`/guards/${guardId}`);
    console.log('Guard deleted successfully:', response.data); // Log successful deletion
  } catch (error) {
    console.error('Error deleting guard:', error); // Log error during deletion
    if (error.response) {
      alert('Error: ' + error.response.data.message || 'Failed to delete guard');
    } else if (error.request) {
      alert('Error: No response from server');
    } else {
      alert('Error: ' + error.message);
    }
    throw error;
  }
};

const getPricingSettings = async (): Promise<AxiosResponse<PricingSettings>> => {
  console.log('Fetching pricing settings'); // Log the request for pricing settings
  const response = await api.get('/pricing');
  console.log('Pricing settings fetched:', response.data); // Log the pricing settings data
  return response;
};

const updatePricingSettings = async (pricingData: any): Promise<AxiosResponse<PricingSettings>> => {
  console.log('Updating pricing settings with data:', pricingData); // Log the pricing data being sent
  const response = await api.put('/pricing', pricingData);
  console.log('Pricing settings updated:', response.data); // Log the update response
  return response;
};

const getDashboardStats = async (): Promise<DashboardStats> => {
  console.log('Fetching dashboard statistics'); // Log the request for dashboard stats
  try {
    const response = await api.get('/stats/dashboard');
    console.log('Dashboard stats fetched:', response.data); // Log the fetched stats
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error); // Log error while fetching stats
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
