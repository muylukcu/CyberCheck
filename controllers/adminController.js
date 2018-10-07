var CybertekTeam = require('../models/cybertekTeam');
var Request = require('../models/request');

var async = require('async');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
// exports.admin_log_in = function(req, res, next) {
//     res.render('admin', { title: 'Under Construction'});
// };

//LogIn function for Admin. Authontication
exports.admin_logIn = function(req, res) {
  // asign session to null if any exist
  req.session = null;

  CybertekTeam.findOne({ email: req.body.email }, function (err, user) {
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

      res.status(200).redirect('/admin_profile');
  });
};

exports.admin_profile = function(req, res){
  var token = req.session.userId;
  if (!token){
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, config.secret, function(err, decoded) {
         if (err){
           return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
         }
         async.parallel({
           admin: function(callback){
             CybertekTeam.findById(decoded.id,{password:0}).exec(callback);
           },
           //Get all Old Friends here
           oldFriends: function(callback){
             CybertekTeam.find({password:0},{role:'old friend'}).exec(callback);
           },
           requests: function(callback){
             Request.find({status:'Open'}).exec(callback);
           }
         }, function(err,results){
           if (err) { return next(err); }
                 if (results.admin == null) { // No results.
                     var err = new Error('Admin not found');
                     err.status = 404;
                     return next(err);
                   }
            res.render('admin',{title: 'Admin Profile',admin : results.admin, requests: results.requests, oldFriends: results.oldFriends});
         });
       });
  };
