require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// Routes
app.use('/member', require('./routes/member'));
app.use('/book', require('./routes/book'));
app.use('/issuance', require('./routes/issuance'));

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Library Management API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
