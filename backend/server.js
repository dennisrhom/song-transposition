// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/song-transposition', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Import models
const User = require('./models/user.model');
const Song = require('./models/song.model');

// Routes

// Get all songs
app.get('/api/songs', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Get a specific song
app.get('/api/songs/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json('Song not found');
    }
    res.json(song);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Create or update user
app.post('/api/users', async (req, res) => {
  try {
    const { googleId, email, vocalRange } = req.body;
    
    let user = await User.findOne({ googleId });
    
    if (user) {
      // Update existing user
      user.email = email;
      if (vocalRange) {
        user.vocalRange = vocalRange;
      }
      await user.save();
    } else {
      // Create new user
      user = new User({
        googleId,
        email,
        vocalRange
      });
      await user.save();
    }
    
    res.json(user);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Get user by Google ID
app.get('/api/users/:googleId', async (req, res) => {
  try {
    const user = await User.findOne({ googleId: req.params.googleId });
    if (!user) {
      return res.status(404).json('User not found');
    }
    res.json(user);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Save preferred key for a song
app.post('/api/users/:googleId/save-key', async (req, res) => {
  try {
    const { songId, preferredKey } = req.body;
    const user = await User.findOne({ googleId: req.params.googleId });
    
    if (!user) {
      return res.status(404).json('User not found');
    }
    
    if (!user.savedSongKeys) {
      user.savedSongKeys = new Map();
    }
    
    user.savedSongKeys.set(songId, preferredKey);
    await user.save();
    
    res.json(user);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Seed songs endpoint (for development)
app.post('/api/seed-songs', async (req, res) => {
  try {
    // Clear existing songs
    await Song.deleteMany({});
    
    const sampleSongs = [
      {
        title: "Amazing Grace",
        artist: "Traditional",
        originalKey: "C",
        lyricsWithChords: "[C]Amazing grace, how [G]sweet the sound\nThat [C]saved a wretch like [F]me\nI [C]once was lost, but [G]now I'm found\nWas [F]blind, but [C]now I [G]see"
      },
      {
        title: "Wonderwall",
        artist: "Oasis",
        originalKey: "C",
        lyricsWithChords: "[C]Today is gonna be the [G]day\nThat they're gonna [Am]throw it back to [F]you\nBy [C]now you should've [G]somehow\n[Am]Realized what you gotta [F]do"
      },
      {
        title: "Hallelujah",
        artist: "Jeff Buckley",
        originalKey: "C",
        lyricsWithChords: "[C]Now I've heard there was a [G]secret chord\nThat [Am]David played, and it [F]pleased the Lord\nBut [C]you don't really [G]care for music, [Am]do you?\nIt [F]goes like this, the [C]fourth, the [G]fifth"
      },
      {
        title: "Let It Be",
        artist: "The Beatles",
        originalKey: "C",
        lyricsWithChords: "[C]When I find myself in [G]times of trouble\n[Am]Mother Mary comes to [F]me\n[C]Speaking words of [G]wisdom, [Am]let it [F]be"
      },
      {
        title: "Hotel California",
        artist: "Eagles",
        originalKey: "Bm",
        lyricsWithChords: "[Bm]On a dark desert [F#]highway\n[G]Cool wind in my [D]hair\n[A]Warm smell of [G]colitas\n[F#]Rising up through the [Bm]air"
      }
    ];
    
    const songs = await Song.insertMany(sampleSongs);
    res.json(songs);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
