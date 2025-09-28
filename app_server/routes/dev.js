var express = require('express');
var router = express.Router();
const mongoose = require('../models/db');

router.get('/trips', async (req, res, next) => {
  try {
    const Trip = mongoose.model('trips');
    const trips = await Trip.find({}).lean();
    res.json(trips);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
