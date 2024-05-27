const express = require('express');
const { getPresignedUrl } = require('../controllers/UploadController');
const AdminAuth = require('../middlewares/checkAdmin');
const router = express.Router();

router.post('/getPresignedUrl' ,getPresignedUrl);
module.exports = router;