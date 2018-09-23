var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OldFriendSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type:String, required: true},
  email : {type:String, required:true, unique: true},
  phone_number: {type: String, required: true},
  password: {type:String, required: true}
});

//Export model
module.exports = mongoose.model('OldFriend',OldFriendSchema);
