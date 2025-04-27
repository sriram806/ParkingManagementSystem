import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  vehicleType: {
    type: String,
    enum: ['twoWheeler', 'threeWheeler', 'fourWheeler'],
    required: true
  },
  entryTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  exitTime: {
    type: Date
  },
  guardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  guardName: {
    type: String,
    required: true
  },
  shift: {
    type: String,
    enum: ['day', 'night'],
    required: true
  },
  fees: {
    type: Number
  },
  status: {
    type: String,
    enum: ['active', 'exited'],
    default: 'active'
  },
  billNumber: {
    type: String,
    required: true,
    unique: true
  },
  parkingSpot: {
    type: String
  },
  color: String,
  brand: String,
  parkingPass: {
    startDate: Date,
    endDate: Date,
    monthsDuration: Number,
    amount: Number,
    status: {
      type: String,
      enum: ['active', 'expired'],
      default: 'active'
    }
  }
}, {
  timestamps: true
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
