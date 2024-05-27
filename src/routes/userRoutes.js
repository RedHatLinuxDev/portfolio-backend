const express = require('express');
const { createUser,login , verifyToken} = require('../controllers/UserController');
const router = express.Router();
const AdminAuth = require('../middlewares/checkAdmin');

router.post('/login',login);
router.post('/createUser',createUser);
router.get('/verifyToken',AdminAuth,verifyToken)
module.exports = router;