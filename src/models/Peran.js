const db = require("../config/db");

class Pegawai {
    static getPeran(callback) {
        const query = "SELECT idPeran, namaPeran FROM peran";

        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        });
    }

    static simpanPeran(data, callback) {
        const query = "INSERT INTO peran (namaPeran) VALUES (?)";
        const params = [data.namaPeran];
        db.query(query, params, callback);
    }

    static ubahPeran(id, data, callback) {
        const queryGetOld = "SELECT namaPeran FROM peran WHERE idPeran = ?";
        db.query(queryGetOld, [id], (err, oldResults) => {
            if (err) {
                return callback(err, null);
            }
            if (oldResults.length === 0) {
                return callback(new Error("Data not found"), null);
            }

            const oldData = oldResults[0];
            const queryUpdate = "UPDATE peran SET namaPeran = ? WHERE idPeran = ?";
            const paramsUpdate = [data.namaPeran, id];

            db.query(queryUpdate, paramsUpdate, (err, updateResults) => {
                if (err) {
                    return callback(err, null);
                }
                const newData = { idPeran: id, namaPeran: data.namaPeran };
                return callback(null, { oldData, newData });
            });
        });
    }

    static hapusPeran(id, callback) {
        const queryHapus = "DELETE FROM peran WHERE idPeran = ?";
        db.query(queryHapus, [id], (err, hasil) => {
            if (err) {
                return callback(err, null);
            }
            if (hasil.affectedRows === 0) {
                return callback(new Error("Data tidak ditemukan"), null);
            }
            return callback(null, { pesan: "Data berhasil dihapus", idPeran: id });
        });
    }

    static cekPegawai(id, callback) {
        const queryCekPegawai = "SELECT idPegawai FROM pegawai WHERE idPeran = ?";
        db.query(queryCekPegawai, [id], (err, hasilPegawai) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, hasilPegawai);
        });
    }

    static cekDataAda(id, callback) {
        const queryCekData = "SELECT idPeran FROM peran WHERE idPeran = ?";
        db.query(queryCekData, [id], (err, hasil) => {
            return callback(null, hasil[0]);
        });
    }
}

module.exports = Pegawai;
