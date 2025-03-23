const express = require("express");
const router = express.Router();
const pegawaiController = require("../controllers/pegawaiController");

router.get("/", pegawaiController.Pegawai);
router.post("/", pegawaiController.tambahPegawai);
router.put("/:id", pegawaiController.ubahPegawai);
router.delete("/:id", pegawaiController.hapusPegawai);

module.exports = router;
