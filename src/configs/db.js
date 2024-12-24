import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config()

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,  // Menunggu jika semua koneksi sedang digunakan
  connectionLimit: 10,       // Jumlah maksimum koneksi di dalam pool
  queueLimit: 0,             // Tidak ada batas antrian koneksi
});

export default pool;