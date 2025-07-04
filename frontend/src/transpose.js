// frontend/src/utils/transpose.js

// Defines the chromatic scale. You can expand this to include flats (e.g., Bb) as needed.
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// A function to transpose a single chord
export const transposeChord = (chord, amount) => {
  // This is a simplified function. A robust version would need to handle flats,
  // minor chords (Am), sevenths (G7), and bass notes (C/G).
  const rootMatch = chord.match(/^[A-G]#?/);
  if (!rootMatch) return chord; // Not a chord we can transpose

  const root = rootMatch[0];
  const tail = chord.substring(root.length);
  const currentIndex = notes.indexOf(root);

  if (currentIndex === -1) return chord; // Root note not found

  const newIndex = (currentIndex + amount + 12) % 12;
  return notes[newIndex] + tail;
};

// A function to transpose a full line of lyrics with chords
export const transposeLine = (line, amount) => {
  // Uses regex to find chords enclosed in [ ]
  return line.replace(/\[([^\]]+)\]/g, (match, chord) => {
    return `[${transposeChord(chord, amount)}]`;
  });
};