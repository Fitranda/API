const Pegawai = require("../models/Pegawai");

exports.Pegawai = (req, res) => {
    const filter = req.query || {};
    Pegawai.Pegawai(filter, (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error fetching data", error: err });
            return;
        }
        res.json(results);
    });
};

exports.tambahPegawai = (req, res) => {
    const newPegawai = new Pegawai(req.body);
    if (!req.body.namaPegawai) {
        res.status(400).json({ message: "Nama pegawai harus diisi" });
        return;
    }
    if (req.body.namaPegawai.length > 255) {
        res.status(400).json({ message: "Nama pegawai tidak boleh lebih dari 255 karakter" });
        return;
    }
    if (req.body.kontak) {
        if (req.body.kontak.length > 20) {
            res.status(400).json({ message: "Kontak pegawai tidak boleh lebih dari 20 karakter" });
            return;
        }
    }
    if (!req.body.username) {
        res.status(400).json({ message: "Username harus diisi" });
        return;
    }

    if (req.body.username.length > 100) {
        res.status(400).json({ message: "Username tidak boleh lebih dari 100 karakter" });
        return;
    }

    if (!req.body.password) {
        res.status(400).json({ message: "Password harus diisi" });
        return;
    }

    if (req.body.password.length < 8) {
        res.status(400).json({ message: "Password minimal 8 karakter" });
        return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!passwordRegex.test(req.body.password)) {
        res.status(400).json({ message: "Password harus mengandung setidaknya satu huruf besar, satu angka, dan satu simbol" });
        return;
    }

    if (!req.body.idPeran) {
        res.status(400).json({ message: "Peran harus diisi" });
        return;
    }


    newPegawai.save((err, result) => {
        if (err) {
            res.status(500).json({ message: "Kesalahan saat menyimpan data", error: err });
            return;
        }
        res.status(201).json(result);
    });
};

exports.ubahPegawai = (req, res) => {
    const { id } = req.params;
    const newPegawai = new Pegawai(req.body);
    if (!req.body.namaPegawai) {
        res.status(400).json({ message: "Nama pegawai harus diisi" });
        return;
    }
    if (req.body.namaPegawai.length > 255) {
        res.status(400).json({ message: "Nama pegawai tidak boleh lebih dari 255 karakter" });
        return;
    }
    if (req.body.kontak) {
        if (req.body.kontak.length > 20) {
            res.status(400).json({ message: "Kontak pegawai tidak boleh lebih dari 20 karakter" });
            return;
        }
    }
    if (!req.body.username) {
        res.status(400).json({ message: "Username harus diisi" });
        return;
    }

    if (req.body.username.length > 100) {
        res.status(400).json({ message: "Username tidak boleh lebih dari 100 karakter" });
        return;
    }

    if (req.body.password) {
        if (req.body.password.length < 8) {
            res.status(400).json({ message: "Password minimal 8 karakter" });
            return;
        }
    
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (!passwordRegex.test(req.body.password)) {
            res.status(400).json({ message: "Password harus mengandung setidaknya satu huruf besar, satu angka, dan satu simbol" });
            return;
        }
    }

    if (!req.body.idPeran) {
        res.status(400).json({ message: "Peran harus diisi" });
        return;
    }


    newPegawai.ubah((err, result) => {
        if (err) {
            res.status(500).json({ message: "Kesalahan saat menyimpan data", error: err });
            return;
        }
        res.status(201).json(result);
    });
};

exports.hapusPegawai = (req, res) => {
    const id = req.params.id;
    Pegawai.hapus(id, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Error hapus data", error: err });
            return;
        }
        if (!result) {
            res.status(404).json({ message: "Pegawai tidak ditemukan" });
            return;
        }
        res.json({ message: "Pegawai berhasil dihapus" });
    });
};
