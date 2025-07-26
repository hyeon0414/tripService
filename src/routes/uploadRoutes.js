const express = require('express');
const { protect } = require('../middleware/auth');
const {
  uploadImage,
  uploadFile,
  generatePDF,
  deleteFile
} = require('../controllers/uploadController');

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/image', uploadImage);
router.post('/file', uploadFile);
router.post('/pdf', generatePDF);
router.delete('/:filename', deleteFile);

module.exports = router; 