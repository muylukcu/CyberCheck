// var Student = require('../../models/student');
//
//
//
//
// exports.student_create_post_auth = function(req, res, next){
//      if (req.body.password !== req.body.confirm_password) {
//         var err = new Error('Passwords do not match.');
//         err.status = 400;
//         res.send("passwords dont match");
//         return next(err);
//         }
//
//         if(req.body.first_name &&
//            req.body.last_name &&
//            req.body.email &&
//            req.body.gender &&
//            req.body.batch_number &&
//            req.body.course &&
//            req.body.password &&
//            req.body.confirm_password){
//
//              var student = new Student(
//                  {
//                    firstname: req.body.first_name,
//                    lastname:req.body.last_name,
//                    email: req.body.email,
//                    gender:req.body.gender,
//                    batch_number:req.body.batch_number,
//                    study_course:req.body.course,
//                    password: req.body.password,
//                    passwordConf: req.body.confirm_password
//                  });
//
//             student.save(function(error,student){
//               if (error) {
//
//                 return next(error);
//               } else {
//                 var sessionData = req.session;
//                 //sessionData.myId  = student._id;
//                 return res.redirect(student.url);
//               }
//             });
//         } else if (req.body.logemail && req.body.logpassword) {
//            Student.authenticate(req.body.logemail, req.body.password_logIn, function (error, student) {
//            if (error || !student) {
//              var err = new Error('Wrong email or password.');
//              err.status = 401;
//              return next(err);
//            }else {
//              req.session.userId = student._id;
//              return res.redirect(student.url);
//            }
//     });
//   }
//     }
