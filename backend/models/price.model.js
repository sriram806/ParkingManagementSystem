import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema({
    twoWheeler: {
      type: Number,
      required: true,
      min: 0
    },
    threeWheeler: {
      type: Number,
      required: true,
      min: 0
    },
    fourWheeler: {
      type: Number,
      required: true,
      min: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }, {
    timestamps: true
  });

const Priceing = mongoose.model('Priceing',pricingSchema);

export default Priceing;