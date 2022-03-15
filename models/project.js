var mongoose = require('mongoose');
const task = require('./task');
var Schema = mongoose.Schema;
var ProjectSchema = new Schema({
  projectname: String,
  tasks:[{type:Schema.ObjectId, ref:'Task'}]
});
module.exports = mongoose.model('Project', ProjectSchema);