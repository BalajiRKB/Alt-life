const express = require('express');
const router = express.Router();
const pool = require('../db');
const apiKeyAuth = require('../middleware/apiKey');

router.use(apiKeyAuth);

// GET /book
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /book/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Book not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /book
router.post('/', async (req, res) => {
  const { title, author, isbn, genre, total_copies, available_copies } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'title and author are required' });
  try {
    const result = await pool.query(
      `INSERT INTO books (title, author, isbn, genre, total_copies, available_copies)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, author, isbn || null, genre || null, total_copies || 1, available_copies || 1]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /book/:id
router.put('/:id', async (req, res) => {
  const { title, author, isbn, genre, total_copies, available_copies } = req.body;
  try {
    const result = await pool.query(
      `UPDATE books SET
        title = COALESCE($1, title),
        author = COALESCE($2, author),
        isbn = COALESCE($3, isbn),
        genre = COALESCE($4, genre),
        total_copies = COALESCE($5, total_copies),
        available_copies = COALESCE($6, available_copies),
        updated_at = NOW()
       WHERE id = $7 RETURNING *`,
      [title, author, isbn, genre, total_copies, available_copies, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Book not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
