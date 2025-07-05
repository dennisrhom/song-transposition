import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './songList.css';

const SongList = ({ onSongSelect, user }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, favorites, recent

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/songs');
      setSongs(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load songs. Please try again.');
      console.error('Error fetching songs:', err);
    } finally {
      setLoading(false);
    }
  };

  const seedSongs = async () => {
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/seed-songs');
      await fetchSongs();
    } catch (err) {
      setError('Failed to seed songs. Please try again.');
      console.error('Error seeding songs:', err);
    }
  };

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'favorites') {
      return matchesSearch && user?.savedSongKeys?.has(song._id);
    }
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="song-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading songs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="song-list-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchSongs} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="song-list-container">
      <div className="song-list-header">
        <h2>Song Library</h2>
        <div className="header-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search songs or artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="filter-controls">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Songs</option>
              <option value="favorites">My Favorites</option>
            </select>
          </div>
        </div>
      </div>

      {songs.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🎵</div>
          <h3>No songs available</h3>
          <p>Let's add some songs to get started!</p>
          <button onClick={seedSongs} className="seed-button">
            Add Sample Songs
          </button>
        </div>
      )}

      {songs.length > 0 && filteredSongs.length === 0 && (
        <div className="no-results">
          <p>No songs match your search criteria.</p>
          <button onClick={() => setSearchTerm('')} className="clear-search-button">
            Clear Search
          </button>
        </div>
      )}

      <div className="songs-grid">
        {filteredSongs.map((song) => (
          <div
            key={song._id}
            className="song-card"
            onClick={() => onSongSelect(song)}
          >
            <div className="song-info">
              <h3 className="song-title">{song.title}</h3>
              <p className="song-artist">{song.artist}</p>
              <div className="song-key">
                <span className="key-label">Original Key:</span>
                <span className="key-value">{song.originalKey}</span>
              </div>
            </div>
            
            {user?.savedSongKeys?.has(song._id) && (
              <div className="favorite-indicator">
                <span className="favorite-icon">⭐</span>
                <span className="favorite-text">Saved</span>
              </div>
            )}
            
            <div className="song-actions">
              <button className="view-song-button">
                View Song
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSongs.length > 0 && (
        <div className="song-count">
          Showing {filteredSongs.length} of {songs.length} songs
        </div>
      )}
    </div>
  );
};

export default SongList;
