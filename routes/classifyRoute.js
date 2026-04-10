const express = require('express');
const router = express.Router();

// Import Middleware & Controller
const { validateName } = require('../middleware/validate');
const { classifyName } = require('../controllers/classifyController');

router.get('/classify', validateName, classifyName);

module.exports = router;