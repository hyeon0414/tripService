const express = require('express');
const { protect } = require('../middleware/auth');
const {
  searchTrips,
  searchUsers,
  searchGlobal
} = require('../controllers/searchController');

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/trips', searchTrips);
router.get('/users', searchUsers);
router.get('/global', searchGlobal);

module.exports = router; 