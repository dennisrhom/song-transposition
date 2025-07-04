// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Database Connection (We will configure this in the deployment phase) ---
// --- API Routes (We will add these soon) ---

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
