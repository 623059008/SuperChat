const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  id: String,
  message: String,
  fromUser: String,
  toUser: String,
  created_time: Number,
});

const Message = mongoose.model('Message', messageSchema);
module.exports = {
  Message
}