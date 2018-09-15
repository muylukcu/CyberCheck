#! /usr/bin/env node

console.log('This script populates some test Data. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Student = require('./models/student')
//var Request = require('./models/request')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var students = []

function studentCreate(firstname, lastname,gender,batch_number,study_course,cb){
  studentdetail ={
    firstname:firstname,
    lastname:lastname,
    gender:gender,
    batch_number:batch_number,
    study_course:study_course
  }
  var student = new Student(studentdetail);

  student.save(function(err){
     if(err){
       cb(err,null)
       return
     }
     console.log('New Student '+student);
     students.push(student);
     cb(null,student)
  });
}



function createStudent(cb){
  async.parallel([
    function(callback){
      studentCreate('Beknazar','Suranchiyev','M','7','Java-SDET',callback);
    },
    function(callback){
      studentCreate('Dilmurat','Dilshat','M','7','Java-SDET',callback);
    },
    function(callback){
      studentCreate('Ian','Sotillo','M','7','Java-SDET',callback);
    },
    function(callback){
      studentCreate('Omid','Rahimzai','M','7','Java-SDET',callback);
    },
    function(callback){
      studentCreate('Abdukerim','Abudusimi','M','7','Java-SDET',callback);
    },
    function(callback){
      studentCreate('Muhabbat','Khaydarova','F','7','Java-SDET',callback);
    },
  ],
  cb);
}


async.series([
    createStudent
],

    // All done, disconnect from database
    mongoose.connection.close();
});
