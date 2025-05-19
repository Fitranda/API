const express = require("express");
const router = express.Router();
const attedance = require("../controllers/attedanceController")
const authenticateToken = require("../middlewares/auth");

router.post("/",authenticateToken, attedance.CreateAttedance);
router.get("/",authenticateToken ,attedance.getAttedance);

module.exports = router;