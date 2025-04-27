export interface Vehicle {
  id: string;
  vehicleNumber: string;
  vehicleType: 'twoWheeler' | 'threeWheeler' | 'fourWheeler';
  entryTime: string;
  exitTime: string | null;
  guardId: string;
  guardName: string;
  shift: 'day' | 'night';
  fees: number | null;
  status: 'active' | 'exited';
  parkingSpot?: string;
  color?: string;
  brand?: string;
  history?: VehicleHistory[];
  billNumber?: string;
  parkingPass?: ParkingPass;
}

export interface ParkingPass {
  id: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  monthsDuration: number;
  amount: number;
  status: 'active' | 'expired';
  billNumber: string;
  createdAt: string;
}

export interface VehicleHistory {
  id: string;
  vehicleId: string;
  action: 'entry' | 'exit' | 'spot_change' | 'overstay_alert' | 'pass_created' | 'pass_expired';
  timestamp: string;
  details: {
    parkingSpot?: string;
    fees?: number;
    guardName?: string;
    notes?: string;
    billNumber?: string;
  };
}

export interface ParkingSpot {
  id: string;
  number: string;
  type: 'twoWheeler' | 'threeWheeler' | 'fourWheeler';
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  vehicle?: Vehicle;
  lastUpdated: string;
}

export interface ParkingZone {
  id: string;
  name: string;
  spots: ParkingSpot[];
  type: 'twoWheeler' | 'threeWheeler' | 'fourWheeler';
  capacity: number;
  occupied: number;
}

export interface Bill {
  billNumber: string;
  vehicleNumber: string;
  vehicleType: string;
  entryTime: string;
  exitTime?: string;
  duration?: string;
  amount: number;
  guardName: string;
  shift: string;
  isParkingPass?: boolean;
  passDetails?: {
    startDate: string;
    endDate: string;
    monthsDuration: number;
  };
  createdAt: string;
}