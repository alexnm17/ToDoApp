var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskSchema = new Schema({
  taskname: String,
  completed: {type:Boolean, default: false},
  priority: String,
  deadline: Date,
  email: String
});
module.exports = mongoose.model('Task', TaskSchema);