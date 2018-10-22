var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CybertekTeam = new Schema({
  firstname: {type: String, required: true},
  lastname: {type:String, required: true},
  email : {type:String, required:true, unique: true},
  phone_number: {type: String, required: true},
  password: {type:String, required: true},
  role: {type:String, required:true,enum:['old friend','administrator']},
  amount_of_requests: {type:Number, default: 0}
});

//Export model
module.exports = mongoose.model('CybertekTeam',CybertekTeam);
