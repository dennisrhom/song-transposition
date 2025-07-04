// backend/models/user.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  vocalRange: {
    min: { type: String }, // e.g., "E2"
    max: { type: String }, // e.g., "A5"
  },
  savedSongKeys: { type: Map, of: String }, // Maps songId to a preferred key, e.g., { "songId123": "D" }
});

const User = mongoose.model('User', userSchema);
module.exports = User;