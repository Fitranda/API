const db = require("../config/db");
const bcrypt = require("bcrypt");

class Pegawai {
    static Pegawai(search, callback) {
        let query = `
            SELECT p.idPegawai, p.namaPegawai, p.alamat, p.kontak, p.username,p.idperan, pr.namaPeran 
            FROM Pegawai p
            JOIN Peran pr ON p.idPeran = pr.idPeran
            WHERE status = 1
        `;
    
        let params = [];
    
        if (search.namaPegawai) {
            query += " AND p.namaPegawai LIKE ?";
            params.push(`%${search.namaPegawai}%`);
        }
    
        if (search.alamat) {
            query += " AND p.alamat LIKE ?";
            params.push(`%${search.alamat}%`);
        }
    
        if (search.kontak) {
            query += " AND p.kontak LIKE ?";
            params.push(`%${search.kontak}%`);
        }
    
        if (search.username) {
            query += " AND p.username LIKE ?";
            params.push(`%${search.username}%`);
        }

        if (search.namaPeran) {
            query += " AND pr.namaPeran = ?";
            params.push(search.namaPeran);
        }
    
        db.query(query, params, callback);
    }

    static simpan(data, callback) {
        const fields = [];
        const values = [];
        const params = [];

        if (data.namaPegawai) {
            fields.push("namaPegawai");
            values.push("?");
            params.push(data.namaPegawai);
        }
        if (data.alamat) {
            fields.push("alamat");
            values.push("?");
            params.push(data.alamat);
        }
        if (data.kontak) {
            fields.push("kontak");
            values.push("?");
            params.push(data.kontak);
        }
        if (data.username) {
            fields.push("username");
            values.push("?");
            params.push(data.username);
        }
        if (data.password) {
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(data.password, saltRounds);
            fields.push("password");
            values.push("?");
            params.push(hashedPassword);
        }
        if (data.idPeran) {
            fields.push("idPeran");
            values.push("?");
            params.push(data.idPeran);
        }

        const query = `
            INSERT INTO Pegawai (${fields.join(", ")})
            VALUES (${values.join(", ")})
        `;
        db.query(query, params, callback);
    }

    static ubah(idPegawai, data, callback) {
        const fields = [];
        const params = [];

        if (data.namaPegawai) {
            fields.push("namaPegawai = ?");
            params.push(data.namaPegawai);
        }
        if (data.alamat) {
            fields.push("alamat = ?");
            params.push(data.alamat);
        }
        if (data.kontak) {
            fields.push("kontak = ?");
            params.push(data.kontak);
        }
        if (data.username) {
            fields.push("username = ?");
            params.push(data.username);
        }
        if (data.password) {
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(data.password, saltRounds);
            fields.push("password = ?");
            params.push(hashedPassword);
        }
        if (data.idPeran) {
            fields.push("idPeran = ?");
            params.push(data.idPeran);
        }

        if (fields.length === 0) {
            return callback(new Error("Data tidak ada"));
        }

        const query = `
            UPDATE Pegawai
            SET ${fields.join(", ")}
            WHERE idPegawai = ?
        `;
        params.push(idPegawai);

        db.query(query, params, callback);
    }

    static hapus(idPegawai, callback) {
        const queryCheckExistence = `
            SELECT COUNT(*) AS count FROM Pegawai WHERE idPegawai = ?
        `;

        db.query(queryCheckExistence, [idPegawai], (err, results) => {
            if (err) {
                return callback(err);
            }

            const exists = results[0].count > 0;
            if (!exists) {
                return callback(new Error("idPegawai tidak ditemukan"));
            }

            const queryCheck = `
                SELECT COUNT(*) AS count FROM (
                    SELECT idPegawai FROM absensi WHERE idPegawai = ?
                    UNION ALL
                    SELECT idPegawai FROM penjualan WHERE idPegawai = ?
                    UNION ALL
                    SELECT idPegawai FROM pembelian WHERE idPegawai = ?
                ) AS relatedData
            `;

            db.query(queryCheck, [idPegawai, idPegawai, idPegawai], (err, results) => {
                if (err) {
                    return callback(err);
                }

                const count = results[0].count;
                if (count > 0) {
                    const queryUpdate = `
                        UPDATE Pegawai
                        SET status = 2
                        WHERE idPegawai = ?
                    `;
                    db.query(queryUpdate, [idPegawai], callback);
                } else {
                    const queryDelete = `
                        DELETE FROM Pegawai
                        WHERE idPegawai = ?
                    `;
                    db.query(queryDelete, [idPegawai], callback);
                }
            });
        });
    }
}

module.exports = Pegawai;
