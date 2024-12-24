import pool from '@/configs/db.js';

// Fungsi untuk menangani error koneksi secara konsisten
const handleConnectionError = (err) => {
    if (err.code === 'ER_CON_COUNT_ERROR') {
        console.log('Terlalu banyak koneksi ke database.');
    } else if (err.code === 'ETIMEDOUT') {
        console.log('Waktu habis saat mencoba mendapatkan koneksi.');
    } else {
        console.log('Kesalahan koneksi:', err.message);
    }
    throw err;
};

const createArtikel = async (data, tanggal) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [result] = await conn.query(
            `INSERT INTO artikel (id, judul, penulis, isi, tanggal, gambar) 
             VALUES (NULL, ?, ?, ?, ?, ?);`,
            [data.judul, data.penulis, data.isi, tanggal, data.gambar || null]
        );
        return { insertId: result.insertId };
    } catch (err) {
        handleConnectionError(err);
    } finally {
        if (conn) {
            try {
                conn.release();
            } catch (releaseErr) {
                console.log('Kesalahan saat melepaskan koneksi:', releaseErr.message);
            }
        }
    }
};

const getAllArtikel = async () => {
    let conn;
    try {
        console.log('Mengambil data artikel...');
        conn = await pool.getConnection();
        const [result] = await conn.query(`SELECT * FROM artikel`);
        return result;
    } catch (err) {
        handleConnectionError(err);
    } finally {
        if (conn) {
            try {
                conn.release();
            } catch (releaseErr) {
                console.log('Kesalahan saat melepaskan koneksi:', releaseErr.message);
            }
        }
        console.log('Pengambilan data selesai.');
    }
};

const getArtikelById = async (id) => {
    let conn;
    try {
        console.log(`Mengambil data artikel dengan ID: ${id}...`);
        conn = await pool.getConnection();
        const [result] = await conn.query(`SELECT * FROM artikel WHERE id = ?`, [id]);
        return result;
    } catch (err) {
        handleConnectionError(err);
    } finally {
        if (conn) {
            try {
                conn.release();
            } catch (releaseErr) {
                console.log('Kesalahan saat melepaskan koneksi:', releaseErr.message);
            }
        }
        console.log('Pengambilan data selesai.');
    }
};

const updateArtikel = async (data, id, tanggal) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [result] = await conn.query(
            `UPDATE artikel SET judul = ?, penulis = ?, isi = ?, last_update = ?, gambar = ? WHERE id = ?`,
            [data.judul, data.penulis, data.isi, tanggal, data.gambar || null, id]
        );
        return result.affectedRows;
    } catch (err) {
        handleConnectionError(err);
    } finally {
        if (conn) {
            try {
                conn.release();
            } catch (releaseErr) {
                console.log('Kesalahan saat melepaskan koneksi:', releaseErr.message);
            }
        }
    }
};

const deleteArtikel = async (id) => {
    let conn;
    try {
        console.log(`Menghapus artikel dengan ID: ${id}...`);
        conn = await pool.getConnection();
        const [result] = await conn.query(`DELETE FROM artikel WHERE id = ?`, [id]);
        return result.affectedRows;
    } catch (err) {
        handleConnectionError(err);
    } finally {
        if (conn) {
            try {
                conn.release();
            } catch (releaseErr) {
                console.log('Kesalahan saat melepaskan koneksi:', releaseErr.message);
            }
        }
        console.log('Penghapusan selesai.');
    }
};

export default {
    getAllArtikel,
    getArtikelById,
    createArtikel,
    updateArtikel,
    deleteArtikel,
};
