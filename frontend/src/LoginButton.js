import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './LoginButton.css';

const LoginButton = ({ onLoginSuccess, onLoginError }) => {
  const handleSuccess = (credentialResponse) => {
    // Decode the JWT token to get user info
    const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
    
    const userInfo = {
      googleId: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture
    };
    
    onLoginSuccess(userInfo);
  };

  const handleError = () => {
    onLoginError('Login failed. Please try again.');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Song Transposer</h1>
          <p>Automatically transpose songs to match your vocal range</p>
        </div>
        
        <div className="login-content">
          <div className="features-list">
            <h3>Features:</h3>
            <ul>
              <li>🎵 Large repository of songs with chord progressions</li>
              <li>🎤 Automatic transposition based on your vocal range</li>
              <li>🎹 Support for piano, guitar, and ukulele</li>
              <li>💾 Save your preferred keys for each song</li>
            </ul>
          </div>
          
          <div className="login-section">
            <h3>Get Started</h3>
            <p>Sign in with Google to begin</p>
            <div className="google-login-wrapper">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                useOneTap
                theme="filled_blue"
                size="large"
                text="signin_with"
                shape="rectangular"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginButton;
