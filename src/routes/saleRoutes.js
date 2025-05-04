const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");
const authenticateToken = require("../middlewares/auth");

router.get("/",authenticateToken ,saleController.getSale);
router.post("/",authenticateToken , saleController.CreateSale);

module.exports = router;
