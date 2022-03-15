var mongoose = require('mongoose');
const task = require('./task');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
  collectionName: String,
  tasks:[{type:Schema.Objetctld, ref:'Task'}]
});
module.exports = mongoose.model('projectCollection', projectSchema);