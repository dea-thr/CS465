const express = require('express');
const router = express.Router();
const { tripsList, tripsCreate, tripsReadOne, tripsUpdateOne, tripsDeleteOne } = require('../controllers/trips');
const auth = require('../controllers/auth');

// public reads
router.get('/trips', tripsList);
router.get('/trips/:tripid', tripsReadOne);

// protected writes
router.post('/trips', auth.requireAuth, tripsCreate);
router.put('/trips/:tripid', auth.requireAuth, tripsUpdateOne);
router.delete('/trips/:tripid', auth.requireAuth, tripsDeleteOne);

// auth endpoints
router.use('/users', require('./auth'));

module.exports = router;
