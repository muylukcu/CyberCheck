var Student = require('../models/student');
var Project = require('../models/project');
var async = require('async');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

//Display list of all students
exports.student_list = function(req,res,next){

  Student.find()
    .sort([['firstname','ascending']])
    .exec(function(err, list_students){
      if(err){return next(err); }
      // Successful, so render
      res.render('students',{title: 'James',student_list: list_students});
    });
};

// Display student signUp form
exports.student_signIn_form = function(req, res, next) {
    res.render('student_signIn', { title: 'SignIn Student'});
};

exports.student_create_post = function(req, res, next){
              // asign session to null if any exist
              req.session = null;
              var hashedPassword = bcrypt.hashSync(req.body.password, 8);
              var student = new Student(
                  {
                    firstname: req.body.first_name,
                    lastname:req.body.last_name,
                    email: req.body.email,
                    gender:req.body.gender,
                    batch_number:req.body.batch_number,
                    study_course:req.body.course,
                    password: hashedPassword
                  });
              student.save(function (err,student) {
                  if (err) return res.status(500).send("There was a problem registering the student.")
                  var token =
                  {
                     userId : jwt.sign({ id: student._id }, config.secret, {
                     expiresIn: 86400 // expires in 24 hours
                  })
                  }
                  req.session = token;
                  res.redirect('/student_profile');
              });
          }

//Studet Log In land page
exports.student_logIn_page = function(req, res, next) {
    res.render('student_logIn', { title: 'LogIn Student'});
};

//LogIn function for Student. Authontication
exports.student_logIn = function(req, res) {
  // asign session to null if any exist
  req.session = null;

  Student.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    var passwordIsValid = bcrypt.compareSync(req.body.password_logIn, user.password);
    if (!passwordIsValid){
       return res.status(401).send({ auth: false, token: null });
     }

        var token =
        {
           userId : jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        })
        }

      var cookie = req.session;

      if (!cookie) {
          req.session = token;
      } else {
         console.log('Valid cookie session');
      }

      res.status(200).redirect('/student_profile');
  });
};

exports.student_profile = function(req, res){
  var token = req.session.userId;
  if (!token){
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, config.secret, function(err, decoded) {
         if (err){
           return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
         }
         async.parallel({
           student: function(callback){
             Student.findById(decoded.id,{password:0}).exec(callback);
           },
           projects: function(callback){
             Project.find({student:decoded.id}).exec(callback);
           }
         }, function(err,results){
           if (err) { return next(err); }
                 if (results.student==null) { // No results.
                     var err = new Error('Student not found');
                     err.status = 404;
                     return next(err);
                   }
            res.render('student_area_profile',{title: 'Student Profile',student : results.student, projects: results.projects});
         });
       });
  };
