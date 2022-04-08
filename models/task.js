var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskSchema = new Schema({
  taskname: String,
  completed: Boolean,
  priority: {tipe:String},
  deadline: Date,
  email: String
});
module.exports = mongoose.model('Task', TaskSchema);