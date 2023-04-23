const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  id: Number,
  message: String,
  fromUser: Number,
  toUser: Number,
  created_time: Number,
});

const Message = mongoose.model('Message', messageSchema);
module.exports = {
  Message
}