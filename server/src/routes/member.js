const express = require('express');
const router = express.Router();
const pool = require('../db');
const apiKeyAuth = require('../middleware/apiKey');

router.use(apiKeyAuth);

// GET /member - list all members
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM members ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /member/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM members WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Member not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /member - create new member
router.post('/', async (req, res) => {
  const { name, email, phone, address, membership_date } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
  try {
    const result = await pool.query(
      `INSERT INTO members (name, email, phone, address, membership_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, phone || null, address || null, membership_date || new Date()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /member/:id - update member
router.put('/:id', async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const result = await pool.query(
      `UPDATE members SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        phone = COALESCE($3, phone),
        address = COALESCE($4, address),
        updated_at = NOW()
       WHERE id = $5 RETURNING *`,
      [name, email, phone, address, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Member not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
