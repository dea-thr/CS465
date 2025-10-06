const express = require('express');
const router = express.Router();
const tripsCtrl = require('../controllers/trips');

// Standardized routes
router.get('/trips', tripsCtrl.tripsList);
router.get('/trips/:tripCode', tripsCtrl.tripsFindByCode);

module.exports = router;
