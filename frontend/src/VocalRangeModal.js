import React, { useState, useEffect } from 'react';
import './VocalRangeModal.css';

const VocalRangeModal = ({ isOpen, onClose, onSave, initialRange }) => {
  const [vocalRange, setVocalRange] = useState(initialRange || { min: 'E2', max: 'A5' });
  const [knowsRange, setKnowsRange] = useState(true);

  const notes = [
    'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2',
    'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
    'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
    'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
    'C6'
  ];

  const isBlackKey = (note) => note.includes('#');

  const handleMinChange = (note) => {
    const minIndex = notes.indexOf(note);
    const maxIndex = notes.indexOf(vocalRange.max);
    
    if (minIndex <= maxIndex) {
      setVocalRange({ ...vocalRange, min: note });
    }
  };

  const handleMaxChange = (note) => {
    const minIndex = notes.indexOf(vocalRange.min);
    const maxIndex = notes.indexOf(note);
    
    if (maxIndex >= minIndex) {
      setVocalRange({ ...vocalRange, max: note });
    }
  };

  const handleSave = () => {
    onSave(vocalRange);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Set Your Vocal Range</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="range-question">
            <p>Do you know your vocal range?</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="knowsRange"
                  checked={knowsRange}
                  onChange={() => setKnowsRange(true)}
                />
                Yes, I know my range
              </label>
              <label>
                <input
                  type="radio"
                  name="knowsRange"
                  checked={!knowsRange}
                  onChange={() => setKnowsRange(false)}
                />
                No, I need help finding it
              </label>
            </div>
          </div>

          {knowsRange && (
            <div className="piano-interface">
              <div className="range-display">
                <p>Your vocal range: <strong>{vocalRange.min} - {vocalRange.max}</strong></p>
              </div>
              
              <div className="piano">
                {notes.map((note) => {
                  const isSelected = note >= vocalRange.min && note <= vocalRange.max;
                  const isMin = note === vocalRange.min;
                  const isMax = note === vocalRange.max;
                  
                  return (
                    <div
                      key={note}
                      className={`piano-key ${isBlackKey(note) ? 'black' : 'white'} ${
                        isSelected ? 'selected' : ''
                      } ${isMin ? 'min-note' : ''} ${isMax ? 'max-note' : ''}`}
                      onClick={() => {
                        if (isMin) {
                          // Find next available note for min
                          const currentIndex = notes.indexOf(note);
                          const nextNote = notes[currentIndex + 1];
                          if (nextNote && nextNote <= vocalRange.max) {
                            handleMinChange(nextNote);
                          }
                        } else if (isMax) {
                          // Find previous available note for max
                          const currentIndex = notes.indexOf(note);
                          const prevNote = notes[currentIndex - 1];
                          if (prevNote && prevNote >= vocalRange.min) {
                            handleMaxChange(prevNote);
                          }
                        } else if (note < vocalRange.min) {
                          handleMinChange(note);
                        } else if (note > vocalRange.max) {
                          handleMaxChange(note);
                        }
                      }}
                    >
                      <span className="note-label">{note}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="range-controls">
                <div className="control-group">
                  <label>Lowest note:</label>
                  <select
                    value={vocalRange.min}
                    onChange={(e) => handleMinChange(e.target.value)}
                  >
                    {notes.map(note => (
                      <option key={note} value={note} disabled={note > vocalRange.max}>
                        {note}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="control-group">
                  <label>Highest note:</label>
                  <select
                    value={vocalRange.max}
                    onChange={(e) => handleMaxChange(e.target.value)}
                  >
                    {notes.map(note => (
                      <option key={note} value={note} disabled={note < vocalRange.min}>
                        {note}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {!knowsRange && (
            <div className="range-finder">
              <p>We'll help you find your vocal range! This feature is coming soon.</p>
              <p>For now, you can use the default range (E2-A5) or try to estimate your range above.</p>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="save-button" onClick={handleSave}>
            Save Range
          </button>
        </div>
      </div>
    </div>
  );
};

export default VocalRangeModal;
