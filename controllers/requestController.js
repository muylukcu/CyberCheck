var Student = require('../models/student');
var Request = require('../models/request');
var Project = require('../models/project');
var async = require('async');
var cookieParser = require('cookie-parser');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

exports.student_requests = function(req,res,next){
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
           requests: function(callback){
             Request.find({student:decoded.id}).populate('project').populate('assigned_to').exec(callback);
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
            res.render('student_area_request',{title: 'Student Request',student : results.student, requests: results.requests, projects: results.projects});
         });
       });
   }

   exports.student_send_request = function(req,res,next){
     var token = req.session.userId;
     if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

     jwt.verify(token, config.secret, function(err, decoded) {
       if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
     var recruiterName = req.body.recruiter_first_name + ' ' +req.body.recruiter_last_name;

      var request = new Request({
        student: decoded.id,
        recruiter_name: recruiterName,
        recruiter_number: req.body.recruiter_number,
        recruiter_email: req.body.recruiter_email,
        recruiter_company: req.body.recruiter_company,
        project: req.body.project,
        status: 'Open',
        end_client_company: req.body.end_client_company
      }
    );

      request.save(function(err, project){
        if (err){
           return res.status(500).send("There was a problem finding the user.");
        }
        res.redirect('/student_request');
      });
    });
   }
