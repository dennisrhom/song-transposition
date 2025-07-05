import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import LoginButton from './LoginButton';
import VocalRangeModal from './VocalRangeModal';
import SongList from './songList';
import SongView from './songView';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login'); // login, songs, song
  const [selectedSong, setSelectedSong] = useState(null);
  const [showVocalRangeModal, setShowVocalRangeModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Google OAuth Client ID - you'll need to replace this with your actual client ID
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "your-google-client-id-here";

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setCurrentView('songs');
    }
  }, []);

  const handleLoginSuccess = async (userInfo) => {
    setLoading(true);
    try {
      // Save or update user in database
      const response = await axios.post('http://localhost:5000/api/users', {
        googleId: userInfo.googleId,
        email: userInfo.email
      });

      const userData = {
        ...userInfo,
        ...response.data
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // If user doesn't have a vocal range set, show the modal
      if (!userData.vocalRange) {
        setShowVocalRangeModal(true);
      } else {
        setCurrentView('songs');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      // Still set the user even if database save fails
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      setCurrentView('songs');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = (error) => {
    console.error('Login error:', error);
    alert('Login failed. Please try again.');
  };

  const handleVocalRangeSave = async (vocalRange) => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        googleId: user.googleId,
        email: user.email,
        vocalRange
      });

      const updatedUser = { ...user, vocalRange };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentView('songs');
    } catch (error) {
      console.error('Error saving vocal range:', error);
      // Still update local state even if database save fails
      const updatedUser = { ...user, vocalRange };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentView('songs');
    } finally {
      setLoading(false);
    }
  };

  const handleUserUpdate = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setCurrentView('song');
  };

  const handleBackToSongs = () => {
    setCurrentView('songs');
    setSelectedSong(null);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
    setSelectedSong(null);
    localStorage.removeItem('user');
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'login':
        return (
          <LoginButton 
            onLoginSuccess={handleLoginSuccess}
            onLoginError={handleLoginError}
          />
        );
      
      case 'songs':
        return (
          <div className="app-container">
            <header className="app-header">
              <div className="header-content">
                <h1>Song Transposer</h1>
                <div className="user-section">
                  {user && (
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <button className="vocal-range-button" onClick={() => setShowVocalRangeModal(true)}>
                        {user.vocalRange ? `${user.vocalRange.min}-${user.vocalRange.max}` : 'Set Range'}
                      </button>
                      <button className="logout-button" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>
            
            <main className="app-main">
              <SongList onSongSelect={handleSongSelect} user={user} />
            </main>
          </div>
        );
      
      case 'song':
        return (
          <div className="app-container">
            <header className="app-header">
              <div className="header-content">
                <h1>Song Transposer</h1>
                <div className="user-section">
                  {user && (
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <button className="vocal-range-button" onClick={() => setShowVocalRangeModal(true)}>
                        {user.vocalRange ? `${user.vocalRange.min}-${user.vocalRange.max}` : 'Set Range'}
                      </button>
                      <button className="logout-button" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>
            
            <main className="app-main">
              <SongView 
                song={selectedSong}
                user={user}
                onBack={handleBackToSongs}
                onUserUpdate={handleUserUpdate}
              />
            </main>
          </div>
        );
      
      default:
        return <LoginButton onLoginSuccess={handleLoginSuccess} onLoginError={handleLoginError} />;
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="App">
        {renderContent()}
        
        <VocalRangeModal
          isOpen={showVocalRangeModal}
          onClose={() => setShowVocalRangeModal(false)}
          onSave={handleVocalRangeSave}
          initialRange={user?.vocalRange}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
