var mongoose = require('mongoose');
const user = require('./user');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  password: String,
  username: String
});



module.exports = mongoose.model('User', UserSchema);