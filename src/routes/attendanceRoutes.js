const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const authenticateToken = require("../middlewares/auth");
const multer = require("multer");

const upload = multer();

// Routes
router.get("/", authenticateToken, attendanceController.getAttendance);

router.post(
  "/",
  authenticateToken,
  upload.single("photo"),
  attendanceController.createAttendance
);

module.exports = router;
