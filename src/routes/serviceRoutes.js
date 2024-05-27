const express = require('express');
const { createService,getAllService } = require('../controllers/ServiceController');
const AdminAuth = require('../middlewares/checkAdmin');
const router = express.Router();

router.post('/createService', AdminAuth ,createService);
router.get('/services',getAllService)
module.exports = router;