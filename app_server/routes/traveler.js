var express = require('express');
var router = express.Router();
const ctrlTraveler = require('../controllers/traveler');
router.get('/', ctrlTraveler.travel);
module.exports = router;
