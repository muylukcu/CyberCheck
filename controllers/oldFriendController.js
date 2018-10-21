var CybertekTeam = require('../models/cybertekTeam');
var Request = require('../models/request');

var async = require('async');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

exports.old_friends_sigIn = function(req, res, next) {
    res.render('old_friends', { title: 'James will work on it'});
};

exports.oldFriend_profile = function(req,res){
  var token = req.session.userId;
  if (!token){
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, config.secret, function(err, decoded) {
         if (err){
           return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
         }
         async.parallel({
           oldFriend: function(callback){
             CybertekTeam.findById(decoded.id,{password:0}).exec(callback);
           },
           requests: function(callback){
             Request.find({assigned_to:decoded.id}).populate('student').populate('project').exec(callback);
           }
         }, function(err,results){
           if (err) { return next(err); }
                 if (results.oldFriend == null) { // No results.
                     var err = new Error('Old Friend not found');
                     err.status = 404;
                     return next(err);
                   }
            res.render('oldFriend',{title: 'Old Friend Profile',oldFriend : results.oldFriend, requests: results.requests});
         });
       });
};
