import Vehicle from '../models/vehicle.model.js';
import User from '../models/user.model.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();
    const vehiclesParked = await Vehicle.countDocuments({ status: 'active' });
    const activeGuards = await User.countDocuments({ role: 'guard', status: 'active' });

    // Calculate today's revenue
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayRevenue = await Vehicle.aggregate([
      {
        $match: {
          exitTime: { $gte: today },
          status: 'exited'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$fees' }
        }
      }
    ]);

    // Calculate month's revenue
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthRevenue = await Vehicle.aggregate([
      {
        $match: {
          exitTime: { $gte: firstDayOfMonth },
          status: 'exited'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$fees' }
        }
      }
    ]);

    // Get vehicle type distribution
    const vehicleTypes = await Vehicle.aggregate([
      {
        $group: {
          _id: '$vehicleType',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get revenue by day for the last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      return date;
    }).reverse();

    const revenueByDay = await Promise.all(
      last7Days.map(async (date) => {
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);

        const dayRevenue = await Vehicle.aggregate([
          {
            $match: {
              exitTime: { $gte: date, $lt: nextDay },
              status: 'exited'
            }
          },
          {
            $group: {
              _id: null,
              revenue: { $sum: '$fees' }
            }
          }
        ]);

        return {
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          revenue: dayRevenue[0]?.revenue || 0
        };
      })
    );

    res.json({
      totalVehicles,
      vehiclesParked,
      todayRevenue: todayRevenue[0]?.total || 0,
      monthRevenue: monthRevenue[0]?.total || 0,
      activeGuards,
      vehicleTypeDistribution: {
        twoWheeler: vehicleTypes.find(v => v._id === 'twoWheeler')?.count || 0,
        threeWheeler: vehicleTypes.find(v => v._id === 'threeWheeler')?.count || 0,
        fourWheeler: vehicleTypes.find(v => v._id === 'fourWheeler')?.count || 0,
      },
      revenueByDay
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
};