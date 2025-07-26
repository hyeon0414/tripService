const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
} = require('../controllers/tripController');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getTrips)
  .post(createTrip);

router.route('/:id')
  .get(getTrip)
  .put(updateTrip)
  .delete(deleteTrip);

module.exports = router; 