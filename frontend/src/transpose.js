// frontend/src/utils/transpose.js

// Defines the chromatic scale with both sharps and flats
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const noteToIndex = {
  'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5, 
  'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
};

// A function to transpose a single chord
export const transposeChord = (chord, amount) => {
  if (!chord || typeof chord !== 'string') return chord;
  
  // Handle complex chords like Am7, C/G, etc.
  const chordMatch = chord.match(/^([A-G][#b]?)(.*)/);
  if (!chordMatch) return chord;

  const [, root, suffix] = chordMatch;
  const currentIndex = noteToIndex[root];
  
  if (currentIndex === undefined) return chord;

  const newIndex = (currentIndex + amount + 12) % 12;
  const newRoot = notes[newIndex];
  
  return newRoot + suffix;
};

// A function to transpose a full line of lyrics with chords
export const transposeLine = (line, amount) => {
  if (!line) return line;
  
  // Uses regex to find chords enclosed in [ ]
  return line.replace(/\[([^\]]+)\]/g, (match, chord) => {
    return `[${transposeChord(chord, amount)}]`;
  });
};

// Calculate the best key for a user's vocal range
export const calculateBestKey = (originalKey, vocalRange) => {
  if (!vocalRange || !vocalRange.min || !vocalRange.max) {
    return { key: originalKey, transposition: 0 };
  }

  // Parse vocal range to get note indices
  const minNote = vocalRange.min;
  const maxNote = vocalRange.max;
  
  const minIndex = noteToIndex[minNote];
  const maxIndex = noteToIndex[maxNote];
  
  if (minIndex === undefined || maxIndex === undefined) {
    return { key: originalKey, transposition: 0 };
  }

  // Calculate the center of the vocal range
  const vocalCenter = (minIndex + maxIndex) / 2;
  
  // Find the original key index
  const originalIndex = noteToIndex[originalKey];
  if (originalIndex === undefined) {
    return { key: originalKey, transposition: 0 };
  }

  // Calculate the ideal transposition to center the song in the vocal range
  const idealTransposition = Math.round(vocalCenter - originalIndex);
  
  // Limit transposition to reasonable bounds (-6 to +6 semitones)
  const limitedTransposition = Math.max(-6, Math.min(6, idealTransposition));
  
  const newIndex = (originalIndex + limitedTransposition + 12) % 12;
  const newKey = notes[newIndex];
  
  return {
    key: newKey,
    transposition: limitedTransposition
  };
};

// Get all possible keys for a song
export const getAllKeys = () => {
  return notes;
};

// Format transposition amount for display
export const formatTransposition = (amount) => {
  if (amount === 0) return 'Original';
  if (amount > 0) return `+${amount}`;
  return `${amount}`;
};