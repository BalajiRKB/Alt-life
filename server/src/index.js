require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Serve dashboard UI
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/member', require('./routes/member'));
app.use('/book', require('./routes/book'));
app.use('/issuance', require('./routes/issuance'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Library Management API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
