// backend/models/song.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  originalKey: { type: String, required: true },
  lyricsWithChords: { type: String, required: true }, // e.g., "[C]Amazing grace, how [G]sweet the sound"
});

const Song = mongoose.model('Song', songSchema);
module.exports = Song;