const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = 'super_secret_visiting_nurse_key'; // In prod, use .env

// Middleware: Authenticate Token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // FORMAT: Bearer <token>
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// -- AUTH ROUTES --
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.is_active) {
        return res.status(403).json({ error: 'Account disabled' });
    }

    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, SECRET_KEY, { expiresIn: '12h' });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
});

// -- PUBLIC ROUTES (CLIENT WEBSITE) --
app.post('/api/bookings/public', (req, res) => {
    const { name, phone, service, date, address, notes } = req.body;
    try {
        const stmt = db.prepare(`
      INSERT INTO bookings (customer_name, customer_phone, service_type, scheduled_at, address, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
        const info = stmt.run(name, phone, service, date, address, notes || '');
        res.json({ success: true, id: info.lastInsertRowid });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -- ADMIN ROUTES --

// Get Dashboard Stats (Enhanced)
app.get('/api/admin/stats', authenticateToken, (req, res) => {
    const todayStr = new Date().toISOString().split('T')[0];

    const total = db.prepare('SELECT COUNT(*) as count FROM bookings').get().count;
    const pending = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'new'").get().count;
    const completed = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'completed'").get().count;
    const nurses = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'nurse' AND is_active = 1").get().count;
    const today = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE date(scheduled_at) = ?").get(todayStr).count;

    // Recent Bookings (Limit 5)
    const recent = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC LIMIT 5').all();

    res.json({ total, pending, completed, nurses, today, recent });
});

// Get Bookings (with optional filter)
app.get('/api/admin/bookings', authenticateToken, (req, res) => {
    // If nurse, only show assigned
    if (req.user.role === 'nurse') {
        const bookings = db.prepare(`
            SELECT * FROM bookings WHERE nurse_id = ? ORDER BY scheduled_at DESC
        `).all(req.user.id);
        return res.json(bookings);
    }

    const bookings = db.prepare('SELECT b.*, u.name as nurse_name FROM bookings b LEFT JOIN users u ON b.nurse_id = u.id ORDER BY b.created_at DESC LIMIT 100').all();
    res.json(bookings);
});

// Update Booking Status / Assign Nurse
app.put('/api/admin/bookings/:id', authenticateToken, (req, res) => {
    const { status, nurse_id } = req.body;
    const { id } = req.params;

    if (req.user.role === 'nurse') {
        if (status !== 'completed') return res.status(403).json({ error: 'Nurse can only complete visits' });
    }

    const stmt = db.prepare('UPDATE bookings SET status = ?, nurse_id = ? WHERE id = ?');
    const current = db.prepare('SELECT * FROM bookings WHERE id = ?').get(id);

    const newStatus = status || current.status;
    const newNurse = nurse_id !== undefined ? nurse_id : current.nurse_id;

    stmt.run(newStatus, newNurse, id);

    // Log Activity
    const logStmt = db.prepare('INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)');
    logStmt.run(req.user.id, 'updated_booking', `Booking #${id} updated to ${newStatus}`);

    res.json({ success: true });
});

// Get Nurses List
app.get('/api/admin/nurses', authenticateToken, (req, res) => {
    if (req.user.role === 'nurse') return res.status(403).send();
    const nurses = db.prepare("SELECT id, name, phone, is_active FROM users WHERE role = 'nurse'").all();
    res.json(nurses);
});

// Get Patients List
app.get('/api/admin/patients', authenticateToken, (req, res) => {
    if (req.user.role === 'nurse') return res.status(403).send();
    const patients = db.prepare("SELECT * FROM patients ORDER BY name ASC").all();
    res.json(patients);
});

// Get Activity Feed
app.get('/api/admin/activity', authenticateToken, (req, res) => {
    const logs = db.prepare(`
        SELECT l.*, u.name as user_name 
        FROM activity_logs l 
        LEFT JOIN users u ON l.user_id = u.id 
        ORDER BY l.timestamp DESC LIMIT 20
    `).all();
    res.json(logs);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
