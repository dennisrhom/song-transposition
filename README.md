# Song Transposer 🎵

A modern web application that automatically transposes songs to match your vocal range. Built with React.js, Node.js, and MongoDB.

## ✨ Features

- **🎤 Automatic Transposition**: Songs are automatically transposed based on your vocal range
- **🎹 Beautiful Piano Interface**: Set your vocal range using an interactive piano keyboard
- **🔐 Google OAuth**: Secure authentication with Google
- **💾 Save Preferences**: Save your preferred keys for each song
- **🎵 Song Library**: Browse and search through a collection of songs
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **🎸 Multi-Instrument Support**: Support for piano, guitar, and ukulele (coming soon)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd song-transposition
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   PORT=5000
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   
   Create a `.env` file:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the Application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 🎯 How It Works

1. **Sign In**: Use Google OAuth to authenticate
2. **Set Vocal Range**: Use the interactive piano to set your vocal range (E2-A5)
3. **Browse Songs**: View the library of available songs
4. **Automatic Transposition**: Songs are automatically transposed to fit your vocal range
5. **Save Preferences**: Save your preferred key for each song
6. **Customize**: Change to any key you prefer using the dropdown

## 📚 Sample Songs

The application includes 5 sample songs to get you started:
- Amazing Grace (Traditional)
- Wonderwall (Oasis)
- Hallelujah (Jeff Buckley)
- Let It Be (The Beatles)
- Hotel California (Eagles)

## 🛠️ Technology Stack

### Frontend
- **React.js** - Modern UI framework
- **Google OAuth** - Authentication
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Deployment
- **Render** - Backend hosting
- **Vercel** - Frontend hosting
- **MongoDB Atlas** - Cloud database

## 📁 Project Structure

```
song-transposition/
├── backend/
│   ├── models/
│   │   ├── song.model.js      # Song data model
│   │   └── user.model.js      # User data model
│   ├── package.json
│   └── server.js              # Express server
├── frontend/
│   ├── src/
│   │   ├── App.js             # Main application component
│   │   ├── LoginButton.js     # Google OAuth login
│   │   ├── VocalRangeModal.js # Piano interface for vocal range
│   │   ├── songList.js        # Song library component
│   │   ├── songView.js        # Individual song view
│   │   ├── transpose.js       # Transposition logic
│   │   └── *.css              # Component styles
│   └── package.json
├── SETUP.md                   # Detailed setup instructions
└── README.md
```

## 🔧 Configuration

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000` to authorized origins

### MongoDB Atlas Setup
1. Create account at [mongodb.com](https://mongodb.com)
2. Create a new cluster
3. Create database user
4. Get connection string
5. Add IP to whitelist

## 🚀 Deployment

### Backend (Render)
1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables

### Frontend (Vercel)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Add environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google OAuth for authentication
- MongoDB Atlas for database hosting
- React.js community for excellent documentation
- Music theory resources for transposition algorithms

## 📞 Support

If you have any questions or need help setting up the application, please:
1. Check the [SETUP.md](SETUP.md) file for detailed instructions
2. Open an issue on GitHub
3. Contact the development team

---

**Happy singing! 🎤✨**
