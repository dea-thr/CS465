const mongoose = require('../models/db'); // ensures connection + model load
const Trip = mongoose.model('Trip');

// GET /api/trips  -> 200 [ ...trips ]
exports.tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).lean();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/trips/:tripCode  -> 200 {trip} | 404 | 400
exports.tripsFindByCode = async (req, res) => {
  const { tripCode } = req.params;
  if (!tripCode) return res.status(400).json({ message: 'tripCode parameter is required' });
  try {
    const trip = await Trip.findOne({ code: tripCode }).lean();
    if (!trip) return res.status(404).json({ message: `Trip not found: ${tripCode}` });
    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
