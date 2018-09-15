var express = require('express');

var Student = require('../../models/student');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');


exports.student_reg = function(req, res,next) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  Student.create({
    firstname : req.body.firstname,
    lastname: req.body.lastname,
    email : req.body.email,
    gender: req.body.gender,
    batch_number: req.body.batch_number,
    study_course: req.body.study_course,
    password : hashedPassword
  },
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user.")
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
};

exports.student_get = function(req, res,next) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        Student.findById(decoded.id,{ password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

       res.status(200).send(user);
       });
  });
};
