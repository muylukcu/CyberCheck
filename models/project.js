var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var ProjectSchema = Schema(
  {
    student: {type: Schema.Types.ObjectId, ref: 'Student', required: true},
    company_name: {type: String, required: true},
    company_location: {type: String, required: true},
    job_title: {type: String, required: true},
    job_type: {type: String, required: true, enum:['contructor','full-time employee']},
    team_size: {type: String, required: true},
    start_date: {type: String, required: true},
    end_date: {type: String, required: true},
  }
);

//Virtual URL for each student

ProjectSchema
.virtual('url')
.get(function(){
  return '/project/'+this.id;
});

//Export model
module.exports = mongoose.model('Project',ProjectSchema);
