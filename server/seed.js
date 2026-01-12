const db = require('./db');
const bcrypt = require('bcryptjs');

const seed = () => {
    console.log('🌱 Seeding database with realistic healthcare data...');

    // 1. Nurses
    const nurses = [
        { name: 'Nurse Kamini Perera', email: 'kamini@vn.lk', phone: '0771234567' },
        { name: 'Nurse Ruwan Silva', email: 'ruwan@vn.lk', phone: '0777654321' },
        { name: 'Nurse Anne Dias', email: 'anne@vn.lk', phone: '0712345678' },
        { name: 'Nurse Mala Kumari', email: 'mala@vn.lk', phone: '0755555555' }
    ];

    const passwordHash = bcrypt.hashSync('nurse123', 10);
    const userStmt = db.prepare('INSERT OR IGNORE INTO users (email, password, role, name, phone) VALUES (?, ?, ?, ?, ?)');

    nurses.forEach(n => {
        userStmt.run(n.email, passwordHash, 'nurse', n.name, n.phone);
    });

    // 2. Patients
    const patients = [
        { name: 'Mrs. Somalatha', phone: '0112345111', address: '123, Temple Rd, Battaramulla', dob: '1945-05-12' },
        { name: 'Mr. Gunapala', phone: '0112345222', address: '45/2, Lake Dr, Rajagiriya', dob: '1950-08-20' },
        { name: 'Baby Kaveesha', phone: '0779991111', address: '88, Flower Rd, Malambe', dob: '2023-01-10' },
        { name: 'Mrs. Fernando', phone: '0718887777', address: 'No 5, School Ln, Nugegoda', dob: '1960-11-30' },
        { name: 'Mr. Perera', phone: '0754443333', address: 'Colpetty', dob: '1975-02-14' }
    ];

    const patientStmt = db.prepare('INSERT OR IGNORE INTO patients (name, phone, address, dob) VALUES (?, ?, ?, ?)');
    patients.forEach(p => {
        patientStmt.run(p.name, p.phone, p.address, p.dob);
    });

    // 3. Bookings (Mix of statuses)
    const nurseIds = db.prepare("SELECT id FROM users WHERE role = 'nurse'").all().map(u => u.id);
    const services = ['IV Infusion', 'Wound Care', 'NG Tube Feeding', 'Catheter Change', 'Elderly Care'];

    // Clear old bookings to avoid clutter if re-seeding
    db.prepare('DELETE FROM bookings').run();

    const bookingStmt = db.prepare(`
        INSERT INTO bookings (customer_name, customer_phone, service_type, scheduled_at, address, notes, status, nurse_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Past Completed
    bookingStmt.run('Mrs. Somalatha', '0112345111', 'Elderly Care', '2025-10-10 09:00:00', '123, Temple Rd, Battaramulla', 'Routine checkup', 'completed', nurseIds[0]);
    bookingStmt.run('Mr. Gunapala', '0112345222', 'Wound Care', '2025-10-11 10:00:00', '45/2, Lake Dr, Rajagiriya', 'Diabetic wound cleaning', 'completed', nurseIds[1]);

    // Today
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    bookingStmt.run('Baby Kaveesha', '0779991111', 'IV Infusion', `${todayStr} 08:00:00`, '88, Flower Rd, Malambe', 'Antibiotics dose 3', 'assigned', nurseIds[0]);
    bookingStmt.run('Mrs. Fernando', '0718887777', 'NG Tube Feeding', `${todayStr} 14:00:00`, 'No 5, School Ln, Nugegoda', 'Lunch feed', 'confirmed', null); // Confirmed but not assigned

    // Pending / New
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    bookingStmt.run('Mr. Perera', '0754443333', 'Catheter Change', `${tomorrowStr} 10:00:00`, 'Colpetty', 'Urgent request', 'new', null);
    bookingStmt.run('Mrs. Somalatha', '0112345111', 'Elderly Care', `${tomorrowStr} 09:00:00`, '123, Temple Rd, Battaramulla', 'Daily visit', 'new', null);

    console.log('✅ Database seeded successfully!');
};

seed();
