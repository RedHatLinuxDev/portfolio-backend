const express = require('express');
const { createProject , getProjectsByService , allProjects , deleteProject , updateProject} = require('../controllers/ProjectController');
const AdminAuth = require('../middlewares/checkAdmin');
const router = express.Router();

router.post('/createProject', AdminAuth ,createProject);
router.get('/getProjectsByService' , getProjectsByService)
router.get('/allProjects' , allProjects)
router.delete('/delete/:id', AdminAuth, deleteProject);
router.patch('/updateProject/:id', AdminAuth, updateProject);

module.exports = router;