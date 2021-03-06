var mongoose = require('mongoose');
const task = require('./task');
var Schema = mongoose.Schema;
var ProjectSchema = new Schema({
  projectname: {type:String,required:true},
  tasks:[{type:Schema.ObjectId, ref:'Task'}],
  email: String,
  sharedTo:[String]
});
module.exports = mongoose.model('Project', ProjectSchema);