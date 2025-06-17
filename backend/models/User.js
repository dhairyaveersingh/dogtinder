// User Model (/backend/models/User.js):
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  location: String,
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
  // More fields as needed
});

module.exports = mongoose.model('User', UserSchema);
