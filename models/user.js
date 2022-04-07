const mongoose= require('mongoose')
const {Schema} = mongoose
const UserSchema=new Schema({
  email: {type: String,
     lowercase: true,
     unique: true,
     required: [true, "can't be blank"],
     match: [/\S+@\S+\.\S+/, 'is invalid'],
     index: true},
  password: String,
  username: String,
  role: {
    tipe:String
  } 
});

module.exports = mongoose.model('user', UserSchema);