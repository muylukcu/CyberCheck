var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var student_controller = require('../controllers/studentController');
var oldFriend_controller= require('../controllers/oldFriendController');
var admin_controller= require('../controllers/adminController');
var project_controller = require('../controllers/projectController');
var request_controller = require('../controllers/requestController');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/*  home page. Student */
router.get('/', student_controller.student_logIn_page);
router.post('/signUp',student_controller.student_create_post);

router.get('/students',  student_controller.student_list);

router.get('/signUp',student_controller.student_signIn_form);
router.post('/profile',student_controller.student_logIn);

// Main student profile controller. Thats populate all projects and student information
// and form to add new project
router.get('/student_profile',student_controller.student_profile);

// Project in Student profile
router.post('/profile/add_project', project_controller.project_create);
router.get('/profile/remove_project',project_controller.remove_project);

// Request in Student Profile
router.get('/student_request',request_controller.student_requests);
router.post('/student_send_request',request_controller.student_send_request);
router.get('/request/remove_request',request_controller.remove_request);

// Old Friend
router.get('/old_friends',oldFriend_controller.old_friends_sigIn);

//Admin LogIn. Authontication
router.post('/admin',admin_controller.admin_logIn);
// Main admin profile controller. Thats populate all request and oldFriends
router.get('/admin_profile',admin_controller.admin_profile);
// Assigne request to oldFriend
router.get('/assigne_request',admin_controller.assigne_request);
// Available oldFriends
router.get('/available_oldFriends',admin_controller.getAvailableOldfriends);
//createOldFriend
router.get('/lunch_createOldFriend_form',admin_controller.oldFriend_create_form);
router.post('/createOldFriend',admin_controller.oldFriend_create_post);
//OldFriend Profile
router.get('/oldFriend_profile',oldFriend_controller.oldFriend_profile);
module.exports = router;
