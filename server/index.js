import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL
});
db.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Database connection error:', err));

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    res.json({ message: 'User registered', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/payment', async (req, res) => {
  const { user_id, amount, status } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO payments(user_id, amount, status) VALUES($1, $2, $3) RETURNING *',
      [user_id, amount, status]
    );
    res.json({ message: 'Payment recorded', payment: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/payments', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM payments');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/register-event', async (req, res) => {
  const { user_id, event_name } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO registrations(user_id, event_name) VALUES($1, $2) RETURNING *',
      [user_id, event_name]
    );
    res.json({ message: 'Event registration recorded', registration: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/registrations', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM registrations');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO admins(name, email, password) VALUES($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    res.json({ message: 'Admin added', admin: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admins', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM admins');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
