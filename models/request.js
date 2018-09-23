var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RequestSchema = new Schema(
  {
    student: {type: Schema.Types.ObjectId, ref: 'Student', required: true},
    recruiter_name : {type: String, required: true},
    recruiter_email : {type: String, required: true},
    recruiter_number : {type: String,required: true},
    recruiter_company: {type: String, required: true},
    project: {type: Schema.Types.ObjectId, ref: 'Project',required: true},
    status: {type: String, required: true, enum: ['Open', 'Assigned', 'Close'], default: 'Open'},
    // assigned to Old Friend
    assigned_to: {type: Schema.Types.ObjectId, ref: 'OldFriend'},
    end_client_company: {type:String,required: true},
    reference_designation: {type:String},
    // reference_name: {type:String},
    // reference_phone: {type:String},
    // reference_designation: {type:String},
    // reference_email:{type:String}
  }
);

// Virtual URL for each request
RequestSchema
.virtual('url')
.get(function(){
  return '/request-list/request/'+this._id;
});

//Export model
module.exports = mongoose.model('Request',RequestSchema);
