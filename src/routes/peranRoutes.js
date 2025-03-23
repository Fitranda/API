const express = require("express");
const router = express.Router();
const peranController = require("../controllers/peranController");

router.get("/", peranController.getPeran);
router.post("/", peranController.simpanPeran);
router.put("/:id", peranController.ubahPeran);
router.delete("/:id", peranController.hapusPeran);

module.exports = router;
