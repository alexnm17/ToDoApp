var mongoose = require('mongoose');
const task = require('./task');
var Schema = mongoose.Schema;
var collectionTaskSchema = new Schema({
  collectionName: String,
  tasks: task
});
module.exports = mongoose.model('', CollectionTaskSchema);colectionTask