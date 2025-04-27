import Pricing from '../models/price.model.js';

export const getPricingSettings = async (req, res) => {
  try {
    const pricing = await Pricing.findOne({ isActive: true });
    res.json(pricing || { twoWheeler: 50, threeWheeler: 100, fourWheeler: 200 });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pricing settings' });
  }
};

export const updatePricingSettings = async (req, res) => {
  try {
    const { twoWheeler, threeWheeler, fourWheeler } = req.body;

    // Deactivate current pricing
    await Pricing.updateMany({}, { isActive: false });

    // Create new pricing
    const pricing = new Pricing({
      twoWheeler,
      threeWheeler,
      fourWheeler,
      isActive: true
    });

    await pricing.save();
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: 'Error updating pricing settings' });
  }
};