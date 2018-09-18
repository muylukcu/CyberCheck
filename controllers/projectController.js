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
      var project = new Project(
         {
           student: decoded.id,
           company_name: req.body.company_name,
           company_location: req.body.company_location,
           job_title: req.body.job_title,
           job_type: req.body.job_type,
           team_size: req.body.team_size,
           stard_date: req.body.start_date,
           end_date: req.body.end_date
         }
       );

        project.save(function (err, project) {

        if (err) return res.status(500).send("There was a problem finding the user.");
        res.redirect('/student_profile');
       });
  });



}
