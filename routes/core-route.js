const express = require('express');
const router = express.Router();

const coreControllers = require('../controllers/core-controller');

router.get('/', coreControllers.getRoot);

router.get('*', coreControllers.get404);

module.exports = router;
