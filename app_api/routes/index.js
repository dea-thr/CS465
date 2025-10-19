const express = require('express');
const router = express.Router();
const { tripsList, tripsCreate, tripsReadOne, tripsUpdateOne, tripsDeleteOne } = require('../controllers/trips');

router.get('/trips', tripsList);
router.post('/trips', tripsCreate);
router.get('/trips/:tripid', tripsReadOne);
router.put('/trips/:tripid', tripsUpdateOne);
router.delete('/trips/:tripid', tripsDeleteOne);

module.exports = router;
