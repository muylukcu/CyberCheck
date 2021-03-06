var Project = require('../models/project');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var cookieParser = require('cookie-parser');

exports.project_create = function(req, res, next){
  var token = req.session.userId;
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      var startDate = req.body.start_month + ' ' + req.body.start_year ;
      var endDate = req.body.end_month + ' ' + req.body.end_year ;

      var project = new Project(
         {
           student: decoded.id,
           company_name: req.body.company_name,
           company_location: req.body.company_location,
           job_title: req.body.job_title,
           job_type: req.body.job_type,
           team_size: req.body.team_size,
           start_date: startDate,
           end_date: endDate
         }
       );

        project.save(function (err, project) {

        if (err) return res.status(500).send("There was a problem finding the user.");
        res.redirect('/student_profile');
       });
  });
}

//Student Area - Remove Project
exports.remove_project = function(req,res,next){
  var token = req.session.userId;
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
       if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
           var company_name = req.query.company_name;
           Project.deleteOne({"student":decoded.id}).where('company_name').equals(company_name).exec(function(err){
             if (err) { return next(err); }
             // Success - go to profile.
             res.redirect('/student_profile');
            });

    });
}
