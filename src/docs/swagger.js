const pegawaiDocs = require("./pegawai");
// const barangDocs = require("./barang");
// const penjualanDocs = require("./penjualan");
const peranDocs = require("./peran");

module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "Frenz API",
    "version": "1.0.0",
    "description": "Dokumentasi API Frenz"
  },
  "host": "localhost:5000",
  "schemes": ["http"],
  "paths": {
    ...peranDocs,
    ...pegawaiDocs
  },
  "definitions": {
    "Peran": {
      "type": "object",
      "properties": {
        "idPeran": { "type": "integer" },
        "namaPeran": { "type": "string" }
      }
    },
    "Pegawai": {
        "type": "object",
        "properties": {
            "idPegawai": { "type": "integer" },
            "namaPegawai": { "type": "string" },
            "alamat": { "type": "string" },
            "kontak": { "type": "string" },
            "username": { "type": "string" },
            "password": { "type": "string" },
            "idperan": { "type": "integer" },
        }
    }
  }
};
