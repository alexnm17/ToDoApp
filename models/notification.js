const mongoose= require('mongoose')
const {Schema} = mongoose
const NotificationSchema=new Schema({
  sender: String,
  receiver: String,
  type: String,
  project_id: String,
  project_name: String
});

module.exports = mongoose.model('notification', NotificationSchema);