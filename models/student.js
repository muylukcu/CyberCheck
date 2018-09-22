var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudentSchema = new Schema({
   firstname: {type: String, required: true},
   lastname: {type:String, required: true},
   email : {type:String, required:true, unique: true},
   gender: {type:String, required: true, enum:['F','M']},
   batch_number: {type: String, required: true},
   study_course: {type: String, required: true},
   password: {type:String, required: true}
});

//Virtual URL for each student
StudentSchema
.virtual('url')
.get(function(){
  return '/student/'+this.id;
});

//Export model
module.exports = mongoose.model('Student',StudentSchema);
