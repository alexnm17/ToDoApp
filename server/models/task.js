var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskSchema = new Schema({
  id: String,
  task: String,
  completed: Boolean,
  priority: String,
  deadline: Date
});
module.exports = mongoose.model('Task', TaskSchema);