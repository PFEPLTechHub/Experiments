const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // your MySQL password
  database: 'email_tracking'
});

db.connect((err) => {
  if (err) console.error("DB Connection Failed:", err);
  else console.log("MySQL connected");
});

// Email Open Tracking Route
app.get('/email-open', (req, res) => {
  const userId = req.query.user_id || 'unknown';
  const timestamp = new Date();

  db.query(
    'INSERT INTO email_opens (user_id, opened_at) VALUES (?, ?)',
    [userId, timestamp],
    (err) => {
      if (err) console.error("DB Insert Error:", err);
    }
  );

  // Serve the tracking pixel
  const pixelPath = path.join(__dirname, 'pixel.png');
  fs.readFile(pixelPath, (err, data) => {
    if (err) return res.status(500).send('Pixel not found');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': data.length
    });
    res.end(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
