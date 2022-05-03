var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SessionSchema = new Schema({
    email: String,
    role: String,
    username: String,
    login:{type:Date,default: Date.now}
});
module.exports = mongoose.model('Session', SessionSchema);