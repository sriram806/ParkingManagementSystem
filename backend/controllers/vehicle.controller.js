import Vehicle from '../models/vehicle.model.js';
import Pricing from '../models/price.model.js';

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles' });
  }
};

export const getActiveVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ status: 'active' });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching active vehicles' });
  }
};

export const getVehicleByNumber = async (req, res) => {
  try {
    const { vehicleNumber } = req.params;
    const vehicle = await Vehicle.findOne({ 
      vehicleNumber: vehicleNumber.toUpperCase() 
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    if (vehicle.status === 'exited') {
      return res.status(400).json({ 
        message: 'Vehicle has already exited',
        vehicle 
      });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle' });
  }
};

export const createVehicleEntry = async (req, res) => {
  try {
    const { vehicleNumber, vehicleType, guardId, guardName, shift } = req.body;

    // Validate the required fields
    if (!vehicleNumber || !vehicleType || !guardId || !guardName || !shift) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if vehicle is already parked
    const existingVehicle = await Vehicle.findOne({ 
      vehicleNumber: vehicleNumber.toUpperCase(),
      status: 'active'
    });

    if (existingVehicle) {
      return res.status(400).json({ message: 'Vehicle is already parked' });
    }

    // Get the count of existing vehicles to generate the bill number
    const vehicleCount = await Vehicle.countDocuments();
    const billNumber = `BILL${String(vehicleCount + 1).padStart(3, '0')}`;

    // Create new vehicle entry
    const vehicle = new Vehicle({
      vehicleNumber: vehicleNumber.toUpperCase(),
      vehicleType,
      guardId,
      guardName,
      shift,
      billNumber // Set the bill number manually
    });

    // Save the vehicle document
    await vehicle.save();

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle entry', error: error.message });
  }
};


export const processVehicleExit = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    if (vehicle.status === 'exited') {
      return res.status(400).json({ message: 'Vehicle has already exited' });
    }

    const pricing = await Pricing.findOne({ isActive: true });
    if (!pricing) {
      return res.status(400).json({ message: 'Pricing not configured' });
    }

    const entryTime = new Date(vehicle.entryTime).getTime();
    const exitTime = Date.now();
    const durationHours = (exitTime - entryTime) / (1000 * 60 * 60);
    const days = Math.ceil(durationHours / 24);

    let feePerDay = 0;
    switch (vehicle.vehicleType) {
      case 'twoWheeler':
        feePerDay = pricing.twoWheeler;
        break;
      case 'threeWheeler':
        feePerDay = pricing.threeWheeler;
        break;
      case 'fourWheeler':
        feePerDay = pricing.fourWheeler;
        break;
      default:
        return res.status(400).json({ message: 'Invalid vehicle type' });
    }

    const totalFees = days * feePerDay;

    vehicle.exitTime = new Date();
    vehicle.fees = totalFees;
    vehicle.status = 'exited';

    await vehicle.save();
    res.json(vehicle);
  } catch (error) {
    console.error('Error processing vehicle exit:', error);
    res.status(500).json({ message: 'Error processing vehicle exit', error: error.message });
  }
};
