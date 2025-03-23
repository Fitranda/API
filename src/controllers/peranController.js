const Peran = require("../models/Peran");

exports.getPeran = (req, res) => {
    Peran.getPeran((err, results) => {
      if (err) {
        return res.status(500).json({ message: "Kesalahan saat mengambil data peran", error: err });
      }
      res.status(200).json({ message: "Data peran berhasil diambil", data: results });
    });
  };
  
exports.simpanPeran = (req, res) => { 
    const { namaPeran } = req.body;
    if (!namaPeran) {
      return res.status(400).json({ message: "Nama peran diperlukan" });
    }
    if (namaPeran.length > 100) {
        return res.status(400).json({ message: "Nama peran tidak boleh lebih dari 100 karakter" });
    }
    Peran.simpanPeran({ namaPeran }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Kesalahan saat menyimpan data peran", error: err });
      }
      res.status(201).json({ message: "Peran berhasil ditambahkan", data: result });
    });
  };
  
exports.ubahPeran = (req, res) => {
    const { id } = req.params;
    const { namaPeran } = req.body;
    if (namaPeran.length > 100) {
        return res.status(400).json({ message: "Nama peran tidak boleh lebih dari 100 karakter" });
    }
    if (!id || !namaPeran) {
      return res.status(400).json({ message: "ID dan nama peran diperlukan" });
    }
    Peran.ubahPeran(id, { namaPeran }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Kesalahan saat memperbarui data peran", error: err });
      }
      res.status(200).json({ message: "Peran berhasil diperbarui", data: result });
    });
  };

exports.hapusPeran = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "ID diperlukan" });
    }
    Peran.cekDataAda(id, (err, peran) => {
        
        if (err) {
            return res.status(500).json({ message: "Kesalahan saat memeriksa data peran", error: err });
        }
        
        if (!peran) {
            return res.status(404).json({ message: "Peran tidak ditemukan" });
        }

        Peran.cekPegawai(id, (err, hasPegawai) => {
            if (err) {
                return res.status(500).json({ message: "Kesalahan saat memeriksa data pegawai", error: err });
            }
            if (hasPegawai.length > 0) {
                return res.status(400).json({ message: "Peran tidak dapat dihapus karena masih terkait dengan data pegawai" });
            }

            // Jika tidak terkait, lanjutkan untuk menghapus peran
            Peran.hapusPeran(id, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Kesalahan saat menghapus data peran", error: err });
                }
                res.status(200).json({ message: "Peran berhasil dihapus", data: result });
            });
        });
    });
};
