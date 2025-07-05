# Song Transposer - Setup Guide

## Overview
A web application that automatically transposes songs to match your vocal range. Features include Google OAuth authentication, vocal range detection, and automatic song transposition.

## Features
- 🎵 Large repository of songs with chord progressions
- 🎤 Automatic transposition based on your vocal range
- 🎹 Support for piano, guitar, and ukulele
- 💾 Save your preferred keys for each song
- 🔐 Google OAuth authentication

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Google OAuth credentials

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

### 3. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Add `http://localhost:3000` to the authorized JavaScript origins
6. Copy the Client ID and add it to your frontend `.env` file

### 4. MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [mongodb.com](https://mongodb.com)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string and add it to your backend `.env` file
5. Add your IP address to the IP whitelist

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Sample Songs

The application comes with 5 sample songs:
- Amazing Grace (Traditional)
- Wonderwall (Oasis)
- Hallelujah (Jeff Buckley)
- Let It Be (The Beatles)
- Hotel California (Eagles)

To add these songs to your database, click the "Add Sample Songs" button when you first load the application.

## Usage

1. **Sign In**: Use Google OAuth to sign in to the application
2. **Set Vocal Range**: Use the piano interface to set your vocal range (E2-A5)
3. **Browse Songs**: View the library of available songs
4. **View Songs**: Click on a song to see it with automatically transposed chords
5. **Save Preferences**: Save your preferred key for each song
6. **Change Keys**: Use the dropdown to change to any key you prefer

## Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set the build command: `npm install`
3. Set the start command: `npm start`
4. Add environment variables (MONGODB_URI)

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set the build command: `npm run build`
3. Add environment variables (REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_API_URL)

## File Structure

```
song-transposition/
├── backend/
│   ├── models/
│   │   ├── song.model.js
│   │   └── user.model.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── LoginButton.js
│   │   ├── VocalRangeModal.js
│   │   ├── songList.js
│   │   ├── songView.js
│   │   ├── transpose.js
│   │   └── *.css
│   └── package.json
└── README.md
```

## Technologies Used

- **Frontend**: React.js, Google OAuth
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB Atlas
- **Deployment**: Render (backend), Vercel (frontend)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License. 