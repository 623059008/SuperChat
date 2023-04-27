const mongoose = require('mongoose');
const { Schema } = mongoose;

const purchaseSchema = new Schema({
  userId: Number,
  id: Number,
  type: String,
  start_time: Number,
  expire_time: Number,
  usedCount: Number,
  maxCount: Number,
  purchase_key: String,
});

const userSchema = new Schema({
  id: Number,
  username: String,
  email: String,
  password: String,
  type: { type: String, required: false, default: 'user' },
});

const Purchase = mongoose.model('Purchase', purchaseSchema); 
const User = mongoose.model('User', userSchema);

module.exports = {
  Purchase,
  User
}