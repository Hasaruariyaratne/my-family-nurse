const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const db = new Database('database.db', { verbose: console.log });

// Initialize Database
const initDb = () => {
  // Users Table (Admins, Nurses)
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('super_admin', 'admin', 'nurse', 'reception')) NOT NULL,
      name TEXT NOT NULL,
      phone TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Bookings Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      service_type TEXT NOT NULL,
      scheduled_at DATETIME,
      address TEXT NOT NULL,
      notes TEXT,
      status TEXT CHECK(status IN ('new', 'confirmed', 'assigned', 'completed', 'cancelled')) DEFAULT 'new',
      nurse_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (nurse_id) REFERENCES users (id)
    )
  `);

  // Patients Table (New)
  db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT UNIQUE NOT NULL,
      address TEXT,
      dob DATE,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Activity Logs Table (New)
  db.exec(`
    CREATE TABLE IF NOT EXISTS activity_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      action TEXT NOT NULL,
      details TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Visit Logs / Notes (Existing)
  db.exec(`
    CREATE TABLE IF NOT EXISTS visit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_id INTEGER NOT NULL,
      nurse_id INTEGER NOT NULL,
      note TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (booking_id) REFERENCES bookings (id),
      FOREIGN KEY (nurse_id) REFERENCES users (id)
    )
  `);

  // Create Default Super Admin if not exists
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  const admin = stmt.get('admin@visitingnurse.lk');

  if (!admin) {
    const hash = bcrypt.hashSync('admin123', 10);
    const insert = db.prepare('INSERT INTO users (email, password, role, name) VALUES (?, ?, ?, ?)');
    insert.run('admin@visitingnurse.lk', hash, 'super_admin', 'System Administrator');
    console.log('Default Admin Created: admin@visitingnurse.lk / admin123');
  }

  // Create a Demo Nurse
  const nurse = stmt.get('nurse@visitingnurse.lk');
  if (!nurse) {
    const hashNr = bcrypt.hashSync('nurse123', 10);
    const insertNr = db.prepare('INSERT INTO users (email, password, role, name, phone) VALUES (?, ?, ?, ?, ?)');
    insertNr.run('nurse@visitingnurse.lk', hashNr, 'nurse', 'Sister Mary', '0779998888');
    console.log('Default Nurse Created: nurse@visitingnurse.lk / nurse123');
  }
};

initDb();

module.exports = db;
