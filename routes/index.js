var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var student_controller = require('../controllers/studentController');
var oldFriend_controller= require('../controllers/oldFriendController');
var admin_controller= require('../controllers/adminController');
var project_controller = require('../controllers/projectController');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/*  home page. Student */
router.get('/', student_controller.student_signIn_form);
router.post('/',student_controller.student_create_post);
router.get('/students',  student_controller.student_list);
router.get('/login',student_controller.student_logIn_page);
router.post('/profile',student_controller.student_logIn);
router.get('/student_profile',student_controller.student_profile);
// Project into Student profile
router.post('/profile/add_project', project_controller.project_create);
router.get('/profile/remove_project',project_controller.remove_project);

// Old Friend
router.get('/old_friends',oldFriend_controller.old_friends_sigIn);

//Admin
router.get('/admin',admin_controller.admin_log_in);
module.exports = router;
