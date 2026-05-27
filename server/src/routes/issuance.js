const express = require('express');
const router = express.Router();
const pool = require('../db');
const apiKeyAuth = require('../middleware/apiKey');

router.use(apiKeyAuth);

// GET /issuance
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT i.*, m.name AS member_name, b.title AS book_title, b.author
       FROM issuances i
       JOIN members m ON i.member_id = m.id
       JOIN books b ON i.book_id = b.id
       ORDER BY i.id`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /issuance/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT i.*, m.name AS member_name, b.title AS book_title, b.author
       FROM issuances i
       JOIN members m ON i.member_id = m.id
       JOIN books b ON i.book_id = b.id
       WHERE i.id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Issuance not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /issuance - issue a book to a member
router.post('/', async (req, res) => {
  const { member_id, book_id, issued_date, target_return_date } = req.body;
  if (!member_id || !book_id || !target_return_date) {
    return res.status(400).json({ error: 'member_id, book_id, and target_return_date are required' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO issuances (member_id, book_id, issued_date, target_return_date)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [member_id, book_id, issued_date || new Date(), target_return_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /issuance/:id - update issuance (e.g. mark as returned)
router.put('/:id', async (req, res) => {
  const { actual_return_date, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE issuances SET
        actual_return_date = COALESCE($1, actual_return_date),
        status = COALESCE($2, status),
        updated_at = NOW()
       WHERE id = $3 RETURNING *`,
      [actual_return_date, status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Issuance not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
