import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { transposeLine, calculateBestKey, getAllKeys, formatTransposition } from './transpose';
import './songView.css';

const SongView = ({ song, user, onBack, onUserUpdate }) => {
  const [currentKey, setCurrentKey] = useState(song.originalKey);
  const [transposition, setTransposition] = useState(0);
  const [savedKey, setSavedKey] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showAllKeys, setShowAllKeys] = useState(false);

  useEffect(() => {
    // Calculate the best key for the user's vocal range
    if (user?.vocalRange) {
      const bestKey = calculateBestKey(song.originalKey, user.vocalRange);
      setCurrentKey(bestKey.key);
      setTransposition(bestKey.transposition);
    }

    // Check if user has a saved key for this song
    if (user?.savedSongKeys?.has(song._id)) {
      setSavedKey(user.savedSongKeys.get(song._id));
      // Calculate transposition for saved key
      const savedTransposition = calculateTransposition(song.originalKey, user.savedSongKeys.get(song._id));
      setTransposition(savedTransposition);
      setCurrentKey(user.savedSongKeys.get(song._id));
    }
  }, [song, user]);

  const calculateTransposition = (fromKey, toKey) => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const fromIndex = notes.indexOf(fromKey);
    const toIndex = notes.indexOf(toKey);
    
    if (fromIndex === -1 || toIndex === -1) return 0;
    
    let transposition = toIndex - fromIndex;
    if (transposition > 6) transposition -= 12;
    if (transposition < -6) transposition += 12;
    
    return transposition;
  };

  const handleKeyChange = (newKey) => {
    const newTransposition = calculateTransposition(song.originalKey, newKey);
    setCurrentKey(newKey);
    setTransposition(newTransposition);
    setShowAllKeys(false);
  };

  const handleSaveKey = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/users/${user.googleId}/save-key`, {
        songId: song._id,
        preferredKey: currentKey
      });
      
      setSavedKey(currentKey);
      onUserUpdate(response.data);
    } catch (error) {
      console.error('Error saving key:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToOriginal = () => {
    setCurrentKey(song.originalKey);
    setTransposition(0);
  };

  const handleResetToBest = () => {
    if (user?.vocalRange) {
      const bestKey = calculateBestKey(song.originalKey, user.vocalRange);
      setCurrentKey(bestKey.key);
      setTransposition(bestKey.transposition);
    }
  };

  const transposedLyrics = transposeLine(song.lyricsWithChords, transposition);
  const allKeys = getAllKeys();

  return (
    <div className="song-view-container">
      <div className="song-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Songs
        </button>
        
        <div className="song-title-section">
          <h1>{song.title}</h1>
          <p className="artist-name">by {song.artist}</p>
        </div>
      </div>

      <div className="key-controls">
        <div className="key-info">
          <div className="key-display">
            <span className="key-label">Current Key:</span>
            <span className="key-value">{currentKey}</span>
            {transposition !== 0 && (
              <span className="transposition-badge">
                {formatTransposition(transposition)}
              </span>
            )}
          </div>
          
          <div className="original-key">
            <span className="key-label">Original Key:</span>
            <span className="key-value">{song.originalKey}</span>
          </div>
        </div>

        <div className="key-actions">
          <div className="key-selector">
            <button 
              className="key-select-button"
              onClick={() => setShowAllKeys(!showAllKeys)}
            >
              Change Key ▼
            </button>
            
            {showAllKeys && (
              <div className="key-dropdown">
                {allKeys.map(key => (
                  <button
                    key={key}
                    className={`key-option ${key === currentKey ? 'selected' : ''}`}
                    onClick={() => handleKeyChange(key)}
                  >
                    {key}
                    {key === song.originalKey && <span className="original-indicator">(Original)</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="key-reset-buttons">
            <button 
              className="reset-button"
              onClick={handleResetToOriginal}
              disabled={currentKey === song.originalKey}
            >
              Original
            </button>
            
            {user?.vocalRange && (
              <button 
                className="reset-button"
                onClick={handleResetToBest}
              >
                Best for Me
              </button>
            )}
          </div>

          <button 
            className={`save-key-button ${savedKey === currentKey ? 'saved' : ''}`}
            onClick={handleSaveKey}
            disabled={isSaving || savedKey === currentKey}
          >
            {isSaving ? 'Saving...' : savedKey === currentKey ? '✓ Saved' : 'Save This Key'}
          </button>
        </div>
      </div>

      {user?.vocalRange && (
        <div className="vocal-range-info">
          <p>
            <strong>Your vocal range:</strong> {user.vocalRange.min} - {user.vocalRange.max}
            {transposition !== 0 && (
              <span className="range-note">
                {' '}(This key should work well for your voice)
              </span>
            )}
          </p>
        </div>
      )}

      <div className="lyrics-container">
        <h3>Lyrics with Chords</h3>
        <div className="lyrics-content">
          {transposedLyrics.split('\n').map((line, index) => (
            <div key={index} className="lyrics-line">
              {line}
            </div>
          ))}
        </div>
      </div>

      <div className="song-footer">
        <div className="instrument-tabs">
          <button className="instrument-tab active">Piano</button>
          <button className="instrument-tab">Guitar</button>
          <button className="instrument-tab">Ukulele</button>
        </div>
        
        <div className="footer-actions">
          <button className="print-button">Print</button>
          <button className="share-button">Share</button>
        </div>
      </div>
    </div>
  );
};

export default SongView;
